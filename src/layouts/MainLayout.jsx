import React, { useState, useEffect, useCallback } from 'react';
import { Outlet } from 'react-router-dom';
import Header from '../components/header/Header';
import Footer from '../components/Footer/Footer';
import styles from './MainLayout.module.css';

function MainLayout({ scrolled, isAuthenticated }) {
  const [showHeader, setShowHeader] = useState(true);

  const handleScroll = useCallback(() => {
    setShowHeader(true);
  }, []);

  useEffect(() => {
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, [handleScroll]);

  return (
    <div className={styles.layout}>
      <Header scrolled={scrolled} isAuthenticated={isAuthenticated} />
      <main className={styles.mainContent}>
        <Outlet context={{ setShowHeader }} />
      </main>
      <Footer />
    </div>
  );
}

export default MainLayout;
