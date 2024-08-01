import React from 'react';
import { Link } from 'react-router-dom';
import styles from './LatestPostsSection.module.css';

const LatestPostsSection = ({ posts }) => {
  return (
    <div className={styles.latestPosts}>
      <h2>Latest Posts</h2>
      <ul>
        {posts.map(post => (
          <li key={post.id}>
            <Link to={`/post/${post.id}`}>
              <h3>{post.title}</h3>
              <p>{post.excerpt}</p>
            </Link>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default LatestPostsSection;
