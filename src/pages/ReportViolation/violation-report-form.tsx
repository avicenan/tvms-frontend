"use client";

import type React from "react";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
// import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Loader2 } from "lucide-react";
import { ImageUploader } from "./image-uploader";
import { DetectedInfo } from "./detected-info";
import { processViolationImage } from "./process-image";

export type ViolationType = "speeding" | "parking" | "red-light" | "other";

export interface DetectedViolationInfo {
  plateNumber: string;
  violationType: ViolationType;
  confidence: number;
  timestamp: string;
  location?: string;
}

export function ViolationReportForm() {
  const [image, setImage] = useState<string | null>(null);
  const [isProcessing, setIsProcessing] = useState(false);
  const [detectedInfo, setDetectedInfo] = useState<DetectedViolationInfo | null>(null);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [additionalNotes, setAdditionalNotes] = useState("");

  const handleImageUpload = (imageDataUrl: string) => {
    setImage(imageDataUrl);
    setDetectedInfo(null);
  };

  const handleProcessImage = async () => {
    if (!image) return;

    setIsProcessing(true);

    try {
      // Dalam aplikasi sungguhan, ini akan memanggil API untuk memproses gambar
      const result = await processViolationImage();
      setDetectedInfo(result);
    } catch (error) {
      console.error("Error processing image:", error);
    } finally {
      setIsProcessing(false);
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!detectedInfo) return;

    setIsSubmitting(true);

    // Mensimulasikan panggilan API untuk mengirimkan laporan
    // Di aplikasi nyata, Anda akan mengirimkan detectedInfo dan additionalNotes
    console.log("Submitting report:", { ...detectedInfo, additionalNotes });
    await new Promise((resolve) => setTimeout(resolve, 1500));

    setIsSubmitted(true);
    setIsSubmitting(false);
  };

  const handleReset = () => {
    setImage(null);
    setDetectedInfo(null);
    setAdditionalNotes("");
    setIsSubmitted(false);
  };

  if (isSubmitted) {
    return (
      <Card className="">
        <CardHeader>
          <CardTitle>Laporan Berhasil Dikirim</CardTitle>
        </CardHeader>
        <CardContent>
          <p className="mb-4">Terima kasih telah mengirimkan laporan pelanggaran lalu lintas Anda. Laporan Anda telah diterima dan akan diproses.</p>
          <p className="mb-4">
            Nomor referensi: <strong>{Math.random().toString(36).substring(2, 10).toUpperCase()}</strong>
          </p>
        </CardContent>
        <CardFooter>
          <Button onClick={handleReset}>Kirim Laporan Lain</Button>
        </CardFooter>
      </Card>
    );
  }

  return (
    <form onSubmit={handleSubmit} className="w-full grid grid-cols-1 md:grid-cols-3 md:gap-4 gap-2">
      <Card className=" col-span-2">
        <CardHeader>
          <CardTitle>Unggah Foto Pelanggaran</CardTitle>
        </CardHeader>
        <CardContent>
          <ImageUploader onImageUpload={handleImageUpload} currentImage={image} />

          {image && !detectedInfo && (
            <div className="mt-4">
              <Button type="button" onClick={handleProcessImage} disabled={isProcessing}>
                {isProcessing ? (
                  <>
                    <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                    Mengidentifikasi foto...
                  </>
                ) : (
                  "Proses Foto"
                )}
              </Button>
            </div>
          )}
        </CardContent>
      </Card>

      <div className="col-span-1 space-y-4">
        {detectedInfo && (
          <Card>
            <CardHeader>
              <CardTitle>Hasil Identifikasi</CardTitle>
            </CardHeader>
            <CardContent>
              <DetectedInfo detectedInfo={detectedInfo} onInfoChange={setDetectedInfo} />
            </CardContent>
          </Card>
        )}

        {detectedInfo && (
          <Card>
            <CardHeader>
              <CardTitle>Informasi Lainnya</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid gap-4">
                <div className="grid gap-2">
                  <Label htmlFor="additional-notes">Catatan Tambahan</Label>
                  <Textarea id="additional-notes" placeholder="Berikan detail tambahan mengenai pelanggaran" rows={4} value={additionalNotes} onChange={(e) => setAdditionalNotes(e.target.value)} />
                </div>
              </div>
            </CardContent>
            <CardFooter>
              <Button type="submit" disabled={isSubmitting}>
                {isSubmitting ? (
                  <>
                    <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                    Mengirim...
                  </>
                ) : (
                  "Kirim Laporan"
                )}
              </Button>
            </CardFooter>
          </Card>
        )}
      </div>
    </form>
  );
}
