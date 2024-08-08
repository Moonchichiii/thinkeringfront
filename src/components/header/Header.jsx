import React, { useState, useCallback, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { NavLink, useNavigate } from 'react-router-dom';
import { AppBar, Toolbar, Container, Box, IconButton, Button, Tooltip, Menu, MenuItem, Avatar } from '@mui/material';
import { AccountCircle, Menu as MenuIcon } from '@mui/icons-material';
import { logoutUser } from '../../store/authSlice';
import MultiModal from '../Modal/Modal';
import SignInForm from '../../pages/Auth/SignInForm';
import SignUpForm from '../../pages/Auth/SignUpForm';
import styles from './Header.module.css';

const Header = ({ scrolled }) => {
  const [anchorElNav, setAnchorElNav] = useState(null);
  const [anchorElUser, setAnchorElUser] = useState(null);
  const [modalState, setModalState] = useState({ show: false, title: '', content: null });

  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { isAuthenticated, user } = useSelector((state) => state.auth);
  const profile = useSelector((state) => state.profiles.profile);

  useEffect(() => {
    if (isAuthenticated) {
      handleModalClose();
      navigate('/dashboard');
    }
  }, [isAuthenticated, navigate]);

  const handleOpenNavMenu = (event) => setAnchorElNav(event.currentTarget);
  const handleOpenUserMenu = (event) => setAnchorElUser(event.currentTarget);
  const handleCloseNavMenu = () => setAnchorElNav(null);
  const handleCloseUserMenu = () => setAnchorElUser(null);

  const handleModalOpen = useCallback((title, content) => {
    setModalState({ show: true, title, content });
  }, []);

  const handleModalClose = useCallback(() => {
    setModalState({ show: false, title: '', content: null });
  }, []);

  const handleSignIn = useCallback(() => {
    handleModalOpen('Sign In', <SignInForm closeModal={handleModalClose} />);
  }, [handleModalOpen, handleModalClose]);

  const handleSignUp = useCallback(() => {
    handleModalOpen('Sign Up', <SignUpForm closeModal={handleModalClose} />);
  }, [handleModalOpen, handleModalClose]);

  const handleLogout = () => {
    dispatch(logoutUser());
    navigate('/');
  };

  const navItems = [
    { to: '/home', label: 'Home' },
    { to: '/about', label: 'About' },
    { to: '/blog', label: 'Blog' },
    ...(isAuthenticated ? [{ to: '/dashboard', label: 'Dashboard' }] : []),
  ];

  const renderMenu = (items) =>
    items.map((item) => (
      <MenuItem key={item.label} onClick={handleCloseNavMenu}>
        <NavLink to={item.to} className={styles.navLink}>
          {item.label}
        </NavLink>
      </MenuItem>
    ));

  return (
    <AppBar
      position="fixed"
      sx={{
        backgroundColor: scrolled ? 'rgba(52, 73, 94, 0.8)' : 'transparent',
        backdropFilter: scrolled ? 'blur(10px)' : 'blur(0px)',
        boxShadow: scrolled ? '0 4px 30px rgba(0, 0, 0, 0.1)' : 'none',
        transition: 'all 0.3s ease-in-out',
      }}
    >
      <Container maxWidth="xl">
        <Toolbar disableGutters>
          <Box sx={{ display: { xs: 'flex', md: 'none' }, flexGrow: 1, alignItems: 'center', justifyContent: 'space-between' }}>
            <IconButton size="large" onClick={handleOpenNavMenu} color="inherit">
              <MenuIcon />
            </IconButton>
            <Menu
              anchorEl={anchorElNav}
              open={Boolean(anchorElNav)}
              onClose={handleCloseNavMenu}
              sx={{
                display: { xs: 'block', md: 'none' },
                '& .MuiPaper-root': {
                  backgroundColor: 'rgba(52, 73, 94, 0.9)',
                  backdropFilter: 'blur(10px)',
                  color: 'white',
                },
              }}
            >
              {renderMenu(navItems)}
            </Menu>
            {isAuthenticated ? (
              <>
                <Tooltip title="Open settings">
                  <IconButton onClick={handleOpenUserMenu} sx={{ p: 0 }}>
                    {profile?.avatar ? (
                      <Avatar alt={profile.username} src={profile.avatar} />
                    ) : (
                      <Avatar><AccountCircle /></Avatar>
                    )}
                  </IconButton>
                </Tooltip>
                <Menu
                  anchorEl={anchorElUser}
                  open={Boolean(anchorElUser)}
                  onClose={handleCloseUserMenu}
                  sx={{
                    '& .MuiPaper-root': {
                      backgroundColor: 'rgba(52, 73, 94, 0.9)',
                      backdropFilter: 'blur(10px)',
                      color: 'white',
                    },
                  }}
                >
                  <MenuItem onClick={handleCloseUserMenu}>
                    <NavLink to={`/profiles/${user?.id}`} className={styles.menuItemLink}>
                      Profile
                    </NavLink>
                  </MenuItem>
                  <MenuItem onClick={handleLogout}>
                    <span className={styles.menuItemLink}>Logout</span>
                  </MenuItem>
                </Menu>
              </>
            ) : (
              <>
                <Button className={styles.signIn} onClick={handleSignIn}>Sign In</Button>
                <Button className={styles.signUp} onClick={handleSignUp}>Sign Up</Button>
              </>
            )}
          </Box>

          <Box sx={{ flexGrow: 1, display: { xs: 'none', md: 'flex' } }}>
            {navItems.map((item) => (
              <NavLink key={item.label} to={item.to} className={styles.navLink}>
                {item.label}
              </NavLink>
            ))}
          </Box>

          <Box sx={{ flexGrow: 0, display: { xs: 'none', md: 'flex' } }}>
            {isAuthenticated ? (
              <>
                <Tooltip title="Open settings">
                  <IconButton onClick={handleOpenUserMenu} sx={{ p: 0 }}>
                    {profile?.avatar ? (
                      <Avatar alt={profile.username} src={profile.avatar} />
                    ) : (
                      <Avatar><AccountCircle /></Avatar>
                    )}
                  </IconButton>
                </Tooltip>
                <Menu
                  anchorEl={anchorElUser}
                  open={Boolean(anchorElUser)}
                  onClose={handleCloseUserMenu}
                  sx={{
                    '& .MuiPaper-root': {
                      backgroundColor: 'rgba(52, 73, 94, 0.9)',
                      backdropFilter: 'blur(10px)',
                      color: 'white',
                    },
                  }}
                >
                  <MenuItem onClick={handleCloseUserMenu}>
                    <NavLink to={`/profiles/${user?.id}`} className={styles.menuItemLink}>
                      Profile
                    </NavLink>
                  </MenuItem>
                  <MenuItem onClick={handleLogout}>
                    <span className={styles.menuItemLink}>Logout</span>
                  </MenuItem>
                </Menu>
              </>
            ) : (
              <>
                <Button className={styles.signIn} onClick={handleSignIn}>Sign In</Button>
                <Button className={styles.signUp} onClick={handleSignUp}>Sign Up</Button>
              </>
            )}
          </Box>
        </Toolbar>
      </Container>
      <MultiModal
        show={modalState.show}
        handleClose={handleModalClose}
        title={modalState.title}
      >
        {modalState.content}
      </MultiModal>
    </AppBar>
  );
};

export default Header;
