# Astro Form Integration Guide — MyFormConnect (MFC)

> A complete, beginner-friendly guide to adding working forms to any Astro website or agency landing page in under 10 minutes. No backend, no server routes, no `.env` setup, and no email services required.

---

## Overview

[MyFormConnect](https://myformconnect.io) lets you collect form submissions directly from your Astro site without setting up a Node.js backend, configuring database connections, or paying for external email APIs. 

Astro generates blazing-fast static pages, and MyFormConnect acts as your plug-and-play form backend. You simply create a form in your dashboard, copy your unique **Form Action URL**, and paste it directly into your Astro component. MyFormConnect handles submission storage, file attachments (e.g. resumes), spam filtering, honeypot protection, and instant email alerts automatically.

When a visitor submits your form:
1. The submission is captured instantly with built-in spam and honeypot checks filtering out automated bots.
2. Responses are saved securely in your dashboard, and an email notification is sent to you immediately.
3. Your Astro page displays a smooth, inline confirmation message without reloading the page or redirecting away.

---

## Prerequisites

Before starting, make sure you have:
- A **MyFormConnect account** — [Sign up here (Free)](https://myformconnect.io/users/sign_up)
- A form created in your [MyFormConnect Dashboard](https://myformconnect.io/account/)
- Your unique **FORM ACTION URL** (e.g. `https://myformconnect.io/f/7db4d175-ba9c-4fd7-974b-3c9e4601247e`)
- Any existing Astro project running locally (Astro 3.x, 4.x, or 5.x)

---

## 3-Step Quick Start

### Step 1: Create Your Form & Copy Your Form Action URL

1. **Log in to your Dashboard**:
   Sign in to your **[MyFormConnect Dashboard](https://myformconnect.io/account/)**.

2. **Navigate to Domains**:
   Click on **Domains** in the top navigation bar.

3. **Add or Select a Domain**:
   Click **Add New Domain** (or select an existing domain to add forms to it).

4. **Enter Your Domain Details**:
   - **Domain Name**: Provide a descriptive name for your project (e.g., `Agency Site Local` or `Client Marketing Site`).
   - **Domain URL**: Enter the URL where your Astro website runs:
     - **For local development**: `http://localhost:4321` *(Astro's default port)*.
     - **For production**: Your deployed agency website URL (e.g., `https://youragency.com`).

5. **Create the Domain**:
   Click the **Create Domain** button to save your domain.

6. **Add a New Form**:
   On the domain overview page, scroll down to the **Forms** section and click **Add New Form**.

7. **Configure Form Fields**:
   Fill in your **Form Name** (e.g., `Client Contact Form`) and click **Create Form**.

8. **Copy Your Form Action URL**:
   Once created, MyFormConnect generates your unique **Form Action URL**. Copy this URL:
   ```text
   https://myformconnect.io/f/YOUR_FORM_UUID
   ```
   *(Example: `https://myformconnect.io/f/7db4d175-ba9c-4fd7-974b-3c9e4601247e`)*

> 💡 **Tip:** Adding `http://localhost:4321` as your Domain URL ensures local submissions succeed during development without encountering domain restriction or CORS issues.

---

### Step 2: Create Your Astro Form Component

Create a new file in your Astro project at `src/components/ContactForm.astro`.

Paste the code below, and replace `https://myformconnect.io/f/YOUR_FORM_UUID` with the Form Action URL you copied in Step 1.

No `.env` or complex configuration needed — paste your URL directly into the `FORM_ACTION_URL` variable at the top of the file:

```astro
---
// src/components/ContactForm.astro
// 1. Paste your unique MyFormConnect Form Action URL here:
const FORM_ACTION_URL = "https://myformconnect.io/f/YOUR_FORM_UUID";
---

<div class="mfc-contact-card">
  <!-- Inline feedback message (displays success or error) -->
  <div id="form-feedback" class="feedback-box" style="display: none;"></div>

  <form id="contact-form" action={FORM_ACTION_URL} method="POST">
    <div class="form-group">
      <label for="name">Full Name *</label>
      <input type="text" id="name" name="name" placeholder="Jane Doe" required />
    </div>

    <div class="form-group">
      <label for="email">Work Email *</label>
      <input type="email" id="email" name="email" placeholder="jane@company.com" required />
    </div>

    <div class="form-group">
      <label for="service">Service Needed</label>
      <select id="service" name="service">
        <option value="Content Marketing">Content Marketing & Editorial</option>
        <option value="SEO Strategy">SEO & Organic Growth</option>
        <option value="Digital Campaigns">Digital Advertising</option>
        <option value="Branding">Brand Positioning</option>
        <option value="General Enquiry">General Enquiry</option>
      </select>
    </div>

    <div class="form-group">
      <label for="message">Project Details *</label>
      <textarea id="message" name="message" rows="4" placeholder="Tell us about your brand and what you're looking to achieve..." required></textarea>
    </div>

    <button type="submit" id="submit-btn" class="submit-button">
      Send Message
    </button>

    <p class="powered-by">
      Powered by <a href="https://myformconnect.io" target="_blank" rel="noopener noreferrer">MFC</a>
    </p>
  </form>
</div>

<script>
  const form = document.getElementById("contact-form") as HTMLFormElement;
  const feedback = document.getElementById("form-feedback") as HTMLDivElement;
  const submitBtn = document.getElementById("submit-btn") as HTMLButtonElement;

  if (form) {
    form.addEventListener("submit", async (e) => {
      // 1. Prevent default full-page reload
      e.preventDefault();

      // 2. Disable button and show sending status
      submitBtn.disabled = true;
      submitBtn.textContent = "Sending...";
      feedback.style.display = "none";

      try {
        // 3. Post form data directly to MyFormConnect
        const response = await fetch(form.action, {
          method: "POST",
          headers: {
            Accept: "application/json",
            "X-Requested-With": "XMLHttpRequest",
          },
          body: new FormData(form),
        });

        if (response.ok) {
          // Success! Show confirmation and reset form
          feedback.textContent = "Thank you! Your message has been received. We will get back to you shortly.";
          feedback.className = "feedback-box success";
          feedback.style.display = "block";
          form.reset();
        } else {
          throw new Error("Submission failed");
        }
      } catch (err) {
        // Error handling
        feedback.textContent = "Unable to submit your message right now. Please try again or email us directly.";
        feedback.className = "feedback-box error";
        feedback.style.display = "block";
      } finally {
        // Restore button state
        submitBtn.disabled = false;
        submitBtn.textContent = "Send Message";
      }
    });
  }
</script>

<style>
  .mfc-contact-card {
    max-width: 520px;
    width: 100%;
    margin: 0 auto;
    padding: 28px;
    background: #ffffff;
    border: 1px solid #e2e8f0;
    border-radius: 12px;
    box-shadow: 0 4px 16px rgba(0, 0, 0, 0.04);
    box-sizing: border-box;
    font-family: inherit;
  }

  .form-group {
    display: flex;
    flex-direction: column;
    margin-bottom: 16px;
  }

  .form-group label {
    font-size: 13px;
    font-weight: 600;
    color: #1e293b;
    margin-bottom: 6px;
  }

  .form-group input,
  .form-group select,
  .form-group textarea {
    width: 100%;
    box-sizing: border-box;
    padding: 10px 14px;
    border: 1px solid #cbd5e1;
    border-radius: 6px;
    font-size: 14px;
    font-family: inherit;
    color: #0f172a;
    outline: none;
    transition: border-color 0.15s ease;
  }

  .form-group input:focus,
  .form-group select:focus,
  .form-group textarea:focus {
    border-color: #2563eb;
    box-shadow: 0 0 0 3px rgba(37, 99, 235, 0.1);
  }

  .submit-button {
    width: 100%;
    padding: 12px;
    background: #2563eb;
    color: #ffffff;
    font-size: 14px;
    font-weight: 600;
    border: none;
    border-radius: 6px;
    cursor: pointer;
    transition: background-color 0.15s ease, opacity 0.15s ease;
  }

  .submit-button:hover:not(:disabled) {
    background: #1d4ed8;
  }

  .submit-button:disabled {
    opacity: 0.7;
    cursor: not-allowed;
  }

  .feedback-box {
    padding: 12px 14px;
    border-radius: 6px;
    font-size: 14px;
    margin-bottom: 16px;
    line-height: 1.4;
  }

  .feedback-box.success {
    background: #f0fdf4;
    color: #166534;
    border: 1px solid #bbf7d0;
  }

  .feedback-box.error {
    background: #fef2f2;
    color: #991b1b;
    border: 1px solid #fecaca;
  }

  .powered-by {
    text-align: center;
    font-size: 11px;
    color: #64748b;
    margin-top: 14px;
    margin-bottom: 0;
  }

  .powered-by a {
    color: #2563eb;
    font-weight: 600;
    text-decoration: none;
  }

  .powered-by a:hover {
    text-decoration: underline;
  }
</style>
```

---

### Step 3: Run & Verify

1. **Import the component into any Astro page** (e.g. `src/pages/index.astro` or `src/pages/contact.astro`):

   ```astro
   ---
   // src/pages/contact.astro
   import ContactForm from '../components/ContactForm.astro';
   ---

   <html lang="en">
     <head>
       <meta charset="utf-8" />
       <title>Contact Us — Agency</title>
     </head>
     <body style="background: #f8fafc; padding: 48px 16px; margin: 0;">
       <main>
         <h1 style="text-align: center; font-size: 28px; margin-bottom: 8px;">Let's Talk About Your Project</h1>
         <p style="text-align: center; color: #64748b; margin-bottom: 32px;">Fill out the form below and we will respond within 24 hours.</p>
         <ContactForm />
       </main>
     </body>
   </html>
   ```

2. **Start your Astro development server**:
   ```bash
   npm run dev
   ```

3. **Submit a test enquiry**:
   Open [http://localhost:4321](http://localhost:4321) in your browser, fill out your form, and click **Send Message**.

4. **Verify in your Dashboard**:
   Open your **[MyFormConnect Dashboard](https://myformconnect.io/account/)** and check under **Responses / Leads**. Your submission will be visible immediately!

---

## Ready-to-Use Form Examples (for Agency Websites)

### 1. Agency Project Inquiry Form (with Image & Asset Upload)

Creative, design, and marketing agencies frequently ask prospective clients to upload brand assets, design references, moodboards, screenshots, or project briefs.

MyFormConnect natively supports image and file uploads up to ~100MB across common formats (`.png`, `.jpg`, `.jpeg`, `.webp`, `.svg`, `.pdf`, `.zip`) out of the box — no AWS S3 buckets, cloud storage keys, or backend upload handlers needed.

> **💡 Beginner Key Concepts for File & Image Uploads:**
> 1. **`enctype="multipart/form-data"` is required**: Whenever your form includes an `<input type="file">`, you **must** set `enctype="multipart/form-data"` on the `<form>` tag.
> 2. **AJAX (`fetch`) upload**: When using JavaScript `fetch()`, pass `body: new FormData(form)` and **do NOT** set a `'Content-Type'` header manually. The browser automatically sets the correct `multipart/form-data` header and boundary!

Create `src/components/ProjectInquiryForm.astro`:

```astro
---
// src/components/ProjectInquiryForm.astro
// Replace with your Project Inquiry Form Action URL from your MFC dashboard:
const INQUIRY_FORM_ACTION_URL = "https://myformconnect.io/f/YOUR_FORM_UUID";
---

<div class="mfc-inquiry-card">
  <!-- Feedback message container (shows instant success/error without reload) -->
  <div id="inquiry-feedback" class="feedback-box" style="display: none;"></div>

  <!-- Note: enctype="multipart/form-data" is required for image/file uploads -->
  <form id="inquiry-form" action={INQUIRY_FORM_ACTION_URL} method="POST" enctype="multipart/form-data">
    <!-- Client Name & Email -->
    <div class="form-row">
      <div class="form-group">
        <label for="inquiry-name">Your Name *</label>
        <input type="text" id="inquiry-name" name="name" placeholder="Sarah Connor" required />
      </div>

      <div class="form-group">
        <label for="inquiry-email">Work Email *</label>
        <input type="email" id="inquiry-email" name="email" placeholder="sarah@brand.com" required />
      </div>
    </div>

    <!-- Company & Website -->
    <div class="form-row">
      <div class="form-group">
        <label for="inquiry-company">Company / Brand Name</label>
        <input type="text" id="inquiry-company" name="company" placeholder="Acme Studio" />
      </div>

      <div class="form-group">
        <label for="inquiry-website">Current Website / Social URL</label>
        <input type="url" id="inquiry-website" name="website" placeholder="https://example.com" />
      </div>
    </div>

    <!-- Service Selection -->
    <div class="form-group">
      <label for="inquiry-service">Service Needed *</label>
      <select id="inquiry-service" name="service" required>
        <option value="" disabled selected>Select primary service</option>
        <option value="Brand Identity & Design">Brand Identity & Design</option>
        <option value="Website Redesign & Development">Website Redesign & Development</option>
        <option value="Content Strategy & Copywriting">Content Strategy & Copywriting</option>
        <option value="Performance Marketing & SEO">Performance Marketing & SEO</option>
        <option value="Full Creative Retainer">Full Creative Retainer</option>
      </select>
    </div>

    <!-- Estimated Budget -->
    <div class="form-group">
      <label for="inquiry-budget">Estimated Budget</label>
      <select id="inquiry-budget" name="budget">
        <option value="" disabled selected>Select a budget tier</option>
        <option value="$3,000 - $7,500">$3,000 - $7,500</option>
        <option value="$7,500 - $15,000">$7,500 - $15,000</option>
        <option value="$15,000 - $30,000">$15,000 - $30,000</option>
        <option value="$30,000+">$30,000+</option>
      </select>
    </div>

    <!-- Project Description -->
    <div class="form-group">
      <label for="inquiry-details">Project Overview & Goals *</label>
      <textarea 
        id="inquiry-details" 
        name="project_details" 
        rows="4" 
        placeholder="Briefly describe your project, targets, timeline, and what success looks like..." 
        required
      ></textarea>
    </div>

    <!-- Image & Asset Upload Field (Crucial for Agencies) -->
    <div class="form-group">
      <label for="inquiry-assets">
        Upload Inspiration or Brand Assets 
        <span class="optional-tag">(Optional)</span>
      </label>
      <input 
        type="file" 
        id="inquiry-assets" 
        name="project_assets" 
        accept="image/png,image/jpeg,image/webp,image/svg+xml,.pdf,.zip" 
      />
      <span class="field-hint">Upload moodboards, logo files, screenshots, or design briefs (PNG, JPG, WebP, SVG, PDF up to 100MB).</span>
    </div>

    <!-- Anti-bot Honeypot Field (Hidden from real users, catches automated bots) -->
    <input type="text" name="_gotcha" style="display: none !important;" tabindex="-1" autocomplete="off" />

    <!-- Submit Button -->
    <button type="submit" id="inquiry-submit-btn" class="submit-button">
      Send Project Inquiry
    </button>

    <p class="powered-by">
      Powered by <a href="https://myformconnect.io" target="_blank" rel="noopener noreferrer">MFC</a>
    </p>
  </form>
</div>

<script>
  // TypeScript / JavaScript client handling for smooth inline submission
  const form = document.getElementById("inquiry-form") as HTMLFormElement;
  const feedback = document.getElementById("inquiry-feedback") as HTMLDivElement;
  const submitBtn = document.getElementById("inquiry-submit-btn") as HTMLButtonElement;

  if (form) {
    form.addEventListener("submit", async (e) => {
      e.preventDefault();

      // Provide immediate visual feedback while files upload
      submitBtn.disabled = true;
      submitBtn.textContent = "Uploading assets & sending...";
      feedback.style.display = "none";

      try {
        // FormData automatically packages all form inputs and file attachments
        const formData = new FormData(form);

        const response = await fetch(form.action, {
          method: "POST",
          headers: {
            Accept: "application/json",
            "X-Requested-With": "XMLHttpRequest",
            // NOTE: Do NOT set "Content-Type": "multipart/form-data".
            // The browser will automatically set the correct boundary header for FormData.
          },
          body: formData,
        });

        if (response.ok) {
          // Success message
          feedback.textContent = "✓ Thanks for reaching out! We've received your project inquiry and assets. Our team will review them and reply shortly.";
          feedback.className = "feedback-box success";
          feedback.style.display = "block";
          form.reset();
        } else {
          throw new Error("Submission failed");
        }
      } catch (err) {
        // Error message
        feedback.textContent = "✕ Failed to submit inquiry. Please check your files and try again.";
        feedback.className = "feedback-box error";
        feedback.style.display = "block";
      } finally {
        submitBtn.disabled = false;
        submitBtn.textContent = "Send Project Inquiry";
      }
    });
  }
</script>

<style>
  .mfc-inquiry-card {
    max-width: 580px;
    width: 100%;
    margin: 0 auto;
    padding: 32px;
    background: #ffffff;
    border: 1px solid #e2e8f0;
    border-radius: 12px;
    box-shadow: 0 4px 12px rgba(0, 0, 0, 0.05);
    box-sizing: border-box;
    font-family: inherit;
  }
  .form-row {
    display: grid;
    grid-template-columns: 1fr 1fr;
    gap: 16px;
  }
  @media (max-width: 600px) {
    .form-row {
      grid-template-columns: 1fr;
      gap: 0;
    }
  }
  .form-group {
    display: flex;
    flex-direction: column;
    margin-bottom: 18px;
  }
  .form-group label {
    font-size: 13px;
    font-weight: 600;
    color: #1e293b;
    margin-bottom: 6px;
  }
  .optional-tag {
    font-size: 11px;
    font-weight: normal;
    color: #64748b;
  }
  .field-hint {
    font-size: 11px;
    color: #94a3b8;
    margin-top: 5px;
    line-height: 1.4;
  }
  .form-group input,
  .form-group select,
  .form-group textarea {
    width: 100%;
    box-sizing: border-box;
    padding: 10px 14px;
    border: 1px solid #cbd5e1;
    border-radius: 6px;
    font-size: 14px;
    font-family: inherit;
    color: #0f172a;
    background: #ffffff;
    transition: border-color 0.2s ease;
  }
  .form-group input:focus,
  .form-group select:focus,
  .form-group textarea:focus {
    outline: none;
    border-color: #2563eb;
  }
  .form-group input[type="file"] {
    padding: 8px 12px;
    background: #f8fafc;
    border-style: dashed;
    cursor: pointer;
  }
  .submit-button {
    width: 100%;
    padding: 13px;
    background: #2563eb;
    color: #ffffff;
    font-size: 14px;
    font-weight: 600;
    border: none;
    border-radius: 6px;
    cursor: pointer;
    transition: background-color 0.15s ease, opacity 0.15s ease;
  }
  .submit-button:hover:not(:disabled) {
    background: #1d4ed8;
  }
  .submit-button:disabled {
    opacity: 0.7;
    cursor: not-allowed;
  }
  .feedback-box {
    padding: 12px 14px;
    border-radius: 6px;
    font-size: 14px;
    margin-bottom: 16px;
    line-height: 1.4;
  }
  .feedback-box.success {
    background: #f0fdf4;
    color: #166534;
    border: 1px solid #bbf7d0;
  }
  .feedback-box.error {
    background: #fef2f2;
    color: #991b1b;
    border: 1px solid #fecaca;
  }
  .powered-by {
    text-align: center;
    font-size: 11px;
    color: #64748b;
    margin-top: 14px;
    margin-bottom: 0;
  }
  .powered-by a {
    color: #2563eb;
    font-weight: 600;
    text-decoration: none;
  }
</style>
```

---

### 2. Agency Newsletter & Growth Insights Form

Perfect for your agency's footer, blog sidebar, or case study lead magnet:

Create `src/components/NewsletterForm.astro`:

```astro
---
// src/components/NewsletterForm.astro
// Replace with your Newsletter Form Action URL from MFC dashboard:
const NEWSLETTER_FORM_ACTION_URL = "https://myformconnect.io/f/YOUR_FORM_UUID";
---

<div class="newsletter-wrapper">
  <form id="newsletter-form" action={NEWSLETTER_FORM_ACTION_URL} method="POST" class="newsletter-form">
    <input 
      type="email" 
      name="email" 
      placeholder="Enter your work email..." 
      required 
      class="newsletter-input" 
    />
    <button type="submit" id="newsletter-btn" class="newsletter-btn">
      Subscribe
    </button>
  </form>
  
  <p id="newsletter-msg" class="newsletter-msg" style="display: none;"></p>
</div>

<script>
  const form = document.getElementById("newsletter-form") as HTMLFormElement;
  const msg = document.getElementById("newsletter-msg") as HTMLParagraphElement;
  const btn = document.getElementById("newsletter-btn") as HTMLButtonElement;

  if (form) {
    form.addEventListener("submit", async (e) => {
      e.preventDefault();
      btn.disabled = true;
      btn.textContent = "Joining...";
      msg.style.display = "none";

      try {
        const response = await fetch(form.action, {
          method: "POST",
          headers: {
            Accept: "application/json",
            "X-Requested-With": "XMLHttpRequest",
          },
          body: new FormData(form),
        });

        if (response.ok) {
          msg.textContent = "✓ Thanks for subscribing! You're on the list.";
          msg.className = "newsletter-msg success";
          msg.style.display = "block";
          form.reset();
        } else {
          throw new Error();
        }
      } catch {
        msg.textContent = "Failed to subscribe. Please try again.";
        msg.className = "newsletter-msg error";
        msg.style.display = "block";
      } finally {
        btn.disabled = false;
        btn.textContent = "Subscribe";
      }
    });
  }
</script>

<style>
  .newsletter-wrapper {
    max-width: 440px;
    width: 100%;
  }

  .newsletter-form {
    display: flex;
    gap: 8px;
  }

  .newsletter-input {
    flex: 1;
    padding: 10px 14px;
    border: 1px solid #cbd5e1;
    border-radius: 6px;
    font-size: 14px;
    outline: none;
  }

  .newsletter-input:focus {
    border-color: #2563eb;
  }

  .newsletter-btn {
    padding: 10px 18px;
    background: #2563eb;
    color: #ffffff;
    font-weight: 600;
    font-size: 14px;
    border: none;
    border-radius: 6px;
    cursor: pointer;
    white-space: nowrap;
  }

  .newsletter-btn:disabled {
    opacity: 0.7;
    cursor: not-allowed;
  }

  .newsletter-msg {
    margin-top: 8px;
    font-size: 13px;
  }

  .newsletter-msg.success {
    color: #16a34a;
  }

  .newsletter-msg.error {
    color: #dc2626;
  }
</style>
```

---

### 3. Pure HTML Form (Zero-JavaScript Option)

If you prefer the simplest possible setup with **zero client-side JavaScript**, Astro supports native HTML forms effortlessly.

MyFormConnect will receive the data and automatically display a clean confirmation screen:

```astro
---
// Zero JS required! Replace with your actual Form Action URL:
const FORM_ACTION_URL = "https://myformconnect.io/f/YOUR_FORM_UUID";
---

<form action={FORM_ACTION_URL} method="POST">
  <div>
    <label for="pure-name">Name</label>
    <input type="text" id="pure-name" name="name" required />
  </div>

  <div>
    <label for="pure-email">Email</label>
    <input type="email" id="pure-email" name="email" required />
  </div>

  <div>
    <label for="pure-message">Message</label>
    <textarea id="pure-message" name="message" required></textarea>
  </div>

  <button type="submit">Send Message</button>
</form>
```

---

## 3 Golden Rules for Beginners

### 1. Always give each `<input>`, `<select>`, and `<textarea>` a `name` attribute
MyFormConnect uses the HTML `name` attribute of each input as the field label in your dashboard. If you forget the `name`, the field will not be saved!

```html
<!-- CORRECT: MyFormConnect records this as "work_email" -->
<input type="email" id="email" name="work_email" />

<!-- INCORRECT: Missing name attribute; browser will NOT send this field -->
<input type="email" id="email" />
```

### 2. Do NOT set a manual `Content-Type` header when using `fetch()`
When sending `new FormData(form)`, the browser automatically computes and sets the correct `multipart/form-data; boundary=...` header. Manually specifying `Content-Type` breaks file uploads and form encoding.

```javascript
// CORRECT
headers: {
  Accept: "application/json",
  "X-Requested-With": "XMLHttpRequest",
}

// DO NOT DO THIS (breaks submission & file uploads)
headers: {
  "Content-Type": "multipart/form-data",
}
```

### 3. Do NOT use `JSON.stringify()`
Always pass the raw `new FormData(form)` directly into the `body`:

```javascript
// CORRECT
body: new FormData(form)

// DO NOT DO THIS (causes 422 Unprocessable Entity error)
body: JSON.stringify(formData)
```

---

## Troubleshooting & Common Questions

### Common Network Tab Status Codes (Press F12 → Network)

When testing your form, open your browser's Developer Tools (**F12** or right-click → **Inspect**), switch to the **Network** tab, click your form's submit button, and inspect the status code of the `POST` request to `myformconnect.io`:

| Status Code | Meaning | Immediate Fix |
| :--- | :--- | :--- |
| **`403 Forbidden`** | Domain not authorized | Add `http://localhost:4321` or your live website URL in the MFC dashboard under Domain Settings, or temporarily toggle off Domain Restriction. |
| **`404 Not Found`** | Invalid Form Action URL | Make sure your `FORM_ACTION_URL` contains your real UUID from the dashboard, not the placeholder `YOUR_FORM_UUID`. |
| **`422 Unprocessable`** | Invalid Payload Format | Do NOT use `JSON.stringify()`. Send raw `new FormData(form)` instead. |
| **`302 Found` / CORS error** | Missing AJAX Headers | Add `Accept: "application/json"` and `"X-Requested-With": "XMLHttpRequest"` to your fetch request headers. |

---

#### 1. `403 Forbidden`
- **Why this happens:** MyFormConnect has **Domain Restriction** enabled to prevent unauthorized third parties from spamming your endpoint, and your current domain (such as local development on `http://localhost:4321`) is not yet added to your allowed domains list.
- **How to fix:**
  1. Open your form in the **[MyFormConnect Dashboard](https://myformconnect.io/account/)**.
  2. Navigate to **Domains** and select your domain.
  3. Ensure your Domain URL matches your current origin:
     - For local Astro development: `http://localhost:4321`
     - For production: `https://yourdomain.com`
  4. Alternatively, you can temporarily turn the **Domain Restriction** toggle **OFF** while developing locally.

---

#### 2. `404 Not Found`
- **Why this happens:** The URL provided in your `action` or `fetch()` call does not exist on MyFormConnect's servers.
- **How to fix:**
  - Verify that your `FORM_ACTION_URL` is copied accurately from your dashboard.
  - Correct format: `https://myformconnect.io/f/YOUR_FORM_UUID` (e.g. `https://myformconnect.io/f/7db4d175-ba9c-4fd7-974b-3c9e4601247e`).
  - Make sure you didn't leave accidental spaces or the placeholder text `YOUR_FORM_UUID`.

---

#### 3. `422 Unprocessable Entity`
- **Why this happens:** The server cannot parse the data because it was submitted in an unsupported format, such as stringified JSON.
- **How to fix:**
  - MyFormConnect expects native multipart form data. Never stringify data into JSON.
  - Always pass `new FormData(form)` directly into `body`:
    ```javascript
    // INCORRECT: Causes 422 error
    body: JSON.stringify(formData)

    // CORRECT: Processed seamlessly by MFC
    body: new FormData(form)
    ```

---

#### 4. `302 Found / 302 Moved Temporarily` (or CORS Error)
- **Why this happens:** By default, standard HTML forms perform a browser redirect (HTTP 302) to a thank-you page. When submitting via JavaScript `fetch()`, the browser cannot follow cross-origin redirects silently, resulting in a **CORS error**.
- **How to fix:**
  - Tell MyFormConnect that you are making an AJAX request by adding these two headers:
    ```javascript
    headers: {
      Accept: "application/json",
      "X-Requested-With": "XMLHttpRequest",
    }
    ```
  - When MyFormConnect sees these headers, it returns a clean JSON `200 OK` response instead of a redirect, allowing you to show inline thank-you messages without CORS issues.

---

### Other Common Questions & Fixes

#### Q: Form is not submitting after clicking the submit button
If clicking your submit button does nothing or triggers an error:

1. **Check your Request Headers in `fetch()`**:
   Do **not** add `'Content-Type': 'multipart/form-data'` or `'application/json'`. Setting manual Content-Type headers corrupts the multipart boundary. Your headers should only be:
   ```javascript
   headers: {
     Accept: "application/json",
     "X-Requested-With": "XMLHttpRequest",
   }
   ```

2. **Check the Submit Button**:
   Inside your `<form>`, make sure your submit button has `type="submit"` (or omit `type`, since `submit` is the HTML default). A button with `type="button"` will not trigger the form submission.

3. **Check the Browser Console (F12)**:
   Press **F12**, click the **Console** tab, and submit the form again to see if any JavaScript error is reported.

---

#### Q: Form submitted successfully, but no data appears on MFC dashboard (or empty fields show up)
If your form displays a success message but submissions are not showing up:

1. **Wait a few seconds**:
   Submissions are processed within seconds. Wait a few moments and refresh your dashboard page.

2. **Check the `name` attribute on all inputs (Most Common issue!)**:
   `new FormData(form)` **only includes inputs with a `name` attribute**. IDs and placeholders are ignored:
   ```html
   <!-- WRONG: Ignored by browser FormData; dashboard receives nothing! -->
   <input id="email" placeholder="jane@company.com" />

   <!-- CORRECT: Sent to dashboard as { email: "jane@company.com" } -->
   <input id="email" name="email" placeholder="jane@company.com" />
   ```

---

#### Q: The browser redirects or refreshes the whole page on submit
Make sure `e.preventDefault()` is the very first line of your submit event handler:
```javascript
form.addEventListener("submit", async (e) => {
  e.preventDefault(); // Prevents the browser from reloading the page
  // ... your fetch logic
});
```

---

#### Q: Does this work with Astro View Transitions / ClientRouter?
Yes! If your Astro site uses `<ViewTransitions />` or `<ClientRouter />` from `astro:transitions`, Astro swaps pages without full browser reloads. 

To ensure your form script runs after page transitions, wrap the event listener inside `astro:page-load`:

```astro
<script>
  function setupForm() {
    const form = document.getElementById("contact-form") as HTMLFormElement;
    if (!form || form.dataset.initialized) return;
    form.dataset.initialized = "true";

    form.addEventListener("submit", async (e) => {
      e.preventDefault();
      // ... submit logic
    });
  }

  // Runs on initial load and after every page transition
  document.addEventListener("astro:page-load", setupForm);
</script>
```

---

#### Q: How do I receive email alerts when someone fills out my form?
In your [MyFormConnect Dashboard](https://myformconnect.io/account/):
1. Open your form.
2. In the **Form Details** section, click on the **Edit** button.
3. Scroll to the bottom of the settings.
4. Check the **Notify on Email** checkbox.
5. Click **Update Form**.
6. Now, whenever an agency prospect submits your form, MyFormConnect sends an instant email notification directly to your inbox.

---

## Still Having Issues?

If your form is still not working or you encounter an unexpected issue:

- **Contact Support**: Reach out directly via the **[MyFormConnect Support Center](https://myformconnect.io/support)** or email **[support@myformconnect.io](mailto:support@myformconnect.io)**.

> 💡 **Tip for Faster Support:**
> When contacting support, include a screenshot of the issue, your `FORM_ACTION_URL`, and any error messages shown in your browser's **Console** (F12) or **Network** tabs.

---

## Official Documentation & Links

- **MyFormConnect Dashboard**: [https://myformconnect.io/account/](https://myformconnect.io/account/)
- **Account Sign Up**: [https://myformconnect.io/users/sign_up](https://myformconnect.io/users/sign_up)
- **Documentation**: [https://myformconnect.io/docs/getting-started](https://myformconnect.io/docs/getting-started)