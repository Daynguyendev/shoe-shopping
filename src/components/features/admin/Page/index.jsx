import React from 'react';
import PropTypes from 'prop-types';
import UploadImage from '../components/UploadImage';
import UploadProduct from '../components/UploadProduct';
import AddCategory from '../components/AddCategory';
import AddColor from '../components/AddColor';
import AddDetailImage from '../components/AddDetailImage';
import AddDiscount from '../components/AddDiscount';
import AddSize from '../components/AddSize';
import AddTrademark from '../components/AddTrademark';
import AddProvider from '../components/AddProvider';
import Box from '@mui/material/Box';

Page.propTypes = {

};

function Page(props) {
    return (
        <Box>

            <UploadImage />
            {/* <AddCategory /> */}
            <UploadProduct />
            {/* <AddColor />
            <AddDetailImage />
            <AddSize />
            <AddDiscount />
            <AddTrademark />
            <AddProvider /> */}




        </Box>
    );
}

export default Page;