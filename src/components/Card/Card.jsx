import React from 'react';
import { Rating, IconButton, Accordion, AccordionSummary, AccordionDetails, Typography } from '@mui/material';
import { Favorite, ExpandMore } from '@mui/icons-material';
import { useSelector, useDispatch } from 'react-redux';
import { createLike } from '../../store/likeSlice';
import { createRating } from '../../store/ratingSlice';
import { fetchComments } from '../../store/commentSlice';
import styles from './Card.module.css';

const BlogCard = ({ post }) => {
  const dispatch = useDispatch();
  const { user } = useSelector((state) => state.auth);
  const isAuthenticated = !!user;

  const handleLike = () => {
    if (isAuthenticated) {
      dispatch(createLike({ postId: post.id }));
    }
  };

  const handleRating = (event, newValue) => {
    if (isAuthenticated) {
      dispatch(createRating({ postId: post.id, rating: newValue }));
    }
  };

  return (
    <article className={styles.card}>
      <div className={styles.imageContainer}>
        <img src={post.image || '/path/to/placeholder/image.png'} alt={post.title || 'No Image'} className={styles.image} onError={(e) => e.target.src = '/path/to/placeholder/image.png'} />
      </div>
      <div className={styles.content}>
        <p className={styles.date}>{new Date(post.created_at).toLocaleDateString()}</p>
        <h2 className={styles.title}>{post.title}</h2>
        <p className={styles.excerpt}>{post.content}</p>
        <div className={styles.actions}>
          <Rating
            name={`rating-${post.id}`}
            value={post.average_rating}
            readOnly={!isAuthenticated}
            size="small"
            onChange={handleRating}
          />
          <span className={styles.likes}>
            <IconButton aria-label="like" size="small" onClick={handleLike}>
              <Favorite fontSize="small" />
            </IconButton>
            {post.likes_count}
          </span>
        </div>
        <a href={`/blog/${post.id}`} className={styles.readMore}>Read More</a>
        {isAuthenticated && (
          <Accordion className={styles.commentAccordion}>
            <AccordionSummary
              expandIcon={<ExpandMore />}
              aria-controls="comments-content"
              id="comments-header"
              onClick={() => dispatch(fetchComments({ postId: post.id }))}
            >
              <Typography>Comments</Typography>
            </AccordionSummary>
            <AccordionDetails>
              <Typography>
               
              </Typography>
            </AccordionDetails>
          </Accordion>
        )}
      </div>
    </article>
  );
};

export default BlogCard;
