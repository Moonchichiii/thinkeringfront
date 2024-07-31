import React from 'react';
import styles from './ProfileSection.module.css';

const ProfileSection = ({ profile }) => {
  console.log(profile); // Ensure the received profile data is logged correctly

  return (
    <div className={styles.ProfileSection}>
      {profile.avatar && (
        <img src={profile.avatar} alt={`${profile.username}'s avatar`} className={styles.Avatar} />
      )}
      <h3>{profile.username}</h3>
      <p>Welcome {profile.username}</p>
      <p>Bio: {profile.bio}</p>
    </div>
  );
};

export default ProfileSection;
