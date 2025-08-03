/** @type {import('tailwindcss').Config} */
const config = {
  darkMode: "class",
  content: [
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/**/*.{js,ts,jsx,tsx,mdx}",
    "./*.{js,ts,jsx,tsx,mdx}",
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
        border: "var(--color-border, #333)",
        input: "var(--color-input, #D7DADE)",
        ring: "var(--color-ring, #E46B39)",
        background: "var(--color-background, #272828)",
        foreground: "var(--color-text-primary, #D7DADE)",
        primary: {
          DEFAULT: "var(--color-primary-orange, #E46B39)",
          foreground: "var(--color-primary-white, #D7DADE)",
          white: "var(--color-primary-white, #D7DADE)",
          gray: "var(--color-primary-gray, #D7DADE)",
          black: "var(--color-primary-black, #272828)",
          blue: "var(--color-primary-blue, #E46B39)",
          purple: "var(--color-primary-purple, #B1ACE9)",
        },
        secondary: {
          DEFAULT: "var(--color-secondary, #a0a0a0)",
          foreground: "var(--color-text-primary, #D7DADE)",
        },
        destructive: {
          DEFAULT: "hsl(var(--destructive, 0 84% 60%))",
          foreground: "hsl(var(--destructive-foreground, 0 0% 98%))",
        },
        muted: {
          DEFAULT: "var(--color-text-muted, #a0a0a0)",
          foreground: "var(--color-text-primary, #D7DADE)",
        },
        accent: {
          DEFAULT: "var(--color-primary-purple, #B1ACE9)",
          foreground: "var(--color-primary-black, #272828)",
        },
        popover: {
          DEFAULT: "var(--color-background, #272828)",
          foreground: "var(--color-text-primary, #D7DADE)",
        },
        card: {
          DEFAULT: "var(--color-background, #272828)",
          foreground: "var(--color-text-primary, #D7DADE)",
        },
      },
      spacing: {
        xs: "var(--spacing-xs, 0.5rem)",
        sm: "var(--spacing-sm, 1rem)",
        md: "var(--spacing-md, 1.5rem)",
        lg: "var(--spacing-lg, 2rem)",
        xl: "var(--spacing-xl, 3rem)",
        "2xl": "var(--spacing-2xl, 4rem)",
      },
      fontSize: {
        '8.5xl': '6.5rem', 
      },
      letterSpacing: {
        "tight-medium": "var(--tight-medium, -5px)",
        "tight-extreme": "var(--tight-extreme, -11px)",
      },
      borderRadius: {
        sm: "var(--radius-sm, 0.5rem)",
        md: "var(--radius-md, 1rem)",
        lg: "var(--radius-lg, 1.5rem)",
        xl: "var(--radius-xl, 2rem)",
      },
      boxShadow: {
        sm: "var(--shadow-sm, 0 2px 4px rgba(0, 0, 0, 0.1))",
        md: "var(--shadow-md, 0 4px 8px rgba(0, 0, 0, 0.15))",
        lg: "var(--shadow-lg, 0 8px 16px rgba(0, 0, 0, 0.2))",
      },
      transitionDuration: {
        fast: "var(--transition-fast, 0.15s)",
        normal: "var(--transition-normal, 0.3s)",
        slow: "var(--transition-slow, 0.5s)",
      },
      fontFamily: {
        sans: ["var(--font-dm-sans)", "sans-serif"],
        display: ["Montserrat", "sans-serif"],
      },
      keyframes: {
        "accordion-down": {
          from: { height: "0" },
          to: { height: "var(--radix-accordion-content-height)" },
        },
        "accordion-up": {
          from: { height: "var(--radix-accordion-content-height)" },
          to: { height: "0" },
        },
      },
      animation: {
        "accordion-down": "accordion-down 0.2s ease-out",
        "accordion-up": "accordion-up 0.2s ease-out",
      },
    },
  },
  plugins: [require("tailwindcss-animate")],
};

export default config;