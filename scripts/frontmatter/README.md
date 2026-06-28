# Frontmatter migration pipeline

Five-phase pipeline that brings all `_posts/` and `_projects/` files to a uniform frontmatter schema with a finite category/tag taxonomy and AI-tell-free excerpts. See [`../../ai-writing-rules.md`](../../ai-writing-rules.md) for the excerpt rules and [`../../C:/Users/funvill/.claude/plans/review-this-article-on-cheeky-hammock.md`](../../../../.claude/plans/review-this-article-on-cheeky-hammock.md) for the full plan.

All output goes to `scripts/frontmatter/out/` (gitignored).

## Run order

```sh
node scripts/frontmatter/01-audit.mjs              # Phase A: read-only audit
node scripts/frontmatter/02-propose-taxonomy.mjs   # Phase B: cluster cats/tags + per-file plan
node scripts/frontmatter/03-excerpts.mjs           # Phase C.1: emit excerpts-todo.jsonl
# (then a Claude session fills excerpts-done.jsonl)
node scripts/frontmatter/04-merge-excerpts.mjs     # Phase C.2: merge generated excerpts
node scripts/frontmatter/05-apply.mjs --dry-run    # Phase D dry-run
node scripts/frontmatter/05-apply.mjs              # Phase D apply
node scripts/frontmatter/06-verify.mjs             # Phase E: build + URL diff
```

## Phase A — Audit (this script)

Reads every markdown file in `_posts/`, `_projects/`, `_pages/`, `_flockingai/` and reports:
- field presence per collection
- date-field shape (`date` vs `post_date` vs both)
- tag-field shape (string vs array vs missing)
- line endings (CRLF vs LF)
- teaser-path prefix distribution
- every unique category value + count
- every unique tag value + count
- slug-derivation collisions
- count of titles containing characters that need double-quoting
- YAML parse errors

Read `out/audit-summary.md` after running. Nothing is written to content files.
