// src/components/FacultyDashboard.jsx
import { useState, useEffect } from 'react';
import activityService from '../api/activityService';
import { Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper, Button, Typography } from '@mui/material';

const FacultyDashboard = () => {
    const [activities, setActivities] = useState([]);
    const [error, setError] = useState('');

    const fetchPendingActivities = () => {
        activityService.getAllActivities('pending')
            .then(response => setActivities(response.data))
            .catch(err => setError('Could not fetch activities.'));
    };

    useEffect(() => {
        fetchPendingActivities();
    }, []);

    const handleUpdateStatus = async (id, status) => {
        try {
            await activityService.updateActivityStatus(id, status);
            setActivities(prev => prev.filter(activity => activity._id !== id));
        } catch (err) {
            setError('Failed to update status.');
        }
    };

    return (
        <TableContainer component={Paper} sx={{ my: 4 }}>
            <Typography variant="h5" sx={{ p: 2 }}>Pending Activity Approvals</Typography>
            <Table>
                <TableHead>
                    <TableRow>
                        <TableCell>Student</TableCell>
                        <TableCell>Title</TableCell>
                        <TableCell>Actions</TableCell>
                    </TableRow>
                </TableHead>
                <TableBody>
                    {activities.map((activity) => (
                        <TableRow key={activity._id}>
                            <TableCell>{activity.student?.name || 'N/A'}</TableCell>
                            <TableCell>{activity.title}</TableCell>
                            <TableCell>
                                <Button size="small" variant="contained" color="success" onClick={() => handleUpdateStatus(activity._id, 'approved')} sx={{ mr: 1 }}>Approve</Button>
                                <Button size="small" variant="contained" color="error" onClick={() => handleUpdateStatus(activity._id, 'rejected')}>Reject</Button>
                            </TableCell>
                        </TableRow>
                    ))}
                </TableBody>
            </Table>
        </TableContainer>
    );
};

export default FacultyDashboard;