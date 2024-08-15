import { createTheme } from "@mui/material/styles";

export const lightTheme = createTheme({
  palette: {
    mode: "light",
    primary: {
      main: "#008080",
    },
    secondary: {
      main: "#328da8",
    },
    table: {
      main: "#8a8787",
    },
    background: {
      default: "#f5f5f5",
      paper: "#f5f5f5",
    },
    text: {
      primary: "#000000",
      secondary: "#000000",
    },
  },
  typography: {
    fontFamily: "Roboto, Arial, sans-serif",
  },
});

export const darkTheme = createTheme({
  palette: {
    mode: "dark",
    primary: {
      main: "#03dac6",
    },
    secondary: {
      main: "#03dac6",
    },
    background: {
      default: "#121212",
      paper: "#121212",
    },
    table: {
      main: "#302f2f",
    },
    text: {
      primary: "#ffffff",
      secondary: "#121212",
    },
  },
  typography: {
    fontFamily: "Roboto, Arial, sans-serif",
  },
});
