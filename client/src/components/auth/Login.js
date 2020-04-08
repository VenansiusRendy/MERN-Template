import React, { useState, useEffect, useContext } from 'react';
import { Link } from 'react-router-dom';
import AlertContext from '../../context/alert/alertContext';
import AuthContext from '../../context/auth/authContext';
// Import From Bootstrap
import { Form, Row, Col } from 'react-bootstrap';

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
    <div className='container-form m-auto'>
      {/* Heading */}
      <h1 className='text-center my-5'>
        Account <span className='text-primary'>Login</span>
      </h1>
      {/* Login Form */}
      <Form onSubmit={onSubmit}>
        {/* Email */}
        <Form.Group as={Row} className='py-2'>
          <Form.Label htmlFor='email' column sm='2'>
            Email
          </Form.Label>
          <Col sm='10'>
            <Form.Control
              name='email'
              type='email'
              value={email}
              onChange={onChange}
              required
              placeholder='Enter Email'
            />
          </Col>
        </Form.Group>
        {/* Password */}
        <Form.Group as={Row} className='py-2'>
          <Form.Label htmlFor='password' column sm='2'>
            Password
          </Form.Label>
          <Col sm='10'>
            <Form.Control
              name='password'
              type='password'
              value={password}
              onChange={onChange}
              required
              placeholder='Enter Password'
            />
          </Col>
        </Form.Group>
        {/* Login Button */}
        <input
          type='submit'
          value='Login'
          className='btn btn-primary btn-block my-2'
        />
        {/* Register Button */}
        <Link to='/register' className='btn btn-danger btn-block my-2'>
          Register
        </Link>
      </Form>
    </div>
  );
};

export default Login;
