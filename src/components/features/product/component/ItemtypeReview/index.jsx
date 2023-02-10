import React from 'react';
import PropTypes from 'prop-types';
import './ItemtypeReview.scss';
import Itemtype from '../Itemtype';
import { Grid } from '@material-ui/core';
import { Container } from '@mui/material';
ItemtypeReview.propTypes = {

};

function ItemtypeReview(props) {
    return (
        <Container maxWidth="xl"  >
            <Grid className='list-img' >
                <Grid item xs={12} sm={12} md={12} lg={12} xl={12}>
                    <Itemtype />
                </Grid>
                <Grid item xs={12} sm={12} md={12} lg={12} xl={12}>
                    <Itemtype />
                </Grid>
            </Grid>
            <Grid className='list-img' >
                <Grid item xs={12} sm={12} md={12} lg={12} xl={12}>
                    <Itemtype />
                </Grid>
                <Grid item xs={12} sm={12} md={12} lg={12} xl={12}>
                    <Itemtype />
                </Grid>
            </Grid>
        </Container>


    );
}

export default ItemtypeReview;