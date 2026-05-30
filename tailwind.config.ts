import type { Config } from "tailwindcss";

// Design tokens — Claude Design re-skin.
// `brand.*` is the source palette from the new design. The legacy token
// aliases (primary/secondary/accent/peach/ink/surface) are mapped onto the
// new values so existing components keep rendering while sections migrate.
const config: Config = {
  content: [
    "./app/**/*.{ts,tsx}",
    "./components/**/*.{ts,tsx}",
    "./content/**/*.{ts,tsx,json}",
  ],
  theme: {
    extend: {
      colors: {
        brand: {
          orange: "#EF7623",
          orangeDark: "#E06A1C",
          orangeLight: "#FDCFAF",
          orangeBg: "#FFF5F1",
          navy: "#17254C",
          blue: "#042D87",
          footer: "#1A2440",
          green: "#42A21F",
        },
        // ---- Legacy aliases mapped onto the new palette ----
        primary: {
          DEFAULT: "#EF7623",
          50: "#FFF5F1",
          100: "#FDE3D1",
          200: "#FDCFAF",
          300: "#F9B384",
          400: "#F39559",
          500: "#EF7623",
          600: "#E06A1C",
          700: "#C25A16",
          800: "#9A4711",
          900: "#6B310B",
        },
        secondary: {
          DEFAULT: "#17254C",
          50: "#E7EAF1",
          100: "#C3CADC",
          200: "#8B97BA",
          300: "#566691",
          400: "#2C3D6E",
          500: "#17254C",
          600: "#131F40",
          700: "#0F1833",
          800: "#0B1226",
          900: "#070C19",
        },
        accent: {
          DEFAULT: "#42A21F",
          50: "#EFF9EA",
          100: "#D6EFC9",
          500: "#42A21F",
          600: "#3A9019",
          700: "#2F7714",
        },
        peach: {
          50: "#FFF9F6",
          100: "#FFF5F1",
          200: "#FDE3D1",
          300: "#FDCFAF",
        },
        ink: {
          DEFAULT: "#000000",
          muted: "#454545",
          subtle: "#808080",
          inverse: "#FFFFFF",
        },
        surface: {
          DEFAULT: "#FFFFFF",
          alt: "#FAFAFA",
          peach: "#FFF5F1",
          navy: "#17254C",
        },
        muted: "#454545",
        subtle: "#808080",
        divider: "#E5E7EB",
      },
      fontFamily: {
        sans: ["var(--font-inter)", "ui-sans-serif", "system-ui", "sans-serif"],
        display: ["var(--font-inter)", "ui-sans-serif", "system-ui", "sans-serif"],
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
        card: "11px",
        panel: "14px",
        pill: "9999px",
      },
      maxWidth: {
        container: "1280px",
        site: "1180px",
      },
      boxShadow: {
        card: "0 4px 18px rgba(0,0,0,0.08)",
        panel: "0 8px 30px rgba(0,0,0,0.07)",
      },
    },
  },
  plugins: [],
};

export default config;
