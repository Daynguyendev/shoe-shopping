import React from 'react';
import Container from '@mui/material/Container';
import Grid from '@mui/material/Grid';
import './DetailPage.scss';
import Typography from '@mui/material/Typography';
import ImageDetail from '../ImageDetail'
import { useState, useEffect, useLayoutEffect } from 'react';
import { useParams } from 'react-router-dom';
import productAPI from '../../API/productAPI';
import { useDispatch } from 'react-redux'
import { addItem } from '../../../components/features/cart/cartSlice';
import { useSnackbar } from 'notistack';
import Breadcrumbs from '@mui/material/Breadcrumbs';
import { useNavigate } from 'react-router-dom';
import DetailProductAPI from '../../API/detailproductAPI';
import IconButton from '@mui/material/IconButton';
import AddIcon from '@mui/icons-material/Add';
import RemoveIcon from '@mui/icons-material/Remove';
import { useSelector } from 'react-redux';
import userAPI from '../../API/userAPI';
import cartAPI from './../../API/cartAPI';
import ButtonForm from '../../Formcontrol/ButtonForm';
import PageRateProduct from '../../features/product/component/PageRateProduct';
import colorAPI from '../../API/colorAPI';
import sizeAPI from './../../API/sizeAPI';

function DetailPage() {
    let { id } = useParams();
    const navigate = useNavigate()
    const [pageDetail, setPageDetail] = useState([]);
    const { enqueueSnackbar } = useSnackbar();
    const [detailProduct, setDetailProduct] = useState([]);
    const [selectedButtonId, setSelectedButtonId] = useState(null);
    const [selectedButtonSize, setSelectedButtonSize] = useState(null);
    const [sizeAdd, setSizeAdd] = useState();
    const [colorAdd, setColorAdd] = useState();
    const [count, setCount] = useState(1);
    const [total, setTotal] = useState(0);
    const [idUser, setIdUser] = useState();
    const [sizeDisplay, setSizeDisplay] = useState(null);
    const [colorDisplay, setColorDisplay] = useState(null);
    const isLogin = useSelector((state) => state?.user.isLogin);
    let email_khach_hang = useSelector((state) => state?.user?.user?.email_khach_hang);
    let so_luong_kho = 0;
    const sizemap = sizeDisplay || [];
    const colormap = colorDisplay || [];
    const now = new Date();
    const mysqlDateString = now.toISOString().slice(0, 19).replace('T', ' ');
    useEffect(() => {

        try {
            const fetchSize = async () => {
                const res = await sizeAPI.getName(id)
                setSizeDisplay(res.data.data)
            };
            fetchSize();
        } catch (error) {
            console.log('Failed to fetch color: ', error);
        }
    }, []);
    console.log('size', sizeDisplay)


    useEffect(() => {

        try {
            const fetchIdUser = async () => {
                const res = await userAPI.getID({ email_khach_hang: email_khach_hang });
                setIdUser(res.data.data[0].id_khach_hang)
            };
            fetchIdUser();
        } catch (error) {
            console.log('Failed to fetch idUser: ', error);
        }
    }, []);

    useEffect(() => {

        try {
            const fetchColor = async () => {
                const res = await colorAPI.getdetailbyId(id)
                setColorDisplay(res.data.data)
            };
            fetchColor();
        } catch (error) {
            console.log('Failed to fetch color: ', error);
        }
    }, []);
    console.log('color', colorDisplay)

    const handleDecrease = (item) => {
        if (count > 1) {
            setCount(count - 1);
        }
    };

    const handleIncrease = (item) => {
        if (count < total)
            setCount(count + 1);
    };

    const dispatch = useDispatch()

    const handleButtonClick = (name) => {

        setColorAdd(name);
        setSelectedButtonId(name);

    };
    const handleButtonClickSize = (id) => {
        setSizeAdd(id);
        setSelectedButtonSize(id);

    };

    useEffect(() => {
        try {
            const fetchPageDetail = async () => {
                if (pageDetail !== null) {
                    const pageDetail = await productAPI.get(id);
                    setPageDetail(pageDetail.data.data);
                }
            };
            fetchPageDetail();
        } catch (error) {
            console.log('Failed to fetch PageDetail: ', error);
        }
    }, []);

    useEffect(() => {
        if (sizeAdd && colorAdd || colorAdd && sizeAdd) {
            const fillterTotal = detailProduct.filter(item => item.ten_kich_thuoc === sizeAdd && item.ten_mau_sac === colorAdd)
            for (let i = 0; i < fillterTotal.length; i++) {
                so_luong_kho = so_luong_kho + fillterTotal[i].so_luong_kho;
            }
            setTotal(so_luong_kho)
        }
    }, [colorAdd, sizeAdd])


    useEffect(() => {
        try {
            const fetchProductDetail = async () => {
                if (detailProduct !== null) {
                    const ProductDetail = await DetailProductAPI.getById(id);
                    setDetailProduct(ProductDetail.data.data);
                }
            };
            fetchProductDetail();
        } catch (error) {
            console.log('Failed to fetch ProductDetail: ', error);
        }
    }, []);


    ///// Submit add data database and localstore
    const handleAddSubmit = async (data) => {
        if (total <= 0) {
            enqueueSnackbar('S???n ph???m ???? h???t', {
                variant: 'error',
                autoHideDuration: 1000,
                anchorOrigin: {
                    vertical: 'top',
                    horizontal: 'right',
                },
            });
            return;
        }
        if (colorAdd !== undefined && colorAdd !== null && sizeAdd !== undefined && sizeAdd !== null) {
            try {
                if (!isLogin) {
                    // L???y d??? li???u t??? local storage v?? chuy???n ?????i th??nh m???ng (n???u c??).
                    let cart = JSON.parse(localStorage.getItem('cart')) || [];
                    // T??m s???n ph???m trong gi??? h??ng.
                    const index = cart.findIndex(item => item.id_sp === pageDetail[0].id_sp && item.ten_mau_sac === colorAdd && item.ten_kich_thuoc === sizeAdd);
                    // N???u s???n ph???m ???? c?? trong gi??? h??ng, c???p nh???t s??? l?????ng s???n ph???m.
                    if (index !== -1) {
                        cart[index].so_luong += count;
                    } else { // Ng?????c l???i, th??m s???n ph???m m???i v??o gi??? h??ng.
                        const newItem = {
                            id_sp: pageDetail[0].id_sp,
                            ten_sp: pageDetail[0].ten_sp,
                            gia_sp: pageDetail[0].gia_sp,
                            ten_mau_sac: colorAdd,
                            ten_kich_thuoc: sizeAdd,
                            hinh_anh_chinh: pageDetail[0].hinh_anh_chinh,
                            so_luong: count
                        };
                        cart.push(newItem);
                    }
                    localStorage.setItem('cart', JSON.stringify(cart));
                    enqueueSnackbar('Th??m v??o gi??? h??ng th??nh c??ng', {
                        variant: 'success',
                        autoHideDuration: 800,
                        anchorOrigin: {
                            vertical: 'top',
                            horizontal: 'right',
                        },
                    });
                } else {
                    const result = cartAPI.add({
                        id_sp: pageDetail[0].id_sp,
                        id_khach_hang: idUser,
                        ten_sp: pageDetail[0].ten_sp,
                        ten_mau_sac: colorAdd,
                        ten_kich_thuoc: sizeAdd,
                        so_luong: count
                    })

                    let cartUser = JSON.parse(localStorage.getItem('cartUser')) || [];
                    // T??m s???n ph???m trong gi??? h??ng.
                    const index = cartUser.findIndex(item => item.id_sp === pageDetail[0].id_sp && item.ten_mau_sac === colorAdd && item.ten_kich_thuoc === sizeAdd);
                    // N???u s???n ph???m ???? c?? trong gi??? h??ng, c???p nh???t s??? l?????ng s???n ph???m.
                    if (index !== -1) {
                        cartUser[index].so_luong += count;
                    } else { // Ng?????c l???i, th??m s???n ph???m m???i v??o gi??? h??ng.
                        const newItem = {
                            id_sp: pageDetail[0].id_sp,
                            ten_sp: pageDetail[0].ten_sp,
                            gia_sp: pageDetail[0].gia_sp,
                            ten_mau_sac: colorAdd,
                            ten_kich_thuoc: sizeAdd,
                            hinh_anh_chinh: pageDetail[0].hinh_anh_chinh,
                            so_luong: count
                        };
                        cartUser.push(newItem);

                    }
                    localStorage.setItem('cartUser', JSON.stringify(cartUser));

                    enqueueSnackbar('Th??m v??o gi??? h??ng th??nh c??ng', {
                        variant: 'success',
                        autoHideDuration: 800,
                        anchorOrigin: {
                            vertical: 'top',
                            horizontal: 'right',
                        },
                    });
                }
            } catch (error) {
                enqueueSnackbar(error.message, { variant: 'error', autoHideDuration: 1000 });
                console.log(error);
            }
        } else {
            enqueueSnackbar('Vui l??ng ch???n m??u s???c, k??ch th?????c', { variant: 'error', autoHideDuration: 1000 });
        }
    }
    const handleHome = () => {
        navigate(`/`);
    }
    const handleTrademark = () => {
        navigate(`/colections/${pageDetail[0]?.ten_thuong_hieu}`)

    }
    useLayoutEffect(() => {
        window.scrollTo(0, 0);
    }, []);

    return (
        <Container disableGutters maxWidth='xl' >

            <Breadcrumbs className='breadcrum' aria-label="breadcrumb" style={{ backgroundColor: 'white' }}>
                <p style={{ cursor: 'pointer', fontSize: '21px', fontFamily: 'Oswald' }} onClick={handleHome}>Trang ch??? </p>
                <p style={{ cursor: 'pointer', fontSize: '21px', fontFamily: 'Oswald' }} onClick={handleTrademark} >{pageDetail[0]?.ten_thuong_hieu} </p>
                <p style={{ cursor: 'pointer', fontSize: '21px', fontFamily: 'Oswald' }}  >{pageDetail[0]?.ten_sp.replace(/-+/g, ' ')} </p>
            </Breadcrumbs>
            <Grid item xs={12} className='detail-page' minHeight='885px' sx={{ display: { xs: 'block', sm: 'flex', lg: 'flex', xl: 'flex' } }} >
                <Grid item xs={12} lg={7} xl={7}  >
                    < ImageDetail colorAdd={colorAdd} />
                </Grid>
                {
                    pageDetail.map((item, i) => (
                        <Grid item xs={12} lg={6} xl={6} key={i} >
                            <Typography variant='h4' sx={{ fontFamily: 'Oswald', fontWeight: '1000' }} >{item.ten_sp.replace(/-+/g, ' ')}</Typography>
                            <Grid item xs={1} >
                                <hr />
                            </Grid>
                            <Grid item xs={12} >
                                {console.log('tesst log', item)}
                                {mysqlDateString >= item.ngay_bat_dau && mysqlDateString <= item.ngay_ket_thuc ? (<div style={{ display: 'flex', alignItems: 'center', textAlign: 'center' }}><p style={{ color: 'red', fontSize: '35px' }}>{(item.gia_sp - (item.phan_tram_giam / 100 * item.gia_sp)).toLocaleString('vi-VN', { style: 'currency', currency: 'VND' })}</p>

                                    <Typography variant='h4' sx={{ fontFamily: 'Oswald', marginLeft: '10px', textDecoration: 'line-through' }} >{item.gia_sp.toLocaleString('vi-VN', { style: 'currency', currency: 'VND' })}</Typography>

                                </div>

                                ) : (<Typography variant='h4' sx={{ fontFamily: 'Oswald', marginTop: '15px' }} >{item.gia_sp.toLocaleString('vi-VN', { style: 'currency', currency: 'VND' })}</Typography>
                                )}
                            </Grid>
                            <Grid item xs={12} sx={{ display: 'flex' }} >
                                <Grid item xs={3}>
                                    <Typography variant='h5' sx={{ fontFamily: 'Oswald', marginTop: '30px', }} >M??u s???c</Typography>
                                </Grid>
                                <Grid item xs={9} sx={{ display: 'flex', marginLeft: '30px' }}>
                                    {colormap.map((item, index) => (
                                        <button style={{ marginTop: '25px', marginRight: '15px', backgroundColor: 'white', }} key={index}
                                            className={selectedButtonId === item.ten_mau_sac ? 'selectedcolor' : ''}
                                            onClick={() => handleButtonClick(item.ten_mau_sac)}

                                        >{item.ten_mau_sac}</button>
                                    ))}


                                </Grid>
                            </Grid>
                            <Grid item xs={12} sx={{ display: 'flex' }} className='size'>
                                <Grid item xs={3}>
                                    <Typography variant='h5' sx={{ fontFamily: 'Oswald', marginTop: '10px' }} >K??ch th?????c</Typography>
                                </Grid>
                                <Grid item xs={9} sx={{ fontFamily: 'Oswald', marginLeft: '30px' }}>
                                    {sizeDisplay.map((item, index) => (

                                        <button style={{ marginRight: '15px', marginTop: '10px', maxWidth: '40px', height: '30px', backgroundColor: 'white' }}
                                            key={index} className={selectedButtonSize === item.ten_kich_thuoc ? 'selectedsize' : ''}
                                            onClick={() => handleButtonClickSize(item.ten_kich_thuoc)} value={item.ten_kich_thuoc}>{item.ten_kich_thuoc}</button>
                                    ))}
                                </Grid>

                            </Grid>
                            <Grid item xs={12} sx={{ marginTop: '30px', display: 'flex' }}>
                                <Typography variant='h5' sx={{ fontFamily: 'Oswald' }} >S??? l?????ng c??n l???i</Typography>
                                <Typography variant='h6' sx={{ fontFamily: 'Oswald', marginLeft: '43px', fontWeight: 'bold' }} >{total}</Typography>

                            </Grid>

                            <Grid item xs={12} xl={6} lg={6} >
                                <hr />
                            </Grid>
                            <Grid item xs={12} className='buy-now'>
                                <Grid item xs={4} lg={2}>
                                    <ButtonForm name={'Mua Ngay'} />
                                </Grid>
                                <Grid item xs={3} lg={2} sx={{ display: 'flex', alignItems: 'center', marginLeft: '20px' }}>
                                    <IconButton onClick={() => handleDecrease(item)}>
                                        <RemoveIcon />
                                    </IconButton>
                                    <Typography sx={{ fontFamily: 'Oswald', fontWeight: 'bold' }}>{count}</Typography>
                                    <IconButton onClick={() => handleIncrease(item)}>
                                        <AddIcon />
                                    </IconButton>
                                </Grid>
                                <Grid item xs={4} lg={4}>
                                    <ButtonForm name={'Th??m v??o gi??? h??ng'} onClick={handleAddSubmit} />

                                </Grid>
                            </Grid>


                            <Grid item xs={12} className='slogan'>
                                <Grid item xs={4} lg={4}>
                                    B???o h??nh keo v??nh vi???n

                                </Grid>

                                <Grid item xs={4} lg={4}>
                                    Mi???n ph?? v???n chuy???n to??n qu???c cho ????n h??ng t??? 150k
                                </Grid>
                                <Grid item xs={4} lg={4}>
                                    ?????i tr??? d??? d??ng (trong v??ng 7 ng??y n???u l???i nh?? s???n xu???t)
                                </Grid>
                            </Grid>
                            <Grid item xs={12} className='slogan'>
                                <Grid item xs={4} lg={4}>
                                    Hotline 1900.633.349 h??? tr??? t??? 8h30-21h30

                                </Grid>

                                <Grid item xs={4} lg={4}>
                                    Giao h??ng t???n n??i, nh???n h??ng xong thanh to??n
                                </Grid>
                                <Grid item xs={4} lg={4}>
                                    ??u ????i t??ch ??i???m v?? h?????ng quy???n l???i th??nh vi??n t??? MWC
                                </Grid>
                            </Grid>
                        </Grid>
                    ))
                }
            </Grid>
            <PageRateProduct />

        </Container >
    );
}

export default DetailPage;