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
