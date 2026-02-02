"use client";

import { useRef, useEffect } from "react";
import { FileText } from "lucide-react";
import { cn } from "@/lib/utils";
import { useEffect, useRef } from "react";

interface InputTextProps {
  value: string;
  onChange: (value: string) => void;
  fileName?: string;
  highlightText?: string;
}

export default function InputText({ value, onChange, fileName, highlightText }: InputTextProps) {
  const textareaRef = useRef<HTMLTextAreaElement>(null);

<<<<<<< HEAD
  // Determine file type based on extension
  const getFileType = (name: string) => {
    if (!name) return "TEXT INPUT";
    const lower = name.toLowerCase();
    if (lower.endsWith('.pdf')) return "PDF DOCUMENT";
    if (lower.endsWith('.txt')) return "TEXT FILE";
    if (lower.endsWith('.csv')) return "CSV DATA";
    if (lower.endsWith('.mp3') || lower.endsWith('.wav') || lower.endsWith('.webm')) return "AUDIO TRANSCRIPT";
    return "TEXT CONTENT";
  };

  const fileType = getFileType(fileName || "");

  // Handle highlighting
  useEffect(() => {
    if (highlightText && textareaRef.current && value) {
      const index = value.toLowerCase().indexOf(highlightText.toLowerCase());
      if (index !== -1) {
        const textarea = textareaRef.current;
        textarea.focus();
        textarea.setSelectionRange(index, index + highlightText.length);

        // Try to scroll to selection
        const lines = value.substr(0, index).split("\n").length;
        const lineHeight = 24; // Approximation based on CSS
        const scrollPos = (lines - 1) * lineHeight;

        // This is a simple approximation, better way might be via blur/focus trick or scrollIntoView if supported
        textarea.blur();
        textarea.focus();
=======
  // Highlight text logic
  useEffect(() => {
    if (highlightText && textareaRef.current && value) {
      const index = value.toLowerCase().indexOf(highlightText.toLowerCase());
      if (index >= 0) {
        textareaRef.current.focus();
        textareaRef.current.setSelectionRange(index, index + highlightText.length);
>>>>>>> model-svm
      }
    }
  }, [highlightText, value]);

  return (
    <div className="w-full flex justify-start">
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
        <div className="h-[64px] px-8 flex items-center gap-3 border-b border-white/10">
          <div className="p-2 rounded-lg bg-white/5 text-white/70">
            <FileText size={18} />
          </div>
          <span className="uppercase tracking-widest text-xs font-semibold text-white/40">
            Content Input
          </span>
        </div>

        {/* ===== BODY (SCROLL AREA) ===== */}
        <div className="flex-1 px-8 py-6 overflow-y-auto space-y-6">

          {/* META */}
          <div className="flex items-center justify-between">
            <div>
              <div className="text-white font-space-grotesk text-xl font-semibold">
<<<<<<< HEAD
                {fileType}
              </div>
              <div className="text-xs text-white/40 mt-1 font-medium">
                Source: {fileName || "Direct Input"}
=======
                {fileName ? fileName : "text input"}
              </div>
              <div className="text-xs text-white/40 mt-1 font-medium">
                {fileName ? "Source File" : "Direct Input"}
>>>>>>> model-svm
              </div>
            </div>
            <div className="px-3 py-1 rounded-full bg-white/5 border border-white/10 text-[10px] text-white/40 font-mono uppercase">
              Read Only
            </div>
          </div>

          {/* TEXTAREA */}
          <textarea
            ref={textareaRef}
            value={value}
            onChange={(e) => onChange(e.target.value)}
            placeholder="Extracted text will appear here..."
            className="
              w-full h-[460px] resize-none rounded-xl
              bg-white/5 
              border border-white/5
              p-5 text-sm text-white/80 leading-relaxed
              placeholder:text-white/20
              focus:outline-none focus:border-white/20 focus:bg-white/10
              transition-all duration-300
              overflow-y-auto custom-scrollbar
              selection:bg-white/30 selection:text-white
            "
          />
        </div>
      </div>
    </div>
  );
}
