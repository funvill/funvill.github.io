#!/usr/bin/env node
// Track 3.3: replace Instagram <blockquote class="instagram-media">…</blockquote> + the
// following <script ... src="…instagram…embeds.js"></script> with a plain link line.
// Removes a third-party script tag from every page that uses an embed.
//
// Run: node scripts/frontmatter/10-replace-instagram.mjs            # dry-run
// Run: node scripts/frontmatter/10-replace-instagram.mjs --apply    # actually write

import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const ROOT = path.resolve(__dirname, '../..');
const APPLY = process.argv.includes('--apply');

const DIRS = [path.join(ROOT, '_posts'), path.join(ROOT, '_projects')];

// Matches the blockquote + optional script tag immediately following.
// Multi-line, non-greedy. Captures the whole block.
const BLOCK_RE = /<blockquote\s+class="instagram-media"[\s\S]*?<\/blockquote>\s*(?:<script[^>]*(?:instagram\.com|platform\.instagram)[^>]*>\s*<\/script>)?/g;

// Extract the post URL from the first instagram.com/p/SHORTCODE link inside.
const URL_RE = /https:\/\/(?:www\.)?instagram\.com\/p\/([A-Za-z0-9_-]+)\//;

let totalBlocks = 0;
let totalFiles = 0;
let touched = 0;
const skipped = [];

for (const dir of DIRS) {
  if (!fs.existsSync(dir)) continue;
  for (const fileName of fs.readdirSync(dir)) {
    if (!fileName.endsWith('.md')) continue;
    const filePath = path.join(dir, fileName);
    const raw = fs.readFileSync(filePath, 'utf8');
    const eol = raw.includes('\r\n') ? '\r\n' : '\n';

    const matches = [...raw.matchAll(BLOCK_RE)];
    if (matches.length === 0) continue;

    totalFiles += 1;
    totalBlocks += matches.length;
    let newRaw = raw;
    for (const m of matches) {
      const block = m[0];
      const urlMatch = block.match(URL_RE);
      if (!urlMatch) {
        skipped.push({ filePath: path.relative(ROOT, filePath), reason: 'no URL found' });
        continue;
      }
      const shortcode = urlMatch[1];
      const url = `https://www.instagram.com/p/${shortcode}/`;
      const replacement = `[View on Instagram](${url})`;
      newRaw = newRaw.replace(block, replacement);
    }

    if (newRaw !== raw) {
      touched += 1;
      if (APPLY) fs.writeFileSync(filePath, newRaw, 'utf8');
    }
  }
}

console.log(`${APPLY ? 'APPLIED' : 'DRY-RUN'}: ${touched}/${totalFiles} files with ${totalBlocks} embed blocks total.`);
if (skipped.length) {
  console.log(`Skipped ${skipped.length} blocks (no URL found):`);
  for (const s of skipped.slice(0, 10)) console.log(`  ${s.filePath} — ${s.reason}`);
  if (skipped.length > 10) console.log(`  … and ${skipped.length - 10} more`);
}
if (!APPLY) console.log('Pass --apply to write.');
