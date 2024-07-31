import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { loginUser } from '../../store/authSlice';
import { useNavigate } from 'react-router-dom';
import { TextField, Button, Typography, Box, Alert } from '@mui/material';
import styles from './AuthsForms.module.css';

const SignInForm = ({ switchToRegister, closeModal }) => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const dispatch = useDispatch();
  const { user, loading, error } = useSelector((state) => state.auth);
  const navigate = useNavigate();

  useEffect(() => {
    if (user) {
      closeModal();
      navigate('/dashboard');
    }
  }, [user, closeModal, navigate]);

  const handleSubmit = (e) => {
    e.preventDefault();
    dispatch(loginUser({ username, password }));
  };

  return (
    <Box className={styles.formContainer}>
      <Typography variant="h4" component="h2" gutterBottom>
        Login
      </Typography>
      <form onSubmit={handleSubmit}>
        <TextField
          fullWidth
          label="Username"
          variant="outlined"
          margin="normal"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
          autoComplete="username"
          InputLabelProps={{ className: styles.inputLabel }}
          InputProps={{ className: styles.input }}
          required
        />
        <TextField
          fullWidth
          label="Password"
          type="password"
          variant="outlined"
          margin="normal"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          autoComplete="current-password"
          InputLabelProps={{ className: styles.inputLabel }}
          InputProps={{ className: styles.input }}
          required
        />
        <Button
          type="submit"
          variant="contained"
          color="primary"
          fullWidth
          disabled={loading}
          className={styles.button}
        >
          {loading ? 'Logging in...' : 'Login'}
        </Button>
        {error && <Alert severity="error" className={styles.alert}>{error}</Alert>}
      </form>
      <Box className={styles.switchForm}>
        <Typography variant="body2">
          Don&apos;t have an account?{' '}
          <Button onClick={switchToRegister} className={styles.switchButton}>
            Sign up here!
          </Button>
        </Typography>
      </Box>
    </Box>
  );
};

export default SignInForm;
