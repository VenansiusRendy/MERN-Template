// Import react and reducer functionality
import React, { useReducer } from 'react';
// Import uuid
import uuid from 'uuid/v4';
// Import Auth Context
import AlertContext from './alertContext';
// Import Auth Reducer
import alertReducer from './alertReducer';
// Import types
import { SET_ALERT, REMOVE_ALERT } from '../types';

const AuthState = props => {
  // Declare initial state
  const initialState = [];
  // State allow to access anything in the state, dispatch allow to pass object to reducer
  const [state, dispatch] = useReducer(alertReducer, initialState);
  // Set Alert
  const setAlert = (msg, type, timeout = 5000) => {
    const id = uuid();
    // Send to reducer
    dispatch({
      type: SET_ALERT,
      payload: { msg, type, id }
    });
    // Timeout for alert
    setTimeout(() => {
      dispatch({
        type: REMOVE_ALERT,
        payload: id
      });
    }, timeout);
  };

  return (
    // Create Provider so that it can wrap the application / part needed
    <AlertContext.Provider
      // Anything that wants to be access in the provider need to be put inside value
      value={{
        // Add State to be available to components
        alerts: state,
        // Add Method to be available to components
        setAlert
      }}
    >
      {props.children}
    </AlertContext.Provider>
  );
};

export default AuthState;
