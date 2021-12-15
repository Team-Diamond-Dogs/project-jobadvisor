import { Box, Card, CardContent, CardMedia, Link, ListItem, Stack, Typography } from "@mui/material";
import { useLocation } from "react-router-dom";

 

function JobResultsPage(props) {
    const {state} = useLocation();

    return (
        <Box>
            <Box sx={{marginBottom: 8}}>
                <p style={{fontSize: "2rem"}}>Encontramos <strong>{state.results.jobs_count} ofertas de trabajo</strong> para los cargos relacionados a <strong>{state.term}</strong>.</p>
                <p>En estas ofertas, las empresas buscan las siguientes habilidades:</p>
                <Stack spacing={2}>
                {
                    state.results.tags_ranking.map(tag => <ListItem key={tag.name}
                            style={{
                                width: `${tag.frequency / state.results.jobs_count * 100}%`, 
                                minWidth: "200px", 
                                backgroundColor: "#1976d2"} 
                                }>
                            <strong style={{color: "#fff"}}>{tag.name} ({tag.frequency})</strong>
                        </ListItem>)
                }
                </Stack>
            </Box>
            <Box sx={{marginBottom: 8}}>
                <h4>Te recomendamos los siguientes cursos para poder adquirir estas habilidades:</h4>
                {
                    state.results.tags_ranking.map(tag => tag.courses.map(course => 
                    <Card key={`${tag}-${course.name}`} 
                        sx={{ display: "flex", 
                            flexFlow: "row nowrap", 
                            justifyContent: "space-between",
                            marginBottom: 4 }}>
                        <Box sx={{ display: "flex", flexDirection: "column" }}>
                            <CardContent sx={{ flex: "1 0 auto" }}>
                                <Link href={course.url} underline="none" target={"_blank"}>
                                    <Typography component="div" variant="h5">
                                        {course.name}
                                    </Typography>
                                </Link>
                            </CardContent>
                        </Box>
                        <CardMedia
                            component="img"
                            sx={{ width: 200 }}
                            image={course.thumbnail_url}
                            alt={course.name}/>
                    </Card>))
                }
            </Box>
        </Box>
    );
}

export default JobResultsPage;