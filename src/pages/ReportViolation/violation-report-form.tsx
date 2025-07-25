"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Loader2 } from "lucide-react";
import { ImageUploader } from "./image-uploader";
import { ocrApi } from "@/lib/ocrApi";
import { reportViolation } from "@/lib/reportViolationApi";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm, Controller } from "react-hook-form";
import { z } from "zod";
import { Form, FormField, FormItem, FormLabel, FormControl, FormMessage } from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";

export type ViolationType = "speeding" | "parking" | "red-light" | "other";

export interface DetectedViolationInfo {
  number: string;
  violationType: ViolationType | "";
  confidence: number;
  timestamp: string;
  location: string;
}

const ViolationReportSchema = z.object({
  number: z.string().min(1, "Nomor plat tidak boleh kosong"),
  violationType: z.string().min(1, "Jenis pelanggaran harus dipilih"),
  timestamp: z.string().min(1, "Tanggal & waktu tidak boleh kosong"),
  location: z.string().min(1, "Lokasi pelanggaran tidak boleh kosong"),
  imageFile: z.instanceof(File, { message: "Bukti foto wajib diunggah" }),
});

type ViolationReportFormType = z.infer<typeof ViolationReportSchema>;

export function ViolationReportForm() {
  const form = useForm<ViolationReportFormType>({
    resolver: zodResolver(ViolationReportSchema),
    mode: "onSubmit",
    defaultValues: {
      number: "",
      violationType: "",
      timestamp: new Date(new Date().getTime() + 7 * 60 * 60 * 1000).toISOString().slice(0, 16),
      location: "",
      imageFile: undefined as any,
    },
  });
  const [isProcessing, setIsProcessing] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [isProcessed, setIsProcessed] = useState(false);
  const [submittedData, setSubmittedData] = useState<ViolationReportFormType | null>(null);
  const [decodedNumberEvidence, setDecodedNumberEvidence] = useState<string>("");
  const [numberEvidenceBase64, setNumberEvidenceBase64] = useState<string>("");

  // OCR logic (optional, can be integrated with form.setValue)
  const handleProcessImage = async () => {
    const imageFile = form.getValues("imageFile");
    if (!imageFile) {
      form.setError("imageFile", { message: "Bukti foto wajib diunggah" });
      return;
    }
    setIsProcessing(true);
    try {
      const formData = new FormData();
      formData.append("file", imageFile);
      const result = await ocrApi.detect(formData);

      if (!result || !result.data) {
        form.setValue("number", "Tidak terdeteksi");
        setDecodedNumberEvidence("");
      } else {
        // Handle the OCR response
        if (result.data.number) {
          form.setValue("number", result.data.number);
        } else {
          form.setValue("number", "Tidak terdeteksi");
        }

        // Decode and store number_evidence if it exists in the response
        if (result.data.number_evidence) {
          try {
            // Store the base64 string for form submission
            setNumberEvidenceBase64(result.data.number_evidence);

            // Convert base64 to blob URL for display
            const byteCharacters = atob(result.data.number_evidence);
            const byteNumbers = new Array(byteCharacters.length);
            for (let i = 0; i < byteCharacters.length; i++) {
              byteNumbers[i] = byteCharacters.charCodeAt(i);
            }
            const byteArray = new Uint8Array(byteNumbers);
            const blob = new Blob([byteArray], { type: "image/jpeg" });
            const blobUrl = URL.createObjectURL(blob);
            setDecodedNumberEvidence(blobUrl);
          } catch (error) {
            console.error("Error decoding number_evidence:", error);
            setDecodedNumberEvidence("");
            setNumberEvidenceBase64("");
          }
        } else {
          setDecodedNumberEvidence("");
          setNumberEvidenceBase64("");
        }
      }
      setIsProcessed(true);
    } catch (error) {
      console.error("OCR processing error:", error);
      form.setValue("number", "Tidak terdeteksi");
      setDecodedNumberEvidence("");
    } finally {
      setIsProcessing(false);
    }
  };

  const onSubmit = async (data: ViolationReportFormType) => {
    setIsSubmitting(true);
    try {
      const formData = new FormData();
      formData.append("number", data.number);
      formData.append("violation_evidence", data.imageFile);

      // Send the base64 number_evidence if available, otherwise send the original image
      if (numberEvidenceBase64) {
        // Convert base64 string to blob for FormData
        const byteCharacters = atob(numberEvidenceBase64);
        const byteNumbers = new Array(byteCharacters.length);
        for (let i = 0; i < byteCharacters.length; i++) {
          byteNumbers[i] = byteCharacters.charCodeAt(i);
        }
        const byteArray = new Uint8Array(byteNumbers);
        const numberEvidenceBlob = new Blob([byteArray], { type: "image/jpeg" });
        formData.append("number_evidence", numberEvidenceBlob, "number_evidence.jpg");
      } else {
        formData.append("number_evidence", data.imageFile);
      }

      formData.append("location", data.location);
      await reportViolation(formData);
      setSubmittedData(data);
      setIsSubmitted(true);
    } catch (error) {
      // Optionally set a global error
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleReset = () => {
    form.reset();
    setIsSubmitted(false);
    setIsProcessed(false);
    setDecodedNumberEvidence("");
    setNumberEvidenceBase64("");
  };

  const handleImageUpload = (imageDataUrl: string, file: File | null) => {
    if (file) {
      form.setValue("imageFile", file);
      setDecodedNumberEvidence(imageDataUrl);
    } else {
      // Image was removed - hide the hasil identifikasi section
      form.setValue("imageFile", undefined as any);
      setIsProcessed(false);
      setNumberEvidenceBase64("");
    }
  };

  if (isSubmitted && submittedData) {
    return (
      <Card>
        <CardHeader>
          <CardTitle>Laporan Anda telah diterima dan akan diproses.</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="mb-4 space-y-2">
            <div>
              <strong>Plat Nomor:</strong> {submittedData.number}
            </div>
            <div>
              <strong>Tanggal & Waktu:</strong> {submittedData.timestamp}
            </div>
            <div>
              <strong>Lokasi:</strong> {submittedData.location}
            </div>
          </div>
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
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="w-full grid grid-cols-1 md:grid-cols-5 md:gap-4 gap-2">
        <Card className="md:col-span-3">
          <CardHeader>
            <CardTitle>Unggah Foto Pelanggaran</CardTitle>
          </CardHeader>
          <CardContent>
            <FormField
              control={form.control}
              name="imageFile"
              render={({ field: _ }) => (
                <FormItem>
                  <FormLabel>Bukti Foto</FormLabel>
                  <FormControl>
                    <Controller control={form.control} name="imageFile" render={({ field: { value } }) => <ImageUploader onImageUpload={handleImageUpload} currentImage={value ? URL.createObjectURL(value) : ""} />} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <div className="mt-4">
              {!isProcessed && (
                <Button type="button" onClick={handleProcessImage} disabled={isProcessing} className="cursor-pointer">
                  {isProcessing ? (
                    <>
                      <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                      Mengidentifikasi foto...
                    </>
                  ) : (
                    "Proses"
                  )}
                </Button>
              )}
            </div>
          </CardContent>
        </Card>
        {isProcessed && (
          <div className="md:col-span-2 space-y-4">
            <Card>
              <CardHeader>
                <CardTitle>Hasil Identifikasi</CardTitle>
              </CardHeader>
              <CardContent className="flex flex-col gap-4">
                <FormField
                  control={form.control}
                  name="number"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Plat Nomor Kendaraan</FormLabel>
                      <FormControl>
                        <Input {...field} placeholder="Plat nomor kendaraan" />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                {/* Display decoded number_evidence if available */}
                {decodedNumberEvidence && (
                  <div className="space-y-2">
                    <FormLabel>Bukti Deteksi Plat</FormLabel>
                    <div className="border rounded-md p-2 flex justify-center">
                      <img src={decodedNumberEvidence} alt="Detected license plate" className="max-w-full h-auto max-h-32 object-contain" />
                    </div>
                  </div>
                )}

                <FormField
                  control={form.control}
                  name="violationType"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Jenis Pelanggaran</FormLabel>
                      <FormControl>
                        <Select value={field.value} onValueChange={field.onChange}>
                          <SelectTrigger id="violation-type">
                            <SelectValue placeholder="Pilih jenis pelanggaran" />
                          </SelectTrigger>
                          <SelectContent>
                            <SelectItem value="helmet">Tidak memakai helm</SelectItem>
                          </SelectContent>
                        </Select>
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <FormField
                  control={form.control}
                  name="timestamp"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Tanggal & Waktu</FormLabel>
                      <FormControl>
                        <Input {...field} type="datetime-local" />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <FormField
                  control={form.control}
                  name="location"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Lokasi</FormLabel>
                      <FormControl>
                        <Input {...field} placeholder="Masukkan lokasi" />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
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
          </div>
        )}
      </form>
    </Form>
  );
}
