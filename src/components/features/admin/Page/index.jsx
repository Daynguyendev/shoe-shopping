import React from 'react';
import PropTypes from 'prop-types';
import UploadImage from '../components/UploadImage';
import UploadProduct from '../components/UploadProduct';
import Box from '@mui/material/Box';

Page.propTypes = {

};

function Page(props) {
    return (
        <Box>

            <UploadImage />
            <UploadProduct />

        </Box>
    );
}

export default Page;