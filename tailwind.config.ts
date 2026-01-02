import { heroui } from "@heroui/react";
import type { Config } from "tailwindcss";

const config: Config = {
    content: [
        "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
        "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
        "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
        "./node_modules/@heroui/theme/dist/**/*.{js,ts,jsx,tsx}",
    ],
    theme: {
        extend: {
            fontFamily: {
                sans: ["var(--font-geist-sans)", "Inter", "sans-serif"],
                mono: ["var(--font-geist-mono)", "monospace"],
            },
            animation: {
                "float": "float 6s ease-in-out infinite",
                "pulse-slow": "pulse 4s cubic-bezier(0.4, 0, 0.6, 1) infinite",
            },
            keyframes: {
                float: {
                    "0%, 100%": { transform: "translateY(0)" },
                    "50%": { transform: "translateY(-10px)" },
                },
            },
        },
    },
    darkMode: "class",
    plugins: [
        heroui({
            themes: {
                light: {
                    colors: {
                        primary: {
                            DEFAULT: "#006FEE", // HeroUI Blue
                            foreground: "#FFFFFF",
                            50: "#E6F1FE",
                            100: "#CCE3FD",
                            200: "#99C7FB",
                            300: "#66AAF9",
                            400: "#338EF7",
                            500: "#006FEE",
                            600: "#005BC4",
                            700: "#004493",
                            800: "#002E62",
                            900: "#001731",
                        },
                        focus: "#006FEE",
                    },
                },
            },
        }),
    ],
};

export default config;
