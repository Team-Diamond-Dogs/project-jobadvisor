import {
  BrowserRouter as Router,
  Routes,
  Route
} from 'react-router-dom';
import { Container } from '@mui/material';
import { Typography } from '@mui/material';
import { Link } from '@mui/material';
import { CssBaseline } from '@mui/material';
import './App.css';
import HomePage from '../pages/SearchPage';
import JobResultsPage from '../pages/JobResultsPage';
import SkillResultsPage from '../pages/SkillResultsPage';

function Copyright(props) {
    return (
      <Typography variant="body2" color="text.secondary" align="center" {...props}>
        {'Copyright © '}
        <Link color="inherit" href="https://github.com/Team-Diamond-Dogs">
          Team Diamond Dogs
        </Link>{' '}
        {new Date().getFullYear()}
        {'.'}
      </Typography>
    );
}

function App() {
    return (
        <Container component="main" maxWidth="sm">
            <CssBaseline />
            <Router>
              <Routes>
                <Route path="/" element={<HomePage />} />
                <Route path="/job-results" element={<JobResultsPage />} />
                <Route path="/skill-results" element={<SkillResultsPage />} />
              </Routes>
            </Router>
            
            <Copyright sx={{ mt: 5 }} />
        </Container>
    );
}

export default App;
