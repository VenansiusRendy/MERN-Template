import React, { Fragment, useContext } from 'react';
// Import React Bootstrap
import { Navbar, Nav } from 'react-bootstrap';
// Import Font Awesome
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
// Import PropTypes
import PropTypes from 'prop-types';
// Imoprt Auth Context
import AuthContext from '../../context/auth/authContext';

const NavBar = ({ title, icon }) => {
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
      <Nav.Link style={{ pointerEvents: 'none' }}>
        Hello {user && user.name}
      </Nav.Link>
      <Nav.Link onClick={onLogout} href='#!'>
        <FontAwesomeIcon icon='sign-out-alt' />{' '}
        <span className='hide-sm'>Logout</span>
      </Nav.Link>
    </Fragment>
  );
  // Show for guests
  const guestLinks = (
    <Fragment>
      <Nav.Link href='/register'>Register</Nav.Link>
      <Nav.Link href='/login'>
        <FontAwesomeIcon icon='sign-in-alt' /> Login
      </Nav.Link>
      <Nav.Link href='/about'>About</Nav.Link>
    </Fragment>
  );
  return (
    <Navbar bg='primary' expand='lg' variant='light'>
      <Navbar.Brand href='#home'>React-Bootstrap</Navbar.Brand>
      <Navbar.Toggle aria-controls='basic-navbar-nav' />
      <Navbar.Collapse id='basic-navbar-nav'>
        <Nav className='ml-auto'>
          {/* Check For Authentication */}
          {isAuthenticated ? authLinks : guestLinks}
        </Nav>
      </Navbar.Collapse>
    </Navbar>

    // <Navbar className='navbar navbar-expand-lg navbar-light bg-primary'>
    //   <NavbarBrand href='#'>MERN Template</NavbarBrand>
    //   <NavbarToggler onClick={toggleNavbar} className='mr-2' />
    //   {/* Menu Layout */}
    //   <Collapse isOpen={!collapsed} navbar>
    //     <Nav navbar>
    //       {/* Check For Authentication */}
    //       {isAuthenticated ? authLinks : guestLinks}
    //     </Nav>
    //   </Collapse>
    // </Navbar>
  );
};
// Proptypes defination
Navbar.propTypes = {
  title: PropTypes.string.isRequired,
  icon: PropTypes.string,
};
// Default proptypes
Navbar.defaultProps = {
  title: 'MERN Template',
  icon: '',
};
export default NavBar;
