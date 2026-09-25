import { defineConfig } from "astro/config";
import sitemap from "@astrojs/sitemap";

// Full config documentation: https://astro.build/config
export default defineConfig({
  // Update this with your live website address when deploying
  site: "https://westervane.example",
  image: {
    // Allows Astro to download, resize, and convert images from Unsplash to WebP
    domains: ["images.unsplash.com"]
  },
  integrations: [sitemap()],
  compressHTML: true,
  build: {
    format: "directory"
  }
});
