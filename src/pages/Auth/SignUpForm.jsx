import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { registerUser } from '../../store/authSlice';
import { useNavigate } from 'react-router-dom';
import { TextField, Button, Typography, Box, Alert } from '@mui/material';
import styles from './AuthForms.module.css';

const SignUpForm = ({ closeModal }) => {
  const [userData, setUserData] = useState({ username: '', email: '', password1: '', password2: '' });
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
    if (userData.password1 !== userData.password2) {
      setPasswordError('Passwords do not match');
      return;
    }
    setPasswordError('');
    dispatch(registerUser(userData));
  };

  return (
    <Box className={styles.formContainer}>
      <Typography variant="h4">Register</Typography>
      <form onSubmit={handleSubmit}>
        <TextField
          label="Username"
          value={userData.username}
          onChange={(e) => setUserData({ ...userData, username: e.target.value })}
          required
        />
        <TextField
          label="Email"
          value={userData.email}
          onChange={(e) => setUserData({ ...userData, email: e.target.value })}
          required
        />
        <TextField
          label="Password"
          type="password"
          value={userData.password1}
          onChange={(e) => setUserData({ ...userData, password1: e.target.value })}
          required
        />
        <TextField
          label="Confirm Password"
          type="password"
          value={userData.password2}
          onChange={(e) => setUserData({ ...userData, password2: e.target.value })}
          required
        />
        {passwordError && <Alert severity="error">{passwordError}</Alert>}
        <Button type="submit" disabled={loading}>Register</Button>
        {error && <Alert severity="error">{error}</Alert>}
      </form>
    </Box>
  );
};

export default SignUpForm;