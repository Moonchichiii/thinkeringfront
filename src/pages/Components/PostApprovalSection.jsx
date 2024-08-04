import React from 'react';
import { useDispatch } from 'react-redux';
import { approvePost, rejectPost } from '../../store/dashboardSlice';
import styles from './PostApprovalSection.module.css';

const PostApprovalSection = ({ posts }) => {
  const dispatch = useDispatch();

  const handleApprove = (postId) => {
    dispatch(approvePost(postId));
  };

  const handleReject = (postId) => {
    dispatch(rejectPost(postId));
  };

  return (
    <div className={styles.postApproval}>
      <h2>Posts Awaiting Approval</h2>
      <ul>
        {posts.map(post => (
          <li key={post.id}>
            <h3>{post.title}</h3>
            <p>{post.excerpt}</p>
            <button onClick={() => handleApprove(post.id)}>Approve</button>
            <button onClick={() => handleReject(post.id)}>Reject</button>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default PostApprovalSection;
