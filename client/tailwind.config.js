/** @type {import('tailwindcss').Config} */
export default {
    content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
    theme: {
        extend: {},
    },
    plugins: [
        function ({addComponents}) {
            addComponents({
                '.btn-primary': {
                    '@apply px-4 py-2 bg-gray-200 text-gray-800 rounded-md hover:bg-blue-500 hover:text-white transition-colors duration-200':
                        {},
                },
                '.btn-success': {
                    '@apply px-4 py-2 bg-green-500 text-white rounded-md hover:bg-green-600 transition-colors duration-200':
                        {},
                },
                '.btn-danger': {
                    '@apply px-4 py-2 bg-red-500 text-white rounded-md hover:bg-red-600 transition-colors duration-200':
                        {},
                },

            });
        },
    ],
}

