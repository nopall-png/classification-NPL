import { useState } from "react";

export const useFileUpload = () => {
  const [fileName, setFileName] = useState<string | null>(null);
  const [selectedModel, setSelectedModel] = useState<string>("Choose Model");

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) setFileName(file.name);
  };

  const processFile = () => {
    console.log("Processing:", fileName, "with model:", selectedModel);
  };

  return {
    fileName,
    handleFileChange,
    processFile,
    selectedModel,
    setSelectedModel,
  };
};
