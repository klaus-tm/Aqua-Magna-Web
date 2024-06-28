import { ThemeProvider } from "@emotion/react";
import { Link } from "react-router-dom";
import { useMediaQuery, TableContainer, Paper, Table, TableHead, TableRow, TableCell, TableBody, AppBar, Toolbar, IconButton, Avatar, Typography, Button, Popover, Box } from "@mui/material";
import { darkTheme, lightTheme } from "../config/theme";
import { useEffect, useState } from "react";
import { get, off, onValue, ref } from "firebase/database";
import { auth, database } from "../config/firebaseElements";
import { onAuthStateChanged } from "firebase/auth";
import EmployeeCard from "../components/EmployeeCard";

/**
 * function used to create the scanData object which populates each table line
 * @param {*} uid 
 * @param {*} name 
 * @param {*} date 
 * @param {*} location 
 * @param {*} ph 
 * @param {*} turbidity 
 * @param {*} conductivity 
 * @returns scanData object
 */
function ScanData(uid, name, date, location, ph, turbidity, conductivity) {
    return { uid, name, date, location, ph, turbidity, conductivity };
}

/**
 * function used to get the user name from th UID stored in the scanData 
 * @param {*} uid 
 * @returns the user name as a string
 */
async function getUserName(uid) {
    const userRef = ref(database, `users/${uid}`);
    const snapshot = await get(userRef);
    if (snapshot.exists()) {
        return snapshot.val().name;
    }
    else return "";
}

/**
 * function used to check the values in the standards exact;y the same to the android app
 * @param {*} ph 
 * @param {*} turbidity 
 * @param {*} conductivity 
 * @param {*} theme 
 * @returns theme color used to draw the specific table line accordingly
 */
function checkValues(ph, turbidity, conductivity, theme) {
    const phThreshhold = 7.5;

    if (Math.abs(phThreshhold - ph) <= 1.0 && turbidity <= 1.0 && conductivity <= 0.8)
        return theme.palette.secondary.container;
    else if (Math.abs(phThreshhold - ph) > 2.0 || turbidity > 5.0 || conductivity > 2.5)
        return theme.palette.error.container;
    return theme.palette.tertiary.container;
}

/**
 * main home page used by the company to view the saves made by its employees as users.
 * it creates a table where the scan values are stored
 * it collects the scans from the database and filters them based on the company name
 * it creates a paper when the cursor hovers over the user name
 * it creates a link to Google Maps to show the location of the scan using a pin
 * @returns page composed by the app bar with the app icon and name, button link to the company profile page and a box containing the table with the values collected from the database
 */
