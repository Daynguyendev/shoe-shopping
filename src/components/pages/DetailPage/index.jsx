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
import Progress from '../../Formcontrol/Progress';
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
    const [sizeAddlocal, setSizeAddlocal] = useState();
    const [colorAddlocal, setColorAddlocal] = useState();
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
    const [loading, setLoading] = useState(false);

    // let cartUser = JSON.parse(localStorage.getItem('cartUser')) || [];


    const handleBuyNow = async () => {
        if (colorAdd == '' || colorAdd == null) {

            enqueueSnackbar('Vui lòng chọn màu sắc', {
                variant: 'error',
                autoHideDuration: 1000,
                anchorOrigin: {
                    vertical: 'top',
                    horizontal: 'right',
                },
            });
            return;

        }
        if (sizeAdd == '' || sizeAdd == null) {

            enqueueSnackbar('Vui lòng chọn kích thước', {
                variant: 'error',
                autoHideDuration: 1000,
                anchorOrigin: {
                    vertical: 'top',
                    horizontal: 'right',
                },
            });
            return;

        }

        const data = {
            id_mau_sac: colorAdd,
            id_kich_thuoc: sizeAdd,
            id_sp: id,
        }

        const result = await localStorage.setItem('Buy-now', JSON.stringify(data));

        if (isLogin) {
            // const resultt = await cartAPI.getDetail(idUser)
            // setProductTotal(resultt.data.data);
            // for (let i = 0; i < cartUser.length; i++) {
            //     const item = cartUser[i];
            //     const result = await DetailProductAPI.getQuantityCart({
            //         id_sp: item.id_sp,
            //         id_mau_sac: item.id_mau_sac,
            //         id_kich_thuoc: item.id_kich_thuoc,
            //     });
            //     if (
            //         result.data.data.so_luong_kho - resultt.data.data[i]?.so_luong >= 0

            //     ) {
            //         continue;
            //     }
            //     else
            //         alert('Sản phẩm không còn đủ số lượng ' + result.data.data.ten_sp + ' ' + result.data.data.ten_mau_sac + ' ' + result.data.data.ten_kich_thuoc + ' Chỉ còn ' + result.data.data.so_luong_kho);
            //     return;
            // }
            navigate(`/checkout/${id}`);
        } else {
            navigate(`/login`);
        }
    };

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

    const handleButtonClick = (id, name) => {

        setColorAddlocal(name);

        setColorAdd(id);
        setSelectedButtonId(id);

    };
    const handleButtonClickSize = (id, name) => {
        setSizeAdd(id);
        setSizeAddlocal(name);

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
            const fillterTotal = detailProduct.filter(item => item.id_kich_thuoc === sizeAdd && item.id_mau_sac === colorAdd)
            for (let i = 0; i < fillterTotal.length; i++) {
                so_luong_kho = so_luong_kho + fillterTotal[i].so_luong_kho;
            }
            setTotal(so_luong_kho)
        }
    }, [colorAdd, sizeAdd])

    console.log('test size display', sizeDisplay)


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
        if (colorAdd == '' || colorAdd == null) {
            enqueueSnackbar('Chọn màu sắc', {
                variant: 'error',
                autoHideDuration: 1000,
                anchorOrigin: {
                    vertical: 'top',
                    horizontal: 'right',
                },
            });
            return;
        }
        if (sizeAdd == '' || sizeAdd == null) {
            enqueueSnackbar('Chọn kích thước', {
                variant: 'error',
                autoHideDuration: 1000,
                anchorOrigin: {
                    vertical: 'top',
                    horizontal: 'right',
                },
            });
            return;
        }


        if (total <= 0) {
            enqueueSnackbar('Sản phẩm đã hết', {
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
                    // Lấy dữ liệu từ local storage và chuyển đổi thành mảng (nếu có).
                    let cart = JSON.parse(localStorage.getItem('cart')) || [];
                    // Tìm sản phẩm trong giỏ hàng.
                    const index = cart.findIndex(item => item.id_sp === pageDetail[0].id_sp && item.id_mau_sac === colorAdd && item.id_kich_thuoc === sizeAdd);
                    // Nếu sản phẩm đã có trong giỏ hàng, cập nhật số lượng sản phẩm.
                    if (index !== -1) {
                        cart[index].so_luong += count;
                    } else { // Ngược lại, thêm sản phẩm mới vào giỏ hàng.
                        const newItem = {
                            id_sp: pageDetail[0].id_sp,
                            ten_sp: pageDetail[0].ten_sp,
                            gia_sp: pageDetail[0].gia_sp,
                            id_mau_sac: colorAdd,
                            id_kich_thuoc: sizeAdd,
                            hinh_anh_chinh: pageDetail[0].hinh_anh_chinh,
                            so_luong: count,
                            ten_mau_sac: colorAddlocal,
                            ten_kich_thuoc: sizeAddlocal
                        };
                        cart.push(newItem);
                    }
                    localStorage.setItem('cart', JSON.stringify(cart));
                    enqueueSnackbar('Thêm vào giỏ hàng thành công', {
                        variant: 'success',
                        autoHideDuration: 800,
                        anchorOrigin: {
                            vertical: 'top',
                            horizontal: 'right',
                        },
                    });
                } else {

                    const result = await cartAPI.add({
                        id_sp: pageDetail[0].id_sp,
                        id_khach_hang: idUser,
                        ten_sp: pageDetail[0].ten_sp,
                        id_mau_sac: colorAdd,
                        id_kich_thuoc: sizeAdd,
                        so_luong: count,
                    })

                    // let cartUser = JSON.parse(localStorage.getItem('cartUser')) || [];
                    // // Tìm sản phẩm trong giỏ hàng.
                    // const index = cartUser.findIndex(item => item.id_sp === pageDetail[0].id_sp && item.id_mau_sac === colorAdd && item.id_kich_thuoc === sizeAdd);
                    // // Nếu sản phẩm đã có trong giỏ hàng, cập nhật số lượng sản phẩm.
                    // if (index !== -1) {
                    //     cartUser[index].so_luong += count;
                    // } else { // Ngược lại, thêm sản phẩm mới vào giỏ hàng.
                    //     const newItem = {
                    //         id_sp: pageDetail[0].id_sp,
                    //         ten_sp: pageDetail[0].ten_sp,
                    //         gia_sp: pageDetail[0].gia_sp,
                    //         id_mau_sac: colorAdd,
                    //         id_kich_thuoc: sizeAdd,
                    //         hinh_anh_chinh: pageDetail[0].hinh_anh_chinh,
                    //         so_luong: count
                    //     };
                    //     cartUser.push(newItem);

                    // }
                    // localStorage.setItem('cartUser', JSON.stringify(cartUser));

                    enqueueSnackbar('Thêm vào giỏ hàng thành công', {
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
            enqueueSnackbar('Vui lòng chọn màu sắc, kích thước', { variant: 'error', autoHideDuration: 1000 });
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
        <Container disableGutters maxWidth='xl' className='detaipagefixed' >

            <Breadcrumbs className='breadcrum' aria-label="breadcrumb" style={{ backgroundColor: 'white' }}>
                <p style={{ cursor: 'pointer', fontSize: '21px', fontFamily: 'Oswald' }} onClick={handleHome}>Trang chủ </p>
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
                                {mysqlDateString >= item.ngay_bat_dau && mysqlDateString <= item.ngay_ket_thuc ? (<div style={{ display: 'flex', alignItems: 'center', textAlign: 'center' }}><p style={{ color: 'red', fontSize: '25px' }}>{(item.gia_sp - (item.phan_tram_giam / 100 * item.gia_sp)).toLocaleString('vi-VN', { style: 'currency', currency: 'VND' })}</p>

                                    <Typography variant='h5' sx={{ fontFamily: 'Oswald', marginLeft: '10px', textDecoration: 'line-through' }} >{item.gia_sp.toLocaleString('vi-VN', { style: 'currency', currency: 'VND' })}</Typography>

                                </div>

                                ) : (<Typography variant='h5' sx={{ fontFamily: 'Oswald', marginTop: '15px' }} >{item.gia_sp.toLocaleString('vi-VN', { style: 'currency', currency: 'VND' })}</Typography>
                                )}
                            </Grid>
                            <Grid item xs={12} sx={{ display: 'flex' }} >
                                <Grid item xs={3}>
                                    <Typography variant='h5' sx={{ fontFamily: 'Oswald', }} >Màu sắc</Typography>
                                </Grid>
                                <Grid item xs={9} sx={{ display: 'flex', marginLeft: '30px' }}>
                                    {colormap.map((item, index) => (
                                        <button style={{ marginRight: '15px', backgroundColor: 'white' }} key={index}
                                            className={selectedButtonId === item.id_mau_sac ? 'selectedcolor' : ''}
                                            onClick={() => handleButtonClick(item.id_mau_sac, item.ten_mau_sac)}

                                        >{item.ten_mau_sac}</button>
                                    ))}


                                </Grid>
                            </Grid>
                            <Grid item xs={12} sx={{ display: 'flex' }} className='size'>
                                <Grid item xs={3}>
                                    <Typography variant='h5' sx={{ fontFamily: 'Oswald', marginTop: '10px' }} >Kích thước</Typography>
                                </Grid>
                                <Grid item xs={9} sx={{ fontFamily: 'Oswald', marginLeft: '30px' }}>
                                    {sizemap.map((item, index) => (

                                        <button style={{ marginRight: '15px', marginTop: '10px', maxWidth: '40px', height: '30px', backgroundColor: 'white' }}
                                            key={index} className={selectedButtonSize === item.id_kich_thuoc ? 'selectedsize' : ''}
                                            onClick={() => handleButtonClickSize(item.id_kich_thuoc, item.ten_kich_thuoc)} value={item.id_kich_thuoc}>{item.ten_kich_thuoc}</button>
                                    ))}
                                </Grid>

                            </Grid>
                            <Grid item xs={12} sx={{ marginTop: '30px', display: 'flex' }}>
                                <Typography variant='h5' sx={{ fontFamily: 'Oswald' }} >Số lượng còn lại</Typography>
                                <Typography variant='h6' sx={{ fontFamily: 'Oswald', marginLeft: '43px', fontWeight: 'bold' }} >{total}</Typography>

                            </Grid>

                            <Grid item xs={12} xl={6} lg={6} >
                                <hr />
                            </Grid>
                            <Grid item xs={12} className='buy-now'>
                                <Grid item xs={1} lg={1}>
                                </Grid>
                                <Grid item xs={4} lg={2}>
                                    <ButtonForm name={'Mua Ngay'} onClick={handleBuyNow} />
                                </Grid>
                                <Grid item xs={2} lg={2}>
                                </Grid>

                                {/* <Grid item xs={3} lg={2} sx={{ display: 'flex', alignItems: 'center', marginLeft: '20px' }}>
                                    <IconButton onClick={() => handleDecrease(item)}>
                                        <RemoveIcon />
                                    </IconButton>
                                    <Typography sx={{ fontFamily: 'Oswald', fontWeight: 'bold' }}>{count}</Typography>
                                    <IconButton onClick={() => handleIncrease(item)}>
                                        <AddIcon />
                                    </IconButton>
                                </Grid> */}
                                <Grid item xs={4} lg={2}>
                                    <ButtonForm name={'Thêm vào giỏ'} onClick={handleAddSubmit} />

                                </Grid>
                                <Grid item xs={1} lg={1}>
                                </Grid>
                            </Grid>


                            <Grid item xs={12} className='slogan'>
                                <Grid item xs={4} lg={4}>
                                    <p>Bảo hành keo vĩnh viễn cho sản phẩm tại cửa hàng</p>

                                </Grid>

                                <Grid item xs={4} lg={4}>
                                    Vận chuyển toàn quốc cấp tốc cho đơn hàng từ 150k
                                </Grid>
                                <Grid item xs={4} lg={4}>
                                    Đổi trả dễ dàng (trong vòng 7 ngày nếu lỗi nhà sản xuất)
                                </Grid>
                            </Grid>
                            <Grid item xs={12} className='slogan'>
                                <Grid item xs={4} lg={4}>
                                    Hotline 1900.766.767 hỗ trợ từ 8h30-21h30

                                </Grid>

                                <Grid item xs={4} lg={4}>
                                    Giao hàng tận nơi, nhận hàng xong thanh toán
                                </Grid>
                                <Grid item xs={4} lg={4}>
                                    Ưu đãi tích điểm và hưởng quyền lợi thành viên từ HN STORE
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