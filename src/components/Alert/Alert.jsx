import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { removeAlert } from '../../store/alertSlice';
import { Snackbar, Alert as MuiAlert } from '@mui/material';

const Alert = () => {
  const dispatch = useDispatch();
  const alerts = useSelector((state) => state.alerts.messages);

  return (
    <>
      {alerts.map((alert) => (
        <Snackbar
          key={alert.id}
          open={true}
          autoHideDuration={5000} 
          onClose={() => dispatch(removeAlert(alert.id))}
          anchorOrigin={{ vertical: 'top', horizontal: 'center' }} 
        >
          <MuiAlert
            onClose={() => dispatch(removeAlert(alert.id))}
            severity={alert.type || 'info'} 
            sx={{ width: '100%' }} 
          >
            {alert.message}
          </MuiAlert>
        </Snackbar>
      ))}
    </>
  );
};

export default Alert;
