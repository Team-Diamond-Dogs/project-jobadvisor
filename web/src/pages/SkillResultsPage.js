import { Box, Card, CardContent, Typography } from "@mui/material";
import { useLocation } from "react-router-dom";

function SkillResultsPage(props) {
    const {state} = useLocation();

    return (
        <Box>
            <p>En base a las habilidades seleccionadas, te podemos recomendar cargos en las siguientes categorías:</p>
            {
                state.map(skill => <Card id={skill.name} style={{marginBottom: "10px", backgroundColor: "#3399FF", color: "#FFF"}}>
                    <CardContent>
                        <Typography variant="h4" component="h4">{skill.name} ({skill.jobs_count} ofertas)</Typography>
                        <p>
                            <ul>
                                {
                                    skill.categories.map(cat => <li id={`${skill.name}-${cat.name}`}>{cat.name} ({cat.jobs_count} ofertas)</li>)
                                }
                            </ul>
                        </p>
                    </CardContent>
                </Card>)
            }
        </Box>
    );
}

export default SkillResultsPage;