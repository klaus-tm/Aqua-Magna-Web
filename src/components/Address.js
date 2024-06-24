import { LocationOn } from "@mui/icons-material";
import { InputAdornment, TextField } from "@mui/material";

/**
 * component used for the address text field across the app
 * @param {*} param0 
 * @returns TextField used for address
 */
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