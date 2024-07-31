import React, { useState, useEffect, useCallback } from 'react';
import Masonry from 'react-masonry-css';
import { debounce } from 'lodash';
import { motion } from 'framer-motion';
import styles from './BlogPage.module.css';
import SearchBar from '../../components/Searchbar/SearchBar';
import BlogCard from '../../components/Blogcard/BlogCard';

// Assume blogPosts is imported from a separate data file

const BlogPage = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [filteredPosts, setFilteredPosts] = useState(blogPosts);

  const breakpointColumnsObj = {
    default: 3,
    1100: 2,
    700: 1
  };

  useEffect(() => {
    setFilteredPosts(
      blogPosts.filter(post =>
        post.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
        post.excerpt.toLowerCase().includes(searchTerm.toLowerCase())
      )
    );
  }, [searchTerm]);

  const handleSearch = useCallback(
    debounce((value) => setSearchTerm(value), 300),
    []
  );

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
    </div>
  );
};

export default BlogPage;