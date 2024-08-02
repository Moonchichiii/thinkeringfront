import React, { useState, useCallback } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { NavLink, Link } from 'react-router-dom';
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
  const { user, isAuthenticated } = useSelector((state) => state.auth);
  const profile = user?.profile;

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
    handleModalOpen('Sign In', 
      <SignInForm
        switchToRegister={() => handleModalOpen('Sign Up', 
          <SignUpForm switchToLogin={handleSignIn} closeModal={handleModalClose} />
        )}
        closeModal={handleModalClose}
      />
    );
  }, [handleModalOpen, handleModalClose]);

  const handleSignUp = useCallback(() => {
    handleModalOpen('Sign Up', 
      <SignUpForm switchToLogin={handleSignIn} closeModal={handleModalClose} />
    );
  }, [handleModalOpen, handleModalClose, handleSignIn]);

  const handleLogout = () => dispatch(logoutUser());

  const navItems = [
    { to: '/home', label: 'Home' },
    { to: '/about', label: 'About' },
    { to: '/blog', label: 'Blog' },
    ...(isAuthenticated ? [{ to: '/dashboard', label: 'Dashboard' }] : []),
  ];

  const userMenuItems = [
    { to: `/profiles/${user?.id}`, label: 'Profile' },
    { to: `/profiles/${user?.id}`, label: 'My account' },
    { onClick: handleLogout, label: 'Logout' },
  ];

  const renderMenu = (items, mobile = false) => (
    items.map((item) => (
      <MenuItem key={item.label} onClick={handleCloseNavMenu}>
        <NavLink to={item.to} className={mobile ? styles.mobileNavLink : styles.navLink}>
          {item.label}
        </NavLink>
      </MenuItem>
    ))
  );

  const renderUserMenu = () => (
    <Menu
      id="menu-appbar-user"
      anchorEl={anchorElUser}
      anchorOrigin={{ vertical: 'top', horizontal: 'right' }}
      keepMounted
      transformOrigin={{ vertical: 'top', horizontal: 'right' }}
      open={Boolean(anchorElUser)}
      onClose={handleCloseUserMenu}
      PaperProps={{
        sx: {
          backgroundColor: 'rgba(52, 73, 94, 0.9)',
          backdropFilter: 'blur(10px)',
          color: 'white',
        },
      }}
    >
      {userMenuItems.map((item) => (
        <MenuItem key={item.label} onClick={item.onClick || handleCloseUserMenu}>
          {item.to ? (
            <Link to={item.to} className={styles.menuItemLink}>
              {item.label}
            </Link>
          ) : item.label}
        </MenuItem>
      ))}
    </Menu>
  );

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
          {/* Mobile view */}
          <Box sx={{ display: { xs: 'flex', md: 'none' }, flexGrow: 1, alignItems: 'center', justifyContent: 'space-between' }}>
            <IconButton
              size="large"
              aria-label="account of current user"
              aria-controls="menu-appbar"
              aria-haspopup="true"
              onClick={handleOpenNavMenu}
              color="inherit"
            >
              <MenuIcon />
            </IconButton>
            <Menu
              id="menu-appbar"
              anchorEl={anchorElNav}
              anchorOrigin={{ vertical: 'bottom', horizontal: 'left' }}
              keepMounted
              transformOrigin={{ vertical: 'top', horizontal: 'left' }}
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
              {renderMenu(navItems, true)}
            </Menu>
            <Tooltip title="Open settings">
              <IconButton onClick={handleOpenUserMenu} sx={{ p: 0 }}>
                {profile?.avatar ? (
                  <Avatar alt={profile.username} src={profile.avatar} />
                ) : (
                  <Avatar><AccountCircle /></Avatar>
                )}
              </IconButton>
            </Tooltip>
            {renderUserMenu()}
          </Box>

          {/* Desktop view */}
          <Box sx={{ flexGrow: 1, display: { xs: 'none', md: 'flex' } }}>
            {navItems.map((item) => (
              <NavLink key={item.label} to={item.to} className={styles.navLink}>
                {item.label}
              </NavLink>
            ))}
          </Box>

          <Box sx={{ flexGrow: 0, display: { xs: 'none', md: 'flex' } }}>
            {!isAuthenticated ? (
              <>
                <Button className={styles.signIn} onClick={handleSignIn}>Sign In</Button>
                <Button className={styles.signUp} onClick={handleSignUp}>Sign Up</Button>
              </>
            ) : (
              <Tooltip title="Open settings">
                <IconButton onClick={handleOpenUserMenu} sx={{ p: 0 }}>
                  {profile?.avatar ? (
                    <Avatar alt={profile.username} src={profile.avatar} />
                  ) : (
                    <Avatar><AccountCircle /></Avatar>
                  )}
                </IconButton>
              </Tooltip>
            )}
            {renderUserMenu()}
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
