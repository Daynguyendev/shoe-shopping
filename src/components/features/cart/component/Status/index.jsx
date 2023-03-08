import * as React from 'react';
import Box from '@mui/material/Box';
import Grid from '@mui/material/Grid';
import Dialog from '@mui/material/Dialog';
import Stepper from '@mui/material/Stepper';
import Step from '@mui/material/Step';
import StepLabel from '@mui/material/StepLabel';
import statusAPI from '../../../../API/statusAPI';
import { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { useNavigate } from 'react-router-dom';
import Button from '@mui/material/Button';
import IconButton from '@mui/material/IconButton';
import RemoveRedEyeIcon from '@mui/icons-material/RemoveRedEye';

import detailinvoiceoutputAPI from '../../../../API/detailinvoiceoutputAPI';
export default function Status() {
    const { id_khach_hang } = useParams();
    const [status, setStatus] = useState();
    const [statusAll, setStatusAll] = useState([]);
    const statusList = status || [];
    const statusAllList = statusAll || [];
    const [detail, setDetail] = useState([]);
    const detailclone = detail || [];
    const [count, setCount] = useState(0);
    const [open, setOpen] = useState(false);

    const handleClickOpen = () => {
        setOpen(true);
    };
    const handleClose = () => {
        setOpen(false);
    };

    const HandleShowDetail = async (id_hd_dat) => {
        const result = await detailinvoiceoutputAPI.getDetail({ id_hd_dat: id_hd_dat })
        setDetail(result.data.data);
        setOpen(true);
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
        <Box sx={{ width: '100%', minHeight: '550px', backgroundColor: 'white', paddingTop: '50px' }}>
            {
                statusList.map((item, index) => (

                    <Grid key={index} sx={{ padding: '20px' }}>
                        <Grid sx={{ fontFamily: 'Jura' }}>
                            ID hóa đơn : {item.id_hd_dat}
                        </Grid>
                        <Grid sx={{ fontFamily: 'Jura' }}>
                            Tên : {item.ten_khach_hang}
                        </Grid>
                        <Grid sx={{ fontFamily: 'Jura' }}>
                            Địa chỉ nhận hàng: {item.ten_dia_chi}
                        </Grid>
                        <Grid sx={{ fontFamily: 'Jura' }}>
                            Ngày lập hóa đơn: {item.ngay_lap_hd_dat}
                        </Grid>
                        <Grid sx={{ paddingBottom: '30px', fontFamily: 'Jura' }}>
                            Tổng tiền: {item.tong_tien}
                        </Grid>
                        <IconButton sx={{ fontFamily: 'Jura', fontSize: '20px' }} onClick={(e) => HandleShowDetail(item.id_hd_dat)}  >
                            <RemoveRedEyeIcon /> Xem chi tiết hóa đơn
                        </IconButton>

                        {item.id_trang_thai < 4 ? (
                            <div>
                                <Stepper activeStep={item.id_trang_thai} alternativeLabel>
                                    {statusAllList.map((item, index) => (
                                        <Step key={item.id_trang_thai}>
                                            <StepLabel>{item.ten_trang_thai}</StepLabel>
                                        </Step>
                                    ))}
                                </Stepper>

                            </div>
                        ) : (<> <h1 style={{ fontFamily: 'Jura' }}>Đơn hàng của bạn đã bị hủy</h1></>)}
                        <br />
                        <br />
                        <hr />
                    </Grid>))
            }
            <Dialog fullScreen open={open} onClose={handleClose}>
                <hr />
                <Grid >
                    <Grid sx={{ display: 'flex', alignItems: 'center', textAlign: 'center', fontFamily: 'Jura' }}>
                        <Grid item xl={5} lg={5} xs={5} sm={5} md={5}>Tên sp:</Grid>
                        <Grid item xl={5} lg={5} xs={5} sm={5} md={5}>Màu sắc:</Grid>
                        <Grid item xl={5} lg={5} xs={5} sm={5} md={5}>Kích thước:</Grid>
                        <Grid item xl={5} lg={5} xs={5} sm={5} md={5}>Số Lượng:</Grid>
                        <Grid item xl={5} lg={5} xs={5} sm={5} md={5}>Hình ảnh</Grid>
                    </Grid>
                    <hr />
                    {detailclone.map((item, index) => (
                        <Grid key={index}>

                            <Grid sx={{ display: 'flex', alignItems: 'center', textAlign: 'center', fontFamily: 'Jura' }}>
                                <Grid item xl={5} lg={5} xs={5} sm={5} md={5}>{item.ten_sp}</Grid>
                                <Grid item xl={5} lg={5} xs={5} sm={5} md={5}>{item.ten_mau_sac}</Grid>
                                <Grid item xl={5} lg={5} xs={5} sm={5} md={5}> {item.ten_kich_thuoc}</Grid>
                                <Grid item xl={5} lg={5} xs={5} sm={5} md={5}> {item.so_luong}</Grid>
                                <Grid item xl={5} lg={5} xs={5} sm={5} md={5}><img style={{ width: '100px', height: '100px' }} src={item.hinh_anh_chinh} alt={index} /></Grid>
                            </Grid>
                            <hr />
                        </Grid>
                    ))}
                </Grid>
                <Button autoFocus onClick={handleClose}>
                    Thoát
                </Button>
            </Dialog>
        </Box >
    );
}
