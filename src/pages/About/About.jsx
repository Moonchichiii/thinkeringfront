import React, { useEffect, useRef } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import styles from './About.module.css';

gsap.registerPlugin(ScrollTrigger);

const About = () => {
  const containerRef = useRef(null);

  useEffect(() => {
    const items = containerRef.current.querySelectorAll(`.${styles.bentoItem}`);

    items.forEach((item, index) => {
      gsap.fromTo(
        item,
        { opacity: 0, y: 100 },
        {
          opacity: 1,
          y: 0,
          duration: 1,
          ease: 'power3.out',
          delay: index * 0.2,
          scrollTrigger: {
            trigger: item,
            start: 'top 80%',
            toggleActions: 'play none none none',
          },
        }
      );
    });
  }, []);

  return (
    <div className={styles.aboutContainer} ref={containerRef}>
      <h1 className={styles.aboutTitle}>About Us</h1>

      <div className={styles.bentoGrid}>
        <div className={`${styles.bentoItem} ${styles.introSection}`}>
          <h2>Welcome to Thinkering Blog</h2>
          <p>
            Thinkering Blog is a space where creativity, expression, and connection come together.
            We invite you to share your stories, ideas, and experiences on a wide range of topics.
            Our community is all about fostering meaningful conversations and exploring the world
            through different perspectives.
          </p>
        </div>

        <div className={`${styles.bentoItem} ${styles.missionSection}`}>
          <h2>Our Mission</h2>
          <p>
            Our mission is to provide a platform for individuals to express themselves,
            connect with others, and explore new ideas. Whether you're passionate about technology,
            lifestyle, art, or any other topic, Thinkering Blog is your go-to place for inspiration
            and community.
          </p>
        </div>

        <div className={`${styles.bentoItem} ${styles.communitySection}`}>
          <h2>Join Our Community</h2>
          <p>
            At Thinkering Blog, we believe in the power of community. Our platform is designed to bring
            people together, allowing members to engage in discussions, share their unique perspectives,
            and make lasting connections. Whether you're a writer, reader, or simply someone who loves
            exploring new ideas, there's a place for you here.
          </p>
          <button className={styles.ctaButton}>Become a Member</button>
        </div>

        <div className={`${styles.bentoItem} ${styles.teamSection}`}>
          <h2>Meet Our Team</h2>
          <div className={styles.teamGrid}>
            <div className={styles.teamMember}>
              <img src="/path-to-image.jpg" alt="Team Member 1" />
              <h3>Jane Doe</h3>
              <p>Founder & Chief Editor</p>
            </div>
            <div className={styles.teamMember}>
              <img src="/path-to-image.jpg" alt="Team Member 2" />
              <h3>John Smith</h3>
              <p>Community Manager</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default About;
