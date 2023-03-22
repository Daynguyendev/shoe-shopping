import React from 'react';
import { Grid } from '@material-ui/core';
import { Container } from '@mui/material';
import { useLayoutEffect } from 'react';
import './ReturnPolicy.scss'
function ReturnPolicy(props) {
    useLayoutEffect(() => {
        window.scrollTo(0, 0);
    }, []);


    return (
        <Container disableGutters maxWidth="xl" sx={{ padding: '100px  40px 40px 40px', minHeight: '800px', backgroundColor: 'white', textAlign: 'center', justifyContent: 'center', }}  >
            <Grid item xs={12}>

                <h1> Chính sách đổi/trả sản phẩm tại HN STORE áp dụng như sau:</h1>
                <h2> Sản phẩm được đổi:</h2>

            </Grid>
            <Grid item xs={12}>
                <p>Áp dụng cho khi Khách Hàng mua trực tiếp tại cửa hàng HN STORE hoặc Đặt hàng Online.
                    Sản phẩm không nằm trong chương trình giảm giá hoặc khuyến mãi của cửa hàng. ( Hàng giảm giá vui lòng không đổi trả )
                    Còn đủ hoá đơn mua hàng – Bao bì của nhà sản xuất, tag giấy, tem treo của nhà sản xuất và cửa hàng.
                    Sản phẩm phải còn nguyên trạng ban đầu của nhà sản xuất, không hư hỏng, không qua sử dụng hoặc giặt phơi.
                    Giá trị sản phẩm đổi phải bằng hoặc cao hơn giá trị sản phẩm mua ban đầu. ( Không hoàn tiền đối với sản phẩm đổi )
                    Thời gian đổi hàng là 3 ngày kể từ ngày mua hàng hoặc nhận hàng .( Khách mua Online có nhu cầu đổi hàng phải báo trước trong vòng 03 ngày kể từ ngày nhận hàng,
                    thời gian The HN STORE nhận hàng đổi lại là 30 ngày kể từ ngày nhận được thông báo).</p>


            </Grid>
            <Grid item xs={12}>
                <h2>Sản phẩm được trả:</h2>
            </Grid>
            <Grid item xs={12}>

                <p>Chỉ áp dụng khi khách mua Online.
                    Sản phẩm không nằm trong chương trình giảm giá hoặc khuyến mãi của cửa hàng. ( Hàng giảm giá vui lòng không đổi trả )
                    Còn đủ hoá đơn mua hàng – Bao bì của nhà sản xuất, tag giấy, tem treo của nhà sản xuất và cửa hàng.
                    Sản phẩm phải còn nguyên trạng ban đầu của nhà sản xuất, không hư hỏng, không qua sử dụng hoặc giặt phơi.
                    Hàng nhận được không giống với quy cách sản phẩm Khách hàng đặt mua tại cửa hàng: về hình ảnh, mẫu mã, màu sắc, kích thước, chất lượng sản phẩm cửa hàng cam kết,… Nếu sản phẩm đúng như cam kết ban đầu của cửa hàng, và nhu cầu của Quý khách thì sản phảm áp dụng đổi không được trả hàng.
                    Thời gian trả hàng là 3 ngày kể từ ngày nhận hàng .( Quý Khách nhu cầu trả hàng phải báo trước trong vòng 03 ngày kể từ ngày nhận hàng, thời gian HN STORE nhận lại hàng trả là 30 ngày kể từ ngày nhận được thông báo ).

                    Lưu ý: Chi phí phát sinh trong quá trình đổi trả hàng khách hàng chịu trách nhiệm thanh toán.

                    Mọi thông tin chi tiết quý khách vui lòng liên hệ hotline 08 8888 8888 để được giải đáp.</p>
            </Grid>

        </Container >
    );
}

export default ReturnPolicy;