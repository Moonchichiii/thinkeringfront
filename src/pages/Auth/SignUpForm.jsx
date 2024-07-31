import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { registerUser } from '../../store/authSlice';
import { useNavigate } from 'react-router-dom';
import { TextField, Button, Typography, Box, Alert } from '@mui/material';
import styles from './AuthsForms.module.css';

const SignUpForm = ({ switchToLogin, closeModal }) => {
  const [username, setUsername] = useState('');
  const [email, setEmail] = useState('');
  const [password1, setPassword1] = useState('');
  const [password2, setPassword2] = useState('');
  const [passwordError, setPasswordError] = useState('');
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
    if (password1 !== password2) {
      setPasswordError('Passwords do not match');
      return;
    }
    setPasswordError('');
    dispatch(registerUser({ username, email, password1, password2 }));
  };

  return (
    <Box className={styles.formContainer}>
      <Typography variant="h4" component="h2" gutterBottom>
        Register
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
          label="Email"
          type="email"
          variant="outlined"
          margin="normal"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          autoComplete="email"
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
          value={password1}
          onChange={(e) => setPassword1(e.target.value)}
          autoComplete="new-password"
          InputLabelProps={{ className: styles.inputLabel }}
          InputProps={{ className: styles.input }}
          required
        />
        <TextField
          fullWidth
          label="Confirm Password"
          type="password"
          variant="outlined"
          margin="normal"
          value={password2}
          onChange={(e) => setPassword2(e.target.value)}
          autoComplete="new-password"
          InputLabelProps={{ className: styles.inputLabel }}
          InputProps={{ className: styles.input }}
          required
        />
        {passwordError && <Alert severity="error" className={styles.alert}>{passwordError}</Alert>}
        <Button
          type="submit"
          variant="contained"
          color="primary"
          fullWidth
          disabled={loading}
          className={styles.button}
        >
          {loading ? 'Registering...' : 'Register'}
        </Button>
        {error && <Alert severity="error" className={styles.alert}>{error}</Alert>}
      </form>
      <Box className={styles.switchForm}>
        <Typography variant="body2">
          Already have an account?{' '}
          <Button onClick={switchToLogin} className={styles.switchButton}>
            Sign in here!
          </Button>
        </Typography>
      </Box>
    </Box>
  );
};

export default SignUpForm;
