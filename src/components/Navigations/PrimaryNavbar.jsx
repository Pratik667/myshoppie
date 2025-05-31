import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { fetchWishlist } from '../GlobalStore/wishlistActions';
import { fetchCart } from '../GlobalStore/cartActions';
import {
  AppBar,
  Box,
  Toolbar,
  IconButton,
  InputBase,
  BottomNavigation,
  BottomNavigationAction,
} from "@mui/material";
import logo from "../../assets/logo.svg";
import FavoriteBorderIcon from "@mui/icons-material/FavoriteBorder";
import ShoppingCartIcon from "@mui/icons-material/ShoppingCart";
import AccountCircleIcon from "@mui/icons-material/AccountCircle";
import HomeIcon from "@mui/icons-material/Home";
import MenuIcon from "@mui/icons-material/Menu";
import PriorityHighIcon from '@mui/icons-material/PriorityHigh';
import Badge from '@mui/material/Badge';
import { Link } from "react-router-dom";
import { useDrawerContext } from "./NavDrawerContext"; // Import context

const PrimaryNavbar = () => {
  const { toggleDrawer } = useDrawerContext(); // Access context to toggle drawer state
  const dispatch = useDispatch();
  const { items } = useSelector((state) => state.wishlist);
  const { cartItems } = useSelector((state) => state.cart);
  useEffect(() => {
    dispatch(fetchWishlist());
    dispatch(fetchCart());
  }, [dispatch]);

  return (
    <nav className="primary-nav">
      {/* Top Navbar (Desktop) */}
      <AppBar
        position="static"
        sx={{ backgroundColor: "#333" }}
        className="AppBar"
      >
        <Toolbar
          sx={{
            justifyContent: "space-between",
            display: { xs: "none", sm: "flex" },
          }}
        >
          {/* Logo/Home */}
          <Box>
            <IconButton
              color="inherit"
              style={{ background: "none" }}
              component={Link}
              to="/"
            >
              <img
                src={logo}
                alt="Logo"
                style={{ width: "100px", height: "auto" }}
              />
            </IconButton>
          </Box>

          {/* Search Bar (Desktop Only) */}
          <Box
            sx={{
              display: { xs: "none", sm: "flex" },
              alignItems: "center",
              backgroundColor: "#fff",
              borderRadius: 2,
              px: 1,
            }}
          >
            <InputBase placeholder="Search products" sx={{ ml: 1, flex: 1 }} />
          </Box>

          {/* Wishlist, Cart, Account Icons */}
          <Box>
            <IconButton
              color="inherit"
              component={Link}
              to="/wishlist"
              className="desktop-nav-icons"
            >
              <Badge badgeContent={items.items ? items.items.length : <PriorityHighIcon style={{ fontSize: "12px", color: "#fff" }} />} color="error">
                <FavoriteBorderIcon />
              </Badge>
            </IconButton>
            <IconButton
              color="inherit"
              component={Link}
              to="/cart"
              className="desktop-nav-icons"
            >
              <Badge badgeContent={cartItems.items ? cartItems.items.length : <PriorityHighIcon style={{ fontSize: "12px", color: "#fff" }} />} color="error">
                <ShoppingCartIcon />
              </Badge>
            </IconButton>
            <IconButton
              color="inherit"
              component={Link}
              to="/accounts"
              className="desktop-nav-icons"
            >
              <AccountCircleIcon />
            </IconButton>
          </Box>
        </Toolbar>
      </AppBar>

      {/* Bottom Navbar (Mobile) */}
      <Box
        className="bottom-nav-box"
        sx={{
          display: { xs: "flex", sm: "none" },
          position: "fixed",
          bottom: 0,
          left: 0,
          right: 0,
        }}
      >
        <BottomNavigation showLabels className="bottom-navigation">
          <BottomNavigationAction
            label="Home"
            icon={<HomeIcon />}
            component={Link}
            to="/"
          />
          <BottomNavigationAction
            label="Cart"
            icon={
              <Badge badgeContent={cartItems.items ? cartItems.items.length : <PriorityHighIcon style={{ fontSize: "12px", color: "#fff" }} />} color="error">
                <ShoppingCartIcon />
              </Badge>
            }
            component={Link}
            to="/cart"
          />

          <BottomNavigationAction
            label="Category"
            onClick={toggleDrawer}
            icon={<MenuIcon />}
          />
          {/* Toggle Drawer */}
          <BottomNavigationAction
            label="Wishlist"
            icon={
              <Badge badgeContent={items.items ? items.items.length : <PriorityHighIcon style={{ fontSize: "12px", color: "#fff" }} />} color="error">
                <FavoriteBorderIcon />
              </Badge>
            }
            component={Link}
            to="/wishlist"
          />
          <BottomNavigationAction
            label="Account"
            icon={<AccountCircleIcon />}
            component={Link}
            to="/accounts"
          />
        </BottomNavigation>
      </Box>
    </nav>
  );
};

export default PrimaryNavbar;
