import React from 'react';
import { Box, Button, Typography, Modal } from '@mui/material';
import styles from './Modal.module.css';

const MultiModal = ({ show, handleClose, title, children }) => {
  return (
    <Modal
      open={show}
      onClose={handleClose}
      aria-labelledby="modal-title"
      aria-describedby="modal-description"
    >
      <Box className={styles.modalContainer}>
        <Typography id="modal-title" variant="h6" component="h2" className={styles.modalTitle}>
          {title}
        </Typography>
        <Box id="modal-description" sx={{ mt: 2 }} className={styles.modalDescription}>
          {children}
        </Box>
        <Box className={styles.modalButtonContainer}>
          <Button variant="contained" onClick={handleClose} className={styles.closeButton}>
            Close
          </Button>
        </Box>
      </Box>
    </Modal>
  );
};

export default MultiModal;