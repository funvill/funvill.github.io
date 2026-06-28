#!/usr/bin/env node
// Move every file flagged in dist/_uploads-orphans.json out of public/uploads/ into
// _archived-uploads/ (preserving directory structure). _archived-uploads/ is gitignored
// and sits outside public/ so Astro won't bundle it. Reversible: drag/copy any file
// back to public/uploads/<same-path> to restore it.
//
// Run: node scripts/frontmatter/11-archive-orphans.mjs            # dry-run
// Run: node scripts/frontmatter/11-archive-orphans.mjs --apply    # actually move

import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const ROOT = path.resolve(__dirname, '../..');
const ORPHANS_PATH = path.join(ROOT, 'dist', '_uploads-orphans.json');
const UPLOADS_DIR = path.join(ROOT, 'public', 'uploads');
const ARCHIVE_DIR = path.join(ROOT, '_archived-uploads');
const APPLY = process.argv.includes('--apply');

if (!fs.existsSync(ORPHANS_PATH)) {
  console.error(`Missing ${ORPHANS_PATH} — run \`npm run build\` first to generate the orphan report.`);
  process.exit(1);
}

const report = JSON.parse(fs.readFileSync(ORPHANS_PATH, 'utf8'));
const orphans = report.orphans ?? [];

let moved = 0;
let missing = 0;
let totalBytes = 0;
const errors = [];

for (const o of orphans) {
  const src = path.join(UPLOADS_DIR, o.path);
  const dest = path.join(ARCHIVE_DIR, o.path);
  if (!fs.existsSync(src)) { missing += 1; continue; }
  totalBytes += o.bytes;
  if (APPLY) {
    try {
      fs.mkdirSync(path.dirname(dest), { recursive: true });
      fs.renameSync(src, dest);
      moved += 1;
    } catch (e) {
      errors.push({ path: o.path, error: String(e.message ?? e) });
    }
  } else {
    moved += 1;
  }
}

if (APPLY) {
  // Clean up any now-empty directories under public/uploads/.
  pruneEmpty(UPLOADS_DIR);
}

function pruneEmpty(dir) {
  if (!fs.existsSync(dir)) return;
  for (const name of fs.readdirSync(dir)) {
    const full = path.join(dir, name);
    if (fs.statSync(full).isDirectory()) pruneEmpty(full);
  }
  if (dir !== UPLOADS_DIR && fs.readdirSync(dir).length === 0) {
    fs.rmdirSync(dir);
  }
}

const mb = (totalBytes / 1024 / 1024).toFixed(1);
console.log(`${APPLY ? 'MOVED' : 'WOULD MOVE'}: ${moved} files (${mb} MB) -> ${path.relative(ROOT, ARCHIVE_DIR)}/`);
if (missing) console.log(`Skipped (already gone): ${missing}`);
if (errors.length) {
  console.log(`Errors: ${errors.length}`);
  for (const e of errors.slice(0, 10)) console.log(`  ${e.path} - ${e.error}`);
}
if (!APPLY) console.log('Pass --apply to actually move.');
