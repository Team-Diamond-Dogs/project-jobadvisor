import { useState } from 'react';
import { Box } from '@mui/material';
import { Tabs } from '@mui/material';
import { Tab } from '@mui/material';
import TabPanel from './TabPanel';
import SearchByJobForm from './SearchByJobForm';


function a11yProps(index) {
    return {
        id: `simple-tab-${index}`,
        'aria-controls': `simple-tabpanel-${index}`,
    };
}

function SearchOptionsContainer (props) {
    const [value, setValue] = useState(0);

    const handleChange = (event, newValue) => {
        setValue(newValue);
    }

    return (
        <Box sx={{ width: '100%' }}>
            <Box sx={{ borderBottom: 1, borderColor: 'divider' }}>
                <Tabs value={value} onChange={handleChange} aria-label="Opciones de búsqueda">
                    <Tab label="Buscar por cargo" {...a11yProps(0)} />
                </Tabs>
            </Box>
            <TabPanel value={value} index={0}>
                <SearchByJobForm></SearchByJobForm>
            </TabPanel>
        </Box>
    );
}

export default SearchOptionsContainer;