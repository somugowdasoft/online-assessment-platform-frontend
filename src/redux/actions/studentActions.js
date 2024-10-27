import axios from 'axios';
import { toast } from 'react-toastify';
import ErrorHandler from '../../components/ErrorHandler';

// Base configuration for Axios
const API = axios.create({
    baseURL: process.env.BACKEND_URL || 'http://localhost:5000/api/students'  // Replace with your backend API URL
});

// Add a request interceptor
API.interceptors.request.use(
    (req) => {
        const token = localStorage.getItem('token'); // Adjust based on where you store your token

        if (token) {
            // Add the headers
            req.headers['Content-Type'] = 'application/json'; // Set content type
            req.headers['Authorization'] = `Bearer ${token}`; // Pass JWT token in header
        }
        return req; // Return the modified request
    },
    (error) => {
        // Handle any error that occurs before the request is sent
        return Promise.reject(error);
    }
);

export const getAllStudents = () => async (dispatch) => {
    try {
        const { data } = await API.get('/');
        dispatch({ type: 'GET_ALL_STUDENTS', payload: data });
    } catch (error) {
        console.error(error);
        {error && <ErrorHandler error={error} />} {/* Use ErrorHandler */}
    }
};

export const deleteStudent = (id) => async (dispatch) => {
    try {
        const { data } = await API.delete(`/${id}`);
        toast.success(data?.message || 'Deleted successfully');
        dispatch({ type: 'DELETE_STUDENT', payload: id });
    } catch (error) {
        console.error(error);
        {error && <ErrorHandler error={error} />} {/* Use ErrorHandler */}
    }
};

export const updateExamPermission = (id, permission) => async (dispatch) => {
    try {
        await API.put(`/students/permission/${id}`, { examPermission: permission });
        dispatch({ type: 'UPDATE_EXAM_PERMISSION', payload: { id, permission } });
    } catch (error) {
        console.error(error);
        {error && <ErrorHandler error={error} />} {/* Use ErrorHandler */}
    }
};
