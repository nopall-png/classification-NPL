"use client";

import { Brain, Sparkles, Tag } from "lucide-react";
import { cn } from "@/lib/utils";

interface Entity {
  text: string;
  label: string;
}

interface ClassificationResultProps {
  category: string;
  confidence: number;
  entities?: Entity[];
  onEntityClick?: (text: string) => void;
}

export default function ClassificationResult({ category, confidence, entities = [], onEntityClick }: ClassificationResultProps) {
  const percentage = Math.round(confidence * 100);

  // Helper to color code entities - uniform gray with glow as requested
  const getEntityColor = (label: string) => {
    // We'll use a subtle distinction or just uniform glowing gray
    return "bg-white/10 text-white/90 border-white/20 shadow-[0_0_10px_rgba(255,255,255,0.1)] hover:bg-white/20 hover:shadow-[0_0_15px_rgba(255,255,255,0.2)] hover:border-white/40 cursor-pointer active:scale-95";
  };

  return (
    <div className="w-full flex justify-end">
      <div
        className={cn(
          "w-full max-w-[628px] h-[655px]",
          "rounded-3xl",
          "bg-black/30 backdrop-blur-md", // Transparent Glass Theme
          "border border-white/10",
          "shadow-[0_30px_60px_-15px_rgba(0,0,0,0.6)]",
          "flex flex-col overflow-hidden"
        )}
      >
        {/* ===== HEADER ===== */}
        <div className="h-[64px] px-8 flex items-center justify-center gap-3 border-b border-white/10 relative">
          <div className="absolute left-8 p-2 rounded-lg bg-white/5 text-white/70">
            <Brain size={18} />
          </div>
          <span className="uppercase tracking-widest text-xs font-semibold text-white/40 text-center">
            Predicted News Category
          </span>
        </div>

        {/* ===== BODY ===== */}
        <div className="flex-1 flex flex-col items-center py-10 gap-8 text-center relative overflow-y-auto custom-scrollbar">

          {/* Background Gradient Blob */}
          <div className="absolute inset-0 flex items-center justify-center pointer-events-none opacity-20 sticky top-0">
            <div className="w-[300px] h-[300px] bg-white rounded-full blur-[120px]" />
          </div>

          {/* CLASSIFIED AS */}
          <div className="flex flex-col items-center gap-4 relative z-10 shrink-0">
            <div className="flex items-center gap-2 px-4 py-1.5 rounded-full bg-white/5 border border-white/10">
              <Sparkles size={12} className="text-white/60" />
              <span className="uppercase tracking-wider text-[10px] font-bold text-white/60">
                Classified Result
              </span>
            </div>

            {/* CATEGORY */}
            <div className="relative font-space-grotesk text-[64px] font-bold leading-tight tracking-tight">
              <span
                className="
                  bg-gradient-to-b from-white to-white/40
                  bg-clip-text text-transparent
                "
              >
                {category || "Unknown"}
              </span>
            </div>
          </div>

          {/* CONFIDENCE */}
          <div className="flex flex-col items-center gap-4 w-[280px] relative z-10 shrink-0">
            {/* progress bar */}
            <div className="w-full h-[6px] rounded-full bg-white/5 overflow-hidden border border-white/5">
              <div
                className="h-full rounded-full bg-white shadow-[0_0_15px_rgba(255,255,255,0.5)] transition-all duration-1000 ease-out"
                style={{ width: `${percentage}%` }}
              />
            </div>
            <div className="flex items-center gap-2 text-sm text-white/60 font-medium">
              <span>Confidence:</span>
              <span className="text-white">{percentage}%</span>
            </div>
          </div>

          {/* NER SECTION */}
          {entities && entities.length > 0 && (
            <div className="w-full px-8 mt-4 flex flex-col items-center gap-4 relative z-10">
              <div className="w-full h-px bg-white/5" />

              <div className="flex items-center gap-2 text-white/40">
                <Tag size={14} />
                <span className="text-xs font-semibold tracking-wider uppercase">Detected Entities</span>
              </div>

              <div className="flex flex-wrap justify-center gap-2">
                {entities.map((entity, idx) => (
                  <button
                    key={`${entity.text}-${idx}`}
                    onClick={() => onEntityClick?.(entity.text)}
                    className={cn(
                      "flex items-center gap-2 px-3 py-1.5 rounded-lg border text-xs font-medium transition-all duration-200",
                      getEntityColor(entity.label)
                    )}
                    title={`Click to find "${entity.text}" in text`}
                  >
                    <span>{entity.text}</span>
                    <span className="opacity-50 text-[10px] uppercase tracking-wide border-l border-white/20 pl-2 ml-1">
                      {entity.label}
                    </span>
                  </button>
                ))}
              </div>
            </div>
          )}

        </div>
      </div>
    </div>
  );
}
