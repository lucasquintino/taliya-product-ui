export interface SourceAssetsConfig {
  schemaVersion: 2;
  environmentVariable: string;
  coverageMap: string;
  defaultPaths: string[];
  configPath: string;
}

export function readSourceAssetsConfig(root?: string): SourceAssetsConfig;
export function resolveSourceAssetsDir(options?: {
  root?: string;
  args?: string[];
  requireExisting?: boolean;
}): { path: string; source: "cli" | "env" | "default" | "unresolved"; config: SourceAssetsConfig };
