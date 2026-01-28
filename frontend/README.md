# AI News Analyzer 🚀

A sophisticated web application for classifying news text and audio using advanced Machine Learning and Deep Learning models.
Built with a focus on premium aesthetics, using a "Space/Glass" theme with interactive WebGL backgrounds.

## ✨ Features

-   **Multi-Modal Input**:
    -   Drag & Drop file upload (CSV, PDF, TXT).
    -   Audio file support (MP3) with playback.
    -   **Direct Voice Recording** capabilities.
-   **Advanced UI/UX**:
    -   **Glassmorphism Design**: Sleek, transparent UI elements with blur effects.
    -   **Interactive Backgrounds**:
        -   *Home*: Connecting "Threads" representing neural networks/constellations.
        -   *Result*: "Starfield" warp effect representing deep space processing.
    -   **Smooth Animations**: powered by Framer Motion.
-   **AI Classification**:
    -   Support for multiple models (Machine Learning / Deep Learning).
    -   Real-time confidence scoring and category prediction.

## 🛠️ Tech Stack

-   **Framework**: [Next.js 15](https://nextjs.org/) (App Router)
-   **Language**: TypeScript
-   **Styling**: Tailwind CSS
-   **Animations**: Framer Motion
-   **WebGL/3D**: [OGL](https://github.com/oframe/ogl) (Lightweight WebGL library)
-   **Icons**: Lucide React

## 🚀 Getting Started

1.  **Clone the repository**
    ```bash
    git clone https://github.com/nopall-png/classification-NPL.git
    cd classification-NPL
    ```

2.  **Install dependencies**
    ```bash
    npm install
    ```

3.  **Run the development server**
    ```bash
    npm run dev
    ```

4.  **Open the app**
    Navigate to [http://localhost:3000](http://localhost:3000) to see the application in action.

## 📂 Project Structure

```bash
├── app/
│   ├── page.tsx                 # Home Page (Upload)
│   ├── classification/
│   │   └── page.tsx             # Result Page
│   └── layout.tsx               # Root Layout
├── components/
│   ├── home/                    # Home Page Components
│   │   ├── Hero.tsx
│   │   ├── UploadBar.tsx
│   │   └── Threads.tsx
│   └── classification/          # Classification Page Components
│       ├── ClassificationResult.tsx
│       ├── InputText.tsx
│       └── Starfield.tsx
├── hooks/                       # Custom React Hooks
└── lib/                         # Utilities
```
