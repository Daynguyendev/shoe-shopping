import React from 'react';
import { Grid } from '@material-ui/core';
import './NewHot.scss'
import { Container } from '@mui/material';
import DetailNewHot from './../DetailNewHot';

function NewHot(props) {

    return (
        <Container disableGutters maxWidth="xl"  >
            <Grid item xs={12} className='new-hot'>
                <Grid item xs={4} sm={4} md={4} lg={4} xl={4}>
                    <hr />
                </Grid>
                <Grid item xs={4} sm={4} md={4} lg={4} xl={4}>
                    <h1>Tin tức</h1>
                </Grid>
                <Grid item xs={4} sm={4} md={4} lg={4} xl={4}>
                    <hr />
                </Grid>
            </Grid>


            <Grid className='tin-tuc'>
                <Grid item xs={12} sm={12} md={12} lg={12} xl={12}>
                    <DetailNewHot />
                </Grid>
                <Grid item xs={12} sm={12} md={12} lg={12} xl={12}>
                    <DetailNewHot />
                </Grid>


            </Grid>
        </Container >
    );
}

export default NewHot;