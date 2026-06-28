#!/usr/bin/env node
// Prepare a single JSONL "work file" for the LLM batch step. One record per file that
// needs an excerpt generated/sanitized OR more tags (to reach the 3-tag floor).
// Output: out/llm-work.jsonl. Each record: { filePath, title, first1500, currentCategory,
// currentTags, allowedTags, work: { excerpt: 'generate'|'sanitize'|'ok',
// tags: 'fill'|'ok' }, existingExcerpt }.

import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const ROOT = path.resolve(__dirname, '../..');
const OUT_DIR = path.join(__dirname, 'out');
const PLAN_PATH = path.join(OUT_DIR, 'per-file-plan.json');
const TAXONOMY_PATH = path.join(__dirname, 'taxonomy.json');

const AI_TELLS = /\b(delve|tapestry|testament|vibrant|underscore|pivotal|crucial|essential|robust|seamless|landscape|realm|foster|leverage|embark|harness|garner|intricate|multifaceted|holistic|transformative|paramount|notably|ultimately|meticulous|showcasing|boasts|emphasizing|highlighting|underscoring|enhance|enduring|nestled|in the heart of|stands as|serves as|represents a|in essence|in conclusion|it is worth noting)\b/i;

const plan = JSON.parse(fs.readFileSync(PLAN_PATH, 'utf8'));
const taxonomy = JSON.parse(fs.readFileSync(TAXONOMY_PATH, 'utf8'));
const allowedTags = taxonomy.canonicalTags;

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

const records = [];
for (const entry of plan) {
  const ex = entry.existing.excerpt?.trim() ?? '';
  let excerptWork = 'ok';
  if (!ex) excerptWork = 'generate';
  else if (AI_TELLS.test(ex)) excerptWork = 'sanitize';
  else if (ex.length > 200) excerptWork = 'sanitize';

  let tagWork = 'ok';
  if (entry.proposed.tags.length < 3) tagWork = 'fill';

  if (excerptWork === 'ok' && tagWork === 'ok') continue;

  const body = loadBody(entry.filePath);
  records.push({
    filePath: entry.filePath,
    title: entry.title,
    first1500: firstNWords(body, 1500),
    currentCategory: entry.proposed.category,
    currentTags: entry.proposed.tags,
    work: { excerpt: excerptWork, tags: tagWork },
    existingExcerpt: ex
  });
}

const OUT_PATH = path.join(OUT_DIR, 'llm-work.jsonl');
fs.writeFileSync(OUT_PATH, records.map((r) => JSON.stringify(r)).join('\n') + '\n', 'utf8');
fs.writeFileSync(path.join(OUT_DIR, 'allowed-tags.json'), JSON.stringify(allowedTags, null, 2), 'utf8');

const exCounts = records.reduce((acc, r) => { acc[r.work.excerpt] = (acc[r.work.excerpt] ?? 0) + 1; return acc; }, {});
const tagCounts = records.reduce((acc, r) => { acc[r.work.tags] = (acc[r.work.tags] ?? 0) + 1; return acc; }, {});
console.log(`Wrote ${records.length} work records to ${path.relative(ROOT, OUT_PATH)}`);
console.log('Excerpt work:', exCounts);
console.log('Tag work:', tagCounts);
