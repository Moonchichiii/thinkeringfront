import React, { useEffect, useState } from 'react';
import { BrowserRouter as Router } from 'react-router-dom';
import './styles/App.css';
import { useDispatch, useSelector } from 'react-redux';
import { fetchCurrentUser } from './store/authSlice';
import Cookies from 'js-cookie';
import AppRoutes from './AppRoutes';

const App = () => {
  const dispatch = useDispatch();
  const { user } = useSelector((state) => state.auth);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const token = Cookies.get('access_token');
    if (token) {
      dispatch(fetchCurrentUser()).catch(() => {
        Cookies.remove('access_token');
        Cookies.remove('refresh_token');
      });
    }
  }, [dispatch]);

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 50);
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <Router>
      <AppRoutes isAuthenticated={!!user} scrolled={scrolled} />
    </Router>
  );
};

export default App;
