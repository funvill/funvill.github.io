#!/usr/bin/env node
// Phase E: build the site, diff the URL set against the pre-migration sitemap snapshot.
// Asserts post URLs do NOT change. Category URLs are expected to change and are listed separately.
//
// Usage:
//   node scripts/frontmatter/06-verify.mjs --snapshot   # take pre-migration snapshot (run before apply)
//   node scripts/frontmatter/06-verify.mjs              # build + compare against snapshot
//
// The snapshot is dist/sitemap-0.xml copied to out/sitemap-pre.xml.

import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';
import { spawnSync } from 'node:child_process';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const ROOT = path.resolve(__dirname, '../..');
const OUT_DIR = path.join(__dirname, 'out');
const SNAPSHOT_PATH = path.join(OUT_DIR, 'sitemap-pre.xml');
const SITEMAP_PATH = path.join(ROOT, 'dist', 'sitemap-0.xml');

const SNAPSHOT_ONLY = process.argv.includes('--snapshot');
const SKIP_BUILD = process.argv.includes('--skip-build');

function extractUrls(xml) {
  const urls = [];
  const re = /<loc>([^<]+)<\/loc>/g;
  let m;
  while ((m = re.exec(xml)) != null) urls.push(m[1]);
  return new Set(urls);
}

function classify(url) {
  if (url.includes('/categories/')) return 'category';
  if (url.includes('/tags/')) return 'tag';
  if (url.includes('/projects/')) return 'project';
  if (url.includes('/flockingai/')) return 'flockingai';
  if (url.includes('/blog')) return 'blog-listing';
  return 'post-or-page';
}

if (!SKIP_BUILD) {
  console.log('Building site…');
  const r = spawnSync('npm', ['run', 'build'], { cwd: ROOT, stdio: 'inherit', shell: true });
  if (r.status !== 0) {
    console.error(`Build failed (exit ${r.status}).`);
    process.exit(r.status ?? 1);
  }
}

if (!fs.existsSync(SITEMAP_PATH)) {
  console.error(`Missing ${SITEMAP_PATH} — did the build emit a sitemap?`);
  process.exit(1);
}

const currentSitemap = fs.readFileSync(SITEMAP_PATH, 'utf8');
const currentUrls = extractUrls(currentSitemap);

if (SNAPSHOT_ONLY) {
  fs.writeFileSync(SNAPSHOT_PATH, currentSitemap, 'utf8');
  console.log(`Snapshot saved: ${path.relative(ROOT, SNAPSHOT_PATH)} (${currentUrls.size} URLs)`);
  process.exit(0);
}

if (!fs.existsSync(SNAPSHOT_PATH)) {
  console.error(`No snapshot at ${SNAPSHOT_PATH}. Run with --snapshot before applying.`);
  process.exit(1);
}

const preUrls = extractUrls(fs.readFileSync(SNAPSHOT_PATH, 'utf8'));

const added = [...currentUrls].filter((u) => !preUrls.has(u));
const removed = [...preUrls].filter((u) => !currentUrls.has(u));

const buckets = { project: [], 'post-or-page': [], category: [], tag: [], 'blog-listing': [], flockingai: [] };
for (const u of added) buckets[classify(u)].push({ change: '+', url: u });
for (const u of removed) buckets[classify(u)].push({ change: '-', url: u });

const lines = [];
lines.push(`# Verify — ${new Date().toISOString()}`);
lines.push('');
lines.push(`Pre URLs: ${preUrls.size}`);
lines.push(`Post URLs: ${currentUrls.size}`);
lines.push(`Added: ${added.length}`);
lines.push(`Removed: ${removed.length}`);
lines.push('');
for (const [bucket, changes] of Object.entries(buckets)) {
  if (!changes.length) continue;
  lines.push(`## ${bucket} (${changes.length} changes)`);
  lines.push('');
  for (const c of changes.slice(0, 50)) lines.push(`- ${c.change} ${c.url}`);
  if (changes.length > 50) lines.push(`- … and ${changes.length - 50} more`);
  lines.push('');
}
fs.writeFileSync(path.join(OUT_DIR, 'verify-report.md'), lines.join('\n'), 'utf8');
console.log(`Wrote ${path.relative(ROOT, path.join(OUT_DIR, 'verify-report.md'))}`);

const postUrlChanges = buckets.project.length + buckets['post-or-page'].length;
const categoryChanges = buckets.category.length;
const tagChanges = buckets.tag.length;

console.log(`Post/project URL changes: ${postUrlChanges}  (EXPECTED: 0)`);
console.log(`Category URL changes: ${categoryChanges}  (expected — categories were renamed)`);
console.log(`Tag URL changes: ${tagChanges}  (expected — tags were normalized)`);

if (postUrlChanges > 0) {
  console.error('REGRESSION: post URLs changed. See verify-report.md.');
  process.exit(2);
}
console.log('OK: no post/project URL regressions.');
