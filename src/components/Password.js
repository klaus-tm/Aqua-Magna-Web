import { FormControl, InputLabel, OutlinedInput, InputAdornment, IconButton } from "@mui/material";
import { PasswordOutlined, Visibility, VisibilityOff } from "@mui/icons-material";
import * as React from "react";

/**
 * component used for the password text field across the app
 * it has handlers for the show or hide the password characters
 * @param {*} param0 
 * @returns FormControl used for password
 */
export default function Password({ onChange }) {
    const [showPassword, setShowPassword] = React.useState(false);
    const [password, setPassword] = React.useState("");

    const handleClickShowPassword = () => setShowPassword((show) => !show);

    const handleMouseDownPassword = (event) => {
        event.preventDefault();
    };

    const handleChangePassword = (event) => {
        const newPassword = event.target.value;
        setPassword(newPassword);
        onChange(newPassword);
    };

    return (
        <FormControl fullWidth variant="outlined" margin="normal">
            <InputLabel htmlFor="outlined-adornment-password">Password</InputLabel>
            <OutlinedInput
                id="outlined-adornment-password"
                type={showPassword ? "text" : "password"}
                value={password}
                onChange={handleChangePassword}
                startAdornment={
                    <InputAdornment position="start">
                        <PasswordOutlined />
                    </InputAdornment>
                }
                endAdornment={
                    <InputAdornment position="end">
                        <IconButton
                            aria-label="toggle password visibility"
                            onClick={handleClickShowPassword}
                            onMouseDown={handleMouseDownPassword}
                            edge="end"
                        >
                            {showPassword ? <VisibilityOff /> : <Visibility />}
                        </IconButton>
                    </InputAdornment>
                }
                label="Password"
            />
        </FormControl>
    )
}