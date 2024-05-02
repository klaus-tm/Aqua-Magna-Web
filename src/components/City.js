import { LocationCity } from "@mui/icons-material";
import { InputAdornment, TextField } from "@mui/material";

export default function City() {
    return (
        <TextField
            label="City"
            variant="outlined"
            margin="normal"
            fullWidth
            InputProps={{
                startAdornment: (
                    <InputAdornment position="start">
                        <LocationCity />
                    </InputAdornment>
                ),
            }}
        />
    );
}