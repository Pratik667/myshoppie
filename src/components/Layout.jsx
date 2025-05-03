import React from "react";
import { Outlet } from "react-router-dom";
import { DrawerProvider } from './Navigations/NavDrawerContext';
import SecondaryNavbar from "./Navigations/SecondaryNavbar";
import PrimaryNavbar from "./Navigations/PrimaryNavbar";
import { Container, Box } from '@mui/material';
import Footer from "./Navigations/Footer";

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
            <Footer />
        </Container >
    )
}

export default Layout;