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
        const fillterColor = detailProduct.filter(item => item.ten_mau_sac == name)
        const fillterQuantity = fillterColor.filter(item => item.so_luong_kho >= 1)
        const Sizedisplay = fillterQuantity.reduce((listSize, size) => {
            if (!listSize.includes(size.ten_kich_thuoc)) {
                listSize.push(size.ten_kich_thuoc);
            }
            return listSize;
        }, []);
        setSizeDisplay(Sizedisplay)
        setSelectedButtonId(name);

    };
    const handleButtonClickSize = (id) => {
        setSizeAdd(id);
        const fillterSize = detailProduct.filter(item => item.ten_kich_thuoc == id)
        const fillterQuantity = fillterSize.filter(item => item.so_luong_kho >= 1)
        const colornew = fillterQuantity.reduce((accumulator, color) => {
            if (!accumulator.includes(color.ten_mau_sac)) {
                accumulator.push(color.ten_mau_sac);
            }
            return accumulator;
        }, [])
        setColorDisplay(colornew)
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
        const colornew = detailProduct.reduce((accumulator, color) => {
            if (!accumulator.includes(color.ten_mau_sac)) {
                accumulator.push(color.ten_mau_sac);
            }
            return accumulator;
        }, [])
        setColorDisplay(colornew);

    }, [detailProduct])

    useEffect(() => {
        const sizenew = detailProduct.reduce((listSize, size) => {
            if (!listSize.includes(size.ten_kich_thuoc)) {
                listSize.push(size.ten_kich_thuoc);
            }
            return listSize;
        }, [])
        setSizeDisplay(sizenew);
    }, [detailProduct])

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
        if (colorAdd !== undefined && colorAdd !== null && sizeAdd !== undefined && sizeAdd !== null) {
            try {
                if (!isLogin) {
                    // Lấy dữ liệu từ local storage và chuyển đổi thành mảng (nếu có).
                    let cart = JSON.parse(localStorage.getItem('cart')) || [];
                    // Tìm sản phẩm trong giỏ hàng.
                    const index = cart.findIndex(item => item.id_sp === pageDetail[0].id_sp && item.ten_mau_sac === colorAdd && item.ten_kich_thuoc === sizeAdd);
                    // Nếu sản phẩm đã có trong giỏ hàng, cập nhật số lượng sản phẩm.
                    if (index !== -1) {
                        cart[index].so_luong += count;
                    } else { // Ngược lại, thêm sản phẩm mới vào giỏ hàng.
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
                    enqueueSnackbar('Thêm vào giỏ hàng thành công', {
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
                    // Tìm sản phẩm trong giỏ hàng.
                    const index = cartUser.findIndex(item => item.id_sp === pageDetail[0].id_sp && item.ten_mau_sac === colorAdd && item.ten_kich_thuoc === sizeAdd);
                    // Nếu sản phẩm đã có trong giỏ hàng, cập nhật số lượng sản phẩm.
                    if (index !== -1) {
                        cartUser[index].so_luong += count;
                    } else { // Ngược lại, thêm sản phẩm mới vào giỏ hàng.
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

                    enqueueSnackbar('Thêm vào giỏ hàng DB thành công', {
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
        <Container disableGutters maxWidth='xl' >

            <Breadcrumbs aria-label="breadcrumb" style={{ backgroundColor: 'white' }}>
                <p style={{ cursor: 'pointer', fontSize: '21px', fontFamily: 'Jura' }} onClick={handleHome}>Trang chủ </p>
                <p style={{ cursor: 'pointer', fontSize: '21px', fontFamily: 'Jura' }} onClick={handleTrademark} >{pageDetail[0]?.ten_thuong_hieu} </p>
                <p style={{ cursor: 'pointer', fontSize: '21px', fontFamily: 'Jura' }}  >{pageDetail[0]?.ten_sp} </p>
            </Breadcrumbs>
            <Grid item xs={12} className='detail-page' minHeight='885px' sx={{ display: { xs: 'block', sm: 'flex', lg: 'flex', xl: 'flex' } }} >
                <Grid item xs={12} lg={7} xl={7}  >
                    < ImageDetail />
                </Grid>
                {
                    pageDetail.map((item, i) => (
                        <Grid item xs={12} lg={6} xl={6} key={i} >
                            <Typography variant='h4' sx={{ fontFamily: 'Jura' }} >{item.ten_sp}</Typography>
                            <Grid item xs={1} >
                                <hr />
                            </Grid>
                            <Grid item xs={12} >
                                <Typography variant='h4' sx={{ fontFamily: 'Jura', marginTop: '15px' }} >{item.gia_sp}{'đ'}</Typography>
                            </Grid>
                            <Grid item xs={12} sx={{ display: 'flex' }} >
                                <Grid item xs={3}>
                                    <Typography variant='h5' sx={{ fontFamily: 'Jura', marginTop: '30px', }} >Màu sắc</Typography>
                                </Grid>
                                <Grid item xs={9} sx={{ display: 'flex', marginLeft: '30px' }}>
                                    {colormap.map((item, index) => (
                                        <button style={{ marginTop: '25px', marginRight: '15px', backgroundColor: 'white', }} key={index}
                                            className={selectedButtonId === item ? 'selectedcolor' : ''}
                                            onClick={() => handleButtonClick(item)}

                                        >{item}</button>
                                    ))}

                                </Grid>
                            </Grid>
                            <Grid item xs={12} sx={{ display: 'flex' }} className='size'>
                                <Grid item xs={3}>
                                    <Typography variant='h5' sx={{ fontFamily: 'Jura', marginTop: '10px' }} >Kích thước</Typography>
                                </Grid>
                                <Grid item xs={9} sx={{ fontFamily: 'Jura', marginLeft: '30px' }}>
                                    {sizemap.map((item, index) => (

                                        <button style={{ marginRight: '15px', marginTop: '10px', maxWidth: '40px', height: '30px', backgroundColor: 'white' }}
                                            key={index} className={selectedButtonSize === item ? 'selectedsize' : ''}
                                            onClick={() => handleButtonClickSize(item)} value={item}>{item}</button>
                                    ))}
                                </Grid>

                            </Grid>
                            <Grid item xs={12} sx={{ marginTop: '30px' }}>
                                <Typography variant='h7' sx={{ fontFamily: 'Jura' }} >Số lượng còn lại</Typography>
                                <Typography variant='h6' sx={{ fontFamily: 'Jura', marginLeft: '60px', fontWeight: 'bold' }} >{total}</Typography>

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
                                    <Typography sx={{ fontFamily: 'Jura' }}>{count}</Typography>
                                    <IconButton onClick={() => handleIncrease(item)}>
                                        <AddIcon />
                                    </IconButton>
                                </Grid>
                                <Grid item xs={4} lg={4}>
                                    <ButtonForm name={'Thêm vào giỏ hàng'} onClick={handleAddSubmit} />

                                </Grid>
                            </Grid>


                            <Grid item xs={12} className='slogan'>
                                <Grid item xs={4} lg={4}>
                                    Bảo hành keo vĩnh viễn

                                </Grid>

                                <Grid item xs={4} lg={4}>
                                    Miễn phí vận chuyển toàn quốc cho đơn hàng từ 150k
                                </Grid>
                                <Grid item xs={4} lg={4}>
                                    Đổi trả dễ dàng (trong vòng 7 ngày nếu lỗi nhà sản xuất)
                                </Grid>
                            </Grid>
                            <Grid item xs={12} className='slogan'>
                                <Grid item xs={4} lg={4}>
                                    Hotline 1900.633.349 hỗ trợ từ 8h30-21h30

                                </Grid>

                                <Grid item xs={4} lg={4}>
                                    Giao hàng tận nơi, nhận hàng xong thanh toán
                                </Grid>
                                <Grid item xs={4} lg={4}>
                                    Ưu đãi tích điểm và hưởng quyền lợi thành viên từ MWC
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