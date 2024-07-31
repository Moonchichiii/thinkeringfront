import React, { useEffect, useRef } from 'react';
import { gsap } from 'gsap';
import { Link } from 'react-router-dom';
import styles from './Home.module.css';

const Home = () => {
  const titleRef = useRef(null);
  const descriptionRef = useRef(null);
  const buttonRef = useRef(null);
  const bubblesRef = useRef(null);

  useEffect(() => {
    gsap.fromTo(
      titleRef.current,
      { opacity: 0, y: -50 },
      { opacity: 1, y: 0, duration: 1, delay: 0.5 }
    );

    gsap.fromTo(
      descriptionRef.current,
      { opacity: 0, y: 50 },
      { opacity: 1, y: 0, duration: 1, delay: 1 }
    );

    gsap.fromTo(
      buttonRef.current,
      { opacity: 0, scale: 0.8 },
      { opacity: 1, scale: 1, duration: 0.5, delay: 1.5 }
    );

    // Animate bubbles
    const bubbles = bubblesRef.current.children;
    gsap.to(bubbles, {
      y: 'random(-100, 100)',
      x: 'random(-100, 100)',
      scale: 'random(0.1, 1.5)',
      duration: 'random(10, 30)',
      repeat: -1,
      yoyo: true,
      ease: 'sine.inOut',
      stagger: {
        each: 0.1,
        from: 'random',
      },
    });
  }, []);

  return (
    <div className={styles.homeContainer}>
      <div className={styles.bubbles} ref={bubblesRef}>
        {[...Array(20)].map((_, index) => (
          <div key={index} className={styles.bubble}></div>
        ))}
      </div>
      <div className={styles.heroContent}>
        <h1 ref={titleRef} className={styles.heroTitle}>
          Welcome to Thinkering Blog
        </h1>
        <p ref={descriptionRef} className={styles.heroDescription}>
          Share your thoughts on anything from tech to food. Explore the creativity and innovation within our community!
        </p>
        <Link to="/blog" ref={buttonRef} className={styles.blogButton}>
          Explore Blog
        </Link>
      </div>
    </div>
  );
};

export default Home;