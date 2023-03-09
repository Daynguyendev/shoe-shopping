import React from 'react';
import { Grid } from '@material-ui/core';
import './NewHot.scss'
import { Container } from '@mui/material';
import DetailNewHot from './../DetailNewHot';
import { useNavigate } from 'react-router-dom';
function NewHot(props) {
    const navigate = useNavigate();

    const handleAdidas = () => {
        navigate(`/adidas`)
    }
    return (
        <Container disableGutters maxWidth="xl"  >
            <Grid item xs={12} className='new-hot'>
                <Grid item xs={4} sm={4} md={4} lg={4} xl={4}>
                    <hr />
                </Grid>
                <Grid item xs={4} sm={4} md={4} lg={4} xl={4}>
                    <h1>Tin tức</h1>
                </Grid>
                <Grid item xs={4} sm={4} md={4} lg={4} xl={4}>
                    <hr />
                </Grid>
            </Grid>

            <Grid className='tin-tuc'>
                <Grid item xs={12} sm={12} md={12} lg={12} xl={12}>
                    <DetailNewHot Background={'https://raw.githubusercontent.com/DayNguyen22022022/images/main/nike2.jpg'} title={'Nike Air Jordan 1 đôi giày không thể thiếu trong bộ sưu tập mỗi tín đồ Sneaker'} />
                </Grid>
                <Grid item xs={12} sm={12} md={12} lg={12} xl={12}>
                    <DetailNewHot Background={'https://raw.githubusercontent.com/DayNguyen22022022/images/main/adidas1.jpg'}
                        title={'Giày Adidas Ultra Boost 2021 là một đôi giày thế nào ?'} onClick={() => handleAdidas()} />
                </Grid>
            </Grid>
        </Container >
    );
}

export default NewHot;