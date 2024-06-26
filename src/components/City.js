import { LocationCity } from "@mui/icons-material";
import { InputAdornment, TextField } from "@mui/material";

/**
 * component used for the city text field across the app
 * @param {*} param0 
 * @returns TextField used for city
 */
export default function City({ value, onChange }) {
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
            value={value}
            InputProps={{
                startAdornment: (
                    <InputAdornment position="start">
                        <LocationCity />
                    </InputAdornment>
                ),
            }} />
    );
}