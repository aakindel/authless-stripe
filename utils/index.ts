import { ClassValue, clsx } from "clsx";
import { twMerge } from "tailwind-merge";

// from https://github.com/shadcn/ui/blob/main/templates/next-template/lib/utils.ts
export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

// from https://stackrant.com/posts/tiltable-cards
export function round(num: number, fix = 2) {
  return parseFloat(num.toFixed(fix));
}

// from https://stackrant.com/posts/tiltable-cards
export function distance(x1: number, y1: number, x2: number, y2: number) {
  return Math.sqrt(Math.pow(x2 - x1, 2) + Math.pow(y2 - y1, 2));
}

/* returns string with backslash (e.g. "url" -> "url/") */
export const getStringWithBackslash = (value: string) => {
  return value.endsWith("/") ? value : value + "/";
};

/* returns string without backslash (e.g. "url/" -> "url") */
export const getStringWithoutBackslash = (value: string) => {
  return value.endsWith("/") ? value.slice(0, -1) : value;
};
