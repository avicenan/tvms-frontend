"use client";

import type React from "react";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Loader2 } from "lucide-react";
import { ImageUploader } from "./image-uploader";
import { DetectedInfo } from "./detected-info";
// import { processViolationImage } from "./process-image";
import { toast } from "sonner";
import { ocrApi } from "@/lib/ocrApi";
import { reportViolation } from "@/lib/reportViolationApi";

export type ViolationType = "speeding" | "parking" | "red-light" | "other";

export interface DetectedViolationInfo {
  plateNumber: string;
  violationType: ViolationType | "";
  confidence: number;
  timestamp: string;
  location?: string;
}

export function ViolationReportForm() {
  const [imageUrl, setImageUrl] = useState<string>("");
  const [imageFile, setImageFile] = useState<File | null>(null);
  const [numberImageFile, setNumberImageFile] = useState<File | null>(null);
  const [isProcessing, setIsProcessing] = useState(false);
  const [detectedInfo, setDetectedInfo] = useState<DetectedViolationInfo | null>(null);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [additionalNotes, setAdditionalNotes] = useState("");

  const handleImageUpload = (imageDataUrl: string, file: File) => {
    setImageUrl(imageDataUrl);
    setImageFile(file);
    setDetectedInfo(null);
  };

  const handleProcessImage = async () => {
    if (!imageUrl || !imageFile) {
      toast.error("Please upload an image first");
      return;
    }

    setIsProcessing(true);

    try {
      const formData = new FormData();
      formData.append("file", imageFile);

      // console.log("FormData contents:");
      // for (let [key, value] of formData.entries()) {
      //   console.log(key, value);
      // }

      const result = await ocrApi.detect(formData);
      console.log(result.data.local_result);
      setDetectedInfo({
        plateNumber: result.data.local_result.number,
        violationType: "",
        confidence: 0.3,
        timestamp: new Date(new Date().getTime() + 7 * 60 * 60 * 1000).toISOString().slice(0, 16),
        location: "Jl. Raya",
      });
    } catch (error: any) {
      console.error("Full error:", error);
      console.error("Error response:", error.response?.data);
      toast.error("Gagal memproses foto", {
        description: error.response?.data?.message || error.message || (error as string),
      });
    } finally {
      setIsProcessing(false);
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!detectedInfo || !numberImageFile) {
      toast.error("Please process the image first");
      return;
    }

    if (!imageFile) {
      toast.error("Please upload an image first");
      return;
    }

    try {
      setIsSubmitting(true);
      const formData = new FormData();
      formData.append("number", detectedInfo.plateNumber);
      formData.append("stream_key", "1234567890");
      formData.append("violation_evidence", imageFile);
      formData.append("number_evidence", imageFile);

      const response = await reportViolation(formData);
      console.log(response);
      setIsSubmitted(true);
    } catch (error) {
      console.error(error);
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleReset = () => {
    setImageUrl("");
    setImageFile(null);
    setNumberImageFile(null);
    setDetectedInfo(null);
    setAdditionalNotes("");
    setIsSubmitted(false);
  };

  if (isSubmitted) {
    return (
      <Card>
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
          <Button onClick={handleReset} className="cursor-pointer">
            Kirim Laporan Lain
          </Button>
        </CardFooter>
      </Card>
    );
  }

  return (
    <form onSubmit={handleSubmit} className="w-full grid grid-cols-1 md:grid-cols-5 md:gap-4 gap-2">
      <Card className="md:col-span-3">
        <CardHeader>
          <CardTitle>Unggah Foto Pelanggaran</CardTitle>
        </CardHeader>
        <CardContent>
          <ImageUploader onImageUpload={handleImageUpload} currentImage={imageUrl} />

          {imageUrl && !detectedInfo && (
            <div className="mt-4">
              <Button type="button" onClick={handleProcessImage} disabled={isProcessing} className="cursor-pointer">
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

      {detectedInfo && (
        <div className="md:col-span-2 space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>Hasil Identifikasi</CardTitle>
            </CardHeader>
            <CardContent className="flex flex-col gap-4">
              <img src={imageUrl} alt="Violation Evidence" className="w-full max-h-[200px] object-contain bg-gray-100 border border-gray-200 rounded-lg" />
              <DetectedInfo detectedInfo={detectedInfo} onInfoChange={setDetectedInfo} />
            </CardContent>
            <CardFooter>
              <Button type="submit" disabled={isSubmitting} className="cursor-pointer">
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
          {/* <Card>
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
              <Button type="submit" disabled={isSubmitting} className="cursor-pointer">
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
          </Card> */}
        </div>
      )}
    </form>
  );
}
