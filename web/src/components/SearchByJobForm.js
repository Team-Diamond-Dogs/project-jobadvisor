import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Box, Typography } from "@mui/material";
import { Grid } from "@mui/material";
import { TextField } from "@mui/material";
import { FormLabel } from "@mui/material";
import { Button } from "@mui/material";
import SeniorityFormControl from "./SeniorityFormControl";
import SearchAPI from "../api/SearchAPI";

function SearchByJobForm(props) {
    const navigate = useNavigate();
    const [jobName, setJobName] = useState("");
    const [seniority, setSeniority] = useState("");

    const handleSubmit = (event) => {
        event.preventDefault();

        const api = new SearchAPI();
        api.searchJob(jobName, seniority)
            .then((data) => {
                navigate("job-results", { replace: true, state: data });
            });
    }

    const handleJobNameChange = (event) => {
        setJobName(event.target.value);
    }

    const handleSeniorityChange = (event, newValue) => {
        setSeniority(newValue);
    }

    return (
        <Box sx={{
            marginTop: 8,
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
        }}>
            <Typography></Typography>
            <Box component="form" noValidate onSubmit={handleSubmit} sx={{ mt: 3 }}>
                <Grid container spacing={2}>
                <Grid item xs={12}>
                    <FormLabel component="legend">Nombre del cargo</FormLabel>
                    <TextField
                        autoComplete="Nombre del cargo a buscar..."
                        name="job"
                        required
                        fullWidth
                        id="job"
                        value={jobName}
                        onChange={handleJobNameChange}
                        autoFocus
                    />
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
                Buscar por cargo
                </Button>
            </Box>
        </Box>
    );
}

export default SearchByJobForm;