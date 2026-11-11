/** @type {import('tailwindcss').Config} */
module.exports = {
  darkMode: ["class"],
  content: [
    "./pages/**/*.{ts,tsx}",
    "./components/**/*.{ts,tsx}",
    "./app/**/*.{ts,tsx}",
    "./src/**/*.{ts,tsx}",
  ],
  prefix: "",
  theme: {
    container: {
      center: true,
      padding: "2rem",
      screens: {
        "2xl": "1400px",
      },
    },
    extend: {
      colors: {
        // === HUYỀN TRANG TOUR DESIGN TOKENS ===
        // Brand Primary - Navy Blue (Trust, Premium, Travel)
        brand: {
          50:  "#EEF2FF",
          100: "#E0E7FF",
          200: "#C7D2FE",
          300: "#A5B4FC",
          400: "#818CF8",
          500: "#1E3A5F",  // Main Navy
          600: "#162D4A",  // Dark Navy
          700: "#0F2035",  // Deeper Navy
          800: "#091525",  // Darkest
          900: "#050D18",
          DEFAULT: "#1E3A5F",
        },
        // Brand Accent - Champagne Gold (Luxury, Premium)
        gold: {
          50:  "#FFFDF5",
          100: "#FFF9E6",
          200: "#FFF0C2",
          300: "#FFE49E",
          400: "#FFD46B",
          500: "#D4AF37",  // Classic Gold
          600: "#C49B23",  // Rich Gold
          700: "#A07D14",  // Deep Gold
          800: "#7D6010",  // Dark Gold
          DEFAULT: "#D4AF37",
          light: "#F5E6A3",
        },
        // Brand Green - EV Green (Eco, VinFast Electric)
        ev: {
          50:  "#F0FDF4",
          100: "#DCFCE7",
          200: "#BBF7D0",
          300: "#86EFAC",
          400: "#4ADE80",
          500: "#16A34A",
          600: "#15803D",
          DEFAULT: "#16A34A",
        },
        // Neutrals
        surface: {
          DEFAULT: "#FFFFFF",
          warm: "#FAFAF8",
          subtle: "#F5F5F3",
          muted: "#E8E8E5",
        },
        // Semantic tokens
        border: "hsl(var(--border))",
        input: "hsl(var(--input))",
        ring: "hsl(var(--ring))",
        background: "hsl(var(--background))",
        foreground: "hsl(var(--foreground))",
        primary: {
          DEFAULT: "hsl(var(--primary))",
          foreground: "hsl(var(--primary-foreground))",
        },
        secondary: {
          DEFAULT: "hsl(var(--secondary))",
          foreground: "hsl(var(--secondary-foreground))",
        },
        destructive: {
          DEFAULT: "hsl(var(--destructive))",
          foreground: "hsl(var(--destructive-foreground))",
        },
        muted: {
          DEFAULT: "hsl(var(--muted))",
          foreground: "hsl(var(--muted-foreground))",
        },
        accent: {
          DEFAULT: "hsl(var(--accent))",
          foreground: "hsl(var(--accent-foreground))",
        },
        popover: {
          DEFAULT: "hsl(var(--popover))",
          foreground: "hsl(var(--popover-foreground))",
        },
        card: {
          DEFAULT: "hsl(var(--card))",
          foreground: "hsl(var(--card-foreground))",
        },
      },
      fontFamily: {
        // Heading - Playfair Display: Luxury, travel, editorial feel
        heading: ["var(--font-heading)", "Georgia", "serif"],
        // Body - Inter: Modern, readable, international support
        body: ["var(--font-body)", "system-ui", "sans-serif"],
        // Accent - Cormorant Garamond: Elegant, premium
        accent: ["var(--font-accent)", "Georgia", "serif"],
      },
      fontSize: {
        "hero-xl": ["4.5rem", { lineHeight: "1.1", letterSpacing: "-0.02em" }],
        "hero-lg": ["3.5rem", { lineHeight: "1.15", letterSpacing: "-0.02em" }],
        "hero-md": ["2.75rem", { lineHeight: "1.2", letterSpacing: "-0.01em" }],
        "section": ["2rem", { lineHeight: "1.3", letterSpacing: "-0.01em" }],
        "card-title": ["1.25rem", { lineHeight: "1.4", letterSpacing: "0" }],
      },
      spacing: {
        "section-sm": "4rem",
        "section-md": "6rem",
        "section-lg": "8rem",
        "section-xl": "10rem",
      },
      borderRadius: {
        lg: "var(--radius)",
        md: "calc(var(--radius) - 2px)",
        sm: "calc(var(--radius) - 4px)",
        "2xl": "1rem",
        "3xl": "1.5rem",
      },
      boxShadow: {
        "card": "0 1px 3px rgba(0,0,0,0.08), 0 8px 24px rgba(30,58,95,0.06)",
        "card-hover": "0 4px 12px rgba(0,0,0,0.1), 0 16px 40px rgba(30,58,95,0.12)",
        "hero": "0 20px 60px rgba(0,0,0,0.3)",
        "nav": "0 2px 20px rgba(30,58,95,0.08)",
        "gold": "0 4px 20px rgba(212,175,55,0.3)",
        "cta": "0 8px 30px rgba(212,175,55,0.4)",
      },
      animation: {
        "fade-in": "fade-in 0.6s ease-out",
        "fade-up": "fade-up 0.7s ease-out",
        "fade-right": "fade-right 0.6s ease-out",
        "scale-in": "scale-in 0.5s ease-out",
        "shimmer": "shimmer 2s linear infinite",
        "pulse-gold": "pulse-gold 2s ease-in-out infinite",
        "phone-ring": "phone-ring 1.8s ease-in-out infinite",
        "accordion-down": "accordion-down 0.2s ease-out",
        "accordion-up": "accordion-up 0.2s ease-out",
      },
      keyframes: {
        "phone-ring": {
          "0%, 100%": { transform: "rotate(0deg)" },
          "10%, 30%": { transform: "rotate(-16deg)" },
          "20%, 40%": { transform: "rotate(16deg)" },
          "50%": { transform: "rotate(0deg)" },
        },
        "fade-in": {
          "0%": { opacity: "0" },
          "100%": { opacity: "1" },
        },
        "fade-up": {
          "0%": { opacity: "0", transform: "translateY(20px)" },
          "100%": { opacity: "1", transform: "translateY(0)" },
        },
        "fade-right": {
          "0%": { opacity: "0", transform: "translateX(-20px)" },
          "100%": { opacity: "1", transform: "translateX(0)" },
        },
        "scale-in": {
          "0%": { opacity: "0", transform: "scale(0.95)" },
          "100%": { opacity: "1", transform: "scale(1)" },
        },
        "shimmer": {
          "0%": { backgroundPosition: "-200% 0" },
          "100%": { backgroundPosition: "200% 0" },
        },
        "pulse-gold": {
          "0%, 100%": { boxShadow: "0 0 0 0 rgba(212,175,55,0.4)" },
          "50%": { boxShadow: "0 0 0 8px rgba(212,175,55,0)" },
        },
        "accordion-down": {
          from: { height: "0" },
          to: { height: "var(--radix-accordion-content-height)" },
        },
        "accordion-up": {
          from: { height: "var(--radix-accordion-content-height)" },
          to: { height: "0" },
        },
      },
      backgroundImage: {
        "gradient-brand": "linear-gradient(135deg, #1E3A5F 0%, #0F2035 100%)",
        "gradient-gold": "linear-gradient(135deg, #D4AF37 0%, #F5E6A3 100%)",
        "gradient-hero": "linear-gradient(180deg, rgba(15,32,53,0.6) 0%, rgba(15,32,53,0.3) 60%, rgba(15,32,53,0.7) 100%)",
        "gradient-card": "linear-gradient(180deg, transparent 50%, rgba(15,32,53,0.95) 100%)",
      },
    },
  },
  plugins: [require("tailwindcss-animate")],
};

