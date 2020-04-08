import React, { useContext, useEffect } from 'react';
// Import AuthContext
import AuthContext from '../../context/auth/authContext';

const Home = () => {
  const authContext = useContext(AuthContext);
  // When it loads, it should load user and check it with the back end
  useEffect(() => {
    authContext.loadUser();
    // eslint-disable-next-line
  }, []);
  return (
    <div className='grid-2'>
      <h1>Login Successful</h1>
    </div>
  );
};

export default Home;
