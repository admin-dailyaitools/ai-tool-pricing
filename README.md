# AI tool pricing dataset

Every pricing tier [dailyaitools](https://dailyaitools.ai/data/) tracks for 100 AI tools
(392 tiers), plus the price moves it has recorded. Each figure was read off the
vendor's own pricing page and confirmed against that text. Nothing is estimated, converted
between currencies, or averaged.

- `latest/`: the current files, as of 2026-11-01
- `snapshots/YYYY-MM/`: one frozen copy per month

| file | contents |
| --- | --- |
| `pricing.csv` | one row per tier |
| `pricing.json` | the same rows, with licence and date in the file |
| `changes.csv` | recorded price and plan moves |

Column meanings and inclusion rules: https://dailyaitools.ai/data/

## Licence

[CC BY 4.0](https://creativecommons.org/licenses/by/4.0/). Use it for anything, including
commercially, and credit the source with a link:

> Source: dailyaitools.ai (https://dailyaitools.ai/data/), CC BY 4.0

Spotted a figure that no longer matches a vendor's page? Email contact@dailyaitools.ai.
