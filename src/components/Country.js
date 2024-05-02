import { Autocomplete, InputAdornment, TextField } from "@mui/material";
import { countryList } from "../config/countryList";
import { Public } from "@mui/icons-material";

export default function Country() {
    return (
        <Autocomplete
            disablePortal
            options={countryList}
            fullWidth
            renderInput={(params) => <TextField {...params} label="Country" margin="normal" InputProps={{ ...params.InputProps, startAdornment: (<InputAdornment position="start"><Public /></InputAdornment>) }} />} />
    );
}