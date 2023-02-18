import React from 'react';
import PropTypes from 'prop-types';
import Container from '@mui/material/Container';
import Grid from '@mui/material/Grid';
import Box from '@mui/material/Box';
import './ListItem.scss';
import Typography from '@mui/material/Typography';
import Product from './../Product'
import { useState, useEffect } from 'react';
import cartAPI from '../../../../API/cartAPI';

ListItem.propTypes = {

};




function ListItem(props) {

    const [cart, setCart] = useState([]);
    useEffect(() => {
        try {
            const fetchCart = async () => {
                if (cart !== null) {
                    const result = await cartAPI.getAll();
                    setCart(result.data.data);
                    console.log(result.data.data)
                }
            };
            fetchCart();
        } catch (error) {
            console.log('Failed to fetch Cart: ', error);
        }
    }, []);


    return (
        <Container disableGutters maxWidth='xl'>


            <Grid className='root-cart-header'>
                <Grid item xs={6} lg={6} xl={6}>
                    <Typography sx={{ fontFamily: 'Jura' }}>Sản phẩm</Typography>

                </Grid>
                <Grid item xs={3} lg={2} xl={2}>
                    <Typography sx={{ fontFamily: 'Jura' }}>Đơn giá</Typography>

                </Grid>
                <Grid item xs={3} lg={2} xl={2}>

                    <Typography sx={{ fontFamily: 'Jura' }}>Số lượng</Typography>

                </Grid>

                <Grid item xs={0} lg={2} xl={2} sx={{ display: { xs: 'none', xl: 'flex' } }}>
                    <Typography sx={{ fontFamily: 'Jura' }}>Thành tiền</Typography>

                </Grid>


            </Grid>
            <hr />





            {cart.map((item, index) => (
                <Grid item xs={12} className='root-cart' key={index} >
                    <Grid item xs={6} lg={6} xl={6} >
                        <Product />

                    </Grid>
                    <Grid item xs={3} lg={2} xl={2}>
                        <Typography sx={{ fontFamily: 'Jura' }}>270.000</Typography>

                    </Grid>
                    <Grid item xs={3} lg={2} xl={2} >

                        <Typography sx={{ fontFamily: 'Jura' }}>2</Typography>


                    </Grid>

                    <Grid item xs={2} lg={2} xl={2} sx={{ display: { xs: 'none', xl: 'flex' } }}>
                        <Typography sx={{ fontFamily: 'Jura' }}>540.000</Typography>

                    </Grid>



                </Grid>
            ))}






        </Container >
    );
}

export default ListItem;