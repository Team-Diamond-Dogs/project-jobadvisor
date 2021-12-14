import { Box } from "@mui/material";
import { useLocation } from "react-router-dom";

function SkillResultsPage(props) {
    const {state} = useLocation();

    return (
        <Box>
            {
                state.map(skill => <li id={skill.name}>{skill.name}</li>)
            }
        </Box>
    );
}

export default SkillResultsPage;