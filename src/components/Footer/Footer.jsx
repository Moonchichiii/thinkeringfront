import React, { useEffect, useCallback } from 'react';
import styles from './Footer.module.css';
import { GitHub, LinkedIn, ArrowUpward } from '@mui/icons-material';
import { gsap } from 'gsap';
import { motion } from 'framer-motion';
import footer from '../../assets/images/footer.webp';

const Footer = () => {
  const handleIconHover = useCallback((icon, isEntering) => {
    gsap.to(icon, {
      y: isEntering ? -10 : 0,
      duration: 0.3,
      ease: 'bounce',
    });
  }, []);

  useEffect(() => {
    const socialIcons = document.querySelectorAll(`.${styles.socialIcon}`);

    socialIcons.forEach(icon => {
      icon.addEventListener('mouseover', () => handleIconHover(icon, true));
      icon.addEventListener('mouseleave', () => handleIconHover(icon, false));
    });

    return () => {
      socialIcons.forEach(icon => {
        icon.removeEventListener('mouseover', () => handleIconHover(icon, true));
        icon.removeEventListener('mouseleave', () => handleIconHover(icon, false));
      });
    };
  }, [handleIconHover]);

  const handleSubmit = (e) => {
    e.preventDefault();
    // Add form submission logic here
  };

  return (
    <footer className={styles.footer}>
      <div className={styles.content}>
        <div className={styles.logoSection}>
          <img src={footer} alt="Thinkering Blog Logo" className={styles.logo} />
          <p>Exploring ideas, one tinker at a time.</p>
        </div>

        <div className={styles.address}>
          <h3>Our Address</h3>
          <p>Thinkery Lane</p>
          <p>Cyberspace, Galaxy, q25</p>
          <p>Email: Thinkering@example.com</p>
        </div>

        <div className={styles.social}>
          <h3>Follow Us</h3>
          <div className={styles.socialIcons}>
            <a href="https://github.com" target="_blank" rel="noopener noreferrer" className={styles.socialIcon}><GitHub /></a>
            <a href="https://linkedin.com" target="_blank" rel="noopener noreferrer" className={styles.socialIcon}><LinkedIn /></a>
          </div>
        </div>

        <div className={styles.newsletter}>
          <h3>Subscribe to Our Newsletter</h3>
          <form className={styles.newsletterForm} onSubmit={handleSubmit}>
            <input type="email" placeholder="Your email" required />
            <button type="submit">Subscribe</button>
          </form>
        </div>

        <div className={styles.contactUs}>
          <h2 id='contact'>Contact Us</h2>
          <p>Get in touch with us for any inquiries or feedback!</p>
          <form className={styles.contactForm} onSubmit={handleSubmit}>
            <input type="email" placeholder="Your email" required className={styles.contactInput} />
            <textarea placeholder="Your message" required className={styles.contactTextarea}></textarea>
            <button type="submit" className={styles.contactButton}>Send Message</button>
          </form>
        </div>
      </div>

      <div className={styles.scrollToTopContainer}>
        <motion.a
          href="#home"
          className={styles.scrollToTopLink}
          whileHover={{ scale: 1.1 }}
          whileTap={{ scale: 0.95 }}
        >
          <ArrowUpward fontSize="large" className={styles.arrowIcon} />
          <span className={styles.arrowText}>Back to Top</span>
        </motion.a>
      </div>

      <div className={styles.bottomBar}>
        <p>&copy; {new Date().getFullYear()} Thinkering Blog. All rights reserved.</p>
        <ul className={styles.footerLinks}>
          <li><a href="/privacy" className={styles.footerLink}>Privacy Policy</a></li>
          <li><a href="/terms" className={styles.footerLink}>Terms of Use</a></li>
          <li><a href="/cookies" className={styles.footerLink}>Cookie Policy</a></li>
        </ul>
      </div>
    </footer>
  );
};

export default Footer;