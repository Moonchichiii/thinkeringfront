import React, { useEffect, useState, lazy, Suspense } from 'react';
import { BrowserRouter as Router, Route, Routes, Navigate } from 'react-router-dom';
import './App.css';
import MainLayout from './layouts/MainLayout';
import ProtectedRoute from './pages/protectedroutes/ProtectedRoutes';
import { useDispatch, useSelector } from 'react-redux';
import { fetchCurrentUser } from './store/authSlice';
import Loading from './components/Loader/LoadSpinner';
import Cookies from 'js-cookie';

const MainContent = lazy(() => import('./pages/MainContent/MainContent'));
const Dashboard = lazy(() => import('./pages/Dashboard/Dashboard'));

function App() {
  const [scrolled, setScrolled] = useState(false);
  const dispatch = useDispatch();
  const { user } = useSelector((state) => state.auth);

  useEffect(() => {
    const token = Cookies.get('access_token');
    if (token) {
      dispatch(fetchCurrentUser());
    }
  }, [dispatch]);

  const isAuthenticated = !!user;

  const handleScroll = () => {
    setScrolled(window.scrollY > 50);
  };

  useEffect(() => {
    window.addEventListener('scroll', handleScroll);
    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, []);

  return (
    <Router>
      <MainLayout scrolled={scrolled} isAuthenticated={isAuthenticated}>
        <Routes>
          <Route
            path="/*"
            element={
              <Suspense fallback={<Loading />}>
                <MainContent />
              </Suspense>
            }
          />
          <Route
            path="/dashboard"
            element={
              <ProtectedRoute isAuthenticated={isAuthenticated}>
                <Suspense fallback={<Loading />}>
                  <Dashboard />
                </Suspense>
              </ProtectedRoute>
            }
          />
          <Route path="*" element={<Navigate to="/" />} />
        </Routes>
      </MainLayout>
    </Router>
  );
}

export default App;
