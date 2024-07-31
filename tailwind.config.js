/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
 
    // Or if using `src` directory:
    "./src/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      backgroundImage: {
        'hero-pattern': "url('/assets/bgImg.jpg')",
      },
      fontFamily: {
        'sans': ['Nunito Sans', 'ui-sans-serif', 'system-ui'],
      },
      colors: {
        primary: {
          100: "#0D184B"
        },
        secondary: {
          100: "#CC3D5C"
        },
        lightColor: {
          100: "#F9AB6F"
        },
        banner: {
          100: "#1f2937"
        },
        bgColor: {
          100: "#558BDC"
        },
        'networkbg':'#F2F2F2',
          'first':'#0A142A',
          'second':"#D6DFF9",
          'third':"#E1DCF3",
          'fourth':"#F9EBDD",
          "blue":"#558BDC",
          "creme":"#F9EBDD",
          "carasoul":"#0D184B"
      },
      animation: {
        'spin-slow': 'spin 20s linear infinite',
      },
    },
  },
  plugins: [],
}