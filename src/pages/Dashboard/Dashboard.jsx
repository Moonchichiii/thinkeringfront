import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { fetchDashboardData } from '../../store/dashboardSlice';
import ProfileSection from '../Components/ProfileSection';
import NotificationsSection from '../Components/NotificationsSection';
import LatestPostsSection from '../Components/LatestPostsSection';
import PopularProfilesSection from '../Components/PopularProfilesSection';
import TopRatedPostsSection from '../Components/TopRatedPostsSection';
import PostApprovalSection from '../Components/PostApprovalSection';
import FollowingSection from '../Components/FollowingSection';
import BlogPostSlider from '../Components/BlogPostSlider';
import Alert from '../../components/Alert/Alert';
import styles from './Dashboard.module.css';

const Dashboard = () => {
  const dispatch = useDispatch();
  const { profile, notifications, posts, popularProfiles, topRatedPosts, postsForApproval, following, status, error } = useSelector((state) => state.dashboard);
  const { user } = useSelector((state) => state.auth);

  useEffect(() => {
    dispatch(fetchDashboardData());
  }, [dispatch]);
  useEffect(() => {
    console.log('Profile:', profile);
    console.log('Notifications:', notifications);
    console.log('Posts:', posts);
    console.log('Popular Profiles:', popularProfiles);
    console.log('Top Rated Posts:', topRatedPosts);
    console.log('Posts for Approval:', postsForApproval);
    console.log('Following:', following);
    console.log('Status:', status);
    console.log('Error:', error);
  }, [profile, notifications, posts, popularProfiles, topRatedPosts, postsForApproval, following, status, error]);

  if (status === 'failed') {
    return <div className={styles.error}>Error loading dashboard data: {error}</div>;
  }

  if (status === 'loading') {
    return <div className={styles.loading}>Loading...</div>;
  }

  if (status === 'failed') {
    return <div className={styles.error}>Error loading dashboard data: {error}</div>;
  }

  return (
    <div className={styles.dashboardContainer}>
      <Alert />
      <div className={styles.mainContent}>
        <ProfileSection profile={profile} />
        <NotificationsSection notifications={notifications} />
        <LatestPostsSection posts={posts} />
        <BlogPostSlider posts={posts} />
      </div>
      <div className={styles.sidebar}>
        <PopularProfilesSection profiles={popularProfiles} />
        <TopRatedPostsSection posts={topRatedPosts} />
        <FollowingSection following={following} />
        {user.isSuperUser && <PostApprovalSection posts={postsForApproval} />}
      </div>
    </div>
  );
};

export default Dashboard;
