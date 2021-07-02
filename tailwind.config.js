module.exports = {
  purge: [
    './src/**/*.html',
    './src/**/*.js',
  ],
  darkMode: false, // or 'media' or 'class'
  theme: {
    extend: {            
      colors: {
        primary: {
            light: "#1B5790",
            dark: "#12395E"
        },
        secondary: {
            light: "#12395E",
            dark: "#125E50"
        },
        success: {
          light: "#21AB92",
          dark: "#125E50"
        },
        danger: {
            light: "#E97298",
            dark: "#CCCCCC"
        },
        info: {
            light: "#FDE235",
            dark: "#CCCCCC"
        },
        action: {
            light: "#259DD0",
            dark: "#CCCCCC"
        },
        background: {
            light: "#FFFFFF",
            dark: "#E5E5E5"
        },
    }
  },
  },
  variants: {
    extend: {},
  },
  plugins: [
    require('@tailwindcss/line-clamp'),
  ],
}
