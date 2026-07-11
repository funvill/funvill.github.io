SMALL WORDS — static browser game.

To host: upload the entire contents of this folder to any static web host
(Netlify, GitHub Pages, S3, nginx, etc.). Open index.html at the root.

It must be SERVED over http(s), not opened as a file:// path, because it
loads data/words.json and data/pack.json with fetch(). Any static server works.
There are no build steps, no dependencies, and no network calls off the origin.
