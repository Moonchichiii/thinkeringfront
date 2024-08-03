import React from 'react';
import { Link } from 'react-router-dom';
import styles from './PopularProfilesSection.module.css';

const PopularProfilesSection = ({ profiles = [] }) => {
  return (
    <div className={styles.popularProfiles}>
      <h2>Popular Profiles</h2>
      <ul>
        {profiles.map(profile => (
          <li key={profile.id}>
            <Link to={`/profile/${profile.id}`}>
              <img src={profile.avatar} alt={profile.username} />
              <span>{profile.username}</span>
              <span>{profile.postCount} posts</span>
            </Link>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default PopularProfilesSection;
