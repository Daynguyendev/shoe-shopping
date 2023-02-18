import React from 'react';
import Product from '../Product';
import { Grid } from '@material-ui/core';
import './ItemSale.scss'
import { Container } from '@mui/material';
import { Typography } from '@mui/material';

function ItemSale(props) {

    return (
        <Container disableGutters maxWidth="xl"  >
            <Grid item xs={12} className='item-sale'>
                <Grid item xs={4} sm={4} md={4} lg={4} xl={4}>
                    <hr />
                </Grid>
                <Grid item xs={4} sm={4} md={4} lg={4} xl={4}>
                    <h1>Sale</h1>
                </Grid>
                <Grid item xs={4} sm={4} md={4} lg={4} xl={4}>
                    <hr />
                </Grid>
            </Grid>


            <Grid container spacing={2} className='Listproduct' >
                <Product />



            </Grid>
        </Container >
    );
}

export default ItemSale;