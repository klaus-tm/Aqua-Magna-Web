import { ThemeProvider } from "@emotion/react";
import { Avatar, Button, Paper, useMediaQuery, Typography, Box, Snackbar, CircularProgress, IconButton, Toolbar, AppBar } from "@mui/material";
import { darkTheme, lightTheme } from "../config/theme";
import Email from "../components/Email";
import Password from "../components/Password";
import Name from "../components/Name";
import Address from "../components/Address";
import City from "../components/City";
import Country from "../components/Country";
import { useEffect, useState } from "react";
import { createUserWithEmailAndPassword, onAuthStateChanged } from "firebase/auth"
import { auth, database } from "../config/firebaseElements";
import { ref, set } from "firebase/database";
import { Link, useNavigate } from "react-router-dom";

/**
 * page for the sign up part of the app.
 * it has fields for email, password, name, address, city and country
 * it creates the user in Auth when the sign up button is pressed
 * it creates a child in the database after the account is created
 * it redirects the user to thr login page when the login button is pressed
 * @returns page populated with the appbar where the app icon and name sits and a paper with the fields and the buttons explained above
 */
export default function SignUp() {
    const prefersDarkMode = useMediaQuery("(prefers-color-scheme: dark)");
    const theme = prefersDarkMode ? darkTheme : lightTheme;

    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [name, setName] = useState("");
    const [address, setAddress] = useState("");
    const [city, setCity] = useState("");
    const [country, setCountry] = useState("");

    const [loading, setLoading] = useState(false)
    const [openSnackbar, setOpenSnackbar] = useState(false);
    const [snackbarMessage, setSnackbarMessage] = useState("");
    const [isSignedIn, setIsSignedIn] = useState(false);
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
                    country,
                    email
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

    useEffect(() => {
        const unsubscribe = onAuthStateChanged(auth, (user) => {
            setIsSignedIn(!!user);
        });

        return () => unsubscribe();
    }, []);

    useEffect(() => {
        if (isSignedIn) {
            navigate("/");
        }
    }, [isSignedIn, navigate]);

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
                sx={{
                    position: 'fixed',
                    top: 0,
                    left: 0,
                    right: 0,
                    bottom: 0,
                    backgroundImage: `linear-gradient(rgba(0, 0, 0, 0.5), rgba(0, 0, 0, 0.5)), url('background.jpg')`,
                    backgroundSize: 'cover',
                    backgroundPosition: 'center top',
                    zIndex: -1,
                    display: 'flex',
                    flexDirection: 'column',
                    justifyContent: 'center',
                    alignItems: 'center',
                    padding: 2,
                }}>
                <Box
                    sx={{
                        display: 'flex',
                        flexDirection: 'column',
                        alignItems: 'center',
                        justifyContent: 'center',
                        flexGrow: 1,
                        width: '100%',
                        maxWidth: '500px',
                    }}>
                    <Paper
                        elevation={10}
                        sx={{
                            padding: 3,
                            width: '100%',
                            backgroundColor: theme.palette.secondary.container,
                            borderRadius: "5%",
                        }}>
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
                        <Email onChange={handleEmailChange} value={email}/>
                        <Password onChange={handlePasswordChange} />
                        <Button
                            fullWidth
                            variant="contained"
                            color="primary"
                            style={{ marginTop: "24px", borderRadius: "20" }}
                            onClick={handleSignUp}
                            disabled={loading}>
                            {loading ? <CircularProgress size={24} /> : "Create company"}
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
                </Box>
            </Box>
        </ThemeProvider>
    )
}