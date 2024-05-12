import { CircularProgress, Button, Typography, Avatar, useMediaQuery, Paper, Snackbar } from "@mui/material";
import { ThemeProvider } from "@emotion/react";
import { darkTheme, lightTheme } from "../config/theme";
import Email from "../components/Email";
import Password from "../components/Password";
import { useState } from "react";
import { signInWithEmailAndPassword } from "firebase/auth";
import { auth, database } from "../config/firebaseElements";
import { useNavigate } from "react-router-dom";
import { get, ref } from "firebase/database";

export default function SignIn() {

    const prefersDarkMode = useMediaQuery("(prefers-color-scheme: dark)");
    const theme = prefersDarkMode ? darkTheme : lightTheme;

    const [email, setEmail] = useState(null);
    const [password, setPassword] = useState(null);
    const [loading, setLoading] = useState(false);
    const [openSnackbar, setOpenSnackbar] = useState(false);
    const [snackbarMessage, setSnackbarMessage] = useState("");
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
                }else throw new Error("Account is not a company");
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
                    <Email onChange={handleEmailChange}/>
                    <Password onChange={handlePasswordChange}/>
                    <Button
                        fullWidth
                        variant="contained"
                        color="primary"
                        style={{ marginTop: "24px", borderRadius: "20" }}
                        onClick={handleSignIn}
                        disabled={loading}>
                        {loading ? <CircularProgress size={24}/> : "Sign In"}
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
            </div>
        </ThemeProvider>
    );
}
