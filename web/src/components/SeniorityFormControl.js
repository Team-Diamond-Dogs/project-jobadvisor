import { FormControlLabel } from "@mui/material";
import { FormControl } from "@mui/material";
import { FormLabel } from "@mui/material";
import { RadioGroup } from "@mui/material";
import { Radio } from "@mui/material";
import { useEffect, useState } from "react";
import SearchAPI from "../api/SearchAPI";

export default function SeniorityFormControl(props) {
    const [seniorities, setSeniorities] = useState([]);
    
    useEffect(() => {
        const api = new SearchAPI();
        api.getSenioritiesList()
            .then(list => setSeniorities(list));
    }, []);

    return (
        <FormControl component="fieldset">
            <FormLabel component="legend">Seniority</FormLabel>
            <RadioGroup
                aria-label="seniority"
                name="radio-buttons-group"
                onChange={props.onChange}
                value={props.value}
            >
                {
                    seniorities.map((item) => {
                        return <FormControlLabel key={item.id} value={item.id} control={<Radio />} label={item.name} />
                    })
                }
            </RadioGroup>
        </FormControl>
    );
}