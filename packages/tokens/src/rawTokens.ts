import type { TokenRecord } from "./types.js";

export const rawTokens = {
  "raw.black.900": "#10141A",
  "raw.black.950": "#080A0D",
  "raw.gray.090": "#F4F5F7",
  "raw.gray.100": "#E4E4E4",
  "raw.gray.110": "#E4E6EA",
  "raw.white": "#FFFFFF",
  "raw.blue.400": "#83A2DB",
  "raw.blue.500": "#5E8EE8",
  "raw.red.400": "#CE6969",
  "raw.red.500": "#EF4444",
  "raw.green.500": "#16A34A",
  "raw.orange.500": "#F59E0B",
  "raw.purple.500": "#8B5CF6",
  "raw.cyan.500": "#20B8C7"
} as const satisfies TokenRecord;

