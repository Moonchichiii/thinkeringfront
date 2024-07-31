import React, { useEffect, useRef } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import styles from './About.module.css';

gsap.registerPlugin(ScrollTrigger);

const About = () => {
  const containerRef = useRef(null);

  useEffect(() => {
    const sections = containerRef.current.querySelectorAll('section');
    
    sections.forEach((section, index) => {
      gsap.fromTo(section, 
        { opacity: 0, y: 50 },
        {
          opacity: 1,
          y: 0,
          duration: 1,
          ease: 'power3.out',
          scrollTrigger: {
            trigger: section,
            start: 'top 80%',
          }
        }
      );
    });
  }, []);

  return (
    <div className={styles.aboutContainer} ref={containerRef}>
      <h1 className={styles.aboutTitle}>About Us</h1>
      
      <section className={styles.introSection}>
        <h2>Welcome to Thinkering Blog</h2>
        <p>We're a community of thinkers, creators, and innovators dedicated to exploring the intersection of technology, creativity, and personal growth.</p>
      </section>

      <section className={styles.missionSection}>
        <h2>Our Mission</h2>
        <p>To inspire and empower individuals through thought-provoking content, fostering a culture of continuous learning and innovation.</p>
      </section>

      <section className={styles.skillsSection}>
        <h2>What We Bring to the Table</h2>
        <div className={styles.skillsGrid}>
          <div className={styles.skillCard}>
            <h3>Web Development</h3>
            <p>Expertise in HTML5, CSS3, JavaScript, React, and more.</p>
          </div>
          <div className={styles.skillCard}>
            <h3>Content Creation</h3>
            <p>Engaging and informative articles on tech trends and innovations.</p>
          </div>
          <div className={styles.skillCard}>
            <h3>Community Building</h3>
            <p>Fostering a vibrant space for like-minded individuals to connect and grow.</p>
          </div>
        </div>
      </section>

      <section className={styles.teamSection}>
        <h2>Meet Our Team</h2>
        <div className={styles.teamGrid}>
          <div className={styles.teamMember}>
            <img src="/path-to-image.jpg" alt="Team Member 1" />
            <h3>Jane Doe</h3>
            <p>Founder & Lead Developer</p>
          </div>
          <div className={styles.teamMember}>
            <img src="/path-to-image.jpg" alt="Team Member 2" />
            <h3>John Smith</h3>
            <p>Content Strategist</p>
          </div>
        </div>
      </section>

      <section className={styles.joinSection}>
        <h2>Join Our Community</h2>
        <p>Whether you're a seasoned professional or just starting out, there's a place for you in our community.</p>
        <button className={styles.ctaButton}>Become a Member</button>
      </section>
    </div>
  );
};

export default About;