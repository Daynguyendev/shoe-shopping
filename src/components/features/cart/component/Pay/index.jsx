import React from 'react';
import Container from '@mui/material/Container';
import './Pay.scss';
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';
import { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { useNavigate } from 'react-router-dom';
import { useSelector } from 'react-redux';
import cartAPI from '../../../../API/cartAPI';
import DetailProductAPI from '../../../../API/detailproductAPI';
import userAPI from '../../../../API/userAPI';

function Pay({ cart, setCart }) {
    let { id } = useParams();
    let cartUser = JSON.parse(localStorage.getItem('cartUser')) || [];
    const navigate = useNavigate();
    const [total, setTotal] = useState(0)
    const [totalShip, setTotalShip] = useState(0)
    const data = cart || [];
    const [productTotal, setProductTotal] = useState()
    const [idUser, setIdUser] = useState();
    const isLogin = useSelector((state) => state?.user.isLogin);
    let email_khach_hang = useSelector((state) => state?.user?.user?.email_khach_hang);
    const now = new Date();
    const mysqlDateString = now.toISOString().slice(0, 19).replace('T', ' ');
    useEffect(() => {
        try {
            const fetchIdUser = async () => {
                const res = await userAPI.getID({ email_khach_hang: email_khach_hang });
                setIdUser(res.data.data[0].id_khach_hang)
            };
            fetchIdUser();
        } catch (error) {
            console.log('Failed to fetch idUser: ', error);
        }
    }, []);


    const handleCheckout = async () => {
        if (isLogin) {
            const resultt = await cartAPI.getDetail(idUser)
            setProductTotal(resultt.data.data);
            for (let i = 0; i < cartUser.length; i++) {
                const item = cartUser[i];
                const result = await DetailProductAPI.getQuantityCart({
                    id_sp: item.id_sp,
                    ten_mau_sac: item.ten_mau_sac,
                    ten_kich_thuoc: item.ten_kich_thuoc,
                });
                if (
                    result.data.data.so_luong_kho - resultt.data.data[i].so_luong >= 0

                ) {
                    continue;
                }
                else
                    alert('Sản phẩm không còn đủ số lượng ' + result.data.data.ten_sp + ' ' + result.data.data.ten_mau_sac + ' ' + result.data.data.ten_kich_thuoc + ' Chỉ còn ' + result.data.data.so_luong_kho);
                return;
            }
            navigate(`/checkout/${id}`);
        } else {
            navigate(`/login`);
        }
    };

    useEffect(() => {
        const NewArray = [...data];
        let sum = parseInt(0);
        for (let i = 0; i < NewArray.length; i++) {
            if (mysqlDateString >= NewArray[i]?.ngay_bat_dau && mysqlDateString <= NewArray[i]?.ngay_ket_thuc) {
                sum = (sum + parseInt(NewArray[i].gia_sp - (NewArray[i].phan_tram_giam / 100 * NewArray[i].gia_sp)) * NewArray[i].so_luong)
            }
            else
                sum = sum + parseInt(NewArray[i]?.gia_sp * NewArray[i].so_luong);
        }
        console.log('test sum', sum);
        setTotal(sum);
    }, [data]);

    useEffect(() => {
        const NewArray = [...data];
        const sum = NewArray.reduce((total, product) => {
            return total + product.so_luong;
        }, 0);
        let Number = Math.ceil(sum / 3);
        const ship = Number * 30000;
        setTotalShip(ship)
    }, [data]);

    return (
        <Container disableGutters maxWidth='xl' sx={{
            color: 'black', padding: '12px'
        }} >

            <Typography variant='h6' sx={{ fontFamily: 'Oswald' }}>
                Cộng giỏ hàng
            </Typography>
            <hr />

            <Typography sx={{ fontFamily: 'Oswald' }}>
                Tạm tính : {total}
            </Typography>
            <hr />
            <Typography sx={{ fontFamily: 'Oswald' }}>
                Giao hàng : {totalShip}
            </Typography>
            <hr />
            <Typography sx={{ fontFamily: 'Oswald' }}>
                Tổng : {total + totalShip}
            </Typography>
            <hr />
            <Button onClick={handleCheckout} variant="contained" disableElevation fullWidth sx={{ backgroundColor: 'Coral', fontFamily: 'Oswald' }}>
                Tiến hành thanh toán
            </Button>
        </Container >
    );
}

export default Pay;