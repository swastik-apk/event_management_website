/** @type {import('tailwindcss').Config} */
export default {
  darkMode: 'class',
  content: ['./index.html', './src/**/*.{js,jsx}'],
  theme: {
    extend: {
      colors: {
        canvas: '#f8f8f8',
        surface: '#ffffff',
        ink: '#292a2e',
        muted: '#505258',
        line: '#dfe1e6',
        accent: {
          50: '#e9f2fe',
          100: '#cfe1fd',
          200: '#adcbfb',
          300: '#8fb8f6',
          400: '#669df1',
          500: '#1868db',
          600: '#1558bc',
          700: '#123263',
          800: '#1c2b42',
        },
        night: {
          950: '#101214',
          900: '#161a1d',
          800: '#1f2226',
          700: '#2c333a',
        },
      },
      boxShadow: {
        soft: '0 1px 1px rgba(30, 31, 33, 0.25), 0 0 1px rgba(30, 31, 33, 0.31)',
        card: '0 1px 1px rgba(30, 31, 33, 0.25), 0 0 1px rgba(30, 31, 33, 0.31)',
        overlay: '0 8px 12px rgba(30, 31, 33, 0.15), 0 0 1px rgba(30, 31, 33, 0.31)',
      },
      borderRadius: {
        card: '8px',
        control: '6px',
      },
      maxWidth: {
        content: '1200px',
      },
      fontFamily: {
        display: ['-apple-system', 'BlinkMacSystemFont', 'Segoe UI', 'sans-serif'],
        sans: ['-apple-system', 'BlinkMacSystemFont', 'Segoe UI', 'sans-serif'],
      },
    },
  },
  plugins: [],
}
