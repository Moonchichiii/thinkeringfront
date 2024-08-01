import React from 'react';
import styles from './NotificationsSection.module.css';

const NotificationsSection = ({ notifications }) => {  
  return (
    <div className={styles.NotificationsSection}>
      <h2>Recent Activities (Notifications)</h2>
      {notifications.map((notification) => (
        <div className={styles.Notification} key={notification.id}>
          <p>{notification.content}</p>
        </div>
      ))}
    </div>
  );
};

export default NotificationsSection;
