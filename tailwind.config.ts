import type { Config } from "tailwindcss";

// Placeholder design tokens. Exact values to be replaced from Figma in Phase 2.
const config: Config = {
  content: [
    "./app/**/*.{ts,tsx}",
    "./components/**/*.{ts,tsx}",
    "./content/**/*.{ts,tsx,json}",
  ],
  theme: {
    extend: {
      colors: {
        // primary.DEFAULT is the CTA tone (deep, AA-contrast-safe on white).
        // primary.500 is the lighter brand orange for accent surfaces (TopBar, peach tints).
        primary: {
          DEFAULT: "#B85416",
          50: "#FFF4EB",
          100: "#FFE4CC",
          200: "#FCC79A",
          300: "#FAAA68",
          400: "#F89B53",
          500: "#F58A3F",
          600: "#D9531F",
          700: "#B45913",
          800: "#7E3E0D",
          900: "#4A2407",
        },
        secondary: {
          DEFAULT: "#102A56",
          50: "#E6EAF1",
          100: "#C2CCDD",
          200: "#8A9CBC",
          300: "#566F9B",
          400: "#2A4677",
          500: "#102A56",
          600: "#0D2247",
          700: "#0A1A37",
          800: "#071326",
          900: "#040B16",
        },
        // accent.DEFAULT is the WhatsApp CTA tone (deepened for AA on white).
        // accent.500 is the WhatsApp brand green for icon fills / non-text surfaces.
        accent: {
          DEFAULT: "#15803D",
          50: "#E8FAF0",
          100: "#C5F2D7",
          500: "#25D366",
          600: "#1FB958",
          700: "#188F44",
        },
        peach: {
          50: "#FFF8F1",
          100: "#FFF1E6",
          200: "#FFE0C7",
          300: "#FFCFA8",
        },
        ink: {
          DEFAULT: "#111827",
          muted: "#4B5563",
          subtle: "#6B7280",
          inverse: "#FFFFFF",
        },
        surface: {
          DEFAULT: "#FFFFFF",
          alt: "#FAFAFA",
          peach: "#FFF1E6",
          navy: "#0B1F3A",
        },
        divider: "#E5E7EB",
      },
      fontFamily: {
        // Placeholder font stacks. Real families from Figma in Phase 2.
        sans: ["var(--font-sans)", "ui-sans-serif", "system-ui", "sans-serif"],
        display: ["var(--font-display)", "Georgia", "serif"],
      },
      spacing: {
        section: "4rem",
        "section-lg": "6rem",
        "section-xl": "8rem",
      },
      borderRadius: {
        sm: "0.375rem",
        DEFAULT: "0.5rem",
        md: "0.75rem",
        lg: "1rem",
        xl: "1.25rem",
        "2xl": "1.5rem",
        "3xl": "2rem",
        pill: "9999px",
      },
      maxWidth: {
        container: "1280px",
      },
      boxShadow: {
        card: "0 1px 2px rgba(16,24,40,0.04), 0 4px 12px rgba(16,24,40,0.06)",
      },
    },
  },
  plugins: [],
};

export default config;
