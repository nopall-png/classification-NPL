from flask import Flask, request, jsonify
from flask_cors import CORS
import os
import sys
import uuid
<<<<<<< HEAD
from models.ml_model import predict_ml
=======

# Suppress TensorFlow logs
os.environ['TF_ENABLE_ONEDNN_OPTS'] = '0'
os.environ['TF_CPP_MIN_LOG_LEVEL'] = '2'

from models.ml_model import predict_ml
from models.dl_model import predict_dl
>>>>>>> model-svm
from utils import extract_text_from_pdf, transcribe_audio, extract_entities

app = Flask(__name__)
CORS(app)

# Configuration for uploads
UPLOAD_FOLDER = os.path.join(os.path.dirname(os.path.abspath(__file__)), 'uploads')
os.makedirs(UPLOAD_FOLDER, exist_ok=True)

@app.route('/')
def home():
    return jsonify({"message": "NLP Classifier Backend is running!"})

@app.route('/predict', methods=['POST'])
def predict():
    try:
        text_to_classify = ""
        cleanup_file = None

        # 1. Check if file is uploaded
        if 'file' in request.files:
            file = request.files['file']
            if file.filename == '':
                return jsonify({"error": "No selected file"}), 400
            
            # Save file temporarily
            filename = f"{uuid.uuid4()}_{file.filename}"
            filepath = os.path.join(UPLOAD_FOLDER, filename)
            file.save(filepath)
            cleanup_file = filepath

            # Process based on extension
            if filepath.lower().endswith('.pdf'):
                text_to_classify = extract_text_from_pdf(filepath)
                if not text_to_classify:
                    return jsonify({"error": "Failed to extract text from PDF"}), 400
            
<<<<<<< HEAD
            elif filepath.lower().endswith(('.mp3', '.wav', '.webm')):
=======
            elif filepath.lower().endswith(('.mp3', '.wav', '.webm', '.mpeg')):
>>>>>>> model-svm
                text_to_classify = transcribe_audio(filepath)
                if not text_to_classify or text_to_classify.startswith("Error"):
                     return jsonify({"error": text_to_classify}), 400
            
            elif filepath.lower().endswith('.txt'):
                with open(filepath, 'r', encoding='utf-8') as f:
                    text_to_classify = f.read()

        # 2. Check if text is provided directly
        elif 'text' in request.form:
             text_to_classify = request.form['text']
        
        elif request.json and 'text' in request.json:
             text_to_classify = request.json['text']

        if not text_to_classify:
            return jsonify({"error": "No text or file provided"}), 400

        print(f"DEBUG: Text to classify -> '{text_to_classify}'")

<<<<<<< HEAD
        # 3. Classify using SVM Model
        category, confidence = predict_ml(text_to_classify)
=======
        # 3. Classify using selected Model
        model_type = request.form.get('model') or request.args.get('model') or (request.json.get('model') if request.json else 'ml')
        
        if model_type == 'dl':
             category, confidence = predict_dl(text_to_classify)
        else:
             category, confidence = predict_ml(text_to_classify)
>>>>>>> model-svm
        
        # 4. Extract Entities
        entities = extract_entities(text_to_classify)
        
        # Cleanup temp file
        if cleanup_file and os.path.exists(cleanup_file):
            try:
                os.remove(cleanup_file)
                # potentially remove converted wav if it exists
                if cleanup_file.endswith('.mp3'):
                     wav_path = cleanup_file.replace('.mp3', '.wav')
                     if os.path.exists(wav_path):
                         os.remove(wav_path)
            except:
                pass

        return jsonify({
            "category": category,
            "confidence": confidence,
            "text": text_to_classify,
            "entities": entities
        })

    except Exception as e:
        return jsonify({"error": str(e)}), 500

if __name__ == '__main__':
    app.run(debug=True, port=5000)
