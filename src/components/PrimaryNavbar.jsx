import React from 'react';
import { AppBar, Box, Toolbar, IconButton, InputBase, BottomNavigation, BottomNavigationAction } from '@mui/material';
import logo from '../assets/logo.svg';
import LocationOnIcon from '@mui/icons-material/LocationOn';
import SearchIcon from '@mui/icons-material/Search';
import FavoriteBorderIcon from '@mui/icons-material/FavoriteBorder';
import ShoppingCartIcon from '@mui/icons-material/ShoppingCart';
import AccountCircleIcon from '@mui/icons-material/AccountCircle';
import MenuIcon from '@mui/icons-material/Menu';
import { Link } from 'react-router-dom'; 
import { useDrawerContext } from './NavDrawerContext';  // Import context

const PrimaryNavbar = () => {
  const { toggleDrawer } = useDrawerContext(); // Access context to toggle drawer state

  return (
    <nav className="primary-nav">
      {/* Top Navbar (Desktop) */}
      <AppBar position="static" sx={{ backgroundColor: '#333' }} className='AppBar'>
        <Toolbar sx={{ justifyContent: 'space-between', display: { xs: 'none', sm: 'flex' } }}>
          {/* Logo/Home */}
          <Box>
          <Link to="/">
            <IconButton color="inherit">
              <img src={logo} alt="Logo" style={{ width: '100px', height: 'auto' }} />
            </IconButton>
            </Link>

            {/* Location Icon */}
            <IconButton color="inherit">
              <LocationOnIcon />
            </IconButton>
          </Box>

          {/* Search Bar (Desktop Only) */}
          <Box sx={{ display: { xs: 'none', sm: 'flex' }, alignItems: 'center', backgroundColor: '#fff', borderRadius: 2, px: 1 }}>
            <InputBase placeholder="Search products" sx={{ ml: 1, flex: 1 }} />
            <IconButton type="submit" sx={{ p: 1 }}>
              <SearchIcon />
            </IconButton>
          </Box>

          {/* Wishlist, Cart, Account Icons */}
          <Box>
            <IconButton color="inherit">
              <FavoriteBorderIcon />
            </IconButton>
            <IconButton color="inherit">
              <ShoppingCartIcon />
            </IconButton>
            <IconButton color="inherit">
              <AccountCircleIcon />
            </IconButton>
          </Box>
        </Toolbar>
      </AppBar>

      {/* Bottom Navbar (Mobile) */}
      <Box className='bottom-nav-box' sx={{ display: { xs: 'flex', sm: 'none' }, position: 'fixed', bottom: 0, left: 0, right: 0 }}>
        <BottomNavigation showLabels className='bottom-navigation'>
          <BottomNavigationAction label="Cart" icon={<ShoppingCartIcon />} />
          <BottomNavigationAction label="Location" icon={<LocationOnIcon />} />
          <BottomNavigationAction label="Category" onClick={toggleDrawer} icon={<MenuIcon />} /> {/* Toggle Drawer */}
          <BottomNavigationAction label="Wishlist" icon={<FavoriteBorderIcon />} />
          <BottomNavigationAction label="Account" icon={<AccountCircleIcon />} />
        </BottomNavigation>
      </Box>
    </nav>
  );
};

export default PrimaryNavbar;
