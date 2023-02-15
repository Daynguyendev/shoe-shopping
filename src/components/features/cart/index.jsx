import React from 'react';
import Container from '@mui/material/Container';
import Grid from '@mui/material/Grid';
import ListItem from './component/ListItem'
import Pay from './component/Pay'
import './Cart.scss';
function Cart(props) {
    return (
        <Container container="true" disableGutters maxWidth='xl'>
            <Grid className='full-cart' minHeight='600px'>
                <Grid item xs={12} sm={12} lg={8} xl={8} className='list-item'>
                    <ListItem />
                </Grid>

                <Grid item xs={12} sm={12} lg={4} xl={4} className='pay'>
                    <Pay />
                </Grid>

            </Grid>
        </Container >
    );
}

export default Cart;