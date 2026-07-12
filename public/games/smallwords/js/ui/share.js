// Round-end share card: a childlike PNG drawn on a canvas, plus text.
// Uses the Web Share API when available (mostly mobile), otherwise copies the
// text to the clipboard or downloads the image. All client-side, no network.

const MODE_LABEL = {
  guess: 'Take Your Time',
  timed: 'Beat the Clock',
  write: 'Submit',
  pass: 'Pass & Play',
  endless: 'Take Your Time',
  daily: 'Daily Puzzle',
};

/** Headline (big) and sub (small) strings for a summary. */
function scoreLines(summary) {
  switch (summary.mode) {
    case 'guess':
    case 'timed':
    case 'daily':
      return { headline: `${summary.score}`, unit: 'points', sub: summary.rank };
    case 'write':
      return { headline: '★'.repeat(summary.stars) + '☆'.repeat(summary.maxStars - summary.stars), unit: '', sub: `${summary.points} points` };
    case 'pass': {
      const [p1, p2] = summary.scores;
      return { headline: `${p1} – ${p2}`, unit: '', sub: p1 === p2 ? 'A tie!' : `Player ${p1 > p2 ? 1 : 2} wins` };
    }
    case 'endless':
      return { headline: `${summary.solved}`, unit: 'solved', sub: `${summary.points} points` };
    default:
      return { headline: '', unit: '', sub: '' };
  }
}

export function buildShareText(summary) {
  const mode = MODE_LABEL[summary.mode] || summary.mode;
  const { headline, unit, sub } = scoreLines(summary);
  const score = [headline, unit].filter(Boolean).join(' ');
  const line = [score, sub].filter(Boolean).join(' · ');
  const url = location.origin + location.pathname;
  const grid = summary.mode === 'daily' && summary.grid ? `\n${summary.grid}` : '';
  return `SMALL WORDS 🔤 — ${mode}${grid}\n${line}\nA kid explains, you guess. Can you beat me?\n${url}`;
}

function roundRect(x, a, b, w, h, r) {
  x.beginPath();
  x.moveTo(a + r, b);
  x.arcTo(a + w, b, a + w, b + h, r);
  x.arcTo(a + w, b + h, a, b + h, r);
  x.arcTo(a, b + h, a, b, r);
  x.arcTo(a, b, a + w, b, r);
  x.closePath();
}

/** Draw the share card and resolve to a PNG Blob. */
export function drawShareCard(summary) {
  const W = 640, H = 420;
  const c = document.createElement('canvas');
  c.width = W; c.height = H;
  const x = c.getContext('2d');
  const ink = '#2A2622', paper = '#FBF6EA', blue = '#2B6CB0', green = '#3E8E5A', yellow = '#F2C94C', red = '#D64545';

  x.fillStyle = paper; x.fillRect(0, 0, W, H);
  x.strokeStyle = ink; x.lineWidth = 6;
  roundRect(x, 18, 18, W - 36, H - 36, 30); x.stroke();

  x.textAlign = 'center'; x.textBaseline = 'alphabetic';

  // little kid doodle top-left
  drawKid(x, 78, 96, summary);

  x.fillStyle = ink;
  x.font = 'bold 42px "Comic Sans MS", "Comic Neue", sans-serif';
  x.fillText('SMALL WORDS', W / 2 + 24, 84);

  x.font = '22px "Trebuchet MS", sans-serif';
  x.fillStyle = blue;
  x.fillText(MODE_LABEL[summary.mode] || summary.mode, W / 2 + 24, 116);

  const { headline, unit, sub } = scoreLines(summary);
  x.fillStyle = summary.mode === 'write' ? yellow : blue;
  x.font = 'bold 92px "Comic Sans MS", sans-serif';
  x.fillText(headline, W / 2, 250);
  if (summary.mode === 'write') { x.strokeStyle = ink; x.lineWidth = 2; x.strokeText(headline, W / 2, 250); }

  if (unit) {
    x.fillStyle = ink; x.font = '26px "Trebuchet MS", sans-serif';
    x.fillText(unit, W / 2, 286);
  }
  x.fillStyle = green; x.font = 'bold 30px "Trebuchet MS", sans-serif';
  x.fillText(sub, W / 2, unit ? 328 : 300);

  x.fillStyle = ink; x.font = '20px "Courier New", monospace';
  x.fillText('a kid explains · you guess', W / 2, 382);

  return new Promise((resolve) => c.toBlob(resolve, 'image/png'));
}

