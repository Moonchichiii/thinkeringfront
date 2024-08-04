import React, { useEffect, useState, useCallback, useTransition } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import Masonry from 'react-masonry-css';
import { debounce } from 'lodash';
import { motion } from 'framer-motion';
import { fetchPosts } from '../../store/postSlice';
import SearchBar from '../../components/Searchbar/SearchBar';
import BlogCard from '../../components/Card/Card';
import styles from './Blog.module.css';

const BlogPage = () => {
  const dispatch = useDispatch();
  const { posts, status, error } = useSelector((state) => state.posts);
  const [searchTerm, setSearchTerm] = useState('');
  const [filteredPosts, setFilteredPosts] = useState([]);
  const [isPending, startTransition] = useTransition();

  const breakpointColumnsObj = {
    default: 3,
    1100: 2,
    700: 1
  };

  useEffect(() => {
    dispatch(fetchPosts());
  }, [dispatch]);

  useEffect(() => {
    startTransition(() => {
      setFilteredPosts(
        posts.filter(post =>
          post.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
          post.content.toLowerCase().includes(searchTerm.toLowerCase())
        )
      );
    });
  }, [searchTerm, posts]);

  const handleSearch = useCallback(
    debounce((value) => setSearchTerm(value), 300),
    []
  );

  if (status === 'loading') {
    return <div className={styles.loading}>Loading...</div>;
  }

  if (status === 'failed') {
    let errorMessage = "An unexpected error occurred.";
    if (error) {
      if (typeof error === 'string') {
        errorMessage = error;
      } else if (typeof error === 'object' && error.detail) {
        errorMessage = error.detail;
      }
    }
    return <div className={styles.error}>Error: {errorMessage}</div>;
  }

  return (
    <div className={styles.blogContainer}>
      <motion.h1 
        className={styles.title}
        initial={{ opacity: 0, y: -50 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
      >
        Blog Posts
      </motion.h1>
      <SearchBar onSearch={handleSearch} />
      {isPending ? (
        <div className={styles.loading}>Updating...</div>
      ) : (
        <Masonry
          breakpointCols={breakpointColumnsObj}
          className={styles.masonryGrid}
          columnClassName={styles.masonryColumn}
        >
          {filteredPosts.map((post, index) => (
            <motion.div
              key={post.id}
              initial={{ opacity: 0, y: 50 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
            >
              <BlogCard post={post} />
            </motion.div>
          ))}
        </Masonry>
      )}
    </div>
  );
};

export default BlogPage;