export default function Home() {
    const [rows, setRows] = useState([]);
    const [companyName, setCompanyName] = useState("");
    const prefersDarkMode = useMediaQuery("(prefers-color-scheme: dark)");
    const theme = prefersDarkMode ? darkTheme : lightTheme;
    const [anchorEl, setAnchorEl] = useState(null);
    const [hoveredEmployee, setHoveredEmployee] = useState(null);

    useEffect(() => {
        const unsubscribe = onAuthStateChanged(auth, (user) => {
            if (user) {
                const fetchCompany = async () => {
                    const companyRef = ref(database, `companies/${user.uid}`);
                    const snapshot = await get(companyRef);
                    if (snapshot.exists()) {
                        setCompanyName(snapshot.val().name);
                    }
                }

                fetchCompany();
            }
        });
        return () => {
            unsubscribe();
        };
    }, []);

    useEffect(() => {
        if (companyName) {
            const scansRef = ref(database, 'scans');
            const handleNewScan = async (snapshot) => {
                const scans = snapshot.val();
                const newScans = [];
                for (let id in scans) {
                    const scan = scans[id];
                    if (scan.company === companyName) {
                        const userName = await getUserName(scan.user);
                        newScans.unshift(ScanData(scan.user, userName, scan.date, scan.location, scan.ph, scan.turbidity, scan.conductivity));
                    }
                }
                setRows(newScans);
            }

            onValue(scansRef, handleNewScan);
            return () => {
                off(scansRef, handleNewScan);
            }
        }
    }, [companyName]);

    const handlePopoverOpen = (event, employeeUid) => {
        setAnchorEl(event.currentTarget);
        setHoveredEmployee(employeeUid);
    };

    const handlePopoverClose = () => {
        setAnchorEl(null);
    };

    const open = Boolean(anchorEl);


    return (
        <ThemeProvider theme={theme}>
            <AppBar position="static" elevation={10} enableColorOnDark sx={{ backgroundColor: theme.palette.surface.main }}>
                <Toolbar>
                    <Link to={"/"}>
                        <IconButton edge="start" aria-label="menu">
                            <Avatar src="logo192.png" />
                        </IconButton>
                    </Link>
                    <Typography variant="h6" style={{ flexGrow: 1, color: theme.palette.surface.onMain }}>
                        Aqua Magna
                    </Typography>
                    <Button href='/profile' sx={{ color: theme.palette.primary.main }}>Profile</Button>
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
                    justifyContent: 'flex-start',
                    alignItems: 'center',
                    padding: 2,
                    pt: 10,
                }}
            >
                <TableContainer component={Paper} sx={{ overflowY: 'auto', width: '100%' }}>
                    <Table stickyHeader sx={{ minWidth: 650 }} aria-label="simple table">
                        <TableHead>
                            <TableRow>
                                <TableCell align="center" style={{ fontWeight: "bold" }}>Index</TableCell>
                                <TableCell align="center" style={{ fontWeight: "bold" }}>Employee</TableCell>
                                <TableCell align="center" style={{ fontWeight: "bold" }}>Date</TableCell>
                                <TableCell align="center" style={{ fontWeight: "bold" }}>Location&nbsp;(latitude,longitude)</TableCell>
                                <TableCell align="center" style={{ fontWeight: "bold" }}>pH</TableCell>
                                <TableCell align="center" style={{ fontWeight: "bold" }}>Turbidity&nbsp;(NTU)</TableCell>
                                <TableCell align="center" style={{ fontWeight: "bold" }}>Conductivity&nbsp;(mS/cm)</TableCell>
                            </TableRow>
                        </TableHead>
                        <TableBody>
                            {rows.map((row, index) => (
                                <TableRow
                                    key={index}
                                    sx={{
                                        '&:last-child td, &:last-child th': { border: 0 },
                                        backgroundColor: checkValues(row.ph, row.turbidity, row.conductivity, theme)
                                    }}>
                                    <TableCell align="center" >{index + 1}</TableCell>
                                    <TableCell align="center"
                                        onMouseOver={(event) => handlePopoverOpen(event, row.uid)}
                                        onMouseLeave={handlePopoverClose}>
                                        {row.name}
                                    </TableCell>
                                    <TableCell align="center">{row.date}</TableCell>
                                    <TableCell align="center">
                                        <a href={`https://www.google.com/maps/search/?api=1&query=${row.location}`} target="_blank" rel="noopener noreferrer" style={{ textDecoration: 'none', color: 'inherit' }}>
                                            {row.location}
                                        </a></TableCell>
                                    <TableCell align="center">{row.ph}</TableCell>
                                    <TableCell align="center">{row.turbidity}</TableCell>
                                    <TableCell align="center">{row.conductivity}</TableCell>
                                </TableRow>
                            ))}
                        </TableBody>
                    </Table>
                </TableContainer>
            </Box>
            <Popover
                open={open}
                anchorEl={anchorEl}
                anchorOrigin={{
                    vertical: 'bottom',
                    horizontal: 'left',
                }}
                transformOrigin={{
                    vertical: 'top',
                    horizontal: 'left',
                }}
                onClose={handlePopoverClose}
                disableRestoreFocus
                sx={{ pointerEvents: 'none' }}>
                <EmployeeCard uid={hoveredEmployee} />
            </Popover>
        </ThemeProvider>

    );
}