import { ThemeProvider } from "@emotion/react";
import { Snackbar, IconButton, Toolbar, AppBar, Avatar, Button, Paper, useMediaQuery, Typography, Box } from "@mui/material";
import { darkTheme, lightTheme } from "../config/theme";
import Email from "../components/Email";
import Name from "../components/Name";
import Address from "../components/Address";
import City from "../components/City";
import Country from "../components/Country";
import { Link, useNavigate } from "react-router-dom";
import { auth, database } from "../config/firebaseElements";
import { useEffect, useState } from "react";
import { get, ref, set } from "firebase/database";
import { onAuthStateChanged } from "firebase/auth";

/**
 * page used to view and modify the company details.
 * it collects the data about the company from the database and populates the correspondent fields
 * it saves the new data in the database when the save button is pressed
 * it disconnects the company from the Auth instance and navigates back to the index page
 * @returns page populated with the app bar with the app icon and name and a paper where the fields and buttons are placed
 */
export default function Profile() {
    const prefersDarkMode = useMediaQuery("(prefers-color-scheme: dark)");
    const theme = prefersDarkMode ? darkTheme : lightTheme;
    const navigate = useNavigate();

    const [email, setEmail] = useState("");
    const [name, setName] = useState("");
    const [address, setAddress] = useState("");
    const [city, setCity] = useState("");
    const [country, setCountry] = useState("");
    const [openSnackbar, setOpenSnackbar] = useState(false);
    const [snackbarMessage, setSnackbarMessage] = useState("");

    const handleCloseSnackbar = (event, reason) => {
        if (reason === "clickaway") { return; }
        setOpenSnackbar(false);
    }

    const handleSignOut = () => {
        auth.signOut().then(() => {
            navigate("/");
        });
    }

    const handleEmailChange = (newEmail) => {
        setEmail(newEmail);
    };

    useEffect(() => {
        const unsubscribe = onAuthStateChanged(auth, (user) => {
            if (user) {
                const fetchCompany = async () => {
                    try {
                        const companyRef = ref(database, `companies/${user.uid}`);
                        const snapshot = await get(companyRef);
                        if (snapshot.exists()) {
                            setName(snapshot.val().name);
                            setAddress(snapshot.val().address);
                            setCity(snapshot.val().city);
                            setCountry(snapshot.val().country);
                            setEmail(snapshot.val().email);
                        } else throw new Error("Account is not a company");
                    }
                    catch (error) {
                        console.error(error.message);
                    }
                }

                fetchCompany();
            } else {
                console.error("Account not logged in");
                navigate("/signIn");
            }
        });
        return () => {
            unsubscribe();
        }
    }, [navigate]);

    const handleSaveDetails = async () => {
        try {
            const user = await auth.currentUser;
            const companiesRef = ref(database, `companies/${user.uid}`);
            await set(companiesRef, {
                name,
                address,
                city,
                country,
                email
            }).then(() => {
                setSnackbarMessage("Details saved successfully!");
                setOpenSnackbar(true);
            })
        }
        catch (error) {
            console.error("Error saving details:", error.message);
            setSnackbarMessage("Problem saving details!");
            setOpenSnackbar(true);
        }
    }

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
                            Details of company: {name}
                        </Typography>
                        <Box display="flex" flexDirection="row" gap={2}>
                            <Name onChange={(value) => setName(value)} value={name} />
                            <Address onChange={(value) => setAddress(value)} value={address} />
                        </Box>
                        <Box display="flex" flexDirection="row" gap={2}>
                            <City onChange={(value) => setCity(value)} value={city} />
                            <Country onChange={(value) => setCountry(value)} value={country} />
                        </Box>
                        <Email onChange={handleEmailChange} value={email} />
                        <Box display="flex" flexDirection="row" gap={2} mt={2}>
                            <Button
                                fullWidth
                                variant="contained"
                                color="primary"
                                onClick={handleSaveDetails}>
                                Save details
                            </Button>
                            <Button
                                fullWidth
                                variant="text"
                                onClick={handleSignOut}>
                                Sign out
                            </Button>
                        </Box>
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