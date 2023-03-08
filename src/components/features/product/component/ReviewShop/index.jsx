import './home.scss'
import React from 'react';
import image from '../../../../images/image'
import { Slide } from 'react-slideshow-image';
import 'react-slideshow-image/dist/styles.css'
import { Container } from '@mui/material';
import { Grid } from '@mui/material';

function ReviewShop(props) {
    return (
        <Container disableGutters maxWidth="xl" sx={{
            paddingBottom: '30px'
        }} >
            <Slide>
                {
                    image.map((image, index) => (
                        <Grid item xs={12} sm={6} md={4} lg={3} xl={12} key={index} className="each-slide-effect" >
                            <img src={image.url} key={index} alt={image.title} />
                        </Grid>
                    ))
                }
            </Slide>
        </Container>
    );
}

export default ReviewShop;