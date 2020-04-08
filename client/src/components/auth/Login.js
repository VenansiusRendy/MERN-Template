import React, { useState, useEffect, useContext } from 'react';
import AlertContext from '../../context/alert/alertContext';
import AuthContext from '../../context/auth/authContext';

const Login = (props) => {
  // Init context
  const alertContext = useContext(AlertContext);
  const authContext = useContext(AuthContext);
  // Destructure alertContext
  const { setAlert } = alertContext;
  // Destructure authContext
  const { login, error, clearErrors, isAuthenticated } = authContext;
  // Display error if there is error from auth context
  useEffect(() => {
    // If authenticated the page will redirect
    if (isAuthenticated) {
      // Redirect to dashboard
      props.history.push('/');
    }
    if (error === 'Invalid Credentials') {
      setAlert(error, 'danger');
      clearErrors();
    }
    // If Error Changes then it runs, error is as dependency
    // eslint-disable-next-line
  }, [error, isAuthenticated, props.history]);
  // Create Object User as a state
  const [user, setUser] = useState({
    email: '',
    password: '',
  });
  // Destructure
  const { email, password } = user;
  // onChange Method
  const onChange = (e) => {
    // Set whenever field is being filled up or change, confirming the state
    setUser({ ...user, [e.target.name]: e.target.value });
  };
  // onSubmit Method
  const onSubmit = (e) => {
    // Prevent Default
    e.preventDefault();
    // Check Password and email
    if (email === '' || password === '') {
      setAlert('Please fill in all fields', 'danger');
    } else {
      login({
        email,
        password,
      });
    }
  };

  return (
    <div className='form-container'>
      {/* Heading */}
      <h1>
        Account <span className='text-primary'>Login</span>
      </h1>
      {/* Login Form */}
      <form onSubmit={onSubmit}>
        {/* Email */}
        <div className='form-group'>
          <label htmlFor='email'>Email</label>
          <input
            type='email'
            name='email'
            value={email}
            onChange={onChange}
            required
          />
        </div>
        {/* Password */}
        <div className='form-group'>
          <label htmlFor='password'>Password</label>
          <input
            type='password'
            name='password'
            value={password}
            onChange={onChange}
            required
          />
        </div>
        {/* Submit Button */}
        <input
          type='submit'
          value='Login'
          className='btn btn-primary btn-block'
        />
      </form>
    </div>
  );
};

export default Login;
