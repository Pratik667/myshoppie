import React, { useEffect, useState } from "react";
import {
  AppBar,
  Box,
  Drawer,
  IconButton,
  List,
  ListItem,
  ListItemText,
  Toolbar,
  InputBase,
  Button,
} from "@mui/material";
import { NavLink } from "react-router-dom";
import SearchIcon from "@mui/icons-material/Search";
import { useDrawerContext } from "./NavDrawerContext"; // Import context

const SecondaryNavbar = () => {
  const { drawerOpen, toggleDrawer } = useDrawerContext(); // Access context to control drawer state

  // State to store links fetched from the JSON file
  const [links, setLinks] = useState([]);

  // Fetch links from JSON file
  useEffect(() => {
    const fetchLinks = async () => {
      try {
        const response = await fetch("/assets/links.json"); // Adjust the path to where you store your JSON file
        const data = await response.json();
        setLinks(data);
      } catch (error) {
        console.error("Error fetching links:", error);
      }
    };

    fetchLinks();
  }, []);

  return (
    <nav className="secondary-nav">
      {/* AppBar */}
      <AppBar position="static" className="AppBar">
        <Toolbar sx={{ justifyContent: "space-between" }}>
          {/* Search Bar (Mobile Only) */}
          <Box
            sx={{
              display: { xs: "flex", sm: "none" },
              alignItems: "center",
              backgroundColor: "#fff",
              borderRadius: 2,
              px: 1,
              flex: 1,
            }}
          >
            <InputBase placeholder="Search products" sx={{ ml: 1, flex: 1 }} />
            <IconButton type="submit" sx={{ p: 1 }}>
              <SearchIcon />
            </IconButton>
          </Box>

          {/* AppBar Links (Desktop) */}
          <Box
            sx={{ display: { xs: "none", sm: "flex" }, gap: 2 }}
            className="navbar-box-links"
          >
            {links.map((link) => (
              <Button
                key={link.label}
                color="inherit"
                component={NavLink}
                to={link.to}
              >
                {link.label}
              </Button>
            ))}
          </Box>
        </Toolbar>
      </AppBar>

      {/* Drawer for extra links on smaller screens */}
      <Drawer
        anchor="left"
        className="drawer-nav"
        open={drawerOpen}
        onClose={toggleDrawer}
      >
        <Box
          sx={{ width: 250 }}
          role="presentation"
          onClick={toggleDrawer}
          onKeyDown={toggleDrawer}
        >
          <List>
            {links.map((link) => (
              <ListItem button key={link.label}>
                <ListItemText>
                  <NavLink to={link.to}>{link.label}</NavLink>
                </ListItemText>
              </ListItem>
            ))}
          </List>
        </Box>
      </Drawer>
    </nav>
  );
};

export default SecondaryNavbar;
