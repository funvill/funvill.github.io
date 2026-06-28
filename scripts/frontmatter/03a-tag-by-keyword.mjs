#!/usr/bin/env node
// Phase C.0: heuristic tag augmenter. For each canonical tag, define keyword patterns.
// Scan title + body for matches; merge matches into the proposed tag list (capped at 10).
// Reads per-file-plan.json, rewrites it in place. Drastically reduces the number of files
// that still need LLM-assist for tagging.
//
// Run AFTER 02-propose-taxonomy.mjs and BEFORE 03-excerpts.mjs.

import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const ROOT = path.resolve(__dirname, '../..');
const OUT_DIR = path.join(__dirname, 'out');
const PLAN_PATH = path.join(OUT_DIR, 'per-file-plan.json');
const TAXONOMY_PATH = path.join(__dirname, 'taxonomy.json');

const TAG_KEYWORDS = {
  wood: [/\bwood(en|s)?\b/i, /\bplywood\b/i, /\bMDF\b/i, /\bwoodworking\b/i],
  metal: [/\bmetal\b/i, /\bsteel\b/i, /\baluminum\b/i, /\bbrass\b/i, /\bcopper\b/i, /\btin\b/i],
  fabric: [/\bfabric\b/i, /\btextile\b/i, /\bcloth\b/i, /\bthread\b/i, /\byarn\b/i, /\bsewing\b/i, /\bcrochet\b/i, /\bknitting\b/i],
  paper: [/\bpaper\b/i, /\bcardstock\b/i, /\borigami\b/i, /\bpapercraft\b/i, /\bpostcards?\b/i],
  plastic: [/\bplastic\b/i, /\bacrylic\b/i, /\bABS\b/, /\bPLA\b/, /\bcoroplast\b/i],
  glass: [/\bglass\b/i],
  leather: [/\bleather\b/i],
  led: [/\bLEDs?\b/, /\bWS2812\b/i, /\bneopixel\b/i, /\baddressable\b/i, /\bFastLED\b/i],
  'laser-cut': [/\blaser[\s-]?cut\b/i, /\blaser[\s-]?cutter\b/i, /\bepilog\b/i],
  cnc: [/\bCNC\b/, /\bmilled?\b/i, /\bmilling\b/i, /\brouter\b/i],
  '3d-printing': [/\b3D[\s-]?print(ed|ing|er)?\b/i, /\bprinted in (PLA|ABS)\b/i, /\bthingiverse\b/i],
  soldering: [/\bsolder(ed|ing)?\b/i, /\bsoldering iron\b/i],
  sewing: [/\bsew(n|ing|ed)?\b/i, /\bstitched?\b/i],
  painting: [/\bpaint(ed|ing)?\b/i, /\bwatercolou?r\b/i, /\bacrylic paint\b/i],
  'stained-glass': [/\bstained[\s-]?glass\b/i],
  arduino: [/\barduino\b/i, /\bATmega\b/i, /\bATtiny\b/i, /\bWeMos\b/i, /\bD1\s?mini\b/i],
  'raspberry-pi': [/\braspberry\s?pi\b/i, /\bRPi\b/i],
  esp32: [/\bESP32\b/i],
  esp8266: [/\bESP8266\b/i],
  fastled: [/\bFastLED\b/i],
  ws2812: [/\bWS2812\b/i, /\bneopixel\b/i],
  jlcpcb: [/\bJLCPCB\b/i, /\bSVG2Shenzhen\b/i, /\bShenzhen\b/],
  kicad: [/\bKiCad\b/i],
  pcb: [/\bPCBs?\b/, /\bcircuit board\b/i],
  sensor: [/\bsensors?\b/i, /\bMaxSonar\b/i, /\bultrasonic\b/i, /\baccelerometer\b/i, /\bgyroscope\b/i, /\bgyro\b/i],
  motor: [/\bmotors?\b/i, /\bservos?\b/i, /\bstepper\b/i, /\bDC motor\b/i],
  code: [/\bgithub\b/i, /\bsource code\b/i, /\balgorithm\b/i, /\bfunction\b/i, /\bscript\b/i, /\brepository\b/i],
  web: [/\bwebsite\b/i, /\bweb app\b/i, /\bHTML\b/, /\bCSS\b/, /\bjavascript\b/i, /\bWordPress\b/i],
  cpp: [/\bC\+\+\b/, /\bcpp\b/i, /\bMFC\b/, /\bQt\b/],
  c: [/\b(in|using) C\b(?! \+)/, /\bC language\b/i, /\bC programming\b/i],
  php: [/\bPHP\b/, /\bcakephp\b/i, /\bWordPress\b/i],
  jekyll: [/\bJekyll\b/i],
  astro: [/\bAstro( \d|js| 5| 6)?\b/i, /\bastro\.build\b/i],
  markdown: [/\bmarkdown\b/i, /\.md\b/i],
  security: [/\bsecurity\b/i, /\bpasswords?\b/i, /\bencryption\b/i, /\bSSH\b/, /\bSSL\b/, /\bauthent/i, /\bcryptography\b/i, /\bcrypto\b/i],
  ai: [/\bAI\b/, /\bChatGPT\b/i, /\bMidJourney\b/i, /\bLLM\b/i, /\bmachine learning\b/i, /\bgenerative\b/i, /\bclaude\b/i, /\bgpt\b/i],
  art: [/\bart(work|ist|istic)?\b/i, /\bsculpture\b/i, /\bgallery\b/i, /\bexhibit\b/i],
  coins: [/\bgeocoins?\b/i, /\bchallenge coins?\b/i, /\b(metal )?coins?\b/i],
  maps: [/\bmaps?\b/i, /\bcartograph/i, /\bGPS\b/, /\bgeographic\b/i],
  puppets: [/\bpuppets?\b/i, /\bmarionette/i, /\bventriloquist\b/i],
  chess: [/\bchess\b/i],
  robots: [/\brobots?\b/i, /\brobotic/i, /\bclaw machine\b/i, /\bclaw game\b/i],
  furniture: [/\bfurniture\b/i, /\bchair\b/i, /\btable\b/i, /\bdesk\b/i, /\bshelf\b/i, /\bshelves\b/i, /\bcabinet\b/i],
  jewelry: [/\bjewell?ery\b/i, /\bnecklace\b/i, /\bring\b/i, /\bbracelet\b/i, /\bearrings?\b/i, /\bpendant\b/i],
  birds: [/\bbirds?\b/i, /\bowls?\b/i, /\bcrows?\b/i, /\bravens?\b/i, /\bsparrows?\b/i, /\bpigeons?\b/i, /\beagles?\b/i, /\bhawks?\b/i, /\bvultures?\b/i, /\bhummingbirds?\b/i, /\bpeacocks?\b/i, /\bducks?\b/i, /\bparakeets?\b/i, /\bcuckoos?\b/i],
  flowers: [/\bflowers?\b/i, /\blavender\b/i, /\broses?\b/i, /\btulips?\b/i, /\bdaffodils?\b/i, /\bplants?\b/i, /\bgarden\b/i],
  'maker-faire': [/\bmaker[\s-]?faire\b/i, /\bVMMF\b/i, /\bvanmakerfaire\b/i],
  vhs: [/\bVHS\b/, /\bVancouver Hack(er)? Space\b/i, /\bVancouverHackSpace\b/i],
  vancouver: [/\bVancouver\b/i, /\bGastown\b/i, /\bKitsilano\b/i, /\bMount Pleasant\b/i, /\bGranville\b/i, /\bBC\b/, /\bBritish Columbia\b/i],
  canada: [/\bCanad(a|ian)\b/i],
  conference: [/\bconferences?\b/i, /\bsymposium\b/i, /\bmeetup\b/i],
  hackspace: [/\bhack(er)?[\s-]?space\b/i, /\bmakerspace\b/i],
  tutorial: [/\bhow to\b/i, /\btutorial\b/i, /\bguide\b/i, /\bstep[\s-]by[\s-]step\b/i],
  review: [/\breview of\b/i, /\bthoughts on\b/i, /\bunboxing\b/i, /\bfirst impressions\b/i],
  bookmark: [/\bbookmark/i, /\binteresting (link|read|article)/i],
  journal: [/\bdaily\b/i, /\btoday i\b/i, /\bjournal\b/i],
  recipe: [/\brecipes?\b/i, /\bingredients?\b/i, /\bcooking\b/i, /\bbaking\b/i],
  photo: [/\bphotos?\b/i, /\bphotograph/i, /\btimelapse\b/i, /\bgallery\b/i, /\bphotography\b/i, /\bphotograph(y|s|er)?\b/i],
  video: [/\bvideos?\b/i, /\byoutube\b/i, /\bvimeo\b/i, /\bmovies?\b/i, /\bfilm\b/i],
  ideas: [/\bidea\b/i]
};

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

