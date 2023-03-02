import React from 'react';
import Container from '@mui/material/Container';
import './Pay.scss';
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';
import { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { useNavigate } from 'react-router-dom';
import { useSelector } from 'react-redux';

Pay.propTypes = {

};

function Pay({ cart, setCart }) {
    let { id } = useParams();
    const navigate = useNavigate();
    const [total, setTotal] = useState(0)
    const [totalShip, setTotalShip] = useState(0)
    const data = cart || [];
    const isLogin = useSelector((state) => state.user.isLogin);

    const handleCheckout = () => {
        if (isLogin) {
            navigate(`/checkout/${id}`)
        } else

            navigate(`/login`)
    }

    useEffect(() => {

        const NewArray = [...data];
        const sum = NewArray.reduce((total, product) => {
            return total + product.so_luong * product.gia_sp;
        }, 0);

        setTotal(sum);
    }
        , [data]);




    useEffect(() => {

        const NewArray = [...data];
        const sum = NewArray.reduce((total, product) => {
            return total + product.so_luong;
        }, 0);

        let Number = Math.ceil(sum / 3);
        const ship = Number * 30000;
        setTotalShip(ship)
    }

        , [data]);



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
                Giao hàng : {totalShip}
            </Typography>
            <hr />
            <Typography sx={{ fontFamily: 'Jura' }}>
                Tổng : {total + totalShip}
            </Typography>
            <hr />
            <Button onClick={handleCheckout} variant="contained" disableElevation fullWidth sx={{ backgroundColor: 'Coral', fontFamily: 'Jura' }}>
                Tiến hành thanh toán
            </Button>

        </Container >


    );
}

export default Pay;