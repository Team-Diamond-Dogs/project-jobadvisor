import { Box } from "@mui/material";
import { useLocation } from "react-router-dom";

function JobResultsPage(props) {
    const {state} = useLocation();

    return (
        <Box>
            {
                state.tags_ranking.map((tag) => {
                    return <li id={tag.name}>{tag.name}</li>
                })
            }
        </Box>
    );
}

export default JobResultsPage;