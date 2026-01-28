import os
import shutil
import PyPDF2
import speech_recognition as sr
from pydub import AudioSegment

# Explicitly configure FFmpeg path for pydub
# Using local binaries in the same folder as this script
base_dir = os.path.dirname(os.path.abspath(__file__))
ffmpeg_path = os.path.join(base_dir, "bin", "ffmpeg.exe")
ffprobe_path = os.path.join(base_dir, "bin", "ffprobe.exe")

if os.path.exists(ffmpeg_path):
    print(f"FFmpeg configured at: {ffmpeg_path}")
    AudioSegment.converter = ffmpeg_path
    AudioSegment.ffprobe = ffprobe_path
else:
    print(f"WARNING: FFmpeg not found at {ffmpeg_path}. Audio processing might fail.")
    # Fallback to PATH
    if shutil.which("ffmpeg"):
         AudioSegment.converter = shutil.which("ffmpeg")

def extract_text_from_pdf(file_path):
    """
    Extracts text from a PDF file.
    """
    text = ""
    try:
        with open(file_path, 'rb') as file:
            reader = PyPDF2.PdfReader(file)
            for page in reader.pages:
                text += page.extract_text() + "\n"
    except Exception as e:
        print(f"Error extracting PDF: {e}")
        return None
    return text

def transcribe_audio(file_path):
    """
    Transcribes audio file to text using Google Web Speech API.
    Supports converting mp3/wav to compatible format if needed.
    """
    recognizer = sr.Recognizer()
    
    # Convert to WAV if necessary (SpeechRecognition supports WAV/AIFF/FLAC)
    if not file_path.endswith('.wav'):
        try:
            # Load file (detects format automatically: mp3, webm, etc.)
            sound = AudioSegment.from_file(file_path)
            wav_path = file_path + ".wav"
            sound.export(wav_path, format="wav")
            file_path = wav_path
        except Exception as e:
             return f"Error converting audio: {str(e)}"

    try:
        with sr.AudioFile(file_path) as source:
            audio_data = recognizer.record(source)
            text = recognizer.recognize_google(audio_data)
            return text
    except sr.UnknownValueError:
        return "Audio unintelligible"
    except sr.RequestError as e:
        return f"Service unavailable: {e}"
    except Exception as e:
        return f"Error transcribing: {str(e)}"

def dummy_classify(text):
    """
    Dummy keyword-based classifier.
    Returns: category, confidence
    """
    text_lower = text.lower()
    
    keywords = {
        "Economy": ["money", "market", "finance", "economy", "stock", "dollar", "rupiah", "business", "inflation", "trade"],
        "Technology": ["computer", "code", "software", "hardware", "ai", "internet", "technology", "phone", "app", "digital"],
        "Health": ["health", "doctor", "hospital", "medicine", "virus", "disease", "treatment", "patient", "nurse", "covid"],
        "Entertainment": ["movie", "music", "song", "film", "artist", "entertainment", "concert", "celebrity", "show", "game"]
    }
    
    scores = {category: 0 for category in keywords}
    
    for category, words in keywords.items():
        for word in words:
            if word in text_lower:
                scores[category] += 1
    
    # Determine best match
    best_category = max(scores, key=scores.get)
    max_score = scores[best_category]
    
    # Calculate simple confidence
    total_hits = sum(scores.values())
    if total_hits == 0:
        return "Unclassified", 0.0
        
    confidence = max_score / total_hits
    
    # Boost confidence a bit for display purposes if it's low but matches
    if confidence < 0.5 and max_score > 0:
        confidence = 0.5 + (confidence * 0.4)
        
    return best_category, round(confidence, 2)
