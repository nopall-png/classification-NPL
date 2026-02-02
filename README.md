# NLP News Classifier & Entity Extractor 🤖

A sophisticated web application for classifying news text and audio using advanced **Machine Learning (SVM)** and **Deep Learning (LSTM)** models. It also features **Named Entity Recognition (NER)** to extract key information like names, organizations, and dates.

Built with a focus on premium aesthetics ("Glassmorphism"), featuring interactive WebGL backgrounds and a seamless user experience.

---

## ✨ Features

-   **Dual-Model AI Engine**:
    -   **Classic ML**: Support Vector Machine (SVM) with interactive confidence scoring.
    -   **Deep Learning**: LSTM (Long Short-Term Memory) network for robust text classification.
-   **Named Entity Recognition (NER)**:
    -   Automatically identifies and highlights entities (Person, Org, GPE, etc.) in the text.
    -   Interactive UI: Click an entity pill to find it in the text.
-   **Multi-Modal Input**:
    -   **Text**: Direct input or file upload (TXT).
    -   **Document**: PDF text extraction.
    -   **Audio**: MP3/WAV/WebM support with speech-to-text transcription.
-   **Premium UI/UX**:
    -   **Glassmorphism**: Sleek, transparent aesthetic.
    -   **Visualizations**: Dynamic "Threads" and "Starfield" backgrounds using WebGL.

---

## 📂 Project Structure

```bash
├── backend/                 # Flask API & AI Models
│   ├── models/              # Saved Models (.pkl, .h5) & Model Wrappers
│   ├── uploads/             # Temp folder for file processing
│   ├── app.py               # Main Flask Application
│   ├── utils.py             # Helper functions (PDF, Audio, NER)
│   └── requirements.txt     # Python Dependencies
├── frontend/                # Next.js 15 Frontend
│   ├── app/                 # App Router (Pages)
│   ├── components/          # UI Components
│   └── ...config files      # Tailwind, etc.
└── notebooks/               # Jupyter Notebooks for Training
    ├── LSTM.ipynb           # Deep Learning Model Training
    └── gadatechtpibanyak.ipynb # Machine Learning (SVM) Training
```

---

## 🚀 Getting Started

### 1. Backend Setup (Flask API)

The backend handles the AI processing (Classification, NER, Speech-to-Text).

**Prerequisites:**
-   Python 3.8+
-   FFmpeg (included in `backend/bin` or installed system-wide for audio support)

**Installation:**

1.  Navigate to the `backend` folder:
    ```bash
    cd backend
    ```

2.  Create and activate a virtual environment (optional but recommended):
    ```bash
    python -m venv venv
    # Windows
    venv\Scripts\activate
    # Mac/Linux
    source venv/bin/activate
    ```

3.  Install dependencies:
    ```bash
    pip install -r requirements.txt
    ```

4.  Download the spaCy NER model:
    ```bash
    python -m spacy download en_core_web_sm
    ```

5.  Run the Server:
    ```bash
    python app.py
    ```
    *The backend will start at `http://localhost:5000`*

---

### 2. Frontend Setup (Next.js)

The frontend provides the interactive user interface.

**Prerequisites:**
-   Node.js 18+

**Installation:**

1.  Navigate to the `frontend` folder (open a new terminal):
    ```bash
    cd frontend
    ```

2.  Install dependencies:
    ```bash
    npm install
    ```

3.  Run the Development Server:
    ```bash
    npm run dev
    ```

4.  **Open the App**:
    Access [http://localhost:3000](http://localhost:3000) in your browser.

---

## 🧠 AI Models

### Switching Models
The application intelligently switches models based on configuration (defaulting to SVM for speed). 
-   **SVM (Machine Learning)**: Fast, effective for clear-cut categories. Trained on TF-IDF vectors.
-   **LSTM (Deep Learning)**: Better at understanding context and sequence. Configured via the `dl_model.py`.

### Training Your Own Models
If you want to retrain the models:
1.  Go to the `notebooks/` directory.
2.  Place your dataset (`archive.zip` or JSON/CSV).
3.  Run `LSTM.ipynb` for the Deep Learning model.
4.  Run `gadatechtpibanyak.ipynb` for the SVM model.
5.  **Important**: Move the generated `.h5` or `.pkl` files to `backend/models/`.

---

## 🛠️ Tech Stack

-   **Frontend**: Next.js 15, TypeScript, Tailwind CSS, Framer Motion, OGL (WebGL).
-   **Backend**: Flask, TensorFlow/Keras, Scikit-learn, spaCy, PyDub, SpeechRecognition.

---

## 📝 Troubleshooting

-   **FFmpeg Error**: If audio transcription fails, ensure FFmpeg is installed or the `backend/bin` folder allows execution.
-   **Model Not Found**: Make sure you have run the notebooks to generate models and moved them to `backend/models/`.
