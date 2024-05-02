import { FormControl, InputLabel, OutlinedInput, InputAdornment, IconButton } from "@mui/material";
import { PasswordOutlined, Visibility, VisibilityOff } from "@mui/icons-material";
import * as React from "react";

export default function Password() {
    const [showPassword, setShowPassword] = React.useState(false);

    const handleClickShowPassword = () => setShowPassword((show) => !show);

    const handleMouseDownPassword = (event) => {
        event.preventDefault();
    };

    return (
        <FormControl fullWidth variant="outlined" margin="normal">
            <InputLabel htmlFor="outlined-adornment-password">
                Password
            </InputLabel>
            <OutlinedInput
                id="outlined-adornment-password"
                type={showPassword ? "text" : "password"}
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