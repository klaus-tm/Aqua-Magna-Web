import { LocationCity } from "@mui/icons-material";
import { InputAdornment, TextField } from "@mui/material";

export default function City({ onChange }) {
    const handleChange = (event) => {
        onChange(event.target.value);
    };

    return (
        <TextField
            label="City"
            variant="outlined"
            margin="normal"
            fullWidth
            onChange={handleChange}
            InputProps={{
                startAdornment: (
                    <InputAdornment position="start">
                        <LocationCity />
                    </InputAdornment>
                ),
            }} />
    );
}