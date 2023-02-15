import * as React from 'react';
import PropTypes from 'prop-types';
import './footer.scss';
import { Grid } from '@material-ui/core';
import { Container } from '@mui/material';
import FacebookIcon from '@mui/icons-material/Facebook';
import InstagramIcon from '@mui/icons-material/Instagram';
import MailOutlineIcon from '@mui/icons-material/MailOutline';
function Footer(props) {
  return (
    <Container maxWidth="xl"
    >
      <Grid item xs={12} className='root'>
        <Grid item xs={12} xl={3} lg={3}>
          <h3>HN STORE</h3>
          <hr />
          <p>
            3/2 Ninh Kiều
            <br />
            Cần Thơ

            <br />
            Hotline: 08 8888 8888
            <br />

            <FacebookIcon className='lien-he' />
            <InstagramIcon className='lien-he' />
            <MailOutlineIcon className='lien-he' />


          </p>

        </Grid>
        <Grid item xs={1} xl={1} lg={3}></Grid>
        <Grid item xs={12} xl={3} lg={3}>
          <h3>THÔNG TIN</h3>
          <hr />
          <p>
            Chính sách đổi trả
            <br />
            Chính sách vận chuyển
            <br />
            Chính sách bảo hành
            <br />
            Hình thức thanh toán
            <br />
            Hướng dẫn mua hàng
            <br />
            Thông tin bảo mật
          </p>

        </Grid>
      </Grid>

      <Grid>
        <p className='end-fotter' style={{ color: 'white', fontFamily: 'Jura' }}>2023 HN STORE bảo lưu mọi quyền</p>
      </Grid>
      <Grid item xs={12} className='img-full-fotter'>
        <Grid item xs={10}></Grid>
        <Grid item xs={2} className='img-end-fotter' >
          <img src="https://www.svgrepo.com/show/362034/visa-1.svg" />
          <img src="https://www.svgrepo.com/show/249409/master-card-card.svg" />
          <img src="https://www.svgrepo.com/show/266135/bank-transfer.svg" />
          <img src="https://www.svgrepo.com/show/371107/cash.svg" />


        </Grid>

      </Grid>

    </Container>

  );
}

export default Footer;