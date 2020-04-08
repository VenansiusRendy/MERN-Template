import React, { Fragment, useContext } from 'react';
// Import PropTypes
import PropTypes from 'prop-types';
// Import React Inner Link instead of using a tag
import { Link } from 'react-router-dom';
// Imoprt Auth Context
import AuthContext from '../../context/auth/authContext';

const Navbar = ({ title, icon }) => {
  // Initialize auth Context
  const authContext = useContext(AuthContext);
  // Initialize contact Context
  const { isAuthenticated, logout, user } = authContext;
  // onLogout Method
  const onLogout = () => {
    logout();
  };
  // Show for authenticated
  const authLinks = (
    <Fragment>
      <li>Hello {user && user.name}</li>
      <li>
        <a onClick={onLogout} href='#!'>
          <i className='fas fa-sign-out-alt'></i>{' '}
          <span className='hide-sm'>Logout</span>
        </a>
      </li>
    </Fragment>
  );
  // Show for guests
  const guestLinks = (
    <Fragment>
      <li>
        <Link to='/register'>Register</Link>
      </li>
      <li>
        <Link to='/login'>Login</Link>
      </li>
      <li>
        <Link to='/about'>About</Link>
      </li>
    </Fragment>
  );
  return (
    <div className='navbar bg-primary'>
      <h1>
        <i className={icon} /> {title}
      </h1>
      {/* Menu Layout */}
      <ul>
        {/* Check For Authentication */}
        {isAuthenticated ? authLinks : guestLinks}
      </ul>
    </div>
  );
};
// Proptypes defination
Navbar.propTypes = {
  title: PropTypes.string.isRequired,
  icon: PropTypes.string,
};
// Default proptypes
Navbar.defaultProps = {
  title: 'Contact Keeper',
  icon: 'fas fa-id-card-alt',
};
export default Navbar;
