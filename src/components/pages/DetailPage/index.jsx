import React from 'react';
import Container from '@mui/material/Container';
import Grid from '@mui/material/Grid';
import './DetailPage.scss';
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';
import { useNavigate } from 'react-router-dom';
import ImageDetail from '../ImageDetail'



function DetailPage(props) {

    const navigate = useNavigate();
    const handlecClickProduct = () => {
        navigate(`/`)

    }


    return (
        <Container disableGutters maxWidth='xl' >
            <Grid item xs={12} className='detail-page' minHeight='885px' sx={{ display: { xs: 'block', sm: 'flex', lg: 'flex', xl: 'flex' } }} >
                <Grid item xs={12} lg={7} xl={7}  >



                    < ImageDetail />


                </Grid>

                <Grid item xs={12} lg={6} xl={6} >
                    <Typography variant='h4' sx={{ fontFamily: 'Jura' }} >Adilette Aqua Slides</Typography>

                    <Grid item xs={1} >
                        <hr />

                    </Grid>
                    <Grid item xs={12} >
                        <Typography variant='h4' sx={{ fontFamily: 'Jura' }} >280.000đ</Typography>


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
                            <Button disableElevation sx={{ backgroundColor: 'none', color: 'black', border: '1px solid red', fontFamily: 'Jura' }}>
                                Mua ngay
                            </Button>

                        </Grid>

                        <Grid item xs={8} lg={4}>
                            <Button disableElevation sx={{ backgroundColor: 'none', border: '1px solid red', fontFamily: 'Jura', color: 'black' }}>
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

            </Grid>



        </Container >
    );
}

export default DetailPage;