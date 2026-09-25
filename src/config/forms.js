/**
 * Where your forms send their submissions.
 * 
 * This site is static, so forms post directly to an external form backend like MyFormConnect / MyFormCapture.
 * Form action URLs are constructed from environment variables defined in .env.
 */

const baseActionUrl = (import.meta.env?.MFC_ACTION_URL || "https://myformcapture.com/f/").replace(/\/?$/, "/");

const createEndpoint = (uuid, fallback = "") => {
  if (!uuid) return fallback;
  if (uuid.startsWith("http://") || uuid.startsWith("https://")) {
    return uuid;
  }
  return `${baseActionUrl}${uuid}`;
};

export const formEndpoints = {
  contact: createEndpoint(import.meta.env?.MFC_CONTACT_FORM_UUID, "YOUR_CONTACT_FORM_ENDPOINT"),
  newsletter: createEndpoint(import.meta.env?.MFC_NEWSLETTER_FORM_UUID, "YOUR_NEWSLETTER_FORM_ENDPOINT"),
  careers: createEndpoint(import.meta.env?.MFC_CAREERS_FORM_UUID, "YOUR_CAREERS_FORM_ENDPOINT"),
  keepInformed: createEndpoint(import.meta.env?.MFC_KEEP_INFORMED_FORM_UUID, "YOUR_KEEP_INFORMED_FORM_ENDPOINT")
};

