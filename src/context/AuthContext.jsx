// src/context/AuthContext.js
import { createContext, useState, useEffect, useCallback } from 'react';
import { jwtDecode } from 'jwt-decode';
import { useNavigate } from 'react-router-dom';
import authService from '../api/authService';

export const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
    const [user, setUser] = useState(null);
    const [token, setToken] = useState(() => localStorage.getItem('token'));
    const navigate = useNavigate();

    useEffect(() => {
        if (token) {
            const decodedUser = jwtDecode(token);
            setUser(decodedUser.user);
        } else {
            setUser(null);
        }
    }, [token]);

    const login = async (email, password) => {
        const response = await authService.login(email, password);
        if (response.data.token) {
            localStorage.setItem('token', response.data.token);
            setToken(response.data.token);
            navigate('/dashboard');
        }
    };

    const logout = useCallback(() => {
        localStorage.removeItem('token');
        setToken(null);
        navigate('/login');
    }, [navigate]);

    return (
        <AuthContext.Provider value={{ user, token, login, logout }}>
            {children}
        </AuthContext.Provider>
    );
};