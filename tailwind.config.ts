import type { Config } from "tailwindcss";

export default {
  darkMode: ["class"],
  content: ["./pages/**/*.{ts,tsx}", "./components/**/*.{ts,tsx}", "./app/**/*.{ts,tsx}", "./src/**/*.{ts,tsx}"],
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
        border: "hsl(var(--border))",
        input: "hsl(var(--input))",
        ring: "hsl(var(--ring))",
        background: "hsl(var(--background))",
        foreground: "hsl(var(--foreground))",
        
        // Medical Design System
        "medical-blue": "hsl(var(--medical-blue))",
        "medical-blue-light": "hsl(var(--medical-blue-light))",
        "medical-blue-dark": "hsl(var(--medical-blue-dark))",
        "heart-red": "hsl(var(--heart-red))",
        "heart-red-light": "hsl(var(--heart-red-light))",
        "medical-gold": "hsl(var(--medical-gold))",
        "medical-gray": "hsl(var(--medical-gray))",
        "medical-gray-dark": "hsl(var(--medical-gray-dark))",
        "medical-green": "hsl(var(--medical-green))",
        "medical-purple": "hsl(var(--medical-purple))",
        "medical-orange": "hsl(var(--medical-orange))",
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
        sidebar: {
          DEFAULT: "hsl(var(--sidebar-background))",
          foreground: "hsl(var(--sidebar-foreground))",
          primary: "hsl(var(--sidebar-primary))",
          "primary-foreground": "hsl(var(--sidebar-primary-foreground))",
          accent: "hsl(var(--sidebar-accent))",
          "accent-foreground": "hsl(var(--sidebar-accent-foreground))",
          border: "hsl(var(--sidebar-border))",
          ring: "hsl(var(--sidebar-ring))",
        },
      },
      borderRadius: {
        lg: "var(--radius)",
        md: "calc(var(--radius) - 2px)",
        sm: "calc(var(--radius) - 4px)",
      },
      keyframes: {
        "accordion-down": {
          from: {
            height: "0",
          },
          to: {
            height: "var(--radix-accordion-content-height)",
          },
        },
        "accordion-up": {
          from: {
            height: "var(--radix-accordion-content-height)",
          },
          to: {
            height: "0",
          },
        },
      },
      animation: {
        "accordion-down": "accordion-down 0.2s ease-out",
        "accordion-up": "accordion-up 0.2s ease-out",
        "pulse-heart": "pulse 2s ease-in-out infinite",
        "float": "float 3s ease-in-out infinite",
      },
      backgroundImage: {
        "gradient-medical": "var(--gradient-medical)",
        "gradient-heart": "var(--gradient-heart)",  
        "gradient-blur-red": "var(--gradient-blur-red)",
        "gradient-primary": "var(--gradient-primary)",
        "gradient-subtle": "var(--gradient-subtle)",
      },
      boxShadow: {
        "medical": "var(--shadow-medical)",
        "heart": "var(--shadow-heart)",
        "soft": "var(--shadow-soft)",
        "elegant": "var(--shadow-elegant)",
      },
      transitionTimingFunction: {
        "smooth": "var(--transition-smooth)",
        "bounce": "var(--transition-bounce)",
      },
    },
  },
  plugins: [require("tailwindcss-animate")],
} satisfies Config;
