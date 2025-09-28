import { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import portfolioService from '../api/portfolioService';
import { Container, Box, Typography, Avatar, Paper, List, ListItem, ListItemText, CircularProgress, Alert } from '@mui/material';

const PortfolioPage = () => {
    const { userId } = useParams();
    const [portfolio, setPortfolio] = useState(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        portfolioService.getPortfolioData(userId)
            .then(res => setPortfolio(res.data))
            .catch(err => console.error(err))
            .finally(() => setLoading(false));
    }, [userId]);

    if (loading) return <CircularProgress />;
    if (!portfolio) return <Alert severity="error">Could not load portfolio.</Alert>;

    return (
        <Container component={Paper} sx={{ my: 4, p: 4 }}>
            <Box sx={{ display: 'flex', alignItems: 'center', mb: 3 }}>
                <Avatar sx={{ width: 80, height: 80, mr: 2 }}>{portfolio.user.name.charAt(0)}</Avatar>
                <Box>
                    <Typography variant="h3">{portfolio.user.name}</Typography>
                    <Typography variant="h6" color="text.secondary">{portfolio.user.email}</Typography>
                </Box>
            </Box>
            
            <Typography variant="h5" sx={{ mt: 4, mb: 2, borderBottom: 1, borderColor: 'divider' }}>
                Verified Achievements
            </Typography>
            <List>
                {portfolio.approvedActivities.map(activity => (
                    <ListItem key={activity._id} divider>
                        <ListItemText 
                            primary={activity.title} 
                            secondary={`Type: ${activity.type} | Verified on: ${new Date(activity.updatedAt).toLocaleDateString()}`}
                        />
                    </ListItem>
                ))}
            </List>
        </Container>
    );
};

export default PortfolioPage;