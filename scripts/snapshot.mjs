// Pull the current files from https://dailyaitools.ai/data/ and store them as
// latest/ plus a dated snapshots/YYYY-MM/ copy. Run monthly by
// .github/workflows/snapshot.yml; the site's /data/ files are the source of
// truth, this repo is the citable archive.
import { mkdirSync, writeFileSync } from 'node:fs';

const BASE = 'https://dailyaitools.ai/data/';
const FILES = ['pricing.csv', 'pricing.json', 'changes.csv'];

const got = {};
for (const f of FILES) {
  const res = await fetch(BASE + f);
  if (!res.ok) throw new Error(`${f}: HTTP ${res.status}`);
  got[f] = await res.text();
}
const meta = JSON.parse(got['pricing.json']);
if (!Array.isArray(meta.rows) || meta.rows.length === 0) throw new Error('pricing.json has no rows; refusing to overwrite');
const month = String(meta.asOf ?? new Date().toISOString()).slice(0, 7);

for (const dir of ['latest', `snapshots/${month}`]) {
  mkdirSync(dir, { recursive: true });
  for (const f of FILES) writeFileSync(`${dir}/${f}`, got[f]);
}

writeFileSync(
  'README.md',
  `# AI tool pricing dataset

Every pricing tier [dailyaitools](https://dailyaitools.ai/data/) tracks for ${meta.tools} AI tools
(${meta.rows.length} tiers), plus the price moves it has recorded. Each figure was read off the
vendor's own pricing page and confirmed against that text. Nothing is estimated, converted
between currencies, or averaged.

- \`latest/\`: the current files, as of ${meta.asOf}
- \`snapshots/YYYY-MM/\`: one frozen copy per month

| file | contents |
| --- | --- |
| \`pricing.csv\` | one row per tier |
| \`pricing.json\` | the same rows, with licence and date in the file |
| \`changes.csv\` | recorded price and plan moves |

Column meanings and inclusion rules: https://dailyaitools.ai/data/

## Licence

[CC BY 4.0](https://creativecommons.org/licenses/by/4.0/). Use it for anything, including
commercially, and credit the source with a link:

> ${meta.attribution}

Spotted a figure that no longer matches a vendor's page? Email contact@dailyaitools.ai.
`
);
console.log(`snapshot ${month}: ${meta.rows.length} tiers, ${meta.tools} tools, as of ${meta.asOf}`);
