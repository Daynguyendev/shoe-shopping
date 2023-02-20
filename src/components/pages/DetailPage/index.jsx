import React from 'react';
import Container from '@mui/material/Container';
import Grid from '@mui/material/Grid';
import './DetailPage.scss';
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';
import ImageDetail from '../ImageDetail'
import { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import productAPI from '../../API/productAPI';
import cartAPI from '../../API/cartAPI';
import { useSelector, useDispatch } from 'react-redux'
import { decrement, increment } from '../../../components/features/cart/cartSlice'
import { addItem } from '../../../components/features/cart/cartSlice';

function DetailPage() {
    let { id } = useParams();
    const [pageDetail, setPageDetail] = useState([]);

    const count = useSelector((state) => state.counter)
    const dispatch = useDispatch()

    const handleAddSubmit = async (data) => {
        let id_sp = 0;
        let ten_sp = ' ';
        let gia_sp = 0;

        pageDetail.map((item, index) => (
            id_sp = item.id_sp,
            ten_sp = item.ten_sp,
            gia_sp = item.gia_sp
        ))
        try {
            const AddItemAction = addItem({
                id_sp: id_sp,
                id_khach_hang: 8,
                ten_mau_sac: 'vang',
                ten_kich_thuoc: 42,
                so_luong: 20

            });
            const resultAddItemAction = await dispatch(AddItemAction);
            console.log(resultAddItemAction);

        } catch (error) {
            // enqueueSnackbar(error.message, { variant: 'error', autoHideDuration: 1000 });
            console.log(error);
        }
    };

    useEffect(() => {
        try {
            const fetchPageDetail = async () => {
                if (pageDetail !== null) {
                    const pageDetail = await productAPI.get(id);
                    setPageDetail(pageDetail.data.data);
                    console.log('pageDetail', pageDetail.data.data)
                }
            };
            fetchPageDetail();
        } catch (error) {
            console.log('Failed to fetch PageDetail: ', error);
        }
    }, []);




    // const fetchCart = () => cartAPI.add(pageDetail.data);



    return (
        <Container disableGutters maxWidth='xl' >
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
                                <Typography variant='h4' sx={{ fontFamily: 'Jura' }} >{item.gia_sp}{'đ'}</Typography>


                            </Grid>

                            {/* ////// */}
                            <Grid item xs={12} sx={{ display: 'flex' }} >
                                <Grid item xs={3}>
                                    <Typography variant='h5' sx={{ fontFamily: 'Jura' }} >Màu sắc</Typography>
                                </Grid>
                                <Grid item xs={9} sx={{ display: 'flex' }}>

                                    <div className='color-shoe-white'>

                                    </div>

                                    <div className='color-shoe-black'>

                                    </div>

                                    <div className='color-shoe-gray'>

                                    </div>
                                    <div className='color-shoe-lemon'>

                                    </div>
                                </Grid>

                            </Grid>

                            {/* ///// */}

                            <Grid item xs={12} sx={{ display: 'flex' }} className='size'>
                                <Grid item xs={3}>
                                    <Typography variant='h5' sx={{ fontFamily: 'Jura', }} >Kích thước</Typography>
                                </Grid>
                                <Grid item xs={9} sx={{ fontFamily: 'Jura', }}>

                                    <Button disableElevation sx={{ color: 'black' }}>
                                        39
                                    </Button>
                                    <Button disableElevation sx={{ color: 'black' }}>
                                        40
                                    </Button>
                                    <Button disableElevation sx={{ color: 'black' }}>
                                        41
                                    </Button>

                                    <Button disableElevation sx={{ color: 'black' }}>
                                        42
                                    </Button>
                                    <Button disableElevation sx={{ color: 'black' }}>
                                        43
                                    </Button>
                                    <Button disableElevation sx={{ color: 'black' }}>
                                        44
                                    </Button>
                                </Grid>

                            </Grid>

                            <Grid item xs={12} xl={6} lg={6} >
                                <hr />

                            </Grid>
                            <Grid item xs={12} className='buy-now'>
                                <Grid item xs={4} lg={2}>
                                    <Button onClick={() => dispatch(decrement())} disableElevation sx={{ backgroundColor: 'none', color: 'black', border: '1px solid red', fontFamily: 'Jura' }}>
                                        Mua ngay
                                    </Button>

                                </Grid>

                                <Grid item xs={8} lg={4}>
                                    <Button onClick={handleAddSubmit} disableElevation sx={{ backgroundColor: 'none', border: '1px solid red', fontFamily: 'Jura', color: 'black' }}>
                                        Thêm vào giỏ hàng
                                    </Button>

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



        </Container >
    );
}

export default DetailPage;