function drawKid(x, cx, cy, summary) {
  const ink = '#2A2622';
  // dress
  x.fillStyle = '#F2C94C'; x.strokeStyle = ink; x.lineWidth = 4;
  x.beginPath(); x.moveTo(cx - 26, cy + 34); x.quadraticCurveTo(cx, cy - 12, cx + 26, cy + 34); x.closePath();
  x.fill(); x.stroke();
  // head
  x.fillStyle = '#fff';
  x.beginPath(); x.arc(cx, cy - 10, 26, 0, Math.PI * 2); x.fill(); x.stroke();
  // hair
  x.beginPath(); x.moveTo(cx - 22, cy - 20); x.quadraticCurveTo(cx, cy - 46, cx + 22, cy - 20); x.stroke();
  // eyes
  x.fillStyle = ink;
  x.beginPath(); x.arc(cx - 9, cy - 12, 3, 0, Math.PI * 2); x.fill();
  x.beginPath(); x.arc(cx + 9, cy - 12, 3, 0, Math.PI * 2); x.fill();
  // mouth: happy for a good result, sad for a poor one
  const good = summary.mode === 'endless' ? summary.solved >= 5
    : summary.mode === 'write' ? summary.stars >= summary.maxStars * 0.5
    : summary.mode === 'pass' ? true
    : summary.score >= 300;
  x.strokeStyle = ink; x.lineWidth = 3; x.beginPath();
  if (good) { x.moveTo(cx - 8, cy - 2); x.quadraticCurveTo(cx, cy + 8, cx + 8, cy - 2); }
  else { x.moveTo(cx - 8, cy + 5); x.quadraticCurveTo(cx, cy - 3, cx + 8, cy + 5); }
  x.stroke();
}

let toastTimer = null;
function toast(msg) {
  const el = document.getElementById('share-toast');
  if (!el) return;
  el.textContent = msg;
  clearTimeout(toastTimer);
  toastTimer = setTimeout(() => { el.textContent = ''; }, 2500);
}

async function copyText(text) {
  try {
    await navigator.clipboard.writeText(text);
    return true;
  } catch {
    try {
      const ta = document.createElement('textarea');
      ta.value = text; ta.style.position = 'fixed'; ta.style.opacity = '0';
      document.body.appendChild(ta); ta.select();
      const ok = document.execCommand('copy');
      document.body.removeChild(ta);
      return ok;
    } catch { return false; }
  }
}

/** Wire the end-screen Share / Save buttons for this summary. */
export function setupShare(app, summary) {
  const shareBtn = document.getElementById('btn-share');
  const saveBtn = document.getElementById('btn-save-card');
  const text = buildShareText(summary);
  document.getElementById('share-toast').textContent = '';

  shareBtn.onclick = async () => {
    try {
      const blob = await drawShareCard(summary);
      const file = new File([blob], 'small-words.png', { type: 'image/png' });
      if (navigator.canShare && navigator.canShare({ files: [file] })) {
        await navigator.share({ files: [file], text, title: 'SMALL WORDS' });
        return;
      }
      if (navigator.share) {
        await navigator.share({ text, title: 'SMALL WORDS' });
        return;
      }
      toast((await copyText(text)) ? 'Score copied to clipboard!' : 'Could not copy.');
    } catch (err) {
      if (err && err.name === 'AbortError') return; // user dismissed the share sheet
      toast((await copyText(text)) ? 'Score copied to clipboard!' : 'Sharing not available.');
    }
  };

  saveBtn.onclick = async () => {
    try {
      const blob = await drawShareCard(summary);
      const url = URL.createObjectURL(blob);
      const a = document.createElement('a');
      a.href = url; a.download = 'small-words.png';
      document.body.appendChild(a); a.click(); a.remove();
      setTimeout(() => URL.revokeObjectURL(url), 1000);
      toast('Card saved!');
    } catch { toast('Could not make the card.'); }
  };
}
