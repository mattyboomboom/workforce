// @ts-check
import { defineConfig } from "astro/config";

// Static output. BASE_PATH is set by the GitHub Pages workflow (e.g. "/workforce");
// Vercel and local dev leave it unset, so the site is served from "/".
export default defineConfig({
  output: "static",
  site: process.env.SITE_URL || undefined,
  base: process.env.BASE_PATH || "/",
  trailingSlash: "ignore",
});
