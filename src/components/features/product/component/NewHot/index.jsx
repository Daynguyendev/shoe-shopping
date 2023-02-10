import React from 'react';
import { Grid } from '@material-ui/core';
import './NewHot.scss'
import { Container } from '@mui/material';
import DetailNewHot from './../DetailNewHot';

function NewHot(props) {

    return (
        <Container maxWidth="xl"  >
            <Grid item xs={12} className='title-sp'>
                <Grid item xs={4}>
                    <hr />
                </Grid>
                <Grid item xs={4}>
                    <h1>Tin tức</h1>
                </Grid>
                <Grid item xs={4}>
                    <hr />
                </Grid>
            </Grid>


            <Grid container spacing={2} >
                <Grid item xs={6} sm={6} md={6} lg={6} xl={6}>
                    <DetailNewHot />
                </Grid>
                <Grid item xs={6} sm={6} md={6} lg={6} xl={6}>
                    <DetailNewHot />
                </Grid>
            </Grid>
        </Container >
    );
}

export default NewHot;