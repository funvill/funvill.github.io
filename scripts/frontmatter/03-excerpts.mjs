#!/usr/bin/env node
// Phase C.1: emit excerpts-todo.jsonl listing every file that needs an excerpt generated
// or sanitized. A separate Claude session consumes the JSONL, applies ai-writing-rules.md,
// and emits excerpts-done.jsonl.

import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const ROOT = path.resolve(__dirname, '../..');
const OUT_DIR = path.join(__dirname, 'out');
const PLAN_PATH = path.join(OUT_DIR, 'per-file-plan.json');
const TODO_PATH = path.join(OUT_DIR, 'excerpts-todo.jsonl');

const plan = JSON.parse(fs.readFileSync(PLAN_PATH, 'utf8'));

function loadBody(filePath) {
  try {
    const raw = fs.readFileSync(path.join(ROOT, filePath), 'utf8');
    const idx2 = raw.indexOf('\n---', 4);
    if (raw.startsWith('---') && idx2 !== -1) return raw.slice(idx2 + 4);
    return raw;
  } catch {
    return '';
  }
}

function firstNWords(text, n) {
  const words = text
    .replace(/<[^>]+>/g, ' ')
    .replace(/!\[[^\]]*\]\([^)]+\)/g, ' ')
    .replace(/\[([^\]]+)\]\([^)]+\)/g, '$1')
    .replace(/[#*_>`~]/g, ' ')
    .replace(/\s+/g, ' ')
    .trim()
    .split(' ')
    .slice(0, n);
  return words.join(' ');
}

const todoLines = [];
let needsGen = 0;
let needsSanitize = 0;
let okAsIs = 0;

// Rough AI-tell detector — flags excerpts that need sanitizing.
const AI_TELLS = /\b(delve|tapestry|testament|vibrant|underscore|pivotal|crucial|essential|robust|seamless|landscape|realm|foster|leverage|embark|harness|garner|intricate|multifaceted|holistic|transformative|paramount|notably|ultimately|meticulous|showcasing|boasts|emphasizing|highlighting|underscoring|enhance|enduring|nestled|in the heart of|stands as|serves as|represents a|in essence|in conclusion|it is worth noting)\b/i;

for (const entry of plan) {
  const ex = entry.existing.excerpt?.trim() ?? '';
  let status;
  if (!ex) { status = 'missing'; needsGen += 1; }
  else if (AI_TELLS.test(ex)) { status = 'sanitize'; needsSanitize += 1; }
  else if (ex.length > 200) { status = 'too-long'; needsSanitize += 1; }
  else { status = 'ok'; okAsIs += 1; entry.proposed.excerpt = ex; continue; }

  const body = loadBody(entry.filePath);
  todoLines.push(JSON.stringify({
    filePath: entry.filePath,
    slug: entry.slug,
    title: entry.title,
    category: entry.proposed.category,
    tags: entry.proposed.tags,
    existing: ex,
    status,
    first500: firstNWords(body, 500)
  }));
}

fs.writeFileSync(PLAN_PATH, JSON.stringify(plan, null, 2), 'utf8');
fs.writeFileSync(TODO_PATH, todoLines.join('\n') + '\n', 'utf8');

console.log(`Excerpts already OK: ${okAsIs}`);
console.log(`Excerpts needing generation: ${needsGen}`);
console.log(`Excerpts needing sanitization or trim: ${needsSanitize}`);
console.log(`Wrote ${todoLines.length} entries to ${path.relative(ROOT, TODO_PATH)}`);
console.log('');
console.log('Next: a separate Claude session reads excerpts-todo.jsonl, applies ai-writing-rules.md,');
console.log('and writes excerpts-done.jsonl with the same record shape plus a "generated" field.');
console.log('Then run 04-merge-excerpts.mjs.');
