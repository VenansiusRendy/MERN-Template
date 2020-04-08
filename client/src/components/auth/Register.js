import React, { useContext, useState, useEffect } from 'react';
import AlertContext from '../../context/alert/alertContext';
import AuthContext from '../../context/auth/authContext';

const Register = (props) => {
  // Init context
  const alertContext = useContext(AlertContext);
  const authContext = useContext(AuthContext);
  // Destructure alertContext
  const { setAlert } = alertContext;
  // Destructure authContext
  const { register, error, clearErrors, isAuthenticated } = authContext;
  // Display error if there is error from auth context
  useEffect(() => {
    // If authenticated the page will redirect
    if (isAuthenticated) {
      // Redirect to dashboard
      props.history.push('/');
    }
    if (error === 'User already exists') {
      setAlert(error, 'danger');
      clearErrors();
    }
    // If Error Changes then it runs, error is as dependency
    // eslint-disable-next-line
  }, [error, isAuthenticated, props.history]);
  // Create Object User as a state
  const [user, setUser] = useState({
    name: '',
    email: '',
    password: '',
    password2: '',
  });
  // onChange Method
  const onChange = (e) => {
    // Set whenever field is being filled up or change, confirming the state
    setUser({ ...user, [e.target.name]: e.target.value });
  };
  // onSubmit Method
  const onSubmit = (e) => {
    // Prevent Default
    e.preventDefault();
    if (name === '' || email === '' || password === '') {
      setAlert('Please enter all fields', 'danger');
    } else if (password !== password2) {
      setAlert('Passwords do not match', 'danger');
    } else {
      register({
        name,
        email,
        password,
      });
    }
  };

  const { name, email, password, password2 } = user;
  return (
    <div className='form-container'>
      {/* Heading */}
      <h1>
        Account <span className='text-primary'>Register</span>
      </h1>
      {/* Register Form */}
      <form onSubmit={onSubmit}>
        {/* Name */}
        <div className='form-group'>
          <label htmlFor='name'>Name</label>
          <input
            type='text'
            name='name'
            value={name}
            onChange={onChange}
            required
          />
        </div>
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
            minLength='6'
            required
          />
        </div>
        {/* Password2 */}
        <div className='form-group'>
          <label htmlFor='password2'>Confirm Password</label>
          <input
            type='password'
            name='password2'
            value={password2}
            onChange={onChange}
            minLength='6'
            required
          />
        </div>
        {/* Submit Button */}
        <input
          type='submit'
          value='Register'
          className='btn btn-primary btn-block'
        />
      </form>
    </div>
  );
};

export default Register;
