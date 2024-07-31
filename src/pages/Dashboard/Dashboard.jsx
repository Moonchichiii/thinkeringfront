import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { fetchDashboardData } from '../../store/dashboardSlice';
import ProfileSection from './ProfileSection';
import NotificationsSection from './NotificationsSection';
import LatestPostsSection from './LatestPostsSection';
import PopularProfilesSection from './PopularProfilesSection';
import TopRatedPostsSection from './TopRatedPostsSection';
import PostApprovalSection from './PostApprovalSection';
import FollowingSection from './FollowingSection';
import BlogPostSlider from './BlogPostSlider';
import styles from './Dashboard.module.css';

const Dashboard = () => {
  const dispatch = useDispatch();
  const { profile, notifications, posts, popularProfiles, topRatedPosts, postsForApproval, following, status, error } = useSelector((state) => state.dashboard);
  const { user } = useSelector((state) => state.auth);

  useEffect(() => {
    dispatch(fetchDashboardData());
  }, [dispatch]);

  if (status === 'loading') {
    return <div className={styles.loading}>Loading...</div>;
  }

  if (status === 'failed') {
    return <div className={styles.error}>Error loading dashboard data: {error}</div>;
  }

  return (
    <div className={styles.dashboardContainer}>
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