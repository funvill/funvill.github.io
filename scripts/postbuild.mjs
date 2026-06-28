import fs from 'node:fs';
import path from 'node:path';

const copies = [
  ['other', 'other'],
  ['favicon.ico', 'favicon.ico'],
  ['keybase.txt', 'keybase.txt'],
  ['CNAME', 'CNAME']
];

const distDir = path.resolve('dist');

function copyRecursive(src, dest) {
  const stat = fs.statSync(src);
  if (stat.isDirectory()) {
    fs.mkdirSync(dest, { recursive: true });
    for (const entry of fs.readdirSync(src)) {
      copyRecursive(path.join(src, entry), path.join(dest, entry));
    }
    return;
  }
  fs.mkdirSync(path.dirname(dest), { recursive: true });
  fs.copyFileSync(src, dest);
}

for (const [src, dest] of copies) {
  if (!fs.existsSync(src)) continue;
  copyRecursive(path.resolve(src), path.join(distDir, dest));
}

// ────────────────────────────────────────────────────────────────────────────
// Uploads inventory + orphan report (Track 3.5)
// Walk public/uploads, list every file with size + mtime, then scan dist/**/*.html
// for references and flag any uploads not referenced anywhere.

const uploadsDir = path.resolve('public', 'uploads');
if (fs.existsSync(uploadsDir)) {
  const inventory = [];
  walkUploads(uploadsDir, '');
  inventory.sort((a, b) => a.path.localeCompare(b.path));

  const manifest = {
    generatedAt: new Date().toISOString(),
    rootCount: inventory.length,
    totalBytes: inventory.reduce((acc, e) => acc + e.bytes, 0),
    files: inventory
  };
  fs.writeFileSync(path.join(distDir, '_uploads-manifest.json'), JSON.stringify(manifest, null, 2));

  const referenced = collectReferencedUploads(distDir);

  // Pair a file with its sibling variants (full-size <-> .thumbnail.<ext>, "_thumb",
  // "-small", "@2x"). If ANY variant in the family is referenced, treat the whole
  // family as referenced — old posts often link only the thumbnail while the
  // full-size lives beside it.
  function stem(p) {
    let prev;
    let cur = p;
    // Iterate — files can have nested variants like Claw-300x270-150x150.jpg
    do {
      prev = cur;
      cur = cur
        .replace(/\.thumbnail(?=\.[^./]+$)/i, '')
        .replace(/[._-](thumb|thumbnail|small|sm|preview|med|medium|lg|large|orig|original)(?=\.[^./]+$)/i, '')
        .replace(/@[123]x(?=\.[^./]+$)/i, '')
        .replace(/-\d{2,4}x\d{2,4}(?=\.[^./]+$)/i, ''); // WordPress -WxH variants
    } while (cur !== prev);
    return cur.toLowerCase();
  }
  function caseInsensitive(p) { return p.toLowerCase(); }

  const referencedStems = new Set();
  const referencedCi = new Set();
  for (const p of referenced) {
    referencedCi.add(caseInsensitive(p));
    referencedStems.add(stem(p));
  }

  const orphans = inventory
    .filter((entry) => {
      if (referenced.has(entry.path)) return false;
      if (referencedCi.has(caseInsensitive(entry.path))) return false;
      if (referencedStems.has(stem(entry.path))) return false;
      return true;
    })
    .map((entry) => ({ path: entry.path, bytes: entry.bytes, mtime: entry.mtime }));

  const orphansReport = {
    generatedAt: manifest.generatedAt,
    note: 'Files under public/uploads/ that are not referenced from any built HTML page. NOT auto-deleted — review and remove manually.',
    referencedCount: referenced.size,
    orphanCount: orphans.length,
    orphanBytes: orphans.reduce((acc, e) => acc + e.bytes, 0),
    orphans
  };
  fs.writeFileSync(path.join(distDir, '_uploads-orphans.json'), JSON.stringify(orphansReport, null, 2));
  console.log(`uploads: ${inventory.length} files, ${orphans.length} orphans (${(orphansReport.orphanBytes / 1024 / 1024).toFixed(1)} MB)`);

  function walkUploads(dir, relative) {
    for (const name of fs.readdirSync(dir)) {
      if (name.startsWith('.')) continue;
      const full = path.join(dir, name);
      const rel = relative ? `${relative}/${name}` : name;
      const stat = fs.statSync(full);
      if (stat.isDirectory()) { walkUploads(full, rel); continue; }
      inventory.push({ path: rel, bytes: stat.size, mtime: stat.mtime.toISOString() });
    }
  }

  function collectReferencedUploads(root) {
    const refs = new Set();
    // Terminate on quotes, whitespace, ), >, &  — & catches HTML-encoded &quot; ; ' etc.
    const re = /\/uploads\/([^"'\s)>&]+)/g;
    walkHtml(root);
    return refs;

    function walkHtml(dir) {
      for (const name of fs.readdirSync(dir)) {
        const full = path.join(dir, name);
        const stat = fs.statSync(full);
        if (stat.isDirectory()) { walkHtml(full); continue; }
        if (!/\.(html|xml|json|css|js)$/i.test(name)) continue;
        const raw = fs.readFileSync(full, 'utf8');
        // Decode common HTML entities so &quot;-wrapped URLs match.
        const content = raw
          .replace(/&quot;/g, '"')
          .replace(/&#34;/g, '"')
          .replace(/&#39;/g, "'")
          .replace(/&apos;/g, "'")
          .replace(/&amp;/g, '&');
        let m;
        while ((m = re.exec(content)) != null) {
          let p = m[1].split('?')[0].split('#')[0];
          try { p = decodeURI(p); } catch { /* keep raw */ }
          p = p.replace(/\\/g, '/');
          refs.add(p);
        }
      }
    }
  }
}
