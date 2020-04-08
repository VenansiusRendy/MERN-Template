import axios from 'axios';

const setAuthToken = (token) => {
  if (token) {
    // Set default header if there is a token
    axios.defaults.headers.common['x-auth-token'] = token;
  } else {
    // If there is no token, delete the header
    delete axios.defaults.headers.common['x-auth-token'];
  }
};

export default setAuthToken;
