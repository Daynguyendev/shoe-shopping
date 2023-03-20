import * as React from 'react';
import './footer.scss';
import { Grid } from '@material-ui/core';
import { Container } from '@mui/material';
import FacebookIcon from '@mui/icons-material/Facebook';
import InstagramIcon from '@mui/icons-material/Instagram';
import MailOutlineIcon from '@mui/icons-material/MailOutline';
import { useNavigate } from 'react-router-dom';
function Footer(props) {
  const navigate = useNavigate();

  const handleChinhsach = () => {
    navigate(`fotter/chinhsach`);
  }
  const handleBaoHanh = () => {
    navigate(`fotter/baohanh`);
  }
  return (
    <Container maxWidth="xl"
    >
      <Grid item xs={12} className='root'>
        <Grid item xs={12} xl={3} lg={3}>
          <h3>HN STORE</h3>
          <hr />

          <p>3/2 Ninh Kiều</p>

          <p>Cần Thơ</p>

          <p>Hotline: 08 8888 8888</p>

          <p>
            <FacebookIcon className='lien-he' />
            <InstagramIcon className='lien-he' />
            <MailOutlineIcon className='lien-he' />
          </p>
        </Grid>
        <Grid item xs={1} xl={1} lg={3}></Grid>
        <Grid item xs={12} xl={3} lg={3}>
          <h3>THÔNG TIN</h3>
          <hr />

          <p onClick={handleChinhsach} style={{ cursor: 'pointer' }}>Chính sách đổi trả</p>
          <p style={{ cursor: 'pointer' }}>Chính sách vận chuyển</p>
          <p onClick={handleBaoHanh} style={{ cursor: 'pointer' }}> Chính sách bảo hành</p>
          <p style={{ cursor: 'pointer' }}> Hình thức thanh toán</p>
          <p style={{ cursor: 'pointer' }}> Hướng dẫn mua hàng</p>
          <p style={{ cursor: 'pointer' }}> Thông tin bảo mật</p>

        </Grid>
      </Grid>
      <Grid>
        <p className='end-fotter' style={{ color: 'white', fontFamily: 'Oswald' }}>2023 HN STORE bảo lưu mọi quyền</p>
      </Grid>
      <Grid item xs={12} className='img-full-fotter'>
        <Grid item xs={10}></Grid>
        <Grid item xs={2} className='img-end-fotter' >
          <img src="https://www.svgrepo.com/show/362034/visa-1.svg" alt='icon' />
          <img src="https://www.svgrepo.com/show/249409/master-card-card.svg" alt='icon' />
          <img src="https://www.svgrepo.com/show/266135/bank-transfer.svg" alt='icon' />
          <img src="https://www.svgrepo.com/show/371107/cash.svg" alt='icon' />
        </Grid>
      </Grid>
    </Container>

  );
}

export default Footer;