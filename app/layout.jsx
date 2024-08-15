"use client";

import { useState } from "react";
import { ThemeProvider, CssBaseline } from "@mui/material";
import { lightTheme, darkTheme } from "./styles/theme"; // Adjust the path as necessary
import Header from "./components/Header"; // Adjust the path as necessary

export default function RootLayout({ children }) {
  const [darkMode, setDarkMode] = useState(false);

  const toggleDarkMode = () => {
    setDarkMode((prevMode) => !prevMode);
  };

  const theme = darkMode ? darkTheme : lightTheme;

  return (
    <html lang="en">
      <body>
        <ThemeProvider theme={theme}>
          <CssBaseline />
          <Header
            toggleDarkMode={toggleDarkMode}
            mode={darkMode ? "dark" : "light"}
          />
          <main>{children}</main>
        </ThemeProvider>
      </body>
    </html>
  );
}
