import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { fetchFollowing, followProfile, unfollowProfile } from '../../store/followingSlice';
import { Link } from 'react-router-dom';
import styles from './FollowingSection.module.css';

const FollowingSection = () => {
  const dispatch = useDispatch();
  const { following, status, error } = useSelector((state) => state.following);

  useEffect(() => {
    dispatch(fetchFollowing());
  }, [dispatch]);

  const handleFollow = (profileId) => {
    dispatch(followProfile(profileId));
  };

  const handleUnfollow = (profileId) => {
    dispatch(unfollowProfile(profileId));
  };

  console.log('following:', following);
  console.log('status:', status);
  console.log('error:', error);

  if (status === 'loading') {
    return <div>Loading...</div>;
  }

  if (status === 'failed') {
    return <div>Error: {error}</div>;
  }

  return (
    <div className={styles.following}>
      <h2>Following</h2>
      <ul>
        {following.map(profile => (
          <li key={profile.id}>
            <Link to={`/profile/${profile.id}`}>
              <img src={profile.avatar} alt={profile.username} />
              <span>{profile.username}</span>
            </Link>
            <button onClick={() => handleUnfollow(profile.id)}>Unfollow</button>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default FollowingSection;
