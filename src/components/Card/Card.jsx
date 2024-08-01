import React from 'react';
import { Rating, IconButton, Accordion, AccordionSummary, AccordionDetails, Typography } from '@mui/material';
import { Favorite, Comment, ExpandMore } from '@mui/icons-material';
import { useSelector } from 'react-redux';
import styles from './Card.module.css';

const BlogCard = ({ post }) => {
  const { user } = useSelector((state) => state.auth);
  const isAuthenticated = !!user;

  return (
    <article className={styles.card}>
      <div className={styles.imageContainer}>
        <img src={post.image} alt={post.title} className={styles.image} />
      </div>
      <div className={styles.content}>
        <p className={styles.date}>{new Date(post.created_at).toLocaleDateString()}</p>
        <h2 className={styles.title}>{post.title}</h2>
        <p className={styles.excerpt}>{post.content}</p>
        <div className={styles.actions}>
          <Rating name="read-only" value={post.average_rating} readOnly size="small" />
          <span className={styles.likes}>
            <Favorite fontSize="small" /> {post.likes_count}
          </span>
        </div>
        <a href={`/blog/${post.id}`} className={styles.readMore}>Read More</a>
        {isAuthenticated && (
          <div className={styles.authActions}>
            <IconButton aria-label="like" size="small">
              <Favorite fontSize="small" />
            </IconButton>
            <Accordion className={styles.commentAccordion}>
              <AccordionSummary
                expandIcon={<ExpandMore />}
                aria-controls="comments-content"
                id="comments-header"
              >
                <Typography>Comments</Typography>
              </AccordionSummary>
              <AccordionDetails>
                <Typography>
                  Comments will be displayed here.
                </Typography>
              </AccordionDetails>
            </Accordion>
          </div>
        )}
      </div>
    </article>
  );
};

export default BlogCard;