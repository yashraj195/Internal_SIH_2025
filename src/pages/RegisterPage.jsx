import { useState } from 'react';
import { useNavigate, Link as RouterLink } from 'react-router-dom';
import authService from '../api/authService';
import {
    TextField,
    Button,
    Container,
    Typography,
    Box,
    Grid,
    Link,
    Alert
} from '@mui/material';

const RegisterPage = () => {
    // State to hold form data
    const [formData, setFormData] = useState({
        name: '',
        email: '',
        password: '',
    });
    // State to hold any registration errors
    const [error, setError] = useState('');
    
    const navigate = useNavigate();
    const { name, email, password } = formData;

    // Update state as user types in the form
    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    // Handle form submission
    const handleSubmit = async (e) => {
        e.preventDefault();
        setError(''); // Clear previous errors

        try {
            const response = await authService.register(name, email, password);
            // If registration is successful, backend sends a token
            if (response.data.token) {
                // Store the token and navigate to the dashboard
                localStorage.setItem('token', response.data.token);
                // You might want to reload or use context to update user state globally
                navigate('/dashboard');
            }
        } catch (err) {
            // Set error message from server response if it exists, otherwise a generic one
            const errorMessage = err.response?.data?.msg || 'Registration failed. Please try again.';
            setError(errorMessage);
            console.error('Registration failed:', err);
        }
    };

    return (
        <Container component="main" maxWidth="xs">
            <Box
                sx={{
                    marginTop: 8,
                    display: 'flex',
                    flexDirection: 'column',
                    alignItems: 'center',
                }}
            >
                <Typography component="h1" variant="h5">
                    Sign Up
                </Typography>
                <Box component="form" onSubmit={handleSubmit} sx={{ mt: 3 }}>
                    <Grid container spacing={2}>
                        <Grid item xs={12}>
                            <TextField
                                name="name"
                                required
                                fullWidth
                                id="name"
                                label="Full Name"
                                autoFocus
                                value={name}
                                onChange={handleChange}
                            />
                        </Grid>
                        <Grid item xs={12}>
                            <TextField
                                required
                                fullWidth
                                id="email"
                                label="Email Address"
                                name="email"
                                autoComplete="email"
                                value={email}
                                onChange={handleChange}
                            />
                        </Grid>
                        <Grid item xs={12}>
                            <TextField
                                required
                                fullWidth
                                name="password"
                                label="Password"
                                type="password"
                                id="password"
                                autoComplete="new-password"
                                value={password}
                                onChange={handleChange}
                            />
                        </Grid>
                    </Grid>
                    
                    {/* Display error message if there is one */}
                    {error && (
                        <Alert severity="error" sx={{ mt: 2, width: '100%' }}>
                            {error}
                        </Alert>
                    )}

                    <Button
                        type="submit"
                        fullWidth
                        variant="contained"
                        sx={{ mt: 3, mb: 2 }}
                    >
                        Sign Up
                    </Button>
                    <Grid container justifyContent="flex-end">
                        <Grid item>
                            <Link component={RouterLink} to="/login" variant="body2">
                                Already have an account? Sign in
                            </Link>
                        </Grid>
                    </Grid>
                </Box>
            </Box>
        </Container>
    );
};

export default RegisterPage;