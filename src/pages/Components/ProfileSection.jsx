import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { fetchProfile } from '../../store/profileSlice'; // Assuming fetchProfile action exists here
import styles from './ProfileSection.module.css';

const ProfileSection = () => {
  const dispatch = useDispatch();
  const { profile, status, error } = useSelector((state) => state.profiles);

  useEffect(() => {
    dispatch(fetchProfile());
  }, [dispatch]);

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
