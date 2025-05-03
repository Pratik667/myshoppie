import React, { createContext, useContext, useState } from 'react';

// Create a context for the drawer state
const NavDrawerContext = createContext();

export const useDrawerContext = () => {
  return useContext(NavDrawerContext);
};

export const DrawerProvider = ({ children }) => {
  const [drawerOpen, setDrawerOpen] = useState(false);

  const toggleDrawer = () => {
    setDrawerOpen(prevState => !prevState);
  };

  return (
    <NavDrawerContext.Provider value={{ drawerOpen, toggleDrawer }}>
      {children}
    </NavDrawerContext.Provider>
  );
};
