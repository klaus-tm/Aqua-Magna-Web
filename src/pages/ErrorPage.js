import { ThemeProvider } from "@emotion/react";
import { AppBar, Toolbar, IconButton, Avatar, Box, Paper, Typography, useMediaQuery } from "@mui/material";
import { darkTheme, lightTheme } from "../config/theme";
import { Link } from "react-router-dom";

/**
 * page called by react router dom when any of the stated links is not called.
 * it shows an error 404 page with a message that this link is not created and you should go back
 * @returns the whole page with a top appbar populated with the app icon and name, and the content box with its background image and a paper with the message
 */
export default function ErrorPage() {
    const prefersDarkMode = useMediaQuery("(prefers-color-scheme: dark)");
    const theme = prefersDarkMode ? darkTheme : lightTheme;

    return (
        <ThemeProvider theme={theme}>
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
                <Paper
                    elevation={10}
                    style={{ padding: 24, width: 500, backgroundColor: theme.palette.secondary.container, borderRadius: "5%" }}>
                    <Avatar
                        alt="Aqua Magna"
                        src="logo512.png"
                        style={{ width: 70, height: 70, marginTop: "auto", marginLeft: "auto", marginRight: "auto", marginBottom: "20px", }} />
                    <Typography variant="h3" align="center" gutterBottom>
                        Error 404. Page not found! Please go back or find a relevant page!
                    </Typography>
                </Paper>

            </Box>
        </ThemeProvider>
    )
}