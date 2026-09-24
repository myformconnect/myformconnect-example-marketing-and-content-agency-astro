# North & Finch — London Marketing & Content Agency

North & Finch is a production-quality marketing agency demo website designed for a fictional London-based digital marketing, content, and SEO agency.

This project was built to illustrate a clean, content-first, lightweight, and SEO-driven architecture using Astro, vanilla CSS, and static Markdown content collections.

---

## Table of Contents

1. [Project Overview](#project-overview)
2. [Tech Stack](#tech-stack)
3. [Key Architecture Principles](#key-architecture-principles)
4. [Installation & Setup](#installation--setup)
5. [Development Commands](#development-commands)
6. [Folder Structure](#folder-structure)
7. [How to Add a Blog Article](#how-to-add-a-blog-article)
8. [How to Add a Case Study](#how-to-add-a-case-study)
9. [How to Replace Images](#how-to-replace-images)
10. [How to Configure Form Endpoints](#how-to-configure-form-endpoints)
11. [How SEO & Structured Data Are Handled](#how-seo--structured-data-are-handled)
12. [Deployment Guide](#deployment-guide)

---

## 1. Project Overview

- **Brand**: North & Finch
- **Positioning**: London-based digital marketing agency helping ambitious brands grow through strategy, content, SEO, digital campaigns, and creative marketing.
- **Design Aesthetic**: Editorial, sophisticated, minimal, typography-driven, asymmetric layouts, restrained shadows, warm terracotta accents (`#C54B2C`), and near-black typography (`#111111`).
- **Nature of Project**: Demonstration concept website featuring realistic copy, strategic case studies, and editorial essays.

---

## 2. Tech Stack

- **Framework**: [Astro](https://astro.build/) (Static Site Generation / Multi-Page Architecture)
- **Styling**: Vanilla CSS with modern CSS variables, fluid clamping (`clamp()`), and responsive grid layouts.
- **Scripting**: Native ES6 JavaScript (No React, Vue, Svelte, Tailwind, jQuery, or heavy animation libraries).
- **SEO & Sitemap**: Built-in JSON-LD schemas and `@astrojs/sitemap`.
- **Forms**: Pure native HTML form submission to configurable third-party form endpoints.

---

## 3. Key Architecture Principles

- **Zero JavaScript Runtime Bloat**: Scripts are limited to subtle sticky header transitions, mobile navigation drawer, dialog focus traps, and an IntersectionObserver scroll reveal.
- **Accessibility (a11y)**: Semantic HTML5 landmark tags (`<main>`, `<header>`, `<article>`, `<section>`, `<nav>`, `<footer>`), skip-to-content links, visible focus outlines, full keyboard navigation, and `prefers-reduced-motion` compliance.
- **Performance First**: Optimized layout shifts (aspect ratios and explicit dimensions), no render-blocking external web font files, and pre-compressed static assets.

---

## 4. Installation & Setup

Ensure you have Node.js (v18.14.1 or newer) installed.

```bash
# Clone or navigate into the project directory
cd myformconnect-example-marketing-and-content-agency-astro

# Install dependencies
npm install
```

---

## 5. Development Commands

| Command | Action |
| :--- | :--- |
| `npm run dev` | Starts the Astro development server at `http://localhost:4321` |
| `npm run build` | Compiles the production-ready static site into `dist/` |
| `npm run preview` | Runs a local server to preview the production build |

---

## 6. Folder Structure

```text
├── public/
│   ├── favicon.svg             # Minimal geometric SVG monogram
│   ├── robots.txt              # Search engine crawler instructions
│   └── site.webmanifest        # PWA metadata
├── src/
│   ├── assets/
│   │   └── images/             # Reserved for local optimized imagery
│   │       ├── about/
│   │       ├── blog/
│   │       ├── hero/
│   │       └── work/
│   ├── components/
│   │   ├── BlogCard.astro      # Article cards with date & reading time
│   │   ├── Button.astro        # Accessible button & link variants
│   │   ├── CareersForm.astro   # Modal talent network application form
│   │   ├── ContactForm.astro   # Main project inquiry form
│   │   ├── ExitIntentPopup.astro # Timed exit-intent lead capture dialog
│   │   ├── Footer.astro        # Agency footer & copyright
│   │   ├── Header.astro        # Sticky header & mobile navigation drawer
│   │   ├── NewsletterForm.astro# Clean newsletter subscription component
│   │   ├── Reveal.astro        # IntersectionObserver animation wrapper
│   │   ├── SectionHeading.astro# Eyebrow, title, & description header
│   │   ├── SEO.astro           # Dynamic meta, OG, Twitter & JSON-LD
│   │   ├── ServiceCard.astro   # Numbered capability cards
│   │   ├── SocialLinks.astro   # Inline SVG social media links
│   │   └── WorkCard.astro      # Case study cards with metadata
│   ├── config/
│   │   ├── forms.js            # Centralized third-party form endpoints
│   │   └── site.js             # Brand name, URLs, address, and navigation
│   ├── content/
│   │   ├── config.ts           # Astro content collection schemas (Zod)
│   │   ├── blog/               # Markdown editorial articles
│   │   └── work/               # Markdown case studies
│   ├── data/
│   │   └── images.js           # Centralized remote Unsplash imagery
│   ├── layouts/
│   │   ├── BaseLayout.astro    # Global master layout (SEO, Header, Footer)
│   │   ├── BlogLayout.astro    # Article layout with breadcrumbs & schema
│   │   └── CaseStudyLayout.astro # Project layout with metrics & deliverables
│   ├── pages/
│   │   ├── 404.astro           # Not found page
│   │   ├── about.astro         # About, approach, team, and careers modal
│   │   ├── blog.astro          # Blog archive & category filter
│   │   ├── blog/[slug].astro   # Dynamic blog article routes
│   │   ├── contact.astro       # Contact details & inquiry form
│   │   ├── index.astro         # Agency homepage
│   │   ├── services.astro      # 5 core services & deliverables
│   │   ├── work.astro          # Case study listing
│   │   └── work/[slug].astro   # Dynamic case study routes
│   ├── scripts/
│   │   └── site.js             # Vanilla JS for header, modal, and reveals
│   └── styles/
│       ├── components.css      # Component-level styling & typography
│       ├── global.css          # CSS reset, variables, & color tokens
│       └── utilities.css       # Grid, flex, and spacing helpers
├── astro.config.mjs            # Astro configuration & sitemap setup
└── package.json
```

---

## 7. How to Add a Blog Article

1. Create a new `.md` file inside `src/content/blog/`, e.g. `my-new-post.md`.
2. Add the required frontmatter properties:

```markdown
---
title: "Your Compelling Headline"
description: "A 1-2 sentence executive summary of the article."
publishDate: "2026-09-24"
updatedDate: "2026-09-25" # Optional
author: "Maya Bennett"
category: "Strategy" # "SEO" | "Content" | "Strategy" | "Digital Marketing"
tags: ["Search", "Growth", "Editorial"]
image: "https://images.unsplash.com/photo-..."
readingTime: "6 min read"
featured: false # Set to true to highlight on /blog
---

Write your article here using standard Markdown headers (##, ###), blockquotes, and lists.
```

The article will automatically generate at `/blog/my-new-post` with full metadata and JSON-LD schema.

---

## 8. How to Add a Case Study

1. Create a new `.md` file inside `src/content/work/`, e.g. `acme-corp.md`.
2. Include the required frontmatter:

```markdown
---
title: "Headline Describing the Commercial Outcome"
client: "Acme Corp"
industry: "Enterprise SaaS"
services: ["Brand Strategy", "Technical SEO", "Content"]
description: "Summary of the challenge and transformation."
heroImage: "https://images.unsplash.com/..."
previewImage: "https://images.unsplash.com/..."
metrics:
  - value: "+240%"
    label: "Inbound Pipeline"
  - value: "£1.2M"
    label: "Net New Revenue"
  - value: "Top 3"
    label: "Rankings for Category Terms"
isConcept: true
---

## The Challenge
Describe the initial friction...

## The Strategic Approach
Detail your methodology...

## The Results
Summarize the impact...
```

The case study will automatically render at `/work/acme-corp`.

---

## 9. How to Replace Images

During demo phase, images are referenced centrally in `src/data/images.js`.

To migrate from remote Unsplash images to local optimized images:
1. Place image files in `src/assets/images/hero/`, `work/`, `blog/`, or `about/`.
2. In your Astro pages or components, import them using Astro's image optimization:

```astro
---
import { Image } from "astro:assets";
import heroImg from "../assets/images/hero/hero.jpg";
---

<Image
  src={heroImg}
  alt="North & Finch London Studio"
  width={1200}
  height={800}
/>
```

---

## 10. How to Configure Form Endpoints

North & Finch does not use a custom server or API route backend. Instead, form submissions post directly to external third-party form services (e.g. MyFormConnect, Basin, Formspree, Getform).

Open `src/config/forms.js` and paste your actual endpoints:

```javascript
export const formEndpoints = {
  contact: "https://myformconnect.example/f/your-contact-id",
  newsletter: "https://myformconnect.example/f/your-newsletter-id",
  careers: "https://myformconnect.example/f/your-careers-id",
  keepInformed: "https://myformconnect.example/f/your-keep-informed-id"
};
```

When left as placeholder strings, client-side scripts in `site.js` gracefully simulate submission success for interactive demonstrations.

---

## 11. How SEO & Structured Data Are Handled

- **Metadata**: Every route provides a unique title tag, descriptive meta description, and canonical URL generated via `src/components/SEO.astro`.
- **OpenGraph & Twitter Cards**: Dynamic social sharing cards are output on all pages, inner case studies, and blog posts.
- **Structured Data (JSON-LD)**:
  - **Homepage & Global**: `MarketingAgency` schema with address, contact details, and social links.
  - **Services Page**: `Service` and `OfferCatalog` schema detailing agency offerings.
  - **Blog Articles**: Semantic `BlogPosting` schema including author, publisher, and timestamp information.
  - **Case Studies**: `CreativeWork` schema linked to client brands.
  - **Inner Pages**: `BreadcrumbList` schema for search engine breadcrumbs.
- **Sitemap**: Generated automatically at build time via `@astrojs/sitemap` and referenced in `public/robots.txt`.

---

## 12. Deployment Guide

Because North & Finch builds as static HTML, CSS, and vanilla JS, it can be deployed to any static host:

### Cloudflare Pages
- **Build command**: `npm run build`
- **Output directory**: `dist`

### Vercel
- **Framework Preset**: Astro
- **Build command**: `npm run build`
- **Output directory**: `dist`

### Netlify
- **Build command**: `npm run build`
- **Publish directory**: `dist`
