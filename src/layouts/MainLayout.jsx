import React from 'react';
import { Outlet } from 'react-router-dom';
import Header from '../components/header/Header';
import Footer from '../components/Footer/Footer';
import styles from './MainLayout.module.css';

function MainLayout({ scrolled, isAuthenticated, children }) {
  return (
    <div className={`${styles.layout} ${scrolled ? styles.scrolled : ''}`}>
      <Header scrolled={scrolled} isAuthenticated={isAuthenticated} />
      <main>{children || <Outlet />}</main>
      <Footer />
    </div>
  );
}

export default MainLayout;