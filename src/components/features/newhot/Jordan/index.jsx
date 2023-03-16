import React from 'react';
import { Grid } from '@material-ui/core';
import { Container } from '@mui/material';
import { useLayoutEffect } from 'react';

import './Jordan.scss'
function Jordan(props) {
    useLayoutEffect(() => {
        window.scrollTo(0, 0);
    }, []);

    return (
        <Container disableGutters maxWidth="xl" className='detail-jordan' >
            <Grid item xs={12}>
                <h1>TIN TỨC</h1>
                <h1> Nike Air Jordan 1 không chỉ là một đôi giày bóng rổ</h1>
            </Grid>
            <Grid item xs={12}>
                <p>Nike Air Jordan 1 được ra mắt năm 1985 là đôi giày ra đời sau Nike Air Jordan đầu tiên – Nike
                    Air Ship được sản xuất cho Michael Jordan do Peter C.
                    Moore thiết kế. Những phối màu đầu tiên của Giày Nike Air Jordan 1 là ” Chicago ” và ” Black Toe “</p>


            </Grid>

            <Grid item xs={12}>
                <img className="imgjordan" src="https://raw.githubusercontent.com/DayNguyen22022022/images/main/Gia%CC%80y-Nike-Air-Jordan-1-4.jpg" alt="1" />


            </Grid>
            <Grid item xs={12}>
                <p>Được sinh ra và đồng hành cùng huyền thoại bóng rổ Michael Jordan đến hiện tại,
                    Nike Air Jordan nói chung và Nike Air Jordan 1 đã vượt qua giới hạn của một đôi giày bóng rổ. Với nhiều màu sắc thời trang,
                    Nike Air Jordan còn là một biểu tượng thời trang thời thượng, năng động, gạo cội trong nền văn hoá Sneaker của thế giới.</p>

                <h2>Nike Air Jordan có giá bao nhiêu ?</h2>
            </Grid>
            <Grid item xs={12}>
                <img className="imgjordan" src="https://raw.githubusercontent.com/DayNguyen22022022/images/main/Gia%CC%80y-Nike-Air-Jordan-1-3.jpg" alt="1" />


            </Grid>
            <Grid item xs={12}>

                <p>Với lịch sử phát triển khá lâu đời, nhưng từ khởi điểm giá 1 đôi Air Jordan chỉ 65$. Hiện nay giá retail
                    một đôi Air Jordan giao động từ 120$ đến 200$ tuỳ phiên bản.
                    Đặc biệt với những đôi Air Jordan mang giá trị lịch sử, dân sưu tầm có thể bỏ số tiền lên đến 3000$ cho một đôi.
                    Tại Việt Nam, giá giày Nike Air Jordan 1 Chính Hãng giao động từ 2.500.000đ đến 4.000.000đ những phiên bản hiếm
                    có thể lên đến 7.000.000đ</p>
                <h2>Cách chọn size giày Nike Air Jordan</h2>
                <p>Thường các phiên bản low, thì các bạn có thể đi true size hoặc lớn hơn 0.5 đến 1 size tuỳ sở thích từng cá nhân.
                    Nhưng đối với những phiên bản Mid hoặc High. Các bạn phải chọn size lớn hơn ít nhất 0.5 đến 1 size. Hoặc 1.5 size nếu muốn đi thoải mái.
                    Vì phần cổ giày Air Jordan có phần ôm hơn.
                </p>
            </Grid>

            <Grid item xs={12}>
                <img className="imgjordan" src="https://raw.githubusercontent.com/DayNguyen22022022/images/main/Gia%CC%80y-Nike-Air-Jordan-1-2.jpg" alt="1" />


            </Grid>
            <Grid item xs={12}>
                <h2>Nơi bán giày Nike Air Jordan Chính Hãng</h2>
                <p>
                    Hiện tại bạn khó lòng có thể mua được một đôi Air Jordan tại trang chủ Nike.com , vì hầu hết các phối màu đều SOLD OUT .

                    Để mua Giày Nike Air Jordan chính hãng các bạn phải mất thời gian đặt hàng từ các trang bán hàng tại US, với giá thành cao,…

                    Hiện tại cửa hàng HN STORE đã có sẵn những mẫu Nike Air Jordan mới nhất với giá siêu tốt, chỉ từ 2.999K.
                </p>
                <p>Để được tư vấn thêm về các sản phẩm giày Adidas chính hãng, các bạn có thể liên hệ trực tiếp qua Fanpage: HN STORE</p>

                <img className="imgjordan" src="https://raw.githubusercontent.com/DayNguyen22022022/images/main/Gia%CC%80y-Nike-Air-Jordan-1-1.jpg" alt="1" />

            </Grid>

        </Container >
    );
}

export default Jordan;