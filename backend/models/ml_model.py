import pickle
import numpy as np
import os
import re
import string
import nltk
from nltk.tokenize import word_tokenize
from nltk.corpus import stopwords

# Ensure NLTK resources are available
try:
    nltk.data.find('tokenizers/punkt')
    nltk.data.find('tokenizers/punkt_tab')
except LookupError:
    nltk.download('punkt')
    nltk.download('punkt_tab')

try:
    nltk.data.find('corpora/stopwords')
except LookupError:
    nltk.download('stopwords')

class MLModel:
    _instance = None

    def __new__(cls):
        if cls._instance is None:
            cls._instance = super(MLModel, cls).__new__(cls)
            cls._instance.model = None
            cls._instance.vectorizer = None
            cls._instance.load_model()
        return cls._instance

    def load_model(self):
        try:
            base_dir = os.path.dirname(os.path.abspath(__file__))
            model_path = os.path.join(base_dir, 'model_svm.pkl')
            vec_path = os.path.join(base_dir, 'vectorizer.pkl')
            
            if os.path.exists(model_path) and os.path.exists(vec_path):
                print(f"Loading models from {base_dir}...")
                with open(model_path, 'rb') as f:
                    self.model = pickle.load(f)
                with open(vec_path, 'rb') as f:
                    self.vectorizer = pickle.load(f)
                print("Models loaded successfully.")
            else:
                print(f"Model files not found in {base_dir}")
        except Exception as e:
            print(f"Error loading models: {e}")

    def preprocess_text(self, text):
        # 1. Case Folding
        text = text.lower()

        # 2. Convert text to string if it's not (just in case)
        text = str(text)

        # 3. Remove URL and Numbers
        text = re.sub(r'https?://\S+|www\.\S+', '', text)
        text = re.sub(r'[-+]?[0-9]+', '', text)

        # 4. Remove Punctuation
        text = text.translate(str.maketrans('', '', string.punctuation))

        # 5. Tokenization
        tokens = word_tokenize(text)

        # 6. Stopword Removal
        stop_words = set(stopwords.words('english'))
        filtered_tokens = [word for word in tokens if word not in stop_words]

        return " ".join(filtered_tokens)

    def predict(self, text):
        if not self.model or not self.vectorizer:
             # Try reloading
             self.load_model()
             if not self.model or not self.vectorizer:
                 return "Model Error", 0.0

        try:
            # 1. Preprocess
            clean_text = self.preprocess_text(text)
            
            # 2. Vectorize
            # Transform takes a list/iterable
            vectors = self.vectorizer.transform([clean_text])
            
            # 3. Predict & Confidence
            # Use decision_function to estimate confidence since probability=True wasn't used
            prediction = self.model.predict(vectors)[0]
            
            try:
                # Calculate pseudo-probability using softmax on decision function scores
                scores = self.model.decision_function(vectors)[0]
                exp_scores = np.exp(scores - np.max(scores)) # shift for stability
                probs = exp_scores / np.sum(exp_scores)
                confidence = np.max(probs)
            except Exception:
                # Fallback if decision_function not available or other error
                confidence = 1.0
            
            return prediction, float(confidence)

        except Exception as e:
            print(f"Prediction error: {e}")
            return "Error", 0.0

# Singleton helper
def predict_ml(text):
    clf = MLModel()
    return clf.predict(text)
