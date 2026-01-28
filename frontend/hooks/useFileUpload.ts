import { useState } from "react";

export const useFileUpload = () => {
  const [file, setFile] = useState<File | null>(null);
  const [fileName, setFileName] = useState<string | null>(null);
  const [selectedModel, setSelectedModel] = useState<string>("Choose Model");

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const selectedFile = e.target.files?.[0];
    if (selectedFile) {
      setFile(selectedFile);
      setFileName(selectedFile.name);
    }
  };

  const processFile = () => {
    console.log("Processing:", fileName, "with model:", selectedModel);
  };

  return {
    file,
    fileName,
    handleFileChange,
    processFile,
    selectedModel,
    setSelectedModel,
  };
};
