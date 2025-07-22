/** @type {import('tailwindcss').Config} */
module.exports = {
    darkMode: 'class',
    content: [
        './index.html',
        './src/**/*.{js,ts,jsx,tsx}',
    ],
    theme: {
        extend: {
            colors: {
                primary: {
                    50: '#eef2ff',
                    500: '#6366f1',
                    600: '#4f46e5',
                }
            }
        },
        fontFamily: {
            heading: ['Poppins', 'sans-serif'],
            sans: ['Inter', 'ui-sans-serif', 'system-ui'],
        }
    },
    plugins: [
        require('@tailwindcss/line-clamp'),
        require('@tailwindcss/aspect-ratio'),
    ],
};
