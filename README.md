# WESTERVANE — Digital Marketing & Content Agency

A lightweight, high-performance agency website built with [Astro](https://astro.build/), Vanilla CSS, and headless form handling via [MyFormConnect](https://myformconnect.io).

---

## Quick Start

### 1. Prerequisites
Ensure you have **Node.js 18.14.1+** installed.

### 2. Install Dependencies
```bash
npm install
```

### 3. Setup Environment Variables
Copy `.env.example` to `.env`:
```bash
cp .env.example .env
```

Configure your MyFormConnect endpoints in `.env`:
```env
MFC_ACTION_URL=https://myformcapture.com/f/
MFC_CONTACT_FORM_UUID=your_contact_form_uuid
MFC_NEWSLETTER_FORM_UUID=your_newsletter_form_uuid
MFC_CAREERS_FORM_UUID=your_careers_form_uuid
MFC_KEEP_INFORMED_FORM_UUID=your_keep_informed_form_uuid
```
*(Note: If left empty, forms run in local demo mode and display mock success messages).*

### 4. Run Locally
```bash
npm run dev
```
Open [http://localhost:4321](http://localhost:4321) in your browser.

---

## Available Commands

| Command | Description |
| :--- | :--- |
| `npm run dev` | Starts the local Astro development server |
| `npm run build` | Compiles the production static site into `dist/` |
| `npm run preview` | Previews the production build locally |

---

## Project Structure

```text
├── public/                 # Static assets (robots.txt, favicon, webmanifest)
├── src/
│   ├── components/         # Reusable UI components & form elements
│   ├── config/             # Site metadata & form endpoint configuration
│   │   ├── forms.js        # Maps .env UUIDs to MyFormConnect URLs
│   │   └── site.js         # Site details, navigation links, and contacts
│   ├── content/            # Markdown content collections (blog posts & case studies)
│   ├── layouts/            # Page layouts (Base, Blog, Case Study)
│   ├── pages/              # File-based routes (index, about, services, work, blog, careers, contact)
│   ├── scripts/
│   │   └── site.js         # Client-side scripts (AJAX form submission, drawer, modal)
│   └── styles/             # Vanilla CSS design tokens & component styles
└── .env                    # Environment variables (ignored by Git)
```

---

## Form Handling

Forms submit asynchronously via `fetch()` (AJAX) to MyFormConnect in `src/scripts/site.js`:
- **No Page Redirects**: Submissions happen in the background without redirect screens or countdown timers.
- **Instant Inline Feedback**: Displays instant success or error messages above each form.
- **File Uploads**: Supports resume/CV attachments on the careers form using native `FormData`.

---

## Adding Content

- **Blog Post**: Add a new `.md` file to `src/content/blog/`
- **Case Study**: Add a new `.md` file to `src/content/work/`
