"use client";

import { useRouter } from "next/navigation";
import { useState, useCallback, useEffect } from "react";
import { motion } from "framer-motion";
import { ChevronLeft } from "lucide-react";
import InputText from "@/components/classification/InputText";
import ClassificationResult from "@/components/classification/ClassificationResult";
import Starfield from "@/components/classification/Starfield";

export default function ClassificationPage() {
  const router = useRouter();
  const [text, setText] = useState("");
  const [category, setCategory] = useState("");
  const [confidence, setConfidence] = useState(0);
  const [entities, setEntities] = useState([]);
  const [highlightText, setHighlightText] = useState("");
  const [fileName, setFileName] = useState("");

  const onBackClick = useCallback(() => {
    router.push("/");
  }, [router]);

  useEffect(() => {
    // Retrieve result from sessionStorage
    const storedResult = sessionStorage.getItem("classificationResult");
    if (storedResult) {
      try {
        const result = JSON.parse(storedResult);
        setText(result.text || "");
        setCategory(result.category || "Unknown");
        setConfidence(result.confidence || 0);
        setEntities(result.entities || []);
        setFileName(result.fileName || "Unknown File");
      } catch (e) {
        console.error("Failed to parse result", e);
      }
    } else {
      // Optional: Redirect back if no result? 
      // For now, let's keep it empty or mock it for dev
    }
  }, []);

  return (
    <div className="relative min-h-screen bg-[#0B0B0F] text-white p-6 overflow-hidden">
      {/* BACKGROUND */}
      <Starfield speed={0.05} starCount={500} />

      <div className="relative z-10 max-w-6xl mx-auto">

        {/* ===== TOP BAR ===== */}
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, ease: "easeOut" }}
          className="relative pb-10 pt-4"
        >

          {/* BACK — LEFT CORNER */}
          <button
            onClick={onBackClick}
            className="absolute left-0 top-1 flex items-center gap-2 text-white/50 hover:text-white transition-colors group"
          >
            <div className="p-1.5 rounded-full bg-white/5 group-hover:bg-white/10 transition-colors">
              <ChevronLeft size={18} />
            </div>
            <span className="text-sm font-medium">Back to Upload</span>
          </button>

          {/* CENTER TITLE */}
          <div className="text-center">
            <h1 className="text-[32px] font-semibold leading-tight tracking-tight">
              Classification Complete
            </h1>
            <p className="text-sm text-white/40 mt-2 font-medium">
              Analyzed using Machine Learning model
            </p>
          </div>
        </motion.div>

        {/* ===== MAIN ===== */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 pt-4 max-w-[1400px] mx-auto">
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5, delay: 0.1, ease: "easeOut" }}
          >
            <InputText value={text} onChange={setText} fileName={fileName} highlightText={highlightText} />
          </motion.div>

          <motion.div
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5, delay: 0.2, ease: "easeOut" }}
          >
            <ClassificationResult
              category={category}
              confidence={confidence}
              entities={entities}
              onEntityClick={(val) => setHighlightText(val)}
            />
          </motion.div>
        </div>
      </div>
    </div>
  );
}
