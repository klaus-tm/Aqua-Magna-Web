import { LocationOn } from "@mui/icons-material";
import { InputAdornment, TextField } from "@mui/material";

export default function Address({ value, onChange }) {
    const handleChange = (event) => {
        onChange(event.target.value);
    };

    return (
        <TextField
            label="Address"
            variant="outlined"
            margin="normal"
            fullWidth
            onChange={handleChange}
            value={value}
            InputProps={{
                startAdornment: (
                    <InputAdornment position="start">
                        <LocationOn />
                    </InputAdornment>
                ),
            }} />
    );
}