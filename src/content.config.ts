import { defineCollection, z } from "astro:content";
import { glob } from "astro/loaders";

const blog = defineCollection({
  loader: glob({ pattern: "**/*.md", base: "./src/content/blog" }),
  schema: z.object({
    title: z.string(),
    description: z.string(),
    publishDate: z.string(),
    updatedDate: z.string().optional(),
    author: z.string(),
    category: z.string(),
    tags: z.array(z.string()),
    image: z.string(),
    readingTime: z.string(),
    featured: z.boolean().default(false)
  })
});

const work = defineCollection({
  loader: glob({ pattern: "**/*.md", base: "./src/content/work" }),
  schema: z.object({
    title: z.string(),
    client: z.string(),
    industry: z.string(),
    services: z.array(z.string()),
    description: z.string(),
    heroImage: z.string(),
    previewImage: z.string(),
    metrics: z.array(
      z.object({
        label: z.string(),
        value: z.string()
      })
    ),
    isConcept: z.boolean().default(true)
  })
});

export const collections = {
  blog,
  work
};
