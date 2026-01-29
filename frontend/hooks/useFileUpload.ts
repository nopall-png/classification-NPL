import { useState } from "react";

export const useFileUpload = () => {
  const [fileName, setFileName] = useState<string | null>(null);
  const [file, setFile] = useState<File | null>(null);
  const [selectedModel, setSelectedModel] = useState<string>("Choose Model");

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const selectedFile = e.target.files?.[0];
    if (selectedFile) {
      setFileName(selectedFile.name);
      setFile(selectedFile);
    }
  };

  const processFile = () => {
    console.log("Processing:", fileName, "with model:", selectedModel);
  };

  return {
    fileName,
    file,
    handleFileChange,
    processFile,
    selectedModel,
    setSelectedModel,
  };
};
