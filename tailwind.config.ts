import type { Config } from "tailwindcss";

export default {
  content: [
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  darkMode: "class",
  safelist: [
    "bg-red-500",
    "bg-blue-500",
    "bg-green-500",
    "bg-yellow-400",
    "bg-purple-500",
    "bg-blue-200",
    "bg-indigo-600",
    "bg-gray-800",
    "bg-pink-300",
    "bg-gray-400",
    "bg-red-700",
    "bg-blue-300",
    "bg-purple-700",
    "bg-yellow-700",
    "bg-yellow-800",
    "bg-green-600",
    "bg-indigo-800",
    "bg-gray-500",
  ],
  theme: {
    extend: {
      colors: {
        background: "var(--background)",
        foreground: "var(--foreground)",
      },
    },
  },
  plugins: [],
} satisfies Config;
