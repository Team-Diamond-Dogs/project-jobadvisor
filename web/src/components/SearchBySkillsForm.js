import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { Box } from "@mui/material";
import { Grid } from "@mui/material";
import { FormControl } from "@mui/material";
import { FormLabel } from "@mui/material";
import { Button } from "@mui/material";
import { InputLabel } from "@mui/material";
import { Select } from "@mui/material";
import { MenuItem } from "@mui/material";
import { Chip } from "@mui/material";
import { OutlinedInput } from "@mui/material";
import SearchAPI from "../api/SearchAPI";
import SeniorityFormControl from "./SeniorityFormControl";

const ITEM_HEIGHT = 48;
const ITEM_PADDING_TOP = 8;
const MenuProps = {
  PaperProps: {
    style: {
      maxHeight: ITEM_HEIGHT * 8 + ITEM_PADDING_TOP,
      width: 250,
    },
  },
};

function SearchBySkillsForm(props) {
    const navigate = useNavigate();
    const [skillsList, setSkillsList] = useState([]);
    const [selectedSkills, setSelectedSkills] = useState([]);
    const [seniority, setSeniority] = useState("");

    const handleSubmit = (event) => {
        event.preventDefault();

        const api = new SearchAPI();
        api.searchSkill(selectedSkills, seniority)
            .then((data) => {
                navigate("skill-results", { replace: false, state: data });
            });
    }

    const handleSkillsChange = (event) => {
        const {
            target: { value },
        } = event;
        setSelectedSkills(
            // On autofill we get a the stringified value.
            typeof value === 'string' ? value.split(',') : value,
        );
    };

    const handleSeniorityChange = (event, newValue) => {
        setSeniority(newValue);
    }

    useEffect(() => {
        const api = new SearchAPI();
        api.getSkillsList()
            .then(list => setSkillsList(list));
    }, []);

    return (
        <Box sx={{
            marginTop: 8,
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
        }}>
            <Box component="form" noValidate onSubmit={handleSubmit} sx={{ mt: 3 }}>
                <Grid container spacing={2}>
                    <Grid item xs={12}>
                        <FormLabel component="legend">Selecciona tus habilidades:</FormLabel>
                        <FormControl sx={{ m: 1, width: 300 }}>
                            <InputLabel id="demo-multiple-chip-label">Habilidades</InputLabel>
                            <Select
                            labelId="demo-multiple-chip-label"
                            id="demo-multiple-chip"
                            multiple
                            value={selectedSkills}
                            onChange={handleSkillsChange}
                            input={<OutlinedInput id="select-multiple-chip" label="Habilidades" />}
                            renderValue={(selected) => (
                                <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 0.5 }}>
                                {selected.map((value) => (
                                    <Chip key={value} label={value} />
                                ))}
                                </Box>
                            )}
                            MenuProps={MenuProps}
                            >
                            {skillsList.map((name) => (
                                <MenuItem key={name} value={name}>
                                    {name}
                                </MenuItem>
                            ))}
                            </Select>
                        </FormControl>
                    </Grid>
                    <Grid item xs={12}>
                        <SeniorityFormControl onChange={handleSeniorityChange} value={seniority}></SeniorityFormControl>
                    </Grid>
                </Grid>
                <Button
                    type="submit"
                    fullWidth
                    variant="contained"
                    sx={{ mt: 3, mb: 2 }}
                >
                Buscar por habilidades
                </Button>
            </Box>
        </Box>
    );
}

export default SearchBySkillsForm;