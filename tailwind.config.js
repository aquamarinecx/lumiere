const colors = require('tailwindcss/colors');
const defaultTheme = require('tailwindcss/defaultTheme');

module.exports = {
  mode: 'jit',
  purge: ['./pages/**/*.{js,ts,jsx,tsx}', './components/**/*.{js,ts,jsx,tsx}'],
  darkMode: 'class',
  theme: {
    screens: {
      '2xl': { max: '1535px' },
      xl: { max: '1279px' },
      lg: { max: '985px' },
      md: { max: '861px' },
      sm: { max: '519px' },
      xs: { max: '459px' },
      '2xs': { max: '401px' },
    },
    colors: {
      transparent: 'transparent',
      current: 'currentColor',
      gray: {
        100: '#fcfcfd',
        200: '#e6e8ec',
        300: '#bcc2cc',
        400: '#777e90',
        500: '#5d626e',
        600: '#3a3d45',
        700: '#2c2e36',
        800: '#1e1e21',
        900: '#141416',
      },
      red: colors.red,
      orange: colors.orange,
      amber: colors.amber,
      yellow: colors.yellow,
      lime: colors.lime,
      green: colors.green,
      emerald: colors.emerald,
      teal: colors.teal,
      cyan: colors.cyan,
      sky: colors.sky,
      blue: {
        ...colors.blue,
        550: '#3e73ea',
      },
      indigo: colors.indigo,
      violet: colors.violet,
      purple: colors.purple,
      fuchsia: colors.fuchsia,
      pink: colors.pink,
      rose: colors.rose,
    },
    transitionDuration: {
      DEFAULT: '75ms',
      200: '200ms',
    },
    extend: {
      fontFamily: {
        sans: ['Inter', ...defaultTheme.fontFamily.sans],
        serif: ['Grenze Gotisch', ...defaultTheme.fontFamily.serif],
      },
      fontSize: {
        xs: '0.8rem',
        '2xs': '0.75rem',
      },
      height: {
        'editor-lg': 'calc(100vh - 72px)',
        'editor-sm': 'calc(100vh - 64px)',
      },
      spacing: {
        0.25: '1px',
        5.5: '22px',
        18: '72px',
      },
      scale: {
        80: '.80',
      },
      typography: (theme) => ({
        DEFAULT: {
          css: {
            '[class="toc"]': {
              fontSize: '12px',
              marginRight: '64px',
            },
            '[class="hint tip"]': {
              backgroundColor: theme('colors.green.100', colors.green[100]),
              color: theme('colors.green.600', colors.green[600]),
              fontWeight: 500,
              paddingLeft: '16px',
              paddingRight: '16px',
              paddingTop: '8px',
              paddingBottom: '8px',
              borderRadius: '8px',
            },
            '[class="hint warn"]': {
              backgroundColor: theme('colors.yellow.100', colors.yellow[100]),
              color: theme('colors.yellow.600', colors.yellow[600]),
              fontWeight: 500,
              paddingLeft: '16px',
              paddingRight: '16px',
              paddingTop: '8px',
              paddingBottom: '8px',
              borderRadius: '8px',
            },
            '[class="hint error"]': {
              backgroundColor: theme('colors.red.100', colors.red[100]),
              color: theme('colors.red.600', colors.red[600]),
              fontWeight: 500,
              paddingLeft: '16px',
              paddingRight: '16px',
              paddingTop: '8px',
              paddingBottom: '8px',
              borderRadius: '8px',
            },
          },
        },
        dark: {
          css: {
            '[class="toc"]': {
              fontSize: '12px',
              marginRight: '64px',
            },
            '[class="hint tip"]': {
              backgroundColor: theme('colors.green.900', colors.green[900]),
              color: theme('colors.green.400', colors.green[400]),
              fontWeight: 500,
              paddingLeft: '16px',
              paddingRight: '16px',
              paddingTop: '8px',
              paddingBottom: '8px',
              borderRadius: '8px',
            },
            '[class="hint warn"]': {
              backgroundColor: theme('colors.yellow.900', colors.yellow[900]),
              color: theme('colors.yellow.400', colors.yellow[400]),
              fontWeight: 500,
              paddingLeft: '16px',
              paddingRight: '16px',
              paddingTop: '8px',
              paddingBottom: '8px',
              borderRadius: '8px',
            },
            '[class="hint error"]': {
              backgroundColor: theme('colors.red.900', colors.red[900]),
              color: theme('colors.red.400', colors.red[400]),
              fontWeight: 500,
              paddingLeft: '16px',
              paddingRight: '16px',
              paddingTop: '8px',
              paddingBottom: '8px',
              borderRadius: '8px',
            },
            color: theme('colors.gray.300', colors.gray[300]),
            '[class~="lead"]': {
              color: theme('colors.gray.400', colors.gray[400]),
            },
            a: {
              color: theme('colors.gray.100', colors.gray[100]),
            },
            strong: {
              color: theme('colors.gray.100', colors.gray[100]),
            },
            'ol > li::before': {
              color: theme('colors.gray.500', colors.gray[500]),
            },
            'ul > li::before': {
              backgroundColor: theme('colors.gray.700', colors.gray[700]),
            },
            hr: {
              borderColor: theme('colors.gray.800', colors.gray[800]),
            },
            blockquote: {
              color: theme('colors.gray.100', colors.gray[100]),
              borderLeftColor: theme('colors.gray.800', colors.gray[800]),
            },
            h1: {
              color: theme('colors.gray.100', colors.gray[100]),
            },
            h2: {
              color: theme('colors.gray.100', colors.gray[100]),
            },
            h3: {
              color: theme('colors.gray.100', colors.gray[100]),
            },
            h4: {
              color: theme('colors.gray.100', colors.gray[100]),
            },
            'figure figcaption': {
              color: theme('colors.gray.500', colors.gray[500]),
            },
            code: {
              color: theme('colors.gray.100', colors.gray[100]),
            },
            'a code': {
              color: theme('colors.gray.100', colors.gray[100]),
            },
            thead: {
              color: theme('colors.gray.100', colors.gray[100]),
              borderBottomColor: theme('colors.gray.700', colors.gray[700]),
            },
            'tbody tr': {
              borderBottomColor: theme('colors.gray.800', colors.gray[800]),
            },
          },
        },
      }),
    },
  },
  variants: {
    extend: {
      typography: ['dark'],
    },
  },
  plugins: [require('@tailwindcss/typography')],
};
