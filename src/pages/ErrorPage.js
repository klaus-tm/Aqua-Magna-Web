import { ThemeProvider } from "@emotion/react";
import { Avatar, Paper, Typography, useMediaQuery } from "@mui/material";
import { darkTheme, lightTheme } from "../config/theme";

export default function ErrorPage() {
    const prefersDarkMode = useMediaQuery("(prefers-color-scheme: dark)");
    const theme = prefersDarkMode ? darkTheme : lightTheme;

    return (
        <ThemeProvider theme={theme}>
            <div
                style={{ display: "flex", justifyContent: "center", alignItems: "center", height: "100vh" }}>
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

            </div>
        </ThemeProvider>
    )
}