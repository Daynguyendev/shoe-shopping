import React from 'react';
import PropTypes from 'prop-types';
import { Box } from '@mui/material';
import Footer from '../../Footer';
import Header from '../../Header';
import { Outlet } from 'react-router-dom';
import './full.scss'

// UserLayout.propTypes = {

// };

function UserLayout() {
    return (

        <Box className='full' >
            <Header />
            <Outlet />
            <Footer />
        </Box>
    );
}

export default UserLayout;