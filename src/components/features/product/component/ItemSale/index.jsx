import React from 'react';
import Product from '../Product';
import { Grid } from '@material-ui/core';
import './ItemSale.scss'
import { Container } from '@mui/material';
import { Typography } from '@mui/material';

function ItemSale(props) {

    return (
        <Container maxWidth="xl"  >
            <Grid item xs={12} className='title-sp'>
                <Grid item xs={4}>
                    <hr />
                </Grid>
                <Grid item xs={4}>
                    <h1>Sale</h1>
                </Grid>
                <Grid item xs={4}>
                    <hr />
                </Grid>
            </Grid>


            <Grid container spacing={2} >
                <Grid item xs={6} sm={6} md={4} lg={3} xl={3}>
                    <Product />
                </Grid>
                <Grid item xs={6} sm={6} md={4} lg={3} xl={3}>
                    <Product />
                </Grid>
                <Grid item xs={6} sm={6} md={4} lg={3} xl={3}>
                    <Product />
                </Grid>
                <Grid item xs={6} sm={6} md={4} lg={3} xl={3}>
                    <Product />
                </Grid>


            </Grid>
        </Container >
    );
}

export default ItemSale;