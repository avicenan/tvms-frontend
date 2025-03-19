"use client";

import type React from "react";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
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

  const handleImageUpload = (imageDataUrl: string) => {
    setImage(imageDataUrl);
    setDetectedInfo(null);
  };

  const handleProcessImage = async () => {
    if (!image) return;

    setIsProcessing(true);

    try {
      // In a real application, this would call an API to process the image
      const result = await processViolationImage(image);
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

    // Simulate API call to submit the report
    await new Promise((resolve) => setTimeout(resolve, 1500));

    setIsSubmitted(true);
    setIsSubmitting(false);
  };

  const handleReset = () => {
    setImage(null);
    setDetectedInfo(null);
    setIsSubmitted(false);
  };

  if (isSubmitted) {
    return (
      <Card className="w-full max-w-3xl mx-auto">
        <CardHeader>
          <CardTitle>Report Submitted Successfully</CardTitle>
        </CardHeader>
        <CardContent>
          <p className="mb-4">Thank you for submitting your traffic violation report. Your report has been received and will be processed.</p>
          <p className="mb-4">
            Reference number: <strong>{Math.random().toString(36).substring(2, 10).toUpperCase()}</strong>
          </p>
        </CardContent>
        <CardFooter>
          <Button onClick={handleReset}>Submit Another Report</Button>
        </CardFooter>
      </Card>
    );
  }

  return (
    <form onSubmit={handleSubmit} className="w-full max-w-3xl mx-auto">
      <Card className="mb-6">
        <CardHeader>
          <CardTitle>Upload Violation Photo</CardTitle>
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

      {detectedInfo && (
        <Card className="mb-6">
          <CardHeader>
            <CardTitle>Hasil Identifikasi</CardTitle>
          </CardHeader>
          <CardContent>
            <DetectedInfo detectedInfo={detectedInfo} onInfoChange={setDetectedInfo} />
          </CardContent>
        </Card>
      )}

      {detectedInfo && (
        <Card className="mb-6">
          <CardHeader>
            <CardTitle>Informasi Lainnya</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid gap-4">
              <div className="grid gap-2">
                <Label htmlFor="reporter-name">Your Name</Label>
                <Input id="reporter-name" placeholder="Enter your full name" required />
              </div>

              <div className="grid gap-2">
                <Label htmlFor="reporter-email">Your Email</Label>
                <Input id="reporter-email" type="email" placeholder="Enter your email address" required />
              </div>

              <div className="grid gap-2">
                <Label htmlFor="reporter-phone">Your Phone Number</Label>
                <Input id="reporter-phone" type="tel" placeholder="Enter your phone number" />
              </div>

              <div className="grid gap-2">
                <Label htmlFor="additional-notes">Additional Notes</Label>
                <Textarea id="additional-notes" placeholder="Provide any additional details about the violation" rows={4} />
              </div>
            </div>
          </CardContent>
          <CardFooter>
            <Button type="submit" disabled={isSubmitting}>
              {isSubmitting ? (
                <>
                  <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                  Submitting...
                </>
              ) : (
                "Submit Report"
              )}
            </Button>
          </CardFooter>
        </Card>
      )}
    </form>
  );
}
