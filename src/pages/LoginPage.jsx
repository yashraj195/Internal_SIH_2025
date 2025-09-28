import { useState } from 'react';
import { useNavigate, Link as RouterLink } from 'react-router-dom';
import authService from '../api/authService';
import {
    TextField,
    Button,
    Container,
    Typography,
    Box,
    Alert,
    CircularProgress,
    Grid,
    Link
} from '@mui/material';

const LoginPage = () => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    
    // 1. State for handling errors and loading status
    const [error, setError] = useState('');
    const [loading, setLoading] = useState(false);
    
    const navigate = useNavigate();

    const handleLogin = async (e) => {
        e.preventDefault();
        setError(''); // Clear previous errors
        setLoading(true); // Start loading

        try {
            const response = await authService.login(email, password);
            if (response.data.token) {
                localStorage.setItem('token', response.data.token);
                // Reload the page to ensure context and protected routes update correctly
                window.location.href = '/dashboard';
            }
        } catch (err) {
            // 2. Set a user-friendly error message
            setError('Invalid email or password. Please try again.');
            console.error('Login failed:', err);
        } finally {
            setLoading(false); // Stop loading regardless of outcome
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
                    Sign In
                </Typography>
                <Box component="form" onSubmit={handleLogin} sx={{ mt: 1 }}>
                    <TextField 
                        margin="normal" 
                        required 
                        fullWidth 
                        id="email" 
                        label="Email Address" 
                        name="email" 
                        autoComplete="email" 
                        autoFocus 
                        value={email} 
                        onChange={(e) => setEmail(e.target.value)} 
                    />
                    <TextField 
                        margin="normal" 
                        required 
                        fullWidth 
                        name="password" 
                        label="Password" 
                        type="password" 
                        id="password" 
                        autoComplete="current-password" 
                        value={password} 
                        onChange={(e) => setPassword(e.target.value)} 
                    />

                    {/* Display error message if it exists */}
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
                        disabled={loading} // 3. Disable button while loading
                    >
                        {loading ? <CircularProgress size={24} color="inherit" /> : 'Sign In'}
                    </Button>
                    
                    {/* 4. Link to the registration page */}
                    <Grid container justifyContent="flex-end">
                        <Grid item>
                            <Link component={RouterLink} to="/register" variant="body2">
                                {"Don't have an account? Sign Up"}
                            </Link>
                        </Grid>
                    </Grid>
                </Box>
            </Box>
        </Container>
    );
};

export default LoginPage;