const plan = JSON.parse(fs.readFileSync(PLAN_PATH, 'utf8'));
const taxonomy = JSON.parse(fs.readFileSync(TAXONOMY_PATH, 'utf8'));
const validTags = new Set(taxonomy.canonicalTags);

// sanity check: every TAG_KEYWORDS key must be canonical
for (const k of Object.keys(TAG_KEYWORDS)) {
  if (!validTags.has(k)) {
    console.error(`TAG_KEYWORDS key "${k}" is not in canonicalTags.`);
    process.exit(1);
  }
}

let totalAdded = 0;
let filesPromoted = 0;
let stillNeedLlm = 0;

const CATEGORY_IMPLIED_TAGS = {
  'Bookmarks': ['bookmark'],
  'Drinking': ['recipe'],
  'Self': ['journal'],
  'Year of Ideas': ['ideas'],
  'Reviews': ['review'],
  'Tips': ['tutorial'],
  'Dice': ['ideas'],
  'Vancouver': ['vancouver'],
  'Travel': []
};

for (const entry of plan) {
  const tags = new Set(entry.proposed.tags);
  const before = tags.size;
  const body = loadBody(entry.filePath);
  const haystack = `${entry.title}\n${body.slice(0, 4000)}`;

  // Conservative matcher: only add a tag if its keyword appears in the title, or
  // appears ≥2 times in the body. Single body mentions are usually tangential
  // (link to an unrelated project, parenthetical aside).
  const title = entry.title;
  for (const [tag, patterns] of Object.entries(TAG_KEYWORDS)) {
    if (tags.size >= 10) break;
    if (tags.has(tag)) continue;
    let matched = false;
    for (const p of patterns) {
      if (p.test(title)) { matched = true; break; }
      const g = new RegExp(p.source, p.flags.includes('g') ? p.flags : p.flags + 'g');
      const bodyMatches = (body.match(g) ?? []).length;
      if (bodyMatches >= 2) { matched = true; break; }
    }
    if (matched) tags.add(tag);
  }

  // category-implied tags
  for (const t of CATEGORY_IMPLIED_TAGS[entry.proposed.category] ?? []) {
    if (tags.size >= 10) break;
    tags.add(t);
  }

  const added = tags.size - before;
  totalAdded += added;
  entry.proposed.tags = [...tags];

  const len = entry.proposed.tags.length;
  if (len >= 3 && len <= 10) {
    if (entry.proposed.tagStatus !== 'ok') filesPromoted += 1;
    entry.proposed.tagStatus = 'ok';
  } else if (len < 3) {
    entry.proposed.tagStatus = 'needs-llm';
    stillNeedLlm += 1;
  } else {
    entry.proposed.tagStatus = 'too-many';
  }
}

fs.writeFileSync(PLAN_PATH, JSON.stringify(plan, null, 2), 'utf8');

console.log(`Keyword-tagger added ${totalAdded} tags across ${plan.length} files.`);
console.log(`Files promoted from needs-llm to ok: ${filesPromoted}`);
console.log(`Files still needing LLM tag-assist: ${stillNeedLlm}`);
