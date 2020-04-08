import React, { useContext } from 'react';
// Import Bootstrap Alert
import { Alert } from 'react-bootstrap';
// Import Font Awesome
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

import AlertContext from '../../context/alert/alertContext';

const Alerts = () => {
  const alertContext = useContext(AlertContext);
  return (
    alertContext.alerts.length > 0 &&
    alertContext.alerts.map((alert) => (
      <Alert key={alert.id} variant={`${alert.type}`}>
        <FontAwesomeIcon icon='info-circle' />
        <i className='fas fa-info-circle'></i> {alert.msg}
      </Alert>
    ))
  );
};

export default Alerts;
