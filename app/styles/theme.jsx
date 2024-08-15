// styles/theme.jsx
import { createTheme } from "@mui/material/styles";

// Define light theme
export const lightTheme = createTheme({
  palette: {
    mode: "light",
    primary: {
      main: "#00796b", // Light teal color
    },
    secondary: {
      main: "#f50057", // Example secondary color
    },
    background: {
      default: "#c9c9c9", // Light background
      paper: "#c9c9c9", // Paper background
    },
    text: {
      primary: "#333333", // Primary text color
      secondary: "#ffffff", // Secondary text color
    },
  },
  typography: {
    fontFamily: ["Roboto", "Arial", "sans-serif"].join(","),
  },
  components: {
    MuiButton: {
      styleOverrides: {
        root: {
          borderRadius: "8px", // Rounded corners
        },
      },
    },
    MuiPaper: {
      styleOverrides: {
        root: {
          borderRadius: "8px", // Rounded corners
          boxShadow: "0px 4px 8px rgba(0, 0, 0, 0.1)", // Light shadow for modern feel
        },
      },
    },
  },
});

// Define dark theme
export const darkTheme = createTheme({
  palette: {
    mode: "dark",
    primary: {
      main: "#04d197", // Light teal color in dark mode
    },
    secondary: {
      main: "#d94174", // Example light secondary color in dark mode
    },
    background: {
      default: "#1e1e1e", // Dark background
      paper: "#2e2e2e", // Paper background
    },
    text: {
      primary: "#e0e0e0", // Primary text color
      secondary: "#000000", // Secondary text color
    },
  },
  typography: {
    fontFamily: ["Roboto", "Arial", "sans-serif"].join(","),
  },
  components: {
    MuiButton: {
      styleOverrides: {
        root: {
          borderRadius: "8px", // Rounded corners
        },
      },
    },
    MuiPaper: {
      styleOverrides: {
        root: {
          borderRadius: "8px", // Rounded corners
          boxShadow: "0px 4px 8px rgba(0, 0, 0, 0.3)", // Darker shadow for modern feel
        },
      },
    },
  },
});
