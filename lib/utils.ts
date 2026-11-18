import { type ClassValue, clsx } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export function parseJsonArray(input: any, fallback: string[] = []): string[] {
  if (!input) return fallback;
  if (Array.isArray(input)) return input;
  if (typeof input !== "string") return fallback;
  try {
    const parsed = JSON.parse(input);
    return Array.isArray(parsed) ? parsed : fallback;
  } catch {
    return fallback;
  }
}
