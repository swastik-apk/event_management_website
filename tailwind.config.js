/** @type {import('tailwindcss').Config} */
export default {
  darkMode: 'class',
  content: ['./index.html', './src/**/*.{js,jsx}'],
  theme: {
    extend: {
      colors: {
        canvas: '#ffffff',
        surface: '#ffffff',
        subtle: '#f7f7f7',
        ink: '#222222',
        muted: '#6a6a6a',
        line: '#ebebeb',
        'line-strong': '#dddddd',
        accent: {
          50: '#fff0f2',
          100: '#ffe0e5',
          200: '#ffc2cc',
          300: '#ff94a6',
          400: '#ff5a79',
          500: '#ff385c',
          600: '#e00b41',
          700: '#c10035',
          800: '#8f0028',
        },
        night: {
          950: '#111113',
          900: '#18181b',
          800: '#222226',
          700: '#2e2e33',
        },
      },
      boxShadow: {
        soft: '0 1px 2px rgba(0, 0, 0, 0.06), 0 2px 6px rgba(0, 0, 0, 0.04)',
        card: '0 2px 8px rgba(0, 0, 0, 0.06), 0 0 1px rgba(0, 0, 0, 0.08)',
        search: '0 3px 12px rgba(0, 0, 0, 0.08), 0 1px 2px rgba(0, 0, 0, 0.04)',
        overlay: '0 12px 28px rgba(0, 0, 0, 0.12), 0 2px 6px rgba(0, 0, 0, 0.06)',
      },
      borderRadius: {
        card: '16px',
        control: '12px',
      },
      maxWidth: {
        content: '1280px',
      },
      fontFamily: {
        display: ['"Plus Jakarta Sans"', '-apple-system', 'BlinkMacSystemFont', 'sans-serif'],
        sans: ['"DM Sans"', '-apple-system', 'BlinkMacSystemFont', 'sans-serif'],
        mono: ['"JetBrains Mono"', 'ui-monospace', 'SFMono-Regular', 'monospace'],
      },
    },
  },
  plugins: [],
}
