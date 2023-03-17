import React from 'react';
import Container from '@mui/material/Container';
import Grid from '@mui/material/Grid';
import ListItem from './component/ListItem'
import Pay from './component/Pay'
import './Cart.scss';
import { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import cartAPI from '../../API/cartAPI'
import { useSelector } from 'react-redux';
import userAPI from '../../API/userAPI';
import { useLayoutEffect } from 'react';

function Cart(props) {
    let { id } = useParams();
    const [isLoading, setIsLoading] = useState(true);
    const [cart, setCart] = useState();
    let User = JSON.parse(localStorage.getItem('cart')) || [];
    const dataUser = User || [];
    const [itemNotLogin, setItemNotLogin] = useState(dataUser);

    const [idUser, setIdUser] = useState(null);
    let email_khach_hang = useSelector((state) => state?.user?.user?.email_khach_hang);
    const isLogin = useSelector((state) => state?.user.isLogin);

    useLayoutEffect(() => {
        window.scrollTo(0, 0);
    }, []);


    useEffect(() => {
        try {
            const fetchIdUser = async () => {
                if (isLogin) {
                    const res = await userAPI.getID({ email_khach_hang: email_khach_hang });
                    setIdUser(res.data.data[0]?.id_khach_hang)
                }
            };
            fetchIdUser();
        } catch (error) {
            console.log('Failed to fetch idUser: ', error);
        }
    }, []);

    useEffect(() => {
        if (idUser) {
            handleAddCartDb()
            console.log('ta iduser dumtao', idUser)
        }
    }, [idUser])

    const handleAddCartDb = async () => {

        for (const item of dataUser) {
            const results = await cartAPI.updateQuantity({
                id_khach_hang: idUser,
                id_sp: item.id_sp,
                id_mau_sac: item.id_mau_sac,
                id_kich_thuoc: item.id_kich_thuoc,
                so_luong: item.so_luong,
            })

        }
        localStorage.removeItem('cart');
        const result = await cartAPI.getDetail(id);
        setCart(result.data.data);
    }

    useEffect(() => {
        try {
            const fetchCart = async () => {
                if (cart !== null) {
                    const result = await cartAPI.getDetail(id);
                    setCart(result.data.data);
                    setIsLoading(false)
                }
            };
            fetchCart();
        } catch (error) {
            console.log('Failed to fetch Cart: ', error);
        }
    }, [setIsLoading]);
    console.log('Cart', cart);

    return (
        <Container container="true" disableGutters maxWidth='xl'>
            <Grid className='full-cart' minHeight='600px'>
                <Grid item xs={12} sm={12} lg={8} xl={8} className='list-item'>
                    <ListItem cart={cart} setCart={setCart} setItemNotLogin={setItemNotLogin} isLoading={isLoading} />
                </Grid>

                <Grid item xs={12} sm={12} lg={4} xl={4} className='pay'>
                    <Pay itemNotLogin={itemNotLogin} cart={cart} setCart={setCart} isLoading={isLoading} />
                </Grid>

            </Grid>
        </Container >
    );
}

export default Cart;