import axios from 'axios';

// Base configuration for Axios
const API = axios.create({
    baseURL: process.env.BACKEND_URL || 'http://localhost:5000/api/auth'  // Replace with your backend API URL
});

// Attach token to request if user is authenticated
API.interceptors.request.use((req) => {
    const token = localStorage.getItem('token');  // Adjust based on where you store your token
    if (token) {
        req.headers.Authorization = `Bearer ${token}`;
    }
    return req;
});

// User registration
export const register = async (userData) => {
    try {
        const response = await API.post('/register', userData);
        return response.data;
    } catch (error) {
        console.error('Error registering user:', error);
        throw error;
    }
};

// User login
export const login = async (credentials) => {
    try {
        const response = await API.post('/auth/login', credentials);
        if (response.data.token) {
            localStorage.setItem('token', response.data.token); // Store token
        }
        return response.data;
    } catch (error) {
        console.error('Error logging in:', error);
        throw error;
    }
};

// Fetch student profile (for students or admins viewing student profile)
export const getProfile = async (userId) => {
    try {
        const response = await API.get(`/users/${userId}`);
        return response.data;
    } catch (error) {
        console.error('Error fetching profile:', error);
        throw error;
    }
};

// Update student profile (for students to manage their own profile)
export const updateProfile = async (userId, updatedData) => {
    try {
        const response = await API.put(`/users/${userId}`, updatedData);
        return response.data;
    } catch (error) {
        console.error('Error updating profile:', error);
        throw error;
    }
};

// Admin: Change student role
export const changeRole = async (userId, newRole) => {
    try {
        const response = await API.patch(`/users/${userId}/role`, { role: newRole });
        return response.data;
    } catch (error) {
        console.error('Error changing user role:', error);
        throw error;
    }
};

// Fetch all students (admin use case)
export const getAllStudents = async () => {
    try {
        const response = await API.get('/users?role=student');
        return response.data;
    } catch (error) {
        console.error('Error fetching students:', error);
        throw error;
    }
};
