// src/components/ActivitySubmissionForm.jsx
import { useState } from 'react';
import activityService from '../api/activityService';
import { TextField, Button, Box, Typography, CircularProgress, Alert } from '@mui/material';

const ActivitySubmissionForm = () => {
    const [title, setTitle] = useState('');
    const [description, setDescription] = useState('');
    const [type, setType] = useState('');
    const [proof, setProof] = useState(null);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState('');
    const [success, setSuccess] = useState('');

    const handleSubmit = async (e) => {
        e.preventDefault();
        setLoading(true);
        setError('');
        setSuccess('');

        const formData = new FormData();
        formData.append('title', title);
        formData.append('description', description);
        formData.append('type', type);
        formData.append('proof', proof);

        try {
            await activityService.submitActivity(formData);
            setSuccess('Activity submitted successfully!');
            setTitle(''); setDescription(''); setType(''); setProof(null);
        } catch (err) {
            setError('Submission failed. Please try again.');
        } finally {
            setLoading(false);
        }
    };

    return (
        <Box component="form" onSubmit={handleSubmit} sx={{ mt: 4, p: 2, border: '1px solid grey', borderRadius: 2 }}>
            <Typography variant="h6">Submit New Activity</Typography>
            <Button variant="outlined" component="label" sx={{ mt: 2 }}>
                Upload Proof Document
                <input type="file" hidden onChange={e => setProof(e.target.files[0])} />
            </Button>
            {proof && <Typography sx={{ ml: 2, display: 'inline' }}>{proof.name}</Typography>}
            
            <Button type="submit" fullWidth variant="contained" sx={{ mt: 3 }} disabled={loading}>
                {loading ? <CircularProgress size={24} /> : 'Submit Activity'}
            </Button>

            {error && <Alert severity="error" sx={{ mt: 2 }}>{error}</Alert>}
            {success && <Alert severity="success" sx={{ mt: 2 }}>{success}</Alert>}
        </Box>
    );
};

export default ActivitySubmissionForm;