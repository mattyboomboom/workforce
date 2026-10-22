# UK Jobs by Gender

A static Astro + TypeScript site that ranks UK occupations from most male to most female, with a page for each job.

## Data

All headcounts come from **Working Futures 2024** (Warwick IER for the Department for Education), based on the ONS Labour Force Survey, published via [CareerSmart](https://careersmart.org.uk/node/497). Extra notes on some role pages cite Ciphr (ONS Nomis), BCS and the NMC.

- Occupation data: `src/data/occupations.ts`
- Derived figures (shares, rankings, coverage): `src/lib/stats.ts`

To add a job, append an entry to `occupationInputs` with the exact Working Futures label and its female and male counts. Sorting, coverage, the chart and the new role page update automatically.

## Run locally

```bash
npm install
npm run dev      # http://localhost:4321
npm run build    # type-checks, then outputs static files to dist/
```

## Deploy on Vercel

Import the repo in Vercel. It detects Astro automatically: build command `npm run build`, output directory `dist`. No adapter or environment variables are needed.

## Deploy on GitHub Pages

1. Push this folder to a GitHub repo, with `main` as the default branch.
2. In the repo, go to **Settings → Pages** and set **Source** to **GitHub Actions**.
3. Push to `main`, or run the workflow by hand from the **Actions** tab. The site publishes to `https://<user>.github.io/<repo>/`.

The workflow in `.github/workflows/deploy.yml` sets `BASE_PATH` to the repo name so links work under that subfolder. If you add a custom domain, change `BASE_PATH` to `/` in the workflow.
