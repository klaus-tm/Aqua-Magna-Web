// Email.js
import { MailOutline } from "@mui/icons-material";
import { FormControl, OutlinedInput, InputLabel, InputAdornment } from "@mui/material";
import * as React from "react";

export default function Email({ onChange }) {
    const [email, setEmail] = React.useState("");
    const [emailError, setEmailError] = React.useState(false);

    const handleChangeEmail = (event) => {
        const newEmail = event.target.value;
        setEmail(newEmail);
        setEmailError(!validateEmail(newEmail));
        onChange(newEmail);
    };

    const validateEmail = (email) => {
        // Basic email format validation
        const regex = /\S+@\S+\.\S+/;
        return regex.test(email);
    };

    return (
        <FormControl fullWidth variant="outlined" margin="normal">
            <InputLabel htmlFor="outlined-adornment-email">Email</InputLabel>
            <OutlinedInput
                id="outlined-adornment-email"
                type="text"
                value={email}
                onChange={handleChangeEmail}
                error={emailError}
                startAdornment={
                    <InputAdornment position="start">
                        <MailOutline />
                    </InputAdornment>
                }
                label="Email"
            />
        </FormControl>
    )
}