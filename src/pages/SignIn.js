import { CircularProgress, Button, Typography, Avatar, useMediaQuery, Paper } from "@mui/material";
import { ThemeProvider } from "@emotion/react";
import { darkTheme, lightTheme } from "../config/theme";
import Email from "../components/Email";
import Password from "../components/Password";

export default function SignIn() {

    const prefersDarkMode = useMediaQuery("(prefers-color-scheme: dark)");
    const theme = prefersDarkMode ? darkTheme : lightTheme;

    return (
        <ThemeProvider theme={theme}>
            <div
                style={{ display: "flex", justifyContent: "center", alignItems: "center", height: "100vh" }}>
                <Paper
                    elevation={10}
                    style={{ padding: 24, width: 300, backgroundColor: theme.palette.secondary.container, borderRadius: "5%" }}>
                    <Avatar
                        alt="Aqua Magna"
                        src="logo512.png"
                        style={{ width: 70, height: 70, marginTop: "auto", marginLeft: "auto", marginRight: "auto", marginBottom: "20px", }} />
                    <Typography variant="h4" align="center" gutterBottom>
                        Welcome back!
                    </Typography>
                    <Email />
                    <Password />
                    <Button
                        fullWidth
                        variant="contained"
                        color="primary"
                        style={{ marginTop: "24px", borderRadius: "20" }}
                        href="">
                        Sign In
                    </Button>
                    <Button
                        fullWidth
                        variant="text"
                        style={{ marginTop: "16px", marginBottom: "20px" }}
                        href="/signUp">
                        New company? Sign Up!
                    </Button>
                </Paper>
            </div>
        </ThemeProvider>
    );
}
