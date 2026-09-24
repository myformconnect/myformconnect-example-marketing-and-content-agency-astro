/**
 * Central Image Asset Reference
 * 
 * NOTE ON FUTURE LOCAL IMAGES:
 * When migrating from remote URLs to local assets, place the optimized files in
 * `src/assets/images/` and import them directly into components using Astro's
 * built-in `<Image />` component for automatic format conversion and responsive sizing.
 * 
 * Example:
 * // Replace this remote image with:
 * // import heroImage from "../assets/images/hero/hero.jpg";
 */

export const images = {
  // Hero & Brand Imagery (London architecture & editorial workspace)
  hero: "https://images.unsplash.com/photo-1513635269975-59663e0ac1ad?auto=format&fit=crop&w=1600&q=80", // Modern London cityscape & Thames architecture
  agencyOffice: "https://images.unsplash.com/photo-1497366216548-37526070297c?auto=format&fit=crop&w=1200&q=80", // Editorial modern workspace
  agencyCulture: "https://images.unsplash.com/photo-1522071820081-009f0129c71c?auto=format&fit=crop&w=1200&q=80", // Creative team collaboration
  londonStreet: "https://images.unsplash.com/photo-1529655683826-aba9b3e77383?auto=format&fit=crop&w=1200&q=80", // Classic London architectural detail

  // Team Members
  teamMaya: "https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?auto=format&fit=crop&w=800&q=80", // Maya Bennett - Strategy Director
  teamOliver: "https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=800&q=80", // Oliver Reed - Creative Director
  teamAmelia: "https://images.unsplash.com/photo-1580489944761-15a19d654956?auto=format&fit=crop&w=800&q=80", // Amelia Clarke - Content Lead

  // Case Studies
  workLumio: "https://images.unsplash.com/photo-1551288049-bebda4e38f71?auto=format&fit=crop&w=1200&q=80", // Lumio Fintech Dashboard & Analytics
  workLumioHero: "https://images.unsplash.com/photo-1559526324-4b87b5e36e44?auto=format&fit=crop&w=1600&q=80", // Lumio secondary / detail
  workHearth: "https://images.unsplash.com/photo-1618221195710-dd6b41faaea6?auto=format&fit=crop&w=1200&q=80", // Hearth & Co Lifestyle & Interior Design
  workHearthHero: "https://images.unsplash.com/photo-1616486338812-3dadae4b4ace?auto=format&fit=crop&w=1600&q=80", // Hearth & Co secondary / detail
  workVanta: "https://images.unsplash.com/photo-1600585154340-be6161a56a0c?auto=format&fit=crop&w=1200&q=80", // Vanta Studio Creative Tech / Spatial
  workVantaHero: "https://images.unsplash.com/photo-1507679799987-c73779587ccf?auto=format&fit=crop&w=1600&q=80", // Vanta Studio secondary / detail

  // Blog Articles
  blogStrategy: "https://images.unsplash.com/photo-1454165804606-c3d57bc86b40?auto=format&fit=crop&w=1200&q=80", // Strategy planning notebook & workspace
  blogSeo: "https://images.unsplash.com/photo-1460925895917-afdab827c52f?auto=format&fit=crop&w=1200&q=80", // Digital metrics & organic search charts
  blogAiSearch: "https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?auto=format&fit=crop&w=1200&q=80", // Abstract generative digital landscape
  blogLondon: "https://images.unsplash.com/photo-1508849789987-4e5333c12b78?auto=format&fit=crop&w=1200&q=80", // London financial / tech district skyline
  blogFunnels: "https://images.unsplash.com/photo-1551836022-d5d88e9218df?auto=format&fit=crop&w=1200&q=80" // Funnel optimization & user flow meeting
};
