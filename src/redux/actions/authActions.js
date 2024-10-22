import axios from 'axios';
import { ToastContainer, toast } from 'react-toastify';

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


// REGISTER
export const register = (userData) => async (dispatch) => {
  try {
    const response = await API.post('/register', userData);
    toast.success(response.message || 'Register successful');
    dispatch({ type: 'REGISTER_SUCCESS', payload: response.data });
   // auto-login the user after registration
    localStorage.setItem('user', JSON.stringify(response.data)); 
    return response.data;
  } catch (error) {
    dispatch({ type: 'REGISTER_FAIL', payload: error.response.data });
    toast.error(error.response.data?.error);
    return Promise.reject(error.response.data); // Return a rejected Promise with the error
  }
};

// LOGIN
export const login = (userData) => async (dispatch) => {
  try {
    const response = await API.post('/login', userData);
    toast.success(response.message || 'Login successful');
    dispatch({ type: 'LOGIN_SUCCESS', payload: response.data });
    // Save data and token to localStorage
    localStorage.setItem('user', JSON.stringify(response.data)); 
    return response.data;  // Return the response for successful login
  } catch (error) {
    dispatch({ type: 'LOGIN_FAIL', payload: error.response.data });    
    toast.error(error.response.data?.error);
    return Promise.reject(error.response.data); 
  }
};

// LOGOUT
export const logout = () => (dispatch) => {
  localStorage.removeItem('user'); // Clear user data from localStorage
  dispatch({ type: 'LOGOUT' });
};
