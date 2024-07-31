import React from 'react';
import { Link } from 'react-router-dom';
import styles from './NotFound.module.css';

const NotFound = () => {
  return (
    <div className={styles.notFoundContainer}>
      <h1>404: Page Not Found</h1>
      <p>Oops! Looks like this page took a wrong turn at Albuquerque.</p>
      <img 
        src="/images/confused-traveler.svg" 
        alt="Confused traveler with a map" 
        className={styles.notFoundImage}
      />
      <p>Don't worry, even the best explorers get lost sometimes.</p>
      <Link to="/" className={styles.homeLink}>
        Let's go back home and start over
      </p>
    </div>
  );
};

export default NotFound;