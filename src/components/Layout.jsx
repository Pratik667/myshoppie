import React from "react";
import { Outlet } from "react-router-dom";
import { DrawerProvider } from './NavDrawerContext';
import SecondaryNavbar from "./SecondaryNavbar";
import PrimaryNavbar from "./PrimaryNavbar";
import { Container, Box } from '@mui/material';

import './style.css';

const Layout = () => {
    return (
        <Container id="main-contents" disableGutters maxWidth={false} className="main-contents">
            <DrawerProvider>
                <PrimaryNavbar />
                <SecondaryNavbar />
            </DrawerProvider>
            <Container className="section-container" maxWidth={false} sx={{ marginTop: 4, padding: 4 }}>
                <Outlet />
            </Container >
        </Container >
    )
}

export default Layout;