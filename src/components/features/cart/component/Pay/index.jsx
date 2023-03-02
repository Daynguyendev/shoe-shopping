import React from 'react';
import PropTypes from 'prop-types';
import Container from '@mui/material/Container';
import Grid from '@mui/material/Grid';
import Box from '@mui/material/Box';
import './Pay.scss';
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
Pay.propTypes = {

};

function Pay(props) {
    let cartLocal = JSON.parse(localStorage.getItem('cart')) || [];
    let total = 0;
    let ship = 30000;
    cartLocal.map((item, index) => (
        total += item.gia_sp * item.so_luong
    ))

    return (
        <Container disableGutters maxWidth='xl' sx={{
            color: 'black', padding: '12px'
        }} >
            <Typography variant='h6' sx={{ fontFamily: 'Jura' }}>
                Cộng giỏ hàng
            </Typography>
            <hr />
            <Typography sx={{ fontFamily: 'Jura' }}>
                Tạm tính : {total}
            </Typography>
            <hr />
            <Typography sx={{ fontFamily: 'Jura' }}>
                Giao hàng : {ship}
            </Typography>
            <hr />
            <Typography sx={{ fontFamily: 'Jura' }}>
                Tổng : {total + ship}
            </Typography>
            <hr />
            <Button variant="contained" disableElevation fullWidth sx={{ backgroundColor: 'Coral', fontFamily: 'Jura' }}>
                Tiến hành thanh toán
            </Button>

        </Container >

    );
}

export default Pay;