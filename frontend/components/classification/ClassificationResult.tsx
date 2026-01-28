"use client";

import { Brain, Sparkles } from "lucide-react";
import { cn } from "@/lib/utils";

interface ClassificationResultProps {
  category: string;
  confidence: number;
}

export default function ClassificationResult({ category, confidence }: ClassificationResultProps) {
  const percentage = Math.round(confidence * 100);

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
        <div className="flex-1 flex flex-col items-center justify-center gap-10 text-center relative overflow-hidden">

          {/* Background Gradient Blob */}
          <div className="absolute inset-0 flex items-center justify-center pointer-events-none opacity-20">
            <div className="w-[300px] h-[300px] bg-white rounded-full blur-[120px]" />
          </div>

          {/* CLASSIFIED AS */}
          <div className="flex flex-col items-center gap-4 relative z-10">
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
          <div className="flex flex-col items-center gap-4 w-[280px] relative z-10">
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
        </div>
      </div>
    </div>
  );
}
