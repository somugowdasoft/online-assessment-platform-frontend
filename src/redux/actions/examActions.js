import axios from 'axios';
import { toast } from 'react-toastify';

import {
  CREATE_EXAM, GET_EXAMS,
  CREATE_EXAM_FAIL,
  GET_EXAM_FAIL, DELETE_EXAM_FAIL,
  DELETE_EXAM, EDIT_EXAM_FAILURE,
  EDIT_EXAM_SUCCESS
} from '../../constants/examConstants';

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

//create exams
export const createExam = (examData) => async (dispatch) => {
  try {
    const { data } = await API.post('/exams', examData);
    toast.success(data?.message || 'created successful');
    dispatch({ type: CREATE_EXAM, payload: data });
    return data;
  } catch (error) {
    toast.error(error?.response?.data?.message);
    dispatch({ type: CREATE_EXAM_FAIL, payload: error.response?.data?.message });
    // Check for network errors
    if (!error.response) {
      // Network error
      navigate('/error'); // Navigate to the ErrorPage
    } else if (error.response.status >= 500) {
      // Server error
      navigate('/error'); // Navigate to the ErrorPage
    } else {
      // Handle other errors (e.g., validation errors)
      throw new Error(error.response.data.message || "An error occurred");
    }
  }
};

//get exams
export const getExams = (id) => async (dispatch) => {
  try {
    const { data } = await API.get(`/exams`);
    dispatch({ type: GET_EXAMS, payload: data });
    return data;
  } catch (error) {
    dispatch({ type: GET_EXAM_FAIL, payload: error?.response });
    toast.error(error);
    return Promise.reject(error); // Return a rejected Promise with the error
    // Check for network errors
    if (!error.response) {
      // Network error
      navigate('/error'); // Navigate to the ErrorPage
    } else if (error.response.status >= 500) {
      // Server error
      navigate('/error'); // Navigate to the ErrorPage
    } else {
      // Handle other errors (e.g., validation errors)
      throw new Error(error.response.data.message || "An error occurred");
    }
  }
};

//delete exam
export const updateExam = (id, examData) => async (dispatch) => {
  try {
    const { data } = await API.put(`/exams/${id}`, examData);
    toast.success(data?.message || 'Exam update successful');
    dispatch({ type: EDIT_EXAM_SUCCESS, payload: data });
    return data;
  } catch (error) {
    toast.error(error?.response?.data?.message);
    dispatch({ type: EDIT_EXAM_FAILURE, payload: error.message || 'Failed to delete the exam' });
    // Check for network errors
    if (!error.response) {
      // Network error
      navigate('/error'); // Navigate to the ErrorPage
    } else if (error.response.status >= 500) {
      // Server error
      navigate('/error'); // Navigate to the ErrorPage
    } else {
      // Handle other errors (e.g., validation errors)
      throw new Error(error.response.data.message || "An error occurred");
    }
  }
};


//delete exam
export const deleteExam = (id) => async (dispatch) => {
  try {
    const { data } = await API.delete(`/exams/${id}`);
    toast.success(data?.message || 'Deleted successful');
    dispatch({ type: DELETE_EXAM, payload: id });
    return data;
  } catch (error) {
    toast.error(error?.response?.data?.message);
    dispatch({ type: DELETE_EXAM_FAIL, payload: error.message || 'Failed to delete the exam' });
    // Check for network errors
    if (!error.response) {
      // Network error
      navigate('/error'); // Navigate to the ErrorPage
    } else if (error.response.status >= 500) {
      // Server error
      navigate('/error'); // Navigate to the ErrorPage
    } else {
      // Handle other errors (e.g., validation errors)
      throw new Error(error.response.data.message || "An error occurred");
    }
  }
};
