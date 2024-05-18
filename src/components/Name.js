import { Business } from "@mui/icons-material";
import { InputAdornment, TextField } from "@mui/material";


export default function Name({ value, onChange }) {
    const handleChange = (event) => {
        onChange(event.target.value);
    };

    return (
        <TextField
            label="Name"
            variant="outlined"
            margin="normal"
            fullWidth
            onChange={handleChange}
            value = {value}
            InputProps={{
                startAdornment: (
                    <InputAdornment position="start">
                        <Business />
                    </InputAdornment>
                ),
            }} />
    );
}