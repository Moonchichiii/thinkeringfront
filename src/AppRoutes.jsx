import { Routes, Route, Navigate } from 'react-router-dom';
import LandingPage from '../pages/LandingPage';
import MainLayout from '../layouts/MainLayout';
import Dashboard from '../pages/Dashboard';
import Home from '../pages/Home';
import Blog from '../pages/Blog';
import { useAuth } from '../contexts/AuthContext';

function AppRoutes() {
  const { isAuthenticated } = useAuth();

  return (
    <Routes>
      <Route path="/" element={
        isAuthenticated ? <Navigate to="/dashboard" /> : <LandingPage />
      } />
      
      <Route element={<MainLayout />}>
        <Route path="/dashboard" element={
          isAuthenticated ? <Dashboard /> : <Navigate to="/" />
        } />
        <Route path="/home" element={<Home />} />
        <Route path="/blog" element={<Blog />} />
      </Route>
    </Routes>
  );
}

export default AppRoutes;
