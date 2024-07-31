import React from 'react';
import { Link } from 'react-router-dom';
import styles from './TopRatedPostsSection.module.css';

const TopRatedPostsSection = ({ posts }) => {
  return (
    <div className={styles.topRatedPosts}>
      <h2>Top Rated Posts</h2>
      <ul>
        {posts.map(post => (
          <li key={post.id}>
            <Link to={`/post/${post.id}`}>
              <h3>{post.title}</h3>
              <span>Rating: {post.averageRating}</span>
            </Link>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default TopRatedPostsSection;