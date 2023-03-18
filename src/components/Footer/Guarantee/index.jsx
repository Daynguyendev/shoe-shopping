import React from 'react';
import { Grid } from '@material-ui/core';
import { Container } from '@mui/material';
import { useLayoutEffect } from 'react';
import './Guarantee.scss'
function Guarantee(props) {
    useLayoutEffect(() => {
        window.scrollTo(0, 0);
    }, []);


    return (
        <Container disableGutters maxWidth="xl" className='detail-adidas' sx={{ paddingTop: '100px' }} >
            <Grid item xs={12}>

                <h1> Chính sách Bảo Hành sản phẩm tại HN STORE áp dụng như sau:</h1>
                <h2> ĐIỀU KIỆN BẢO HÀNH:</h2>

            </Grid>
            <Grid item xs={12}>
                <p>Sản phẩm bảo hành do HN STORE phân phối – Có hoá đơn mua hàng hoặc Phiếu Bảo Hành của HN STORE.
                    Quý Khách vui lòng chú ý khi sử dụng để tránh làm hư hỏng.</p>


            </Grid>
            <Grid item xs={12}>
                <h2>1. Chế độ bảo hành miễn phí:</h2>
            </Grid>
            <Grid item xs={12}>

                <p>HN STORE áp dụng chế độ bảo hành miễn phí đối với các sản phẩm có thời hạn
                    bảo hành 12 tháng kể từ ngày mua với các lỗi kỹ thuật được xác định phát sinh từ nhà sản xuất như: xúc chỉ, bung đế,…</p>
            </Grid>

            <Grid item xs={12}>
                <h2>2. Chế độ bảo hành tính phí:</h2>
            </Grid>
            <Grid item xs={12}>
                <p>Đối với các sản phẩm có thời hạn Bảo Hành trên 12 tháng kể từ ngày mua chúng tôi sẽ áp dụng chính sách bảo hành có tính phí tuỳ theo mức độ hư hỏng của sản phẩm.</p>
                <p> Các sản phẩm bị lỗi, hư hỏng phát sinh trong quá trình sử dụng do lỗi người dùng.</p>
                <p>Lưu ý: các chi phí phát sinh trong quá trình bảo hành khách hàng chịu trách nhiệm thanh toán.</p>
                <p> Mọi thông tin chi tiết quý khách vui lòng liên hệ hotline 08 8888 8888 để được giải đáp.</p>
            </Grid>

        </Container >
    );
}

export default Guarantee;