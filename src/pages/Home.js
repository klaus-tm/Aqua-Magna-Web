import { ThemeProvider } from "@emotion/react";
import { useMediaQuery } from "@mui/material";
import { darkTheme, lightTheme } from "../config/theme";

export default function Home() {
    const prefersDarkMode = useMediaQuery("(prefers-color-scheme: dark)");
    const theme = prefersDarkMode ? darkTheme : lightTheme;

    return (
        <ThemeProvider theme={theme}>
            <div style={{ height: 400, width: '100%' }}>
            </div>
        </ThemeProvider>
    )
}