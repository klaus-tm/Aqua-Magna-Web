import { Paper, Typography } from "@mui/material";
import { get, ref } from "firebase/database";
import { useEffect, useState } from "react";
import { database } from "../config/firebaseElements";

export default function EmployeeCard({ uid }) {

    const [name, setName] = useState("");
    const [phone, setPhone] = useState("");
    const [email, setEmail] = useState("");

    const handleUser = async () => {
        const userRef = ref(database, `users/${uid}`);
        const snapshot = await get(userRef);
        if (snapshot.exists()) {
            setPhone(snapshot.val().phone);
            setName(snapshot.val().name);
            setEmail(snapshot.val().email);
        }
    }

    useEffect(() => {
        handleUser();
    });

    return (
        <Paper elevation={10} style={{ padding: '24px' }}>
            <Typography variant="h6" gutterBottom>
                Employee: {name}
            </Typography>
            <Typography variant="body1" gutterBottom>
                Email: {email}
            </Typography>
            <Typography variant="body1">
                Phone Number: {phone}
            </Typography>
        </Paper>
    );
}