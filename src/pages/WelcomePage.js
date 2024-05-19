import React from 'react';
import { AppBar, Toolbar, Typography, Button, Box, IconButton, Avatar } from '@mui/material';
import { Link } from 'react-router-dom';


export default function WelcomePage() {
  return (
    <div>
      <AppBar position="static" elevation={10}>
        <Toolbar>
          <Link to={"/"}>
            <IconButton edge="start" aria-label="menu">
              <Avatar src="logo192.png" />
            </IconButton>
          </Link>
          <Typography variant="h6" style={{ flexGrow: 1 }}>
            Aqua Magna
          </Typography>
          <Button href='/signUp' align='center'>Sign up</Button>
          <Button href='/signIn'>Login</Button>
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
        }}
      >
        <Typography variant="h2" align="center" gutterBottom>
          Welcome to Aqua Magna!
        </Typography>
        <Typography variant="h5" align="center">
          Your number one solution for water management.
        </Typography>
      </Box>
    </div>
  );
}
