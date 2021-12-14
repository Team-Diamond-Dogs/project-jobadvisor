import { Box, Link, ListItem, Stack, Typography } from "@mui/material";
import { styled } from '@mui/material/styles';
import { Paper } from "@mui/material";
import { useLocation } from "react-router-dom";

 

function JobResultsPage(props) {
    const {state} = useLocation();

    return (
        <Box>
            <Typography>Encontramos <strong>{state.results.jobs_count} ofertas de trabajo</strong> para los cargos relacionados a <strong>{state.term}</strong>.</Typography>
            <p>En estas ofertas, las empresas buscan las siguientes habilidades:</p>
            <Stack spacing={2}>
            {
                state.results.tags_ranking.map(tag => {
                    return <ListItem id={tag.name}
                                style={ {width: `${tag.frequency / state.results.jobs_count * 100}%`, minWidth: "200px", backgroundColor: "#1976d2"} }>
                                {tag.name} ({tag.frequency})
                            </ListItem>
                })
            }
            </Stack>
            <p>Te recomendamos los siguientes cursos para poder adquirir estas habilidades:</p>
            {
                state.results.tags_ranking.map(tag => tag.courses.map(course => <li><Link href={course}>{course}</Link></li>))
            }
        </Box>
    );
}

export default JobResultsPage;