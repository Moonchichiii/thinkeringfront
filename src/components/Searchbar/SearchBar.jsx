import React, { useEffect, useRef } from 'react';
import gsap from 'gsap';
import Box from '@mui/material/Box';
import TextField from '@mui/material/TextField';
import InputAdornment from '@mui/material/InputAdornment';
import IconButton from '@mui/material/IconButton';
import SearchIcon from '@mui/icons-material/Search';
import styles from './SearchBar.module.css'; // Adjusted import to match CSS module usage

const SearchBar = ({ onSearch }) => {
  const searchBarRef = useRef(null);

  useEffect(() => {
    gsap.fromTo(searchBarRef.current,
      { opacity: 0, y: -50 },
      { opacity: 1, y: 0, duration: 1 }
    );
  }, []);

  return (
    <div ref={searchBarRef} className={styles.searchbar}>
      <Box sx={{ width: '100%', marginBottom: 2, padding: '0 20px' }}>
        <TextField
          fullWidth
          variant="outlined"
          placeholder="Search posts..."
          onChange={onSearch}
          InputProps={{
            endAdornment: (
              <InputAdornment position="end">
                <IconButton>
                  <SearchIcon />
                </IconButton>
              </InputAdornment>
            )
          }}
        />
      </Box>
    </div>
  );
};

export default SearchBar;
