#!/usr/bin/env node
// Find and fix the markdown HTML-block bug: a block-level HTML tag (<img>, <div>, etc.)
// on its own line immediately followed by markdown content (- bullet, > blockquote, #
// heading, numbered list) without a blank line. CommonMark treats the HTML as a block
// that consumes following lines until a blank, so the markdown is rendered raw.
//
// Fix: insert a blank line between the HTML tag and the markdown content.
//
// Run: node scripts/frontmatter/12-fix-html-block-bug.mjs            # dry-run
// Run: node scripts/frontmatter/12-fix-html-block-bug.mjs --apply    # write

import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const ROOT = path.resolve(__dirname, '../..');
const APPLY = process.argv.includes('--apply');
const DIRS = [path.join(ROOT, '_posts'), path.join(ROOT, '_projects')];

// Lines that start an HTML block (per CommonMark rule 6: block-level tags).
const HTML_BLOCK = /^<(img|div|table|aside|section|figure|blockquote|iframe|p|hr|video|audio|canvas|svg|object|embed|article|header|footer|nav|main|details|summary|ul|ol|li)\b[^>]*>?\s*$/i;
// Markdown content lines that get eaten when they follow an HTML block without a blank.
const EATEN = /^([-*+]\s|>\s|#{1,6}\s|\d+\.\s)/;

let scanned = 0;
let fixed = 0;
let fixedLines = 0;
const log = [];

for (const dir of DIRS) {
  if (!fs.existsSync(dir)) continue;
  for (const name of fs.readdirSync(dir)) {
    if (!name.endsWith('.md')) continue;
    const filePath = path.join(dir, name);
    scanned += 1;
    const raw = fs.readFileSync(filePath, 'utf8');
    const eol = raw.includes('\r\n') ? '\r\n' : '\n';
    const lines = raw.split(/\r?\n/);

    const out = [];
    let fileLogLines = [];
    for (let i = 0; i < lines.length; i += 1) {
      out.push(lines[i]);
      const cur = lines[i];
      const next = lines[i + 1];
      if (next == null) continue;
      if (!HTML_BLOCK.test(cur)) continue;
      if (!EATEN.test(next)) continue;
      // Insert blank line.
      out.push('');
      fileLogLines.push(i + 1);
    }

    if (fileLogLines.length > 0) {
      fixed += 1;
      fixedLines += fileLogLines.length;
      log.push({ file: path.relative(ROOT, filePath).replace(/\\/g, '/'), lines: fileLogLines });
      if (APPLY) {
        fs.writeFileSync(filePath, out.join(eol), 'utf8');
      }
    }
  }
}

console.log(`Scanned ${scanned} files.`);
console.log(`${APPLY ? 'Fixed' : 'Would fix'} ${fixedLines} occurrence${fixedLines === 1 ? '' : 's'} in ${fixed} file${fixed === 1 ? '' : 's'}.`);
for (const entry of log.slice(0, 30)) {
  console.log(`  ${entry.file} (lines ${entry.lines.join(', ')})`);
}
if (log.length > 30) console.log(`  … and ${log.length - 30} more`);
if (!APPLY) console.log('\nPass --apply to write.');
