import React from 'react';
import PropTypes from 'prop-types';
import Product from '../Product';
import { Box } from '@material-ui/core';
import './ListProduct.scss'
ListProduct.propTypes = {
    
};

function ListProduct(props) {
    return (
       <Box className='Listproduct'>
        <Product/>
        <Product/>
        <Product/>
        <Product/>
        <Product/>
       </Box>
    );
}

export default ListProduct;