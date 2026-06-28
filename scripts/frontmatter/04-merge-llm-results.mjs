#!/usr/bin/env node
// Merge the LLM batch's per-batch result files into per-file-plan.json.
// Reads scripts/frontmatter/out/llm-results/*.json (each shaped {results: [...]} ).
// Validates each result against ai-writing-rules.md banned-word list, length cap, and canonical tag vocab.
// Replaces 04-merge-excerpts.mjs when the workflow approach is used.

import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const ROOT = path.resolve(__dirname, '../..');
const OUT_DIR = path.join(__dirname, 'out');
const RESULTS_DIR = path.join(OUT_DIR, 'llm-results');
const PLAN_PATH = path.join(OUT_DIR, 'per-file-plan.json');
const TAXONOMY_PATH = path.join(__dirname, 'taxonomy.json');

if (!fs.existsSync(RESULTS_DIR)) { console.error(`Missing ${RESULTS_DIR}`); process.exit(1); }

const plan = JSON.parse(fs.readFileSync(PLAN_PATH, 'utf8'));
const planByPath = new Map(plan.map((e) => [e.filePath, e]));
const taxonomy = JSON.parse(fs.readFileSync(TAXONOMY_PATH, 'utf8'));
const allowedTags = new Set(taxonomy.canonicalTags);

const AI_TELLS = /\b(delve|tapestry|testament|vibrant|underscore|pivotal|crucial|essential|robust|seamless|landscape|realm|foster|leverage|embark|harness|garner|intricate|multifaceted|holistic|transformative|paramount|notably|ultimately|meticulous|showcasing|boasts|emphasizing|highlighting|underscoring|enhance|enduring|nestled|in the heart of|stands as|serves as|represents a|in essence|in conclusion|it is worth noting)\b/i;

let batchFiles = 0;
let totalResults = 0;
let excerptsApplied = 0;
let tagsApplied = 0;
let excerptFailures = 0;
let tagFailures = 0;
const failures = [];

for (const name of fs.readdirSync(RESULTS_DIR).sort()) {
  if (!name.endsWith('.json')) continue;
  batchFiles += 1;
  const data = JSON.parse(fs.readFileSync(path.join(RESULTS_DIR, name), 'utf8'));
  const results = Array.isArray(data) ? data : (data.results ?? []);
  for (const r of results) {
    totalResults += 1;
    const entry = planByPath.get(r.filePath);
    if (!entry) { failures.push({ ...r, reason: 'no matching plan entry', batch: name }); continue; }

    // excerpt
    if (r.excerpt) {
      const ex = String(r.excerpt).trim().replace(/^["']|["']$/g, '');
      if (!ex) { excerptFailures += 1; failures.push({ filePath: r.filePath, reason: 'empty excerpt', batch: name }); }
      else if (ex.length > 200) { excerptFailures += 1; failures.push({ filePath: r.filePath, reason: `excerpt too long (${ex.length})`, batch: name }); }
      else if (AI_TELLS.test(ex)) { excerptFailures += 1; failures.push({ filePath: r.filePath, reason: `excerpt contains AI tell: ${ex.match(AI_TELLS)[0]}`, batch: name, excerpt: ex }); }
      else { entry.proposed.excerpt = ex; excerptsApplied += 1; }
    }

    // tags — keep only canonical
    if (Array.isArray(r.tags) && r.tags.length) {
      const kept = r.tags.map(String).filter((t) => allowedTags.has(t));
      const dropped = r.tags.filter((t) => !allowedTags.has(t));
      if (dropped.length) failures.push({ filePath: r.filePath, reason: `dropped non-canonical tags: ${dropped.join(', ')}`, batch: name });
      if (kept.length >= 1 && kept.length <= 10) {
        entry.proposed.tags = [...new Set(kept)];
        tagsApplied += 1;
      } else if (kept.length === 0) {
        tagFailures += 1;
        failures.push({ filePath: r.filePath, reason: 'all tags non-canonical, kept original', batch: name });
      }
    }
  }
}

// any entry still without an excerpt — try the existing one
let usedExisting = 0;
for (const entry of plan) {
  if (!entry.proposed.excerpt || entry.proposed.excerpt === '__TODO__') {
    if (entry.existing.excerpt) { entry.proposed.excerpt = entry.existing.excerpt; usedExisting += 1; }
  }
}

fs.writeFileSync(PLAN_PATH, JSON.stringify(plan, null, 2), 'utf8');
if (failures.length) fs.writeFileSync(path.join(OUT_DIR, 'merge-failures.json'), JSON.stringify(failures, null, 2), 'utf8');

console.log(`Read ${batchFiles} batch files, ${totalResults} results.`);
console.log(`Excerpts applied: ${excerptsApplied}; rejected: ${excerptFailures}.`);
console.log(`Tag updates applied: ${tagsApplied}; rejected: ${tagFailures}.`);
console.log(`Fell back to existing excerpt: ${usedExisting}.`);
const stillMissing = plan.filter((e) => !e.proposed.excerpt || e.proposed.excerpt === '__TODO__').length;
console.log(`Files still without an excerpt: ${stillMissing}`);
if (failures.length) console.log(`See out/merge-failures.json for details.`);
