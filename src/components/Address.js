import { LocationOn } from "@mui/icons-material";
import { InputAdornment, TextField } from "@mui/material";

export default function Address() {
    return (
        <TextField
            label="Address"
            variant="outlined"
            margin="normal"
            fullWidth
            InputProps={{
                startAdornment: (
                    <InputAdornment position="start">
                        <LocationOn />
                    </InputAdornment>
                ),
            }} />
    );
}