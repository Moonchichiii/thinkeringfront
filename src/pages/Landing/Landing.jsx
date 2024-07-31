import React, { useEffect, useRef } from 'react';
import { Link } from 'react-scroll';
import { useNavigate } from 'react-router-dom';
import KeyboardDoubleArrowDownSharpIcon from '@mui/icons-material/KeyboardDoubleArrowDownSharp';
import gsap from 'gsap';
import styles from './LandingPage.module.css';

const Landing = () => {
  const titleRef = useRef(null);
  const subtitleRef = useRef(null);
  const containerRef = useRef(null);
  const navigate = useNavigate();

  useEffect(() => {
    const tl = gsap.timeline();

    tl.fromTo(
      titleRef.current.querySelector('.thinkering'),
      { opacity: 0, y: -100 },
      { opacity: 1, y: 0, duration: 1, ease: 'bounce.out' }
    )
    .fromTo(
      titleRef.current.querySelector('.blog'),
      { opacity: 0, y: -100 },
      { opacity: 1, y: 0, duration: 1, ease: 'bounce.out' },
      '-=0.5'
    )
    .fromTo(
      subtitleRef.current.children,
      { opacity: 0, y: 50 },
      { opacity: 1, y: 0, duration: 0.5, stagger: 0.1 }
    );

    return () => tl.kill();
  }, []);

  const handleTitleClick = () => {
    gsap.to(containerRef.current, { opacity: 0, duration: 1, onComplete: () => navigate('/home') });
  };

  return (
    <div ref={containerRef} className={styles.landingContainer}>
      <h1 ref={titleRef} className={styles.title} onClick={handleTitleClick}>
        <span className="thinkering">Thinkering</span>
        <span className="blog">Blog</span>
      </h1>
      <p ref={subtitleRef} className={styles.subtitle}>
        <span>Innovate</span>
        <span>Create</span>
        <span>Share</span>
      </p>
      <div className={styles.scrollDown}>
        <Link to="home" smooth={true} duration={1000}>
          <span>Scroll Down</span>
          <KeyboardDoubleArrowDownSharpIcon className={styles.icon} />
        </Link>
      </div>
    </div>
  );
};

export default Landing;