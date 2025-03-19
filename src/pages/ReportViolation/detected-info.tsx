"use client";

import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { DetectedViolationInfo, ViolationType } from "./violation-report-form";

interface DetectedInfoProps {
  detectedInfo: DetectedViolationInfo;
  onInfoChange: (info: DetectedViolationInfo) => void;
}

export function DetectedInfo({ detectedInfo, onInfoChange }: DetectedInfoProps) {
  const handleChange = (field: keyof DetectedViolationInfo, value: string) => {
    onInfoChange({
      ...detectedInfo,
      [field]: field === "violationType" ? (value as ViolationType) : value,
    });
  };

  return (
    <div className="grid gap-4 md:grid-cols-2">
      <div className="space-y-2">
        <Label htmlFor="plate-number">License Plate Number</Label>
        <Input id="plate-number" value={detectedInfo.plateNumber} onChange={(e) => handleChange("plateNumber", e.target.value)} placeholder="License plate number" />
        <p className="text-xs text-muted-foreground">Confidence: {Math.round(detectedInfo.confidence * 100)}%</p>
      </div>

      <div className="space-y-2">
        <Label htmlFor="violation-type">Violation Type</Label>
        <Select value={detectedInfo.violationType} onValueChange={(value) => handleChange("violationType", value)}>
          <SelectTrigger id="violation-type">
            <SelectValue placeholder="Select violation type" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="speeding">Speeding</SelectItem>
            <SelectItem value="parking">Illegal Parking</SelectItem>
            <SelectItem value="red-light">Red Light Violation</SelectItem>
            <SelectItem value="other">Other</SelectItem>
          </SelectContent>
        </Select>
      </div>

      <div className="space-y-2">
        <Label htmlFor="timestamp">Date & Time</Label>
        <Input id="timestamp" type="datetime-local" value={detectedInfo.timestamp} onChange={(e) => handleChange("timestamp", e.target.value)} />
      </div>

      <div className="space-y-2">
        <Label htmlFor="location">Location</Label>
        <Input id="location" value={detectedInfo.location || ""} onChange={(e) => handleChange("location", e.target.value)} placeholder="Enter location" />
      </div>
    </div>
  );
}
