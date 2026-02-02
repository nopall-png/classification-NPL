<<<<<<< HEAD
class DLModel:
    def __init__(self):
        # Load your DL model (e.g., LSTM, BERT) here
        # self.model = load_model('path/to/model.h5')
        # self.tokenizer = ...
        pass

    def predict(self, text):
        """
        Perform classification using the DL model.
        """
        # 1. Preprocess text (tokenize, pad)
        # 2. Predict
        
        # Placeholder return
        return {
            "label": "Unknown",
            "confidence": 0.0
        }

# Singleton instance or helper function
def predict_dl(text):
    # Instantiate model if needed or use global instance
    # model = DLModel()
    # return model.predict(text)
    pass
=======
import os
import pickle
import numpy as np
import tensorflow as tf
from tensorflow.keras.models import load_model
from tensorflow.keras.preprocessing.sequence import pad_sequences

class DLModel:
    _instance = None

    def __new__(cls):
        if cls._instance is None:
            cls._instance = super(DLModel, cls).__new__(cls)
            cls._instance.model = None
            cls._instance.tokenizer = None
            cls._instance.categories = None
            cls._instance.load_model()
        return cls._instance

    def load_model(self):
        try:
            base_dir = os.path.dirname(os.path.abspath(__file__))
            model_path = os.path.join(base_dir, 'lstm_genre_classifier.h5')
            tokenizer_path = os.path.join(base_dir, 'class_tokenizer.pkl')
            categories_path = os.path.join(base_dir, 'categories_label.pkl')
            
            if os.path.exists(model_path) and os.path.exists(tokenizer_path):
                print(f"Loading DL models from {base_dir}...")
                self.model = load_model(model_path)
                with open(tokenizer_path, 'rb') as f:
                    self.tokenizer = pickle.load(f)
                
                if os.path.exists(categories_path):
                     with open(categories_path, 'rb') as f:
                        self.categories = pickle.load(f)
                else:
                    # Fallback default categories if file missing
                    self.categories = ['Economy', 'Entertainment', 'Health', 'Technology', 'Sport']
                    
                print("DL Models loaded successfully.")
            else:
                print(f"DL Model files not found in {base_dir}")
        except Exception as e:
            print(f"Error loading DL models: {e}")

    def predict(self, text):
        if not self.model or not self.tokenizer:
             self.load_model()
             if not self.model or not self.tokenizer:
                 return "Model Error", 0.0

        try:
            # Preprocess
            # (Note: Use same preprocessing as training if possible, but basic padding is key)
            max_len = 70 # As defined in notebook
            
            # Tokenize
            sequences = self.tokenizer.texts_to_sequences([text])
            padded = pad_sequences(sequences, maxlen=max_len, padding='post')
            
            # Predict
            prediction = self.model.predict(padded)
            class_idx = np.argmax(prediction[0])
            confidence = float(np.max(prediction[0]))
            
            # Map to label
            if self.categories and class_idx < len(self.categories):
                category = self.categories[class_idx]
            else:
                category = f"Class {class_idx}"

            return category, confidence

        except Exception as e:
            print(f"DL Prediction error: {e}")
            return "Error", 0.0

# Singleton helper
def predict_dl(text):
    clf = DLModel()
    return clf.predict(text)
>>>>>>> model-svm
