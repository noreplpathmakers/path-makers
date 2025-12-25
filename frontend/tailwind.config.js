/** @type {import('tailwindcss').Config} */
export default {
    content: [
        "./index.html",
        "./src/**/*.{js,ts,jsx,tsx}",
    ],
    darkMode: 'class',
    theme: {
        extend: {
            colors: {
                primary: {
                    DEFAULT: '#3b82f6', // blue-500
                    foreground: '#ffffff',
                },
                secondary: {
                    DEFAULT: '#64748b', // slate-500
                    foreground: '#ffffff',
                },
                background: {
                    DEFAULT: '#ffffff',
                    dark: '#0f172a', // slate-900
                },
                text: {
                    DEFAULT: '#0f172a', // slate-900
                    dark: '#f8fafc', // slate-50
                }
            },
            fontFamily: {
                sans: ['Inter', 'sans-serif'],
            }
        },
    },
    plugins: [],
}
