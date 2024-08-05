import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { fetchProfile } from '../../store/profileSlice';
import styles from './ProfileSection.module.css';

const ProfileSection = () => {
  const dispatch = useDispatch();
  const { profile, status, error } = useSelector((state) => state.profiles);

  useEffect(() => {
    console.log('ProfileSection: Dispatching fetchProfile');
    dispatch(fetchProfile());
  }, [dispatch]);

  useEffect(() => {
    console.log('ProfileSection: State updates', { profile, status, error });
  }, [profile, status, error]);

  if (status === 'loading') return <div>Loading profile...</div>;
  if (status === 'failed') return <div>Error: {error}</div>;

  return (
    <div className={styles.ProfileSection}>
      {profile?.avatar && (
        <img src={profile.avatar} alt={`${profile.username}'s avatar`} className={styles.Avatar} />
      )}
      <h3>{profile?.username}</h3>
      <p>Welcome {profile?.username}</p>
      <p>Bio: {profile?.bio}</p>
    </div>
  );
};

export default ProfileSection;
