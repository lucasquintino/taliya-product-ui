export function parseMode(argv = []) {
  const check = argv.includes('--check');
  const update = argv.includes('--update') || argv.includes('--write');
  if (check && update) throw new Error('MODE-CONFLICT: choose exactly one of --check or --update');
  return check ? 'check' : 'update';
}

export function assertWritable(mode, outputPaths = []) {
  if (mode !== 'update') throw new Error(`MODE-READ-ONLY: update required before writing ${outputPaths.join(', ')}`);
}
