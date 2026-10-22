// @ts-check
import { defineConfig } from "astro/config";

// Static output: Vercel serves the built /dist folder with zero config.
export default defineConfig({
  output: "static",
  trailingSlash: "ignore",
});
