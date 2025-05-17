"use client";

import type React from "react";

import { useState, useRef } from "react";
import { Button } from "@/components/ui/button";
import { Upload, X } from "lucide-react";

interface ImageUploaderProps {
  onImageUpload: (imageDataUrl: string) => void;
  currentImage: string | null;
}

export function ImageUploader({ onImageUpload, currentImage }: ImageUploaderProps) {
  const [isDragging, setIsDragging] = useState(false);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleDragOver = (e: React.DragEvent) => {
    e.preventDefault();
    setIsDragging(true);
  };

  const handleDragLeave = () => {
    setIsDragging(false);
  };

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault();
    setIsDragging(false);

    if (e.dataTransfer.files && e.dataTransfer.files[0]) {
      handleFile(e.dataTransfer.files[0]);
    }
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      handleFile(e.target.files[0]);
    }
  };

  const handleFile = (file: File) => {
    if (!file.type.match("image.*")) {
      alert("Please select an image file");
      return;
    }

    const reader = new FileReader();
    reader.onload = (e) => {
      if (e.target && typeof e.target.result === "string") {
        onImageUpload(e.target.result);
      }
    };
    reader.readAsDataURL(file);
  };

  const handleRemoveImage = () => {
    onImageUpload("");
    if (fileInputRef.current) {
      fileInputRef.current.value = "";
    }
  };

  return (
    <div className="w-full">
      {!currentImage ? (
        <div className={`border-2 border-dashed rounded-lg p-6 text-center ${isDragging ? "border-primary bg-primary/5" : "border-gray-300"}`} onDragOver={handleDragOver} onDragLeave={handleDragLeave} onDrop={handleDrop}>
          <Upload className="mx-auto h-12 w-12 text-gray-400" />
          <p className="mt-2 text-sm text-gray-600">
            Tarik dan lepas gambar, atau{" "}
            <Button type="button" variant="link" className="p-0 h-auto text-primary" onClick={() => fileInputRef.current?.click()}>
              Cari
            </Button>
          </p>
          <p className="mt-1 text-xs text-gray-500">Format yang didukung: JPG, PNG, GIF</p>
          <input type="file" className="hidden" accept="image/*" ref={fileInputRef} onChange={handleFileChange} />
        </div>
      ) : (
        <div className="relative">
          <img src={currentImage || "/placeholder.svg"} alt="Uploaded violation" className="w-full rounded-lg object-contain max-h-[400px]" />
          <Button type="button" variant="destructive" size={"icon"} className="absolute top-2 right-2" onClick={handleRemoveImage}>
            <X className="h-4 w-4" />
          </Button>
        </div>
      )}
    </div>
  );
}
