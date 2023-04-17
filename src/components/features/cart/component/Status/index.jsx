import * as React from 'react';
import Box from '@mui/material/Box';
import Grid from '@mui/material/Grid';
import Stepper from '@mui/material/Stepper';
import Step from '@mui/material/Step';
import StepLabel from '@mui/material/StepLabel';
import statusAPI from '../../../../API/statusAPI';
import { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { useNavigate } from 'react-router-dom';
import Button from '@mui/material/Button';
import IconButton from '@mui/material/IconButton';
import detailinvoiceoutputAPI from '../../../../API/detailinvoiceoutputAPI';
import { useSnackbar } from 'notistack';
import './Status.scss'
import DoneAllIcon from '@mui/icons-material/DoneAll';
import DeleteForeverIcon from '@mui/icons-material/DeleteForever';
import DetailProductAPI from '../../../../API/detailproductAPI'
import checkoutAPI from '../../../../API/checkoutAPI';
import ListItemDetail from '../ListItemDetail';

export default function Status() {
    const { id_khach_hang } = useParams();
    const [status, setStatus] = useState();
    const [statusAll, setStatusAll] = useState([]);
    const statusList = status || [];
    const statusAllList = statusAll || [];

    const [idBill, setIdBill] = useState()

    const handleRemove = async (index, id_khach_hang, id_hd_dat) => {
        const result = await statusAPI.UpdateStatus({ id_trang_thai: 4, id_khach_hang: id_khach_hang, id_hd_dat: id_hd_dat });
        setIdBill(id_hd_dat);
        const resultDetailInvoice = await detailinvoiceoutputAPI.getDetail({ id_hd_dat: id_hd_dat })
        for (let i = 0; i < (resultDetailInvoice.data.data).length; i++) {
            const results = await DetailProductAPI.UpdateQuantityRemove({
                so_luong: resultDetailInvoice.data.data[i].so_luong,
                id_sp: resultDetailInvoice.data.data[i].id_sp,
                id_mau_sac: resultDetailInvoice.data.data[i].id_mau_sac,
                id_kich_thuoc: resultDetailInvoice.data.data[i].id_kich_thuoc,
            })

        }
        const updateCart = [...statusList];
        updateCart[index].id_trang_thai = 4;
        setStatus(updateCart);
    }

    const handleFinish = async (index, id_khach_hang, id_hd_dat) => {
        const result = await statusAPI.UpdateStatus({ id_trang_thai: 3, id_khach_hang: id_khach_hang, id_hd_dat: id_hd_dat });
        const updateCart = [...statusList];
        updateCart[index].id_trang_thai = 3;
        setStatus(updateCart);
    }


    const HandlecheckoutVnpay = async (id_hd_dat, tong_tien) => {
        const result = await checkoutAPI.addCheckout({
            amount: tong_tien,
            id_hd: id_hd_dat,
            bankCode: 'VNBANK',
        })
        window.open(result.data.url, '_blank');

    };
    useEffect(() => {
        try {
            const fetchCart = async () => {
                if (status !== null) {
                    const result = await statusAPI.getStatus(id_khach_hang);
                    setStatus(result.data.data);
                }
            };
            fetchCart();
        } catch (error) {
            console.log('Failed to fetch status: ', error);
        }
    }, []);

    useEffect(() => {
        try {
            const fetchCart = async () => {
                if (statusAll !== null) {
                    const result = await statusAPI.getAll();
                    setStatusAll(result.data.data);
                }
            };
            fetchCart();
        } catch (error) {
            console.log('Failed to fetch statusAll: ', error);
        }
    }, []);

    return (
        <Box sx={{ width: '100%', minHeight: '550px', backgroundColor: 'white', paddingTop: '60px' }}>
            {
                statusList.map((item, index) => (
                    < Grid key={index} sx={{ padding: '20px', textAlign: 'start', border: '10px solid black' }}>
                        <Grid  >


                            <Grid sx={{ fontFamily: 'Oswald', fontSize: '20px' }} >

                                Tên : {item.ten_khach_hang}
                            </Grid>
                            <Grid sx={{ fontFamily: 'Oswald', fontSize: '20px' }} >

                                Ngày đặt hàng : {item.ngay_lap_hd_dat.slice(0, 10)}
                            </Grid>
                            <Grid sx={{ fontFamily: 'Oswald', fontSize: '20px' }} >

                                Địa chỉ nhận hàng: {item.ten_dia_chi}
                            </Grid>

                        </Grid>
                        <Grid sx={{ fontFamily: 'Oswald', fontSize: '20px', textAlign: 'center', alignItems: 'center', fontWeight: 'bold' }} > Danh sách sản phẩm hóa đơn {item.id_hd_dat}
                        </Grid>



                        <ListItemDetail id_hd={item.id_hd_dat} id_trang_thai={item.id_trang_thai} id_khach_hang={id_khach_hang} />

                        <Grid sx={{ textAlign: 'end', fontFamily: 'Oswald', fontSize: '20px', fontWeight: 'bold', marginTop: '20px' }}>
                            Tổng tiền: {item.tong_tien.toLocaleString('vi-VN', { style: 'currency', currency: 'VND' })}
                        </Grid>
                        <Grid sx={{ textAlign: 'end', paddingBottom: '30px', fontFamily: 'Oswald', fontSize: '20px' }}>
                            {item.ten_trang_thai_thanh_toan === 'Đã thanh toán' ? ('Đã thanh toán bằng ' + item.ten_thanh_toan) : item.id_phuong_thuc_tt == 2 && item.id_trang_thai <= 3 ? ((<Button variant='contained' sx={{ marginTop: '5px', fontSize: '14px', marginLeft: '20px', width: '180px', height: '40px', color: 'white', backgroundColor: ' #d2143a', marginBottom: '20px' }} onClick={(e) => HandlecheckoutVnpay(item.id_hd_dat, item.tong_tien)}>
                                Thanh toán ngay
                            </Button>)) : ('')}
                        </Grid>


                        {item.id_trang_thai < 4 ? (
                            <div >
                                <Stepper activeStep={item.id_trang_thai} alternativeLabel>
                                    {statusAllList.map((item1, index) => (
                                        <Step key={item1.id_trang_thai}>
                                            <StepLabel StepIconProps={{ style: { color: index === item.id_trang_thai ? 'red' : '#f6a2b3' } }}>
                                                {item1.ten_trang_thai}
                                            </StepLabel>
                                        </Step>
                                    ))}
                                </Stepper>

                            </div>
                        ) : (<> <h2 style={{ fontFamily: 'Oswald' }}>Đơn hàng đã bị hủy</h2></>)}
                        {item.id_trang_thai == 2 ? (<> <IconButton onClick={() => handleFinish(index, item.id_khach_hang, item.id_hd_dat)} sx={{ fontFamily: 'Oswald', fontSize: '20px', display: 'flex', left: '45%' }}>
                            <DoneAllIcon />Đã nhận hàng
                        </IconButton></>) : ('')}
                        {item.id_trang_thai == 0 ? (<> <IconButton onClick={() => handleRemove(index, item.id_khach_hang, item.id_hd_dat)} sx={{ fontFamily: 'Oswald', fontSize: '20px', display: 'flex', left: '45%' }}>
                            <DeleteForeverIcon />Hủy đơn hàng
                        </IconButton>
                        </>) : ('')}
                    </Grid>))

            }
        </Box >
    );
}
