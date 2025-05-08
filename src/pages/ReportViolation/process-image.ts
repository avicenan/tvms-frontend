// This is a mock function that simulates processing an image to detect license plate and violation type

import { DetectedViolationInfo } from "./violation-report-form";

// In a real application, this would call an API or use a machine learning model
export async function processViolationImage(): Promise<DetectedViolationInfo> {
  // Simulate processing delay
  await new Promise((resolve) => setTimeout(resolve, 2000));

  // Generate a random license plate number
  const letters = "ABCDEFGHJKLMNPQRSTUVWXYZ";
  const numbers = "0123456789";

  let plateNumber = "";
  for (let i = 0; i < 3; i++) {
    plateNumber += letters.charAt(Math.floor(Math.random() * letters.length));
  }
  plateNumber += " ";
  for (let i = 0; i < 3; i++) {
    plateNumber += numbers.charAt(Math.floor(Math.random() * numbers.length));
  }

  // Generate random violation type
  const violationTypes = ["speeding", "parking", "red-light", "other"] as const;
  const violationType = violationTypes[Math.floor(Math.random() * violationTypes.length)];

  // Current date and time
  const now = new Date();
  const timestamp = now.toISOString().slice(0, 16); // Format: YYYY-MM-DDTHH:MM

  return {
    plateNumber,
    violationType,
    confidence: 0.75 + Math.random() * 0.2, // Random confidence between 75% and 95%
    timestamp,
    location: "Main Street & 5th Avenue",
  };
}
