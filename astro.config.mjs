import { defineConfig } from "astro/config";
import sitemap from "@astrojs/sitemap";

// https://astro.build/config
export default defineConfig({
  // Placeholder production domain - easily replaced in production deployment
  site: "https://northandfinch.example",
  integrations: [sitemap()],
  compressHTML: true,
  build: {
    format: "directory"
  }
});
