import { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import activityService from '../api/activityService';
import { Container, Card, CardContent, Typography, CircularProgress, Alert } from '@mui/material';

const ActivityDetailPage = () => {
    const { activityId } = useParams();
    const [activity, setActivity] = useState(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        activityService.getActivityById(activityId)
            .then(response => setActivity(response.data))
            .catch(err => console.error(err))
            .finally(() => setLoading(false));
    }, [activityId]);

    if (loading) return <CircularProgress />;
    if (!activity) return <Alert severity="error">Activity not found.</Alert>;

    return (
        <Container sx={{ mt: 4 }}>
            <Card>
                <CardContent>
                    <Typography variant="h4" gutterBottom>{activity.title}</Typography>
                    <Typography variant="h6" color="text.secondary">Type: {activity.type}</Typography>
                    <Typography variant="body1" sx={{ mt: 2 }}>{activity.description}</Typography>
                    <Typography variant="body2" sx={{ mt: 2 }}>Status: {activity.status}</Typography>
                </CardContent>
            </Card>
        </Container>
    );
};

export default ActivityDetailPage;