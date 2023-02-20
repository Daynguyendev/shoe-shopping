import React from 'react';
import Container from '@mui/material/Container';
import Grid from '@mui/material/Grid';
import './ListItem.scss';
import Typography from '@mui/material/Typography';
import Product from './../Product'
import { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
// import { unwrapResult } from '@reduxjs/toolkit';
// import { useDispatch } from 'react-redux';
// import { useSnackbar } from 'notistack';
// import { addItem } from '../../cartSlice';
// import { useNavigate } from 'react-router-dom';
import cartAPI from '../../../../API/cartAPI';




function ListItem(props) {
    // const dispatch = useDispatch();
    // const navigate = useNavigate();
    // const { enqueueSnackbar } = useSnackbar();

    // const [open, setOpen] = useState(false);
    // const loggedInUser = useSelector((state) => state.user.current);
    // const isLoggedIn = !!loggedInUser.customer_id;
    let { id } = useParams();

    // const handleAddSubmit = async (data) => {
    //     try {
    //         if (open) setOpen(true);
    //         else {
    //             const AddItemAction = addItem({
    //                 id_sp: data.id_sp,
    //                 so_luong: data.so_luong,
    //             });
    //             const resultAddItemAction = await dispatch(AddItemAction);
    //             // do some thing here on login successfully
    //             // const cart = unwrapResult(resultAddItemAction);
    //             // enqueueSnackbar('🛒 Sản phẩm được thêm vào giỏ hàng', {
    //             //     variant: 'default',
    //             //     autoHideDuration: 1000,
    //             // });
    //             console.log(cart);
    //         }
    //     } catch (error) {
    //         // enqueueSnackbar(error.message, { variant: 'error', autoHideDuration: 1000 });
    //         console.log(error.message);
    //     }
    // };


    const [cart, setCart] = useState([]);
    useEffect(() => {
        try {
            const fetchCart = async () => {
                if (cart !== null) {
                    const result = await cartAPI.getAll(id);
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