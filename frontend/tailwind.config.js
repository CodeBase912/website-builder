module.exports = {
  content: ["./src/**/*.{js,jsx,ts,tsx}"],
  theme: {
    extend: {
      screens: {
        "2md": "860px",
      },
      colors: {
        primary: "#00EDFF",
        success: "#33BB03",
        error: "#F60404",
        grey: "#565656", // Dark-Mode (Home Page) Card Background
        "grey-lighter": "#E0E0E3", // Dark-Mode (Files Page) Card Background
        "grey-light": "#8A8A8A", // Dark-Mode (Files Page) Card Background
        "grey-dark": "#363636", // Dark-Mode (Dashbord) Page Background
        "grey-darker": "#252423", // Footer Background
        dark: "#0F0F0F", // Header Active Link Background / Dark-Mode Icons SideBar background
        blue: "#00A7B4", // Home Page 1st Section Icons
        "blue-light": "rgba(0, 222, 239, 0.15)", // Home Page Pricing Card Icon Background
        "blue-dark": "#00A7B4", // Home Page 2nd Section Box-1 Background
        "blue-darker": "#007078", // Home Page 2nd Section Box-2 Background
        "blue-secondary": "#93A5FF", // Home Page Pricing Card Icon
        "partner-icons": "#434343",
      },
      spacing: {
        "30px": "30px",
        screenh: "100vh",
        screenw: "100vw",
      },
      fontSize: {
        xs: "11px",
        s: "13px",
        "30px": "30px",
      },
      textColor: {
        primary: "#00EDFF",
        "grey-dark": "#363636",
        dark: "#2E2E2E",
        secondary: "rgba(46, 46, 46, 0.8)",
        tertiary: "#E0E0E3",
      },
      maxWidth: {
        largest: "1240px",
      },
    },
  },
  plugins: [],
};
