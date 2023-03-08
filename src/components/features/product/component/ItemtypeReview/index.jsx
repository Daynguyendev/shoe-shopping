import React from 'react';
import PropTypes from 'prop-types';
import './ItemtypeReview.scss';
import Itemtype from '../Itemtype';
import { Grid } from '@material-ui/core';
import { Container } from '@mui/material';

function ItemtypeReview({ src, alt }) {
    return (
        <Container disableGutters maxWidth="xl"  >
            <Grid className='list-type' >
                <Grid item xs={12} sm={12} md={12} lg={12} xl={12}>
                    <Itemtype src={"https://raw.githubusercontent.com/DayNguyen22022022/images/main/nike2.jpg"} alt={1} />
                </Grid>
                <Grid item xs={12} sm={12} md={12} lg={12} xl={12}>
                    <Itemtype src={"https://raw.githubusercontent.com/DayNguyen22022022/images/main/adidas1.jpg"} alt={2} />
                </Grid>
            </Grid>
        </Container>
    );
}

export default ItemtypeReview;