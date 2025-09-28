import { useState, useEffect, useContext } from 'react';
import { AuthContext } from '../context/AuthContext';
import activityService from '../api/activityService';
import ActivityList from './ActivityList';
import ActivitySubmissionForm from './ActivitySubmissionForm';
import { Box, Typography, CircularProgress, Alert } from '@mui/material';

const StudentDashboard = () => {
    const { user } = useContext(AuthContext);
    const [activities, setActivities] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState('');

    useEffect(() => {
        // This correctly uses your API service to fetch data
        activityService.getMyActivities()
            .then(response => {
                setActivities(response.data);
            })
            .catch(err => {
                setError('Failed to fetch activities.');
                console.error(err);
            })
            .finally(() => {
                setLoading(false);
            });
    }, []);

    if (loading) {
        return <CircularProgress />;
    }

    return (
        <Box sx={{ my: 4 }}>
            <Typography variant="h4" gutterBottom>Welcome, {user?.name || 'Student'}!</Typography>
            
            <ActivitySubmissionForm />

            <Typography variant="h5" sx={{ mt: 4, mb: 2 }}>Your Submitted Activities</Typography>
            {error && <Alert severity="error">{error}</Alert>}
            <ActivityList activities={activities} />
        </Box>
    );
};

export default StudentDashboard;