import React from 'react';
import Product from '../Product';
import { Grid } from '@material-ui/core';
import './BestSale.scss'
import { Container } from '@mui/material';
import { Typography } from '@mui/material';
import { useState, useEffect } from 'react';
import productAPI from '../../../../API/productAPI';


function BestSaler({ bestSale, value9 }) {

    return (
        <Container disableGutters maxWidth="xl"  >
            <Grid item xs={12} className='item-bestsale'>
                <Grid item xs={4} sm={4} md={4} lg={4} xl={4}>
                    <hr />
                </Grid>
                <Grid item xs={4} sm={4} md={4} lg={4} xl={4}>
                    <h1 style={{ color: 'red' }}>Sản phẩm bán chạy nhất</h1>
                </Grid>
                <Grid item xs={4} sm={4} md={4} lg={4} xl={4}>
                    <hr />
                </Grid>
            </Grid>
            <Grid container spacing={2} className='ListItembestsale' >
                <Product xs={6} sm={6} md={4} lg={3} xl={3} so_luong={4} BestSaler={bestSale} value9={9} />
            </Grid>
        </Container >
    );
}

export default BestSaler;