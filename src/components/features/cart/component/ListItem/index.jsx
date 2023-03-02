import React from 'react';
import Container from '@mui/material/Container';
import Grid from '@mui/material/Grid';
import Box from '@mui/material/Box';
import './ListItem.scss';
import Typography from '@mui/material/Typography';
import { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import cartAPI from '../../../../API/cartAPI';
import { useSelector } from 'react-redux';
import userAPI from '../../../../API/userAPI';
import { useNavigate } from 'react-router-dom';
import IconButton from '@mui/material/IconButton';
import AddIcon from '@mui/icons-material/Add';
import RemoveIcon from '@mui/icons-material/Remove';
import DeleteOutlineIcon from '@mui/icons-material/DeleteOutline';
function ListItem({ cart, setCart }) {
    let { id } = useParams();
    let User = JSON.parse(localStorage.getItem('cart')) || [];
    const [items, setItems] = useState([]);
    const isLogin = useSelector((state) => state.user.isLogin);
    const [idUser, setIdUser] = useState();
    let email_khach_hang = useSelector((state) => state?.user?.user?.email_khach_hang);
    const navigate = useNavigate();
    const data = cart || [];
    useEffect(() => {

        try {
            const fetchIdUser = async () => {

                const res = await userAPI.getID({ email_khach_hang: email_khach_hang });
                setIdUser(res.data.data[0]?.id_khach_hang)
                console.log(idUser)


            };
            fetchIdUser();
        } catch (error) {
            console.log('Failed to fetch idUser: ', error);
        }
    }, []);
    useEffect(() => {
        const storedItems = JSON.parse(localStorage.getItem('cart')) || [];
        setItems(storedItems);
    }, []);

    const handleRemove = (id_sp, ten_mau_sac, ten_kich_thuoc) => {

        let cartList = JSON.parse(localStorage.getItem('cart'));
        cartList = cartList.filter(item => (
            item.id_sp !== id_sp ||
            item.ten_mau_sac !== ten_mau_sac ||
            item.ten_kich_thuoc !== ten_kich_thuoc
        ));
        setItems(cartList);


        localStorage.setItem('cart', JSON.stringify(cartList));
    };


    const handleRemoveItemDB = async (id_sp, id_khach_hang, ten_mau_sac, ten_kich_thuoc) => {
        navigate(`/cart/${id_khach_hang}/${id_sp}/${ten_mau_sac}/${ten_kich_thuoc}`)
        const results = await cartAPI.remove({ id_khach_hang, id_sp, ten_mau_sac, ten_kich_thuoc })
        if (results.status === 200) {
            const updatedCart = cart.filter(item => item.id_sp !== id_sp ||
                item.ten_mau_sac !== ten_mau_sac ||
                item.ten_kich_thuoc !== ten_kich_thuoc)
            setCart(updatedCart)
        }


    }
    const handleUpCount = (index, id_sp, id_khach_hang, ten_mau_sac, ten_kich_thuoc, so_luong) => {
        so_luong = so_luong + 1;
        const results = cartAPI.updateQuantityButton({ id_khach_hang, id_sp, ten_mau_sac, ten_kich_thuoc, so_luong })
        const updateCart = [...cart];
        updateCart[index].so_luong = so_luong;
        setCart(updateCart);
    }
    const handleDownCount = async (index, id_sp, id_khach_hang, ten_mau_sac, ten_kich_thuoc, so_luong) => {
        so_luong = so_luong - 1;
        if (so_luong >= 1) {
            const results = await cartAPI.updateQuantityButton({ id_khach_hang, id_sp, ten_mau_sac, ten_kich_thuoc, so_luong })
            const updateCart = [...cart];
            updateCart[index].so_luong = so_luong;
            setCart(updateCart);
        }

    }
    ////CALL API CART
    useEffect(() => {
        try {
            const fetchCart = async () => {
                if (cart !== null) {
                    const result = await cartAPI.getDetail(id);
                    setCart(result.data.data);
                    console.log('khuakhua', result.data.data)
                }
            };
            fetchCart();
        } catch (error) {
            console.log('Failed to fetch Cart: ', error);
        }
    }, []);


    return (
        <>
            {!isLogin ? (<Container disableGutters maxWidth='xl'>


                <Grid className='root-cart-header'>
                    <Grid item xs={5} lg={5} xl={5}>
                        <Typography sx={{ fontFamily: 'Jura' }}>Sản phẩm</Typography>

                    </Grid>
                    <Grid item xs={4} lg={3} xl={3}>
                        <Typography sx={{ fontFamily: 'Jura' }}>Đơn giá</Typography>

                    </Grid>
                    <Grid item xs={2} lg={1} xl={1}>

                        <Typography sx={{ fontFamily: 'Jura' }}>Số lượng</Typography>

                    </Grid>

                    <Grid item xs={0} lg={2} xl={2} sx={{ display: { xs: 'none', xl: 'flex' } }}>
                        <Typography sx={{ fontFamily: 'Jura' }}>Thành tiền</Typography>

                    </Grid>

                    <Grid item xs={1} lg={1} xl={1} sx={{ display: { xl: 'flex' } }}>
                        <Typography sx={{ fontFamily: 'Jura' }}>Thao tác</Typography>

                    </Grid>


                </Grid>
                <hr />


                {User.map((item, index) => (

                    <Grid item xs={12} className='root-cart' key={index} >
                        <Grid item xs={5} lg={5} xl={5} >
                            <Box className="full-box-product">
                                <Grid>
                                    <img
                                        className="img"
                                        src={item.hinh_anh_chinh}
                                        alt="anh 1"
                                    />
                                    <Typography sx={{ fontFamily: 'Jura' }}> Size: {item.ten_kich_thuoc}/{item.ten_mau_sac}</Typography>

                                </Grid>

                                <Grid>

                                    <Typography sx={{ fontFamily: 'Jura' }}>{item.ten_sp}</Typography>


                                </Grid>


                            </Box >

                        </Grid>
                        <Grid item xs={4} lg={3} xl={3}>
                            <Typography sx={{ fontFamily: 'Jura' }}>{item.gia_sp}</Typography>

                        </Grid>
                        <Grid item xs={2} lg={1} xl={1} sx={{ display: 'flex', justifyContent: 'center', fontFamily: 'Jura' }}>
                            {item.so_luong}



                        </Grid>

                        <Grid item xs={0} lg={2} xl={2} sx={{ display: { xs: 'none', xl: 'flex' } }}>
                            <Typography sx={{ fontFamily: 'Jura' }}>{item.gia_sp * item.so_luong}</Typography>

                        </Grid>

                        <Grid item xs={1} lg={1} xl={1} sx={{ display: { xl: 'flex', paddingRight: '50px' } }}>
                            <IconButton onClick={() => handleRemove(item.id_sp, item.id_khach_hang, item.ten_mau_sac, item.ten_kich_thuoc, item.so_luong)}>
                                <DeleteOutlineIcon />
                            </IconButton>

                        </Grid>



                    </Grid>
                ))}






            </Container >) : (<Container disableGutters maxWidth='xl'>


                <Grid className='root-cart-header'>
                    <Grid item xs={5} lg={5} xl={5}>
                        <Typography sx={{ fontFamily: 'Jura' }}>Sản phẩm</Typography>

                    </Grid>
                    <Grid item xs={4} lg={3} xl={3}>
                        <Typography sx={{ fontFamily: 'Jura' }}>Đơn giá</Typography>

                    </Grid>
                    <Grid item xs={2} lg={1} xl={1}>

                        <Typography sx={{ fontFamily: 'Jura' }}>Số lượng</Typography>

                    </Grid>

                    <Grid item xs={0} lg={2} xl={2} sx={{ display: { xs: 'none', xl: 'flex' } }}>
                        <Typography sx={{ fontFamily: 'Jura' }}>Thành tiền</Typography>

                    </Grid>

                    <Grid item xs={1} lg={1} xl={1} sx={{ display: { xl: 'flex' } }}>
                        <Typography sx={{ fontFamily: 'Jura' }}>Thao tác</Typography>

                    </Grid>


                </Grid>
                <hr />

                {data.map((item, index) => (

                    <Grid className='root-cart' key={index} >
                        <Grid item xs={7} lg={5} xl={5} >
                            <Box className="full-box-product">
                                <Grid>
                                    <img
                                        className="img"
                                        src={item.hinh_anh_chinh}
                                        alt="anh 1"
                                    />
                                    <Typography sx={{ fontFamily: 'Jura' }}> Size: {item.ten_kich_thuoc}/{item.ten_mau_sac}</Typography>

                                </Grid>

                                <Grid>

                                    <Typography sx={{ fontFamily: 'Jura' }}>{item.ten_sp}</Typography>


                                </Grid>


                            </Box >

                        </Grid>
                        <Grid item xs={4} lg={3} xl={3}>
                            <Typography sx={{ fontFamily: 'Jura' }}>{item.gia_sp}</Typography>

                        </Grid>
                        <Grid item xs={1} lg={1} xl={1} sx={{ display: 'flex', alignItems: 'center', justifyContent: 'center', textAlign: 'center', fontFamily: 'Jura', paddingRight: '30px' }}>
                            <IconButton onClick={() => handleDownCount(index, item.id_sp, item.id_khach_hang, item.ten_mau_sac, item.ten_kich_thuoc, item.so_luong)}>
                                <RemoveIcon />
                            </IconButton>
                            {item.so_luong}
                            <IconButton onClick={() => handleUpCount(index, item.id_sp, item.id_khach_hang, item.ten_mau_sac, item.ten_kich_thuoc, item.so_luong)}>
                                <AddIcon />
                            </IconButton>


                        </Grid>

                        <Grid item xs={0} lg={2} xl={2} sx={{ display: { xs: 'none', xl: 'flex' } }}>
                            <Typography sx={{ fontFamily: 'Jura' }}>{item.gia_sp * item.so_luong}</Typography>

                        </Grid>

                        <Grid item xs={1} lg={1} xl={1} sx={{ display: { xl: 'flex', paddingRight: '30px' } }}>
                            <IconButton onClick={() => handleRemoveItemDB(item.id_sp, item.id_khach_hang, item.ten_mau_sac, item.ten_kich_thuoc, item.so_luong)}>
                                <DeleteOutlineIcon />
                            </IconButton>
                        </Grid>



                    </Grid>
                ))}





            </Container >)
            }
        </>

    );
}

export default ListItem;