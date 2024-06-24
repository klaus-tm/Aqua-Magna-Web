import { Autocomplete, InputAdornment, TextField } from "@mui/material";
import { countryList } from "../config/countryList";
import { Public } from "@mui/icons-material";

/**
 * component used for the country autocomplete across the app
 * it uses a country list constant to populate itself
 * @param {*} param0 
 * @returns Autocomplete used for country choose
 */
export default function Country({ value, onChange }) {
    const handleChange = (event, value) => {
        onChange(value);
    };

    return (
        <Autocomplete
            disablePortal
            options={countryList}
            fullWidth
            onChange={handleChange}
            value={value || null} // Use value prop to set the initial value
            renderInput={(params) => <TextField {...params} label="Country" margin="normal" InputProps={{ ...params.InputProps, startAdornment: (<InputAdornment position="start"><Public /></InputAdornment>) }} />} />

    );
}