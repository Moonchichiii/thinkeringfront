// Footer.jsx
import React, { useEffect } from 'react';
import styles from './Footer.module.css';
import { GitHub, LinkedIn, ArrowUpward } from '@mui/icons-material';
import { gsap } from 'gsap';
import { motion } from 'framer-motion';
import footer from '../../assets/images/footer.webp';

const Footer = () => {
  useEffect(() => {
    const socialIcons = document.querySelectorAll(`.${styles.socialIcon}`);

    socialIcons.forEach(icon => {
      icon.addEventListener('mouseover', () => {
        gsap.to(icon, { y: -10, duration: 0.3, ease: 'bounce' });
      });

      icon.addEventListener('mouseleave', () => {
        gsap.to(icon, { y: 0, duration: 0.3, ease: 'bounce' });
      });
    });
  }, []);

  const handleScrollToTop = () => {
    document.getElementById('home').scrollIntoView({ behavior: 'smooth' });
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
            <a href="#" className={styles.socialIcon}><GitHub /></a>
            <a href="#" className={styles.socialIcon}><LinkedIn /></a>
          </div>
        </div>
      
        <div className={styles.newsletter}>
          <h3>Subscribe to Our Newsletter</h3>
          <form className={styles.newsletterForm}>
            <input type="email" placeholder="Your email" required />
            <button type="submit">Subscribe</button>
          </form>
        </div>
      
        <div className={styles.contactUs}>
          <h2 id='contact'>Contact Us</h2>
          <p>Get in touch with us for any inquiries or feedback!</p>
          <form className={styles.contactForm}>
            <input type="email" placeholder="Your email" required className={styles.contactInput} />
            <textarea placeholder="Your message" required className={styles.contactTextarea}></textarea>
            <button type="submit" className={styles.contactButton}>Send Message</button>
          </form>
        </div>
      </div>  
      
      <div className={styles.scrollToTopContainer}>
        <motion.button
          className={styles.scrollToTop}
          aria-label="Scroll to top"
          whileHover={{ scale: 1.1 }}
          whileTap={{ scale: 0.95 }}
          onClick={handleScrollToTop}
        >
          <ArrowUpward fontSize="large" className={styles.arrowIcon} />
          <span className={styles.arrowText}>Back to Top</span>
        </motion.button>
      </div>

      <div className={styles.bottomBar}>
        <p>&copy; 2024 Thinkering Blog. All rights reserved.</p>
        <ul className={styles.footerLinks}>
          <li><a href="#" className={styles.footerLink}>Privacy Policy</a></li>
          <li><a href="#" className={styles.footerLink}>Terms of Use</a></li>
          <li><a href="#" className={styles.footerLink}>Cookie Policy</a></li>
        </ul>
      </div>
    </footer>
  );
};

export default Footer;
