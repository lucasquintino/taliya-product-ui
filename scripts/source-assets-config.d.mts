export interface SourceAssetsConfig {
  schemaVersion: 1;
  environmentVariable: string;
  expectedImageCount: number;
  canonicalRoster: string;
  defaultPaths: string[];
  configPath: string;
}

export function readSourceAssetsConfig(root?: string): SourceAssetsConfig;
export function resolveSourceAssetsDir(options?: {
  root?: string;
  args?: string[];
  requireExisting?: boolean;
}): { path: string; source: "cli" | "env" | "default" | "unresolved"; config: SourceAssetsConfig };
