#!/usr/bin/env node
// Phase C.2: merge LLM-generated excerpts (from excerpts-done.jsonl) back into per-file-plan.json.
// Validates each generated excerpt against ai-writing-rules.md banned-word list and length cap.

import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const OUT_DIR = path.join(__dirname, 'out');
const PLAN_PATH = path.join(OUT_DIR, 'per-file-plan.json');
const DONE_PATH = path.join(OUT_DIR, 'excerpts-done.jsonl');

if (!fs.existsSync(DONE_PATH)) {
  console.error(`Missing ${DONE_PATH}. Run a Claude session against excerpts-todo.jsonl first.`);
  process.exit(1);
}

const plan = JSON.parse(fs.readFileSync(PLAN_PATH, 'utf8'));
const planByPath = new Map(plan.map((e) => [e.filePath, e]));

const AI_TELLS = /\b(delve|tapestry|testament|vibrant|underscore|pivotal|crucial|essential|robust|seamless|landscape|realm|foster|leverage|embark|harness|garner|intricate|multifaceted|holistic|transformative|paramount|notably|ultimately|meticulous|showcasing|boasts|emphasizing|highlighting|underscoring|enhance|enduring|nestled|in the heart of|stands as|serves as|represents a|in essence|in conclusion|it is worth noting)\b/i;

const done = fs.readFileSync(DONE_PATH, 'utf8').split('\n').filter(Boolean).map((l) => JSON.parse(l));
let applied = 0;
const failures = [];

for (const d of done) {
  const entry = planByPath.get(d.filePath);
  if (!entry) { failures.push({ ...d, reason: 'no matching file in plan' }); continue; }
  const generated = String(d.generated ?? '').trim();
  if (!generated) { failures.push({ ...d, reason: 'empty generated excerpt' }); continue; }
  if (generated.length > 200) { failures.push({ ...d, reason: `too long (${generated.length})` }); continue; }
  if (AI_TELLS.test(generated)) { failures.push({ ...d, reason: 'contains AI tell word' }); continue; }
  entry.proposed.excerpt = generated;
  applied += 1;
}

fs.writeFileSync(PLAN_PATH, JSON.stringify(plan, null, 2), 'utf8');
console.log(`Applied ${applied} excerpts.`);
if (failures.length) {
  console.log(`${failures.length} failures (see out/excerpts-failures.json):`);
  fs.writeFileSync(path.join(OUT_DIR, 'excerpts-failures.json'), JSON.stringify(failures, null, 2), 'utf8');
}

const stillTodo = plan.filter((e) => e.proposed.excerpt === '__TODO__').length;
console.log(`Files still without an excerpt: ${stillTodo}`);
