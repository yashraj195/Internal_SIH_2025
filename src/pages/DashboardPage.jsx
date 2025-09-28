import { useContext } from 'react';
import { AuthContext } from '../context/AuthContext';
import StudentDashboard from '../components/StudentDashboard';
import FacultyDashboard from '../components/FacultyDashboard';
import NotificationBell from '../components/NotificationBell';

import {
    AppBar,
    Toolbar,
    Typography,
    Button,
    Container,
    Box,
    CircularProgress
} from '@mui/material';

const DashboardPage = () => {
    const { user, logout } = useContext(AuthContext);

    if (!user) {
        return (
            <Box sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '100vh' }}>
                <CircularProgress />
            </Box>
        );
    }

    return (
        <>
            <AppBar position="static">
                <Toolbar>
                    <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
                        Smart Student Hub
                    </Typography>
                    
                    <NotificationBell />

                    <Button color="inherit" onClick={logout}>
                        Logout
                    </Button>
                </Toolbar>
            </AppBar>

            <Container>
                {user.role === 'faculty' || user.role === 'admin' ? (
                    <FacultyDashboard />
                ) : (
                    <StudentDashboard />
                )}
            </Container>
        </>
    );
};

export default DashboardPage;