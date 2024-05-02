import { Business } from "@mui/icons-material";
import { InputAdornment, TextField } from "@mui/material";


export default function Name(){
    return (
        <TextField
        label="Name"
        variant="outlined"
        margin="normal"
        fullWidth
        InputProps={{
            startAdornment: (
                <InputAdornment position="start">
                    <Business />
                </InputAdornment>
            ),
        }} />
    );
}