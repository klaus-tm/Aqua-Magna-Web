import { ThemeProvider } from "@emotion/react";
import { Avatar, Button, Paper, useMediaQuery, Typography, Box } from "@mui/material";
import { darkTheme, lightTheme } from "../config/theme";
import Email from "../components/Email";
import Password from "../components/Password";
import Name from "../components/Name";
import Address from "../components/Address";
import City from "../components/City";
import Country from "../components/Country";


export default function Profile() {
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
                    <Typography variant="h4" align="center" gutterBottom>
                        Details of company:
                    </Typography>
                    <Box display="flex" flexDirection="row" gap={2}>
                        <Name />
                        <Address />
                    </Box>
                    <Box display="flex" flexDirection="row" gap={2}>
                        <City />
                        <Country />
                    </Box>
                    <Email />
                    <Box display="flex" flexDirection="row" gap={2} mt={2}>
                        <Button
                            fullWidth
                            variant="contained"
                            color="primary"
                            href="">
                            Save details
                        </Button>
                        <Button
                            fullWidth
                            variant="text">
                            Sign out
                        </Button>
                    </Box>
                    <Button
                        fullWidth
                        variant="text"
                        sx={{
                            mt: 2,
                            color: theme.palette.error.main,
                            '&:hover': {
                                backgroundColor: theme.palette.error.onMain,
                            }
                        }}>
                        Delete company
                    </Button>
                </Paper>
            </div>
        </ThemeProvider>
    )
}