module.exports = {
    mode: 'jit',
    purge: ['./pages/**/*.{js,ts,jsx,tsx}', './components/**/*.{js,ts,jsx,tsx}'],
    darkMode: false, // or 'media' or 'class'
    theme: {
      fontFamily: {
        'sans': ['Noto Sans'],
        'mono': ['Lobster']
      },
      extend: {
        colors: {
          'dark': '#252329',
          'darker' : '#120F13',
          'black': '#000'
        },
        borderWidth: {
          '18': '18px'
        }
      },
    },
    variants: {
      extend: {},
    },
    plugins: [],
  }
  