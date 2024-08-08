import React, { lazy, Suspense } from 'react';
import { Routes, Route, Navigate } from 'react-router-dom';
import { useSelector } from 'react-redux';
import MainLayout from './layouts/MainLayout';
import ProtectedRoute from './pages/protectedroutes/ProtectedRoutes';
const Dashboard = lazy(() => import('./pages/Dashboard/Dashboard'));
const Home = lazy(() => import('./pages/Home/Home'));
const About = lazy(() => import('./pages/About/About'));
const Blog = lazy(() => import('./pages/Blog/Blog'));
const MainContent = lazy(() => import('./pages/MainContent/MainContent'));

function AppRoutes() {
  const { user } = useSelector((state) => state.auth);

  return (
    <Suspense fallback={<div>Loading...</div>}>
      <Routes>
        <Route path="/" element={<MainLayout isAuthenticated={!!user} />}>
          <Route index element={<MainContent />} />
          <Route path="dashboard" element={<ProtectedRoute><Dashboard /></ProtectedRoute>} />
          <Route path="home" element={<Home />} />
          <Route path="about" element={<About />} />
          <Route path="blog" element={<Blog />} />
          <Route path="*" element={<Navigate to="/" />} />
        </Route>
      </Routes>
    </Suspense>
  );
}

export default AppRoutes;
