import { ThemeProvider } from "@emotion/react";
import { Avatar, Button, Paper, useMediaQuery, Typography, Box, Snackbar, CircularProgress } from "@mui/material";
import { darkTheme, lightTheme } from "../config/theme";
import Email from "../components/Email";
import Password from "../components/Password";
import Name from "../components/Name";
import Address from "../components/Address";
import City from "../components/City";
import Country from "../components/Country";
import { useState } from "react";
import { createUserWithEmailAndPassword } from "firebase/auth"
import { auth, database } from "../config/firebaseElements";
import { ref, set } from "firebase/database";
import { useNavigate } from "react-router-dom";


export default function SignUp() {
    const prefersDarkMode = useMediaQuery("(prefers-color-scheme: dark)");
    const theme = prefersDarkMode ? darkTheme : lightTheme;

    const [email, setEmail] = useState(null);
    const [password, setPassword] = useState(null);
    const [name, setName] = useState("");
    const [address, setAddress] = useState("");
    const [city, setCity] = useState("");
    const [country, setCountry] = useState("");

    const [loading, setLoading] = useState(false)
    const [openSnackbar, setOpenSnackbar] = useState(false);
    const [snackbarMessage, setSnackbarMessage] = useState("");
    const navigate = useNavigate();

    const handleSignUp = async () => {
        setLoading(true);
        try {
            const userCredential = await createUserWithEmailAndPassword(auth, email, password);
            if (userCredential) {
                const user = userCredential.user;

                const userId = user.uid;

                const companiesRef = ref(database, `companies/${userId}`);
                await set(companiesRef, {
                    name,
                    address,
                    city,
                    country
                });

                navigate("/")
            }
        } catch (error) {
            console.error("Error signing up:", error.message);
            setSnackbarMessage("Problem creating account! Make sure the office email is used!");
            setOpenSnackbar(true);
        }
        setLoading(false);
    };

    const handleCloseSnackbar = (event, reason) => {
        if (reason === "clickaway") { return; }
        setOpenSnackbar(false);
    }

    const handleEmailChange = (newEmail) => {
        setEmail(newEmail);
    };

    const handlePasswordChange = (newPassword) => {
        setPassword(newPassword);
    };

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
                        Register your company!
                    </Typography>
                    <Box display="flex" flexDirection="row" gap={2}>
                        <Name onChange={(value) => setName(value)} />
                        <Address onChange={(value) => setAddress(value)} />
                    </Box>
                    <Box display="flex" flexDirection="row" gap={2}>
                        <City onChange={(value) => setCity(value)} />
                        <Country onChange={(value) => setCountry(value)} />
                    </Box>
                    <Email onChange={handleEmailChange} />
                    <Password onChange={handlePasswordChange} />
                    <Button
                        fullWidth
                        variant="contained"
                        color="primary"
                        style={{ marginTop: "24px", borderRadius: "20" }}
                        onClick={handleSignUp}
                        disabled={loading}>
                        {loading ? <CircularProgress size={24}/> : "Create company"}
                    </Button>
                    <Button
                        fullWidth
                        variant="text"
                        style={{ marginTop: "16px", marginBottom: "20px", textAlign: "center" }}
                        href="/signIn">
                        Company already created? Sign In!
                    </Button>
                    <Snackbar
                        open={openSnackbar}
                        autoHideDuration={3000} // Snackbar will auto-hide after 3 seconds
                        onClose={handleCloseSnackbar}
                        message={snackbarMessage}
                        anchorOrigin={{ vertical: 'bottom', horizontal: 'center' }}
                    />
                </Paper>
            </div>
        </ThemeProvider>
    )
}