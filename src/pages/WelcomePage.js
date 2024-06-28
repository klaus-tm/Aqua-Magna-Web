import React from 'react';
import { useMediaQuery, AppBar, Toolbar, Typography, Button, Box, IconButton, Avatar, ThemeProvider } from '@mui/material';
import { Link } from 'react-router-dom';
import { darkTheme, lightTheme } from "../config/theme";

/**
 * main page shown when there is no company logged in
 * @returns the page populated with the appbar containing the app icon and name, signUp and login text buttons and a box with a welcome message
 */
export default function WelcomePage() {
  const prefersDarkMode = useMediaQuery("(prefers-color-scheme: dark)");
  const theme = prefersDarkMode ? darkTheme : lightTheme;

  return (
    <ThemeProvider theme={theme}>
      <AppBar position="static" elevation={10} enableColorOnDark sx={{ backgroundColor: theme.palette.surface.main }}>
        <Toolbar>
          <Link to={"/"}>
            <IconButton edge="start" aria-label="menu">
              <Avatar src="logo192.png" />
            </IconButton>
          </Link>
          <Typography variant="h6" style={{ flexGrow: 1, color: theme.palette.surface.onMain }}>
            Aqua Magna
          </Typography>
          <Button href='/signUp' align='center' sx={{ color: theme.palette.primary.main }}>Sign up</Button>
          <Button href='/signIn' sx={{ color: theme.palette.primary.main }}>Login</Button>
        </Toolbar>
      </AppBar>
      <Box
        style={{
          position: 'fixed', // Apply fixed positioning
          top: 0,
          left: 0,
          right: 0,
          bottom: 0,
          backgroundImage: `linear-gradient(rgba(0, 0, 0, 0.5), rgba(0, 0, 0, 0.5)), url('background.jpg')`,
          backgroundSize: 'cover',
          backgroundPosition: 'center top',
          zIndex: -1, // Ensure the background is behind other content
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'center',
          alignItems: 'center',
        }}>
        <Typography variant="h2" align="center" gutterBottom style={{ color: darkTheme.palette.surface.onMain }}>
          Welcome to Aqua Magna!
        </Typography>
        <Typography variant="h5" align="center" style={{ color: darkTheme.palette.surface.onMain }}>
          Your number one solution for water management.
        </Typography>
      </Box>
    </ThemeProvider>
  );
}
