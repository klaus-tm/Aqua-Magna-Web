import { Autocomplete, InputAdornment, TextField } from "@mui/material";
import { countryList } from "../config/countryList";
import { Public } from "@mui/icons-material";

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