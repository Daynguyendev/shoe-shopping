import React from 'react';
import PropTypes from 'prop-types';
import Product from '../Product';
import { Box } from '@material-ui/core';
import { Grid } from '@material-ui/core';
import './ListProduct.scss'
import { Container } from '@mui/material';
import { Typography } from '@material-ui/core';


ListProduct.propTypes = {

};

function ListProduct(props) {

    return (
        <Container maxWidth="xl"  >
            <Grid container spacing={2} >
                <Grid item xs={12} sm={6} md={4} lg={3} xl={3}>
                    <Product />
                </Grid>
                <Grid item xs={12} sm={6} md={4} lg={3} xl={3}>
                    <Product />
                </Grid>
                <Grid item xs={12} sm={6} md={4} lg={3} xl={3}>
                    <Product />
                </Grid>
                <Grid item xs={12} sm={6} md={4} lg={3} xl={3}>
                    <Product />
                </Grid>
                <Grid item xs={12} sm={6} md={4} lg={3} xl={3}>
                    <Product />
                </Grid>
                <Grid item xs={12} sm={6} md={4} lg={3} xl={3}>
                    <Product />
                </Grid>
                <Grid item xs={12} sm={6} md={4} lg={3} xl={3}>
                    <Product />
                </Grid>
                <Grid item xs={12} sm={6} md={4} lg={3} xl={3}>
                    <Product />
                </Grid>
                <Grid item xs={12} sm={6} md={4} lg={3} xl={3}>
                    <Product />
                </Grid>
                <Grid item xs={12} sm={6} md={4} lg={3} xl={3}>
                    <Product />
                </Grid>
                <Grid item xs={12} sm={6} md={4} lg={3} xl={3}>
                    <Product />
                </Grid>
                <Grid item xs={12} sm={6} md={4} lg={3} xl={3}>
                    <Product />
                </Grid>
                <Grid item xs={12} sm={6} md={4} lg={3} xl={3}>
                    <Product />
                </Grid>
                <Grid item xs={12} sm={6} md={4} lg={3} xl={3}>
                    <Product />
                </Grid>
                <Grid item xs={12} sm={6} md={4} lg={3} xl={3}>
                    <Product />
                </Grid>
                <Grid item xs={12} sm={6} md={4} lg={3} xl={3}>
                    <Product />
                </Grid>
                <Grid item xs={12} sm={6} md={4} lg={3} xl={3}>
                    <Product />
                </Grid>
                <Grid item xs={12} sm={6} md={4} lg={3} xl={3}>
                    <Product />
                </Grid>

            </Grid>
        </Container>
    );
}

export default ListProduct;