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
    return (
        <Container disableGutters maxWidth='xl' sx={{
            color: 'black'
        }}>
            <Typography variant='h6' sx={{ fontFamily: 'Jura' }}>
                Cộng giỏ hàng
            </Typography>
            <hr />
            <Typography sx={{ fontFamily: 'Jura' }}>
                Tạm tính
            </Typography>
            <hr />
            <Typography sx={{ fontFamily: 'Jura' }}>
                Giao hàng
            </Typography>
            <hr />
            <Typography sx={{ fontFamily: 'Jura' }}>
                Tổng
            </Typography>
            <hr />
            <Button variant="contained" disableElevation fullWidth sx={{ backgroundColor: 'Coral', fontFamily: 'Jura' }}>
                Tiến hành thanh toán
            </Button>
            <hr />
            <Typography sx={{ fontFamily: 'Jura' }}>
                Phiếu ưu đãi
            </Typography>
            <TextField id="outlined-basic" variant="outlined" fullWidth />
            <hr />
            <Button variant="contained" disableElevation fullWidth sx={{ backgroundColor: 'Coral', fontFamily: 'Jura', marginBottom: '20px' }}>
                Áp dụng
            </Button>

        </Container >

    );
}

export default Pay;