import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { fetchPosts } from '../../store/postSlice';
import BlogPostSlider from '../Components/BlogPostSlider';
import PostApprovalSection from '../Components/PostApprovalSection';
import Alert from '../../components/Alert/Alert';
import styles from './Dashboard.module.css';

const Dashboard = () => {
  const dispatch = useDispatch();
  const { posts, status, error } = useSelector((state) => state.posts);

  useEffect(() => {
    console.log('Dashboard: Dispatching fetchPosts');
    dispatch(fetchPosts()); // Dispatch the action to fetch posts
  }, [dispatch]);

  useEffect(() => {
    console.log('Dashboard: State updates', { posts, status, error });
  }, [posts, status, error]);

  if (status === 'loading') return <div className={styles.loading}>Loading...</div>;
  if (status === 'failed') return <div className={styles.error}>Error loading posts: {error}</div>;

  return (
    <div className={styles.dashboardContainer}>
      <h1>dASHBOARD!!!</h1>
      <Alert />
      <div className={styles.mainContent}>
        <BlogPostSlider posts={posts} />
      </div>
      <div className={styles.sidebar}>
        <PostApprovalSection posts={posts.filter(post => !post.approved)} />
      </div>
    </div>
  );
};

export default Dashboard;
