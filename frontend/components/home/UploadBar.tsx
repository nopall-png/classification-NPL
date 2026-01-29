"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { motion, AnimatePresence } from "framer-motion";
import {
  FileText,
  Mic,
  Send,
  ChevronDown,
  Monitor,
  Cpu,
  Music,
  FileSpreadsheet,
  File as FileIcon
} from "lucide-react";
import { useFileUpload } from "@/hooks/useFileUpload";
import { useRecorder } from "@/hooks/useRecorder";
import { cn } from "@/lib/utils";

const UploadBar = () => {
  const router = useRouter();
  const [isDragging, setIsDragging] = useState(false);

  const {
    fileName,
    file,
    handleFileChange,
    selectedModel,
    setSelectedModel,
  } = useFileUpload();

  const { recording, audioFile, startRecording, stopRecording } = useRecorder();
  const [open, setOpen] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  // VALIDATION
  const hasFile = file || audioFile;
  const hasModel = selectedModel && selectedModel !== "Choose Model";
  const canProceed = hasFile && hasModel && !isLoading;

  const handleSend = async () => {
    if (!canProceed) return;
    setIsLoading(true);

    try {
      const formData = new FormData();
      const fileToSend = file || audioFile;

      if (fileToSend) {
        formData.append("file", fileToSend);
      }

      // Map model name to backend expectation
      const modelParam = selectedModel === "Deep Learning" ? "dl" : "ml";
      formData.append("model", modelParam);

      // Call Backend
      const response = await fetch("http://localhost:5000/predict", {
        method: "POST",
        body: formData,
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.error || "Classification failed");
      }

      const data = await response.json();

      // Save to session storage for the result page
      sessionStorage.setItem("classificationData", JSON.stringify(data));
      sessionStorage.setItem("uploadedFileName", fileToSend?.name || "File");

      router.push("/classification");
    } catch (error) {
      console.error("Error classifying:", error);
      alert("Failed to classify: " + error);
    } finally {
      setIsLoading(false);
    }
  };

  // Drag and Drop Handlers
  const handleDragOver = (e: React.DragEvent) => {
    e.preventDefault();
    setIsDragging(true);
  };

  const handleDragLeave = (e: React.DragEvent) => {
    e.preventDefault();
    setIsDragging(false);
  };

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault();
    setIsDragging(false);

    if (e.dataTransfer.files && e.dataTransfer.files[0]) {
      // Create a synthetic event to reuse existing handler
      const syntheticEvent = {
        target: { files: e.dataTransfer.files }
      } as unknown as React.ChangeEvent<HTMLInputElement>;
      handleFileChange(syntheticEvent);
    }
  };

  const getFileIcon = (name: string | null) => {
    if (!name) return <FileText size={18} />;
    if (name.endsWith('.csv')) return <FileSpreadsheet size={18} />;
    if (name.endsWith('.mp3')) return <Music size={18} />;
    return <FileIcon size={18} />;
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, ease: "easeOut" }}
      className="w-full flex justify-center p-4 text-sm text-[#A0A0A0]"
    >
      <div
        className={cn(
          "flex items-center gap-3 px-4 py-4 rounded-3xl",
          "bg-black/30 backdrop-blur-md", // Transparent Glass Theme
          "border border-white/10 shadow-[0_10px_40px_rgba(0,0,0,0.4)]",
          "w-full max-w-[950px]",
          "transition-all duration-300"
        )}
      >
        {/* ================= UPLOAD ================= */}
        <motion.div
          whileHover={{ scale: 1.01 }}
          whileTap={{ scale: 0.99 }}
          onDragOver={handleDragOver}
          onDragLeave={handleDragLeave}
          onDrop={handleDrop}
          className={cn(
            "flex-1 min-w-[180px] h-[52px] rounded-2xl relative",
            "border border-dashed transition-all duration-300",
            "flex items-center pl-4 gap-3 overflow-hidden cursor-pointer",
            isDragging
              ? "bg-white/10 border-white/50 text-white"
              : "bg-white/5 border-white/20 hover:bg-white/10 hover:border-white/30"
          )}
        >
          <input
            type="file"
            accept=".txt,.csv,.pdf,.mp3,.wav"
            id="fileUpload"
            className="hidden"
            onChange={(e) => {
              handleFileChange(e);
              e.target.value = "";
            }}
          />

          <label
            htmlFor="fileUpload"
            className="flex items-center gap-3 w-full h-full cursor-pointer z-10"
          >
            <span className={cn(
              "p-1.5 rounded-lg transition-colors",
              hasFile ? "bg-white/20 text-white" : "bg-white/5 text-white/60"
            )}>
              {getFileIcon(file?.name || audioFile?.name || null)}
            </span>

            <span className="truncate flex items-center gap-2 select-none">
              <AnimatePresence mode="wait">
                {recording ? (
                  <motion.div
                    key="recording"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    className="flex items-center gap-1"
                  >
                    {[1, 2, 3, 4, 5].map((i) => (
                      <motion.div
                        key={i}
                        className="w-[3px] bg-white rounded-full"
                        animate={{ height: [6, 14, 6] }}
                        transition={{
                          repeat: Infinity,
                          duration: 0.8,
                          delay: i * 0.1,
                          ease: "easeInOut"
                        }}
                      />
                    ))}
                    <span className="ml-2 text-white font-medium">Recording...</span>
                  </motion.div>
                ) : (
                  <motion.span
                    key="text"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    className={cn(hasFile && "text-white font-medium")}
                  >
                    {(audioFile?.name || file?.name) || "Upload TXT, CSV, PDF, MP3"}
                  </motion.span>
                )}
              </AnimatePresence>
            </span>
          </label>
        </motion.div>

        {/* ================= MODEL ================= */}
        <div className="relative flex-shrink-0">
          <motion.button
            whileHover={{ scale: 1.02, backgroundColor: "rgba(255,255,255,0.15)" }}
            whileTap={{ scale: 0.98 }}
            onClick={() => setOpen(!open)}
            className={cn(
              "inline-flex items-center gap-2 h-[52px] px-5 rounded-2xl",
              "bg-white/10 backdrop-blur-md border border-white/10",
              "transition-colors duration-200 outline-none",
              open && "bg-white/20 border-white/30"
            )}
          >
            <span className={cn(
              "whitespace-nowrap font-medium",
              selectedModel !== "Choose Model" ? "text-white" : "text-white"
            )}>
              {selectedModel}
            </span>
            <motion.div
              animate={{ rotate: open ? 180 : 0 }}
              transition={{ duration: 0.2 }}
            >
              <ChevronDown size={14} className="text-white/70" />
            </motion.div>
          </motion.button>

          <AnimatePresence>
            {open && (
              <motion.div
                initial={{ opacity: 0, y: 10, scale: 0.95 }}
                animate={{ opacity: 1, y: 0, scale: 1 }}
                exit={{ opacity: 0, y: 10, scale: 0.95 }}
                transition={{ duration: 0.2 }}
                className="absolute right-0 top-[60px] bg-[#1a1a1a]/95 backdrop-blur-2xl
                border border-white/10 rounded-2xl shadow-2xl z-50 overflow-hidden min-w-[220px]"
              >
                {/* ML */}
                <motion.div
                  whileHover={{ backgroundColor: "rgba(255,255,255,0.08)" }}
                  onClick={() => {
                    setSelectedModel("Machine Learning");
                    setOpen(false);
                  }}
                  className="p-4 cursor-pointer group"
                >
                  <div className="flex items-center gap-3">
                    <div className="p-2 rounded-lg bg-white/10 text-white group-hover:bg-white/20 transition-colors">
                      <Cpu size={18} />
                    </div>
                    <div>
                      <div className="text-white font-medium group-hover:text-white transition-colors">Machine Learning</div>
                      <div className="text-xs text-[#666] mt-0.5 group-hover:text-[#888]">
                        SVM Classifier
                      </div>
                    </div>
                  </div>
                </motion.div>

                {/* DL */}
                <motion.div
                  whileHover={{ backgroundColor: "rgba(255,255,255,0.08)" }}
                  onClick={() => {
                    setSelectedModel("Deep Learning");
                    setOpen(false);
                  }}
                  className="p-4 cursor-pointer border-t border-white/5 group"
                >
                  <div className="flex items-center gap-3">
                    <div className="p-2 rounded-lg bg-white/10 text-white group-hover:bg-white/20 transition-colors">
                      <Monitor size={18} />
                    </div>
                    <div>
                      <div className="text-white font-medium group-hover:text-white transition-colors">Deep Learning</div>
                      <div className="text-xs text-[#666] mt-0.5 group-hover:text-[#888]">
                        LSTM Network
                      </div>
                    </div>
                  </div>
                </motion.div>
              </motion.div>
            )}
          </AnimatePresence>
        </div>

        {/* ================= MIC ================= */}
        <div
          onClick={() => (recording ? stopRecording() : startRecording())}
          className="relative w-[52px] h-[52px] flex items-center justify-center cursor-pointer group"
        >
          <AnimatePresence>
            {recording && (
              <motion.div
                initial={{ scale: 0.8, opacity: 0 }}
                animate={{ scale: 1.5, opacity: 0.5 }}
                exit={{ scale: 0.8, opacity: 0 }}
                transition={{ repeat: Infinity, duration: 1.5, ease: "easeOut" }}
                className="absolute inset-0 bg-red-500/40 rounded-full"
              />
            )}
          </AnimatePresence>

          <motion.div
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.9 }}
            className={cn(
              "absolute inset-0 rounded-full border-2 flex items-center justify-center transition-all duration-300",
              recording
                ? "border-red-500 bg-red-500/20"
                : "border-white/10 bg-white/5 group-hover:border-white/30 group-hover:bg-white/10"
            )}
          >
            <Mic
              size={20}
              className={cn(
                "transition-colors duration-300",
                recording ? "text-red-500" : "text-white"
              )}
            />
          </motion.div>
        </div>

        {/* ================= SEND ================= */}
        <motion.button
          disabled={!canProceed}
          onClick={handleSend}
          whileHover={canProceed ? { scale: 1.05 } : {}}
          whileTap={canProceed ? { scale: 0.95 } : {}}
          className={cn(
            "w-[52px] h-[52px] rounded-full flex items-center justify-center transition-all duration-300",
            canProceed
              ? "bg-white text-black hover:scale-105 shadow-[0_0_20px_rgba(255,255,255,0.3)] cursor-pointer"
              : "bg-white/5 text-white/20 cursor-not-allowed"
          )}
        >
          {isLoading ? (
            <div className="w-5 h-5 border-2 border-black/30 border-t-black rounded-full animate-spin" />
          ) : (
            <Send size={20} className={cn(canProceed && "ml-0.5")} />
          )}
        </motion.button>
      </div>
    </motion.div>
  );
};

export default UploadBar;
