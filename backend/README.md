# NLP Classifier Backend

This directory contains the Python Flask backend for the NLP Classifier application.

## Structure

-   `app.py`: Main Flask application entry point.
-   `models/`: Directory containing model logic.
    -   `ml_model.py`: Placeholder for Machine Learning model (SVM, etc.).
    -   `dl_model.py`: Placeholder for Deep Learning model (LSTM, etc.).

## Setup

1.  **Create a virtual environment** (optional but recommended):
    ```bash
    python -m venv venv
    # Windows
    venv\Scripts\activate
    # Mac/Linux
    source venv/bin/activate
    ```

2.  **Install dependencies**:
    ```bash
    pip install -r requirements.txt
    ```

3.  **Run the server**:
    ```bash
    python app.py
    ```
    The server will start at `http://localhost:5000`.

## API Endpoints

### `POST /predict`

Accepts JSON body:
```json
{
  "text": "Text to classify...",
  "model": "ml" // or "dl"
}
```

Returns JSON:
```json
{
  "category": "Technology",
  "confidence": 0.95
}
```
