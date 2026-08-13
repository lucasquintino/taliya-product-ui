import path from "node:path";

export function capturedStoryPath(captureDir, capture) {
  return capture?.image ? path.join(captureDir, capture.image) : null;
}
