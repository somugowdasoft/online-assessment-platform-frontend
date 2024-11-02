// actions/examActions.js
import axios from 'axios';
import { toast } from 'react-toastify';
import ErrorHandler from '../../components/ErrorHandler';

// Base configuration for Axios
const API = axios.create({
    baseURL: process.env.BACKEND_URL || 'http://localhost:5000/api/exam'  // Replace with your backend API URL
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


// Thunk action to submit the exam
export const submitExam = (examData) => async (dispatch) => {
    try {    
        const { data } = await API.post('/submit', examData);
        toast.success(data?.message || 'submitted successfully');
        dispatch({
            type: 'EXAM_SUBMIT_SUCCESS',
            payload: data,
        });

    } catch (error) {
        dispatch({
            type: 'EXAM_SUBMIT_FAIL',
            payload: error.response && error.response.data.message
                ? error.response.data.message
                : error.message,
        });
        <ErrorHandler error={error} />
    }
};

export const getSubmited = () => async (dispatch) => {
    try {    
        const { data } = await API.get('/submit');        
        dispatch({
            type: 'GET_SUBMIT_SUCCESS',
            payload: data,
        });

    } catch (error) {
        dispatch({
            type: 'GET_SUBMIT_FAIL',
            payload: error.response && error.response.data.message
                ? error.response.data.message
                : error.message,
        });
        <ErrorHandler error={error} />
    }
};