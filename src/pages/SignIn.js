import { CircularProgress, Button, Typography, Avatar, useMediaQuery, Paper, Snackbar, Box, AppBar, Toolbar, IconButton } from "@mui/material";
import { ThemeProvider } from "@emotion/react";
import { darkTheme, lightTheme } from "../config/theme";
import Email from "../components/Email";
import Password from "../components/Password";
import { useEffect, useState } from "react";
import { onAuthStateChanged, signInWithEmailAndPassword } from "firebase/auth";
import { auth, database } from "../config/firebaseElements";
import { Link, useNavigate } from "react-router-dom";
import { get, ref } from "firebase/database";

/**
 * page for the Login part of the app.
 * it has fields for email and password
 * it checks if the user exists in Auth when the login button is pressed
 * it redirects the user to thr sign up page when the sign up button is pressed
 * it redirects the user to the index page if the user exists and an Auth instance is created
 * @returns page populated with the appbar where the app icon and name sits and a paper with the fields and the buttons explained above
 */
export default function SignIn() {

    const prefersDarkMode = useMediaQuery("(prefers-color-scheme: dark)");
    const theme = prefersDarkMode ? darkTheme : lightTheme;

    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [loading, setLoading] = useState(false);
    const [openSnackbar, setOpenSnackbar] = useState(false);
    const [snackbarMessage, setSnackbarMessage] = useState("");
    const [isSignedIn, setIsSignedIn] = useState(false);
    const navigate = useNavigate();

    const handleEmailChange = (newEmail) => {
        setEmail(newEmail);
    };

    const handlePasswordChange = (newPassword) => {
        setPassword(newPassword);
    };

    const handleSignIn = async () => {
        setLoading(true);
        try {
            const userCredential = await signInWithEmailAndPassword(auth, email, password);
            if (userCredential) {
                const companyRef = ref(database, `companies/${userCredential.user.uid}`)
                const snapshot = await get(companyRef);
                if (snapshot.exists()) {
                    navigate("/");
                } else throw new Error("Account is not a company");
            }
        } catch (error) {
            console.error("Error signing in:", error.message);
            setSnackbarMessage("Problem while signing in! Make sure the account is created and it is a company account!");
            setOpenSnackbar(true);
        }
        setLoading(false);
    }

    const handleCloseSnackbar = (event, reason) => {
        if (reason === "clickaway") { return; }
        setOpenSnackbar(false);
    }

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
                    <IconButton edge="start" aria-label="menu" >
                        <Avatar src="logo192.png" />
                    </IconButton >
                </Link >
                <Typography variant="h6" style={{ flexGrow: 1 }}>
                    Aqua Magna
                </Typography>
            </Toolbar >
        </AppBar >
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
                style={{ padding: 24, width: 300, backgroundColor: theme.palette.secondary.container, borderRadius: "5%" }}>
                <Avatar
                    alt="Aqua Magna"
                    src="logo512.png"
                    style={{ width: 70, height: 70, marginTop: "auto", marginLeft: "auto", marginRight: "auto", marginBottom: "20px", }} />
                <Typography variant="h4" align="center" gutterBottom>
                    Welcome back!
                </Typography>
                <Email onChange={handleEmailChange} value={email}/>
                <Password onChange={handlePasswordChange} />
                <Button
                    fullWidth
                    variant="contained"
                    color="primary"
                    style={{ marginTop: "24px", borderRadius: "20" }}
                    onClick={handleSignIn}
                    disabled={loading}>
                    {loading ? <CircularProgress size={24} /> : "Sign In"}
                </Button>
                <Button
                    fullWidth
                    variant="text"
                    style={{ marginTop: "16px", marginBottom: "20px" }}
                    href="/signUp">
                    New company? Sign Up!
                </Button>
                <Snackbar
                    open={openSnackbar}
                    autoHideDuration={3000}
                    onClose={handleCloseSnackbar}
                    message={snackbarMessage}
                    anchorOrigin={{ vertical: 'bottom', horizontal: 'center' }}
                />
            </Paper>
        </Box>
    </ThemeProvider >
    );
}
