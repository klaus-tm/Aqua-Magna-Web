import { ThemeProvider } from "@emotion/react";
import { Link } from "react-router-dom";
import { useMediaQuery, TableContainer, Paper, Table, TableHead, TableRow, TableCell, TableBody, AppBar, Toolbar, IconButton, Avatar, Typography, Button, Popover } from "@mui/material";
import { darkTheme, lightTheme } from "../config/theme";
import { useEffect, useState } from "react";
import { get, off, onValue, ref } from "firebase/database";
import { auth, database } from "../config/firebaseElements";
import { onAuthStateChanged } from "firebase/auth";
import EmployeeCard from "../components/EmployeeCard";

function ScanData(uid, name, date, location, ph, turbidity, conductivity) {
    return { uid, name, date, location, ph, turbidity, conductivity };
}

async function getUserName(uid) {
    const userRef = ref(database, `users/${uid}`);
    const snapshot = await get(userRef);
    if (snapshot.exists()) {
        return snapshot.val().name;
    }
    else return "";
}

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
                    <Button href='/profile'>Profile</Button>
                </Toolbar>
            </AppBar>
            <div style={{ padding: 24 }}>
                <TableContainer component={Paper}>
                    <Table sx={{ minWidth: 650 }} aria-label="simple table">
                        <TableHead>
                            <TableRow>
                                <TableCell align="center" style={{ fontWeight: "bold" }}>Employee name</TableCell>
                                <TableCell align="center" style={{ fontWeight: "bold" }}>Date</TableCell>
                                <TableCell align="center" style={{ fontWeight: "bold" }}>Location</TableCell>
                                <TableCell align="center" style={{ fontWeight: "bold" }}>pH</TableCell>
                                <TableCell align="center" style={{ fontWeight: "bold" }}>Turbidity&nbsp;(NTU)</TableCell>
                                <TableCell align="center" style={{ fontWeight: "bold" }}>Conductivity&nbsp;(mS/cm)</TableCell>
                            </TableRow>
                        </TableHead>
                        <TableBody>
                            {rows.map((row, index) => (
                                <TableRow
                                    key={index}
                                    sx={{ '&:last-child td, &:last-child th': { border: 0 } }}>
                                    <TableCell align="center"
                                        onMouseOver={(event) => handlePopoverOpen(event, row.uid)}
                                        onMouseLeave={handlePopoverClose}>
                                        {row.name}
                                    </TableCell>
                                    <TableCell align="center">{row.date}</TableCell>
                                    <TableCell align="center">
                                        <a href={`https://www.google.com/maps/search/?api=1&query=${row.location}`} target="_blank" rel="noopener noreferrer">
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
            </div>
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