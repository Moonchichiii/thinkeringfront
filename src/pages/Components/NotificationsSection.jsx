  import React, { useEffect } from 'react';
  import { useDispatch, useSelector } from 'react-redux';
  import { fetchNotifications } from '../../store/notificationSlice';
  import styles from './NotificationsSection.module.css';

  const NotificationsSection = () => {
    const dispatch = useDispatch();
    const { notifications, status, error } = useSelector((state) => state.notifications);

    useEffect(() => {
      dispatch(fetchNotifications());
    }, [dispatch]);

    if (status === 'loading') return <div>Loading notifications...</div>;
    if (status === 'failed') return <div>Error: {error}</div>;

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
