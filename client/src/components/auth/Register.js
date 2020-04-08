import React, { useContext, useState, useEffect } from 'react';
import AlertContext from '../../context/alert/alertContext';
import AuthContext from '../../context/auth/authContext';
// Import From Bootstrap
import { Form, Row, Col } from 'react-bootstrap';

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
    <div className='container-form m-auto'>
      {/* Heading */}
      <h1 className='text-center my-5'>
        Account <span className='text-primary'>Register</span>
      </h1>
      {/* Register Form */}
      <Form onSubmit={onSubmit}>
        {/* Name */}
        <Form.Group as={Row} className='py-2'>
          <Form.Label htmlFor='name' column sm='2'>
            Name
          </Form.Label>
          <Col sm='10'>
            <Form.Control
              type='text'
              name='name'
              value={name}
              onChange={onChange}
              required
            />
          </Col>
        </Form.Group>
        {/* Email */}
        <Form.Group as={Row} className='py-2'>
          <Form.Label htmlFor='email' column sm='2'>
            Email
          </Form.Label>
          <Col sm='10'>
            <Form.Control
              type='email'
              name='email'
              value={email}
              onChange={onChange}
              required
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
              type='password'
              name='password'
              value={password}
              onChange={onChange}
              minLength='6'
              required
            />
          </Col>
        </Form.Group>
        {/* Password2 */}
        <Form.Group as={Row} className='py-2'>
          <Form.Label htmlFor='password2' column sm='2'>
            Confirm Password
          </Form.Label>
          <Col sm='10' className='m-auto'>
            <Form.Control
              type='password'
              name='password2'
              value={password2}
              onChange={onChange}
              minLength='6'
              required
            />
          </Col>
        </Form.Group>
        {/* Submit Button */}
        <input
          type='submit'
          value='Register'
          className='btn btn-primary btn-block my-2'
        />
      </Form>
    </div>
  );
};

export default Register;
