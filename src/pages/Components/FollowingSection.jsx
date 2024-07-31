import React from 'react';
import { Link } from 'react-router-dom';
import styles from './FollowingSection.module.css';

const FollowingSection = ({ following }) => {
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
          </li>
        ))}
      </ul>
    </div>
  );
};

export default FollowingSection;