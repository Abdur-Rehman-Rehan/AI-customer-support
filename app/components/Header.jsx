"use client";

import { AppBar, Toolbar, Typography, IconButton } from "@mui/material";
import WbSunnyIcon from "@mui/icons-material/WbSunny"; // Sun icon
import NightsStayIcon from "@mui/icons-material/NightsStay"; // Moon icon
import GitHubIcon from "@mui/icons-material/GitHub"; // GitHub icon

const Header = ({ toggleDarkMode, mode }) => {
  return (
    <AppBar position="static" color="background" elevation={0}>
      <Toolbar
        sx={{
          padding: { xs: "10px", md: "20px" },
          display: "flex",
          justifyContent: "space-between",
        }}
      >
        {/* GitHub Icon Link */}
        <IconButton
          component="a"
          href="https://github.com/Abdur-Rehman-Rehan/pantry-tracker"
          target="_blank"
          sx={{
            color: "primary.main",
            marginRight: { xs: 1, md: 2 },
            "&:hover": { backgroundColor: "transparent" },
          }}
        >
          <GitHubIcon fontSize="large" />
        </IconButton>

        {/* Heading */}
        <Typography
          variant="h4"
          sx={{
            color: "primary.main",
            flexGrow: 1,
            textAlign: "center",
            fontSize: { xs: "1.5rem", md: "2rem" },
          }}
        >
          AI Customer Support
        </Typography>

        {/* Theme Toggle Button */}
        <IconButton
          edge="end"
          color="inherit"
          aria-label="theme-toggle"
          onClick={toggleDarkMode}
          sx={{
            padding: "8px",
            paddingRight: { xs: "12px", md: "12px" },
            "&:hover": { backgroundColor: "transparent" },
          }}
        >
          {mode === "light" ? (
            <NightsStayIcon fontSize="large" /> // Moon icon for light mode
          ) : (
            <WbSunnyIcon fontSize="large" sx={{ color: "yellow" }} /> // Sun icon for dark mode
          )}
        </IconButton>
      </Toolbar>
    </AppBar>
  );
};

export default Header;
