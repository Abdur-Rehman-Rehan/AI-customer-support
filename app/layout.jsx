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
          <main style={{ minHeight: "calc(100vh - 64px)" }}>
            {" "}
            {/* Adjust 64px to the height of your header */}
            {children}
          </main>
        </ThemeProvider>
      </body>
    </html>
  );
}
