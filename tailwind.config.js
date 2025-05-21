import colors from 'tailwindcss/colors';

export default {
  content: [
    './components/**/*.{js,vue,ts}',
    './layouts/**/*.vue',
    './pages/**/*.vue',
    './plugins/**/*.{js,ts}',
    './app.vue',
  ],
  theme: {
    extend: {
      colors: {
        primary: {
          50: '#EFF6FF', // Lighter blue for backgrounds/hovers
          100: '#DBEAFE',
          200: '#BFDBFE', // Light blue
          300: '#93C5FD',
          400: '#60A5FA',
          500: '#3B82F6', // Medium blue
          600: '#1A56DB', // Main primary blue (Sapphire)
          700: '#1E40AF', // Darker blue
          800: '#1E3A8A',
          900: '#1E3A8A',
        },
        secondary: {
          50: '#F9FAFB', // Lightest gray for backgrounds
          100: '#F3F4F6',
          200: '#E5E7EB', // Light gray for borders
          300: '#D1D5DB',
          400: '#9CA3AF',
          500: '#6B7280', // Medium gray for text
          600: '#4B5563', // Dark gray for text
          700: '#374151', // Darker gray for headings
          800: '#1F2937', // Very dark gray
          900: '#111827',
        },
        accent: {
          50: '#FFFBEB',
          100: '#FEF3C7',
          200: '#FDE68A', // Light gold/sand
          300: '#FCD34D',
          400: '#FBBF24',
          500: '#F59E0B', // Main gold/sand accent
          600: '#D97706', // Darker gold/sand
          700: '#B45309',
          800: '#92400E',
          900: '#78350F',
        },
      },
      fontFamily: {
        sans: ['Inter', 'system-ui', 'sans-serif'],
        heading: ['Inter', 'system-ui', 'sans-serif'],
      },
      animation: {
        'fade-in': 'fadeIn 0.5s ease-in-out',
        'slide-down': 'slideDown 0.3s ease-in-out',
        'slide-up': 'slideUp 0.3s ease-in-out',
      },
      keyframes: {
        fadeIn: {
          '0%': { opacity: '0' },
          '100%': { opacity: '1' },
        },
        slideDown: {
          '0%': { transform: 'translateY(-10px)', opacity: '0' },
          '100%': { transform: 'translateY(0)', opacity: '1' },
        },
        slideUp: {
          '0%': { transform: 'translateY(10px)', opacity: '0' },
          '100%': { transform: 'translateY(0)', opacity: '1' },
        },
      },
    },
  },
  plugins: [],
};