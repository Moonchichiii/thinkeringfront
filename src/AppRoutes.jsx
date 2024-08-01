import React from 'react';
import { Routes, Route, Navigate } from 'react-router-dom';
import { useSelector } from 'react-redux';
import MainLayout from './layouts/MainLayout';
import Dashboard from './pages/Dashboard/Dashboard';
import Home from './pages/Home/Home';
import About from './pages/About/About';
import Blog from './pages/Blog/Blog';
import ProtectedRoute from './pages/protectedroutes/ProtectedRoutes';
import MainContent from './pages/MainContent/MainContent';

function AppRoutes() {
  const isAuthenticated = useSelector((state) => state.auth.isAuthenticated);

  return (
    <Routes>
      <Route path="/" element={<MainLayout isAuthenticated={isAuthenticated} />}>
        <Route index element={<MainContent />} />
        <Route path="dashboard" element={
          <ProtectedRoute isAuthenticated={isAuthenticated}>
            <Dashboard />
          </ProtectedRoute>
        } />
        <Route path="home" element={<Home />} />
        <Route path="about" element={<About />} />
        <Route path="blog" element={<Blog />} />
        <Route path="*" element={<Navigate to="/" />} />
      </Route>
    </Routes>
  );
}

export default AppRoutes;
