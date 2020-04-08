// Import react and reducer functionality
import React, { useReducer } from 'react';
// Import Axios
import axios from 'axios';
// Import Auth Context
import AuthContext from './authContext';
// Import Auth Reducer
import authReducer from './authReducer';
// Imoprt setAuthToken for default headers
import setAuthToken from '../../utils/setAuthToken';
// Import types
import {
  REGISTER_SUCCESS,
  REGISTER_FAIL,
  USER_LOADED,
  AUTH_ERROR,
  LOGIN_SUCCESS,
  LOGIN_FAIL,
  LOGOUT,
  CLEAR_ERRORS,
} from '../types';

const AuthState = (props) => {
  // Declare initial state
  const initialState = {
    token: localStorage.getItem('token'),
    isAuthenticated: null,
    loading: true,
    user: null,
    error: null,
  };
  // State allow to access anything in the state, dispatch allow to pass object to reducer
  const [state, dispatch] = useReducer(authReducer, initialState);

  // Load User
  const loadUser = async () => {
    if (localStorage.token) {
      setAuthToken(localStorage.token);
    }
    try {
      // Get Token from backend
      const res = await axios.get('/api/auth');
      dispatch({ type: USER_LOADED, payload: res.data });
    } catch (err) {
      dispatch({ type: AUTH_ERROR });
    }
  };

  // Register User
  const register = async (formData) => {
    // Pass Header
    const config = {
      headers: {
        'Content-Type': 'application/json',
      },
    };
    // Create Request
    try {
      // Get Response from back end, response.data is token
      const res = await axios.post('/api/users', formData, config);
      dispatch({
        type: REGISTER_SUCCESS,
        payload: res.data,
      });
      // To get user
      loadUser();
    } catch (err) {
      dispatch({
        type: REGISTER_FAIL,
        payload: err.response.data.msg,
      });
    }
  };

  // Login User
  const login = async (formData) => {
    // Pass Header
    const config = {
      headers: {
        'Content-Type': 'application/json',
      },
    };
    // Create Request
    try {
      // Get Response from back end, response.data is token
      const res = await axios.post('/api/auth', formData, config);
      dispatch({
        type: LOGIN_SUCCESS,
        payload: res.data,
      });
      // To get user
      loadUser();
    } catch (err) {
      dispatch({
        type: LOGIN_FAIL,
        payload: err.response.data.msg,
      });
    }
  };

  // Logout
  const logout = () => dispatch({ type: LOGOUT });

  // Clear Errors
  const clearErrors = () => dispatch({ type: CLEAR_ERRORS });

  return (
    // Create Provider so that it can wrap the application / part needed
    <AuthContext.Provider
      // Anything that wants to be access in the provider need to be put inside value
      value={{
        // Add State to be available to components
        token: state.token,
        isAuthenticated: state.isAuthenticated,
        loading: state.loading,
        user: state.user,
        error: state.error,
        // Add Method to be available to components
        register,
        loadUser,
        login,
        logout,
        clearErrors,
      }}
    >
      {props.children}
    </AuthContext.Provider>
  );
};

export default AuthState;
