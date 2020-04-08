import React, { Fragment } from 'react';
// Import React Router
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
// Import Navbar Component
import Navbar from './components/layout/Navbar';
// Import Home Component
import Home from './components/pages/Home';
// Import About Component
import About from './components/pages/About';
// Import Register Component
import Register from './components/auth/Register';
// Import Login Component
import Login from './components/auth/Login';
// Import Alert Component
import Alerts from './components/layout/Alerts';
// Import  Private Component
import PrivateRoute from './components/routing/PrivateRoute';
// Import Auth State
import AuthState from './context/auth/AuthState';
// Import Alert State
import AlertState from './context/alert/AlertState';
// Import Set Auth Token for default headers
import setAuthToken from './utils/setAuthToken';
import './App.css';

if (localStorage.token) {
  setAuthToken(localStorage.token);
}

const App = () => {
  return (
    // Wrap everything in the contact state so we can use anything in the stat and do not need prop drilling
    <AuthState>
      <AlertState>
        <Router>
          <Fragment>
            <Navbar />
            <div className='container'>
              <Alerts />
              <Switch>
                <PrivateRoute exact path='/' component={Home} />
                <Route exact path='/about' component={About} />
                <Route exact path='/register' component={Register} />
                <Route exact path='/login' component={Login} />
              </Switch>
            </div>
          </Fragment>
        </Router>
      </AlertState>
    </AuthState>
  );
};

export default App;
