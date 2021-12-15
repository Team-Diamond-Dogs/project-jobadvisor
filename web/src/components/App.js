import {
    BrowserRouter as Router,
    Routes,
    Route
} from 'react-router-dom';
import {
    Box,
    Container,
    CssBaseline,
    Link,
    Typography
} from '@mui/material';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import HomePage from '../pages/SearchPage';
import JobResultsPage from '../pages/JobResultsPage';
import SkillResultsPage from '../pages/SkillResultsPage';
import './App.css';


const theme = createTheme();

function Copyright(props) {
    return (
        <Typography variant="body2" color="text.secondary" align="center" {...props}>
            {'Copyright © '}
            <Link color="inherit" href="https://github.com/Team-Diamond-Dogs">
                Team Diamond Dogs
            </Link>{' '}
            {new Date().getFullYear()}
        </Typography>
    );
}
    
function App() {
    return (
        <ThemeProvider theme={theme}>
            <Container component="main" maxWidth="md">
                <CssBaseline />
                <Box sx={{
                    marginTop: 8,
                    display: 'flex',
                    flexDirection: 'column',
                    alignItems: 'center',
                }}
                >
                    <Typography variant="h1">JobAdvisor</Typography>
                    <Box sx={{
                        marginTop: 8,
                        marginBottom: 8
                    }}>
                        <Router>
                            <Routes>
                                <Route path="/" element={<HomePage />} />
                                <Route path="/job-results" element={<JobResultsPage />} />
                                <Route path="/skill-results" element={<SkillResultsPage />} />
                            </Routes>
                        </Router>
                    </Box>

                    <Copyright sx={{ mt: 5 }} />
                </Box>
            </Container>
        </ThemeProvider>
    );
}
    
export default App;
    