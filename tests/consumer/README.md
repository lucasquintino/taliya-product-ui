# Packed consumer fixture

This fixture is intentionally independent of the workspace. Its package manifests refer only to `pnpm pack` tarballs in an external pack directory; no `workspace:*` dependency, source import, or ignored `dist` output is accepted as consumer evidence.
