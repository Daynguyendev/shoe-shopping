import * as React from 'react';
import Box from '@mui/material/Box';
import Grid from '@mui/material/Grid';
import Stepper from '@mui/material/Stepper';
import Step from '@mui/material/Step';
import StepLabel from '@mui/material/StepLabel';
import statusAPI from '../../../../API/statusAPI';
import { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import invoiceoutputAPI from '../../../../API/invoiceoutputAPI';
import IconButton from '@mui/material/IconButton';
import DoneAllIcon from '@mui/icons-material/DoneAll';
import DriveEtaIcon from '@mui/icons-material/DriveEta';
import PhoneForwardedIcon from '@mui/icons-material/PhoneForwarded';
import DeleteForeverIcon from '@mui/icons-material/DeleteForever';
import detailinvoiceoutputAPI from '../../../../API/detailinvoiceoutputAPI';
import RemoveRedEyeIcon from '@mui/icons-material/RemoveRedEye';
import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import LazyLoad from 'react-lazyload';
import ArrowUpwardIcon from '@mui/icons-material/ArrowUpward';
import CheckBoxOutlineBlankIcon from '@mui/icons-material/CheckBoxOutlineBlank';
import CheckBoxIcon from '@mui/icons-material/CheckBox';
import DirectionsCarIcon from '@mui/icons-material/DirectionsCar';
import CheckCircleOutlineIcon from '@mui/icons-material/CheckCircleOutline';

export default function OrderConfirmation() {
    const { id_khach_hang } = useParams();
    const [status, setStatus] = useState();
    const [statusAll, setStatusAll] = useState([]);
    const [invoiceDetail, setInvoiceDetail] = useState([]);
    const [invoice, setInvoice] = useState();
    const [open, setOpen] = useState(false);
    const invoiceDetailDisplay = invoiceDetail || [];
    const statusList = status || [];
    const statusAllList = statusAll || [];
    const invoiceAll = invoice || []
    const [detail, setDetail] = useState([]);
    const detailclone = detail || [];
    const [fillter, setFillter] = useState();


    function reverseInvoice() {
        const newInvoiceAll = [...invoiceAll];
        newInvoiceAll.reverse();
        setInvoice(newInvoiceAll);
    }


    const handleClickOpen = () => {
        setOpen(true);
    };

    const handleClose = () => {
        setOpen(false);
    };

    useEffect(() => {
        try {
            const fetchCart = async () => {
                if (invoice !== null) {
                    const result = await invoiceoutputAPI.getAll()
                    setInvoice(result.data.data);
                    console.log('invoice', result.data.data)
                }
            };
            fetchCart();
        } catch (error) {
            console.log('Failed to fetch invoice: ', error);
        }
    }, []);

    useEffect(() => {
        try {
            const fetchCart = async () => {
                if (invoiceDetail !== null) {
                    const result = await detailinvoiceoutputAPI.getAll()
                    setInvoiceDetail(result.data.data);
                    console.log('invoiceDetail', result.data.data)
                }
            };
            fetchCart();
        } catch (error) {
            console.log('Failed to fetch invoiceDetail: ', error);
        }
    }, []);

    const HandleShowDetail = async (id_hd_dat) => {
        const result = await detailinvoiceoutputAPI.getDetail({ id_hd_dat: id_hd_dat })
        setDetail(result.data.data);
        setOpen(true);
    };

    const HandleFillter = async (id_trang_thai) => {
        const result = await statusAPI.getBillByStatus({ id_trang_thai: id_trang_thai })
        setInvoice(result.data.data);
    };

    useEffect(() => {
        try {
            const fetchCart = async () => {
                if (statusAll !== null) {
                    const result = await statusAPI.getAll();
                    setStatusAll(result.data.data);
                    console.log('statusAll', result.data.data)
                }
            };
            fetchCart();
        } catch (error) {
            console.log('Failed to fetch statusAll: ', error);
        }
    }, []);

    const handleXacNhan = async (index, id_khach_hang, id_hd_dat) => {
        const result = await statusAPI.UpdateStatus({ id_trang_thai: 1, id_khach_hang: id_khach_hang, id_hd_dat: id_hd_dat });
        const updateCart = [...invoiceAll];
        updateCart[index].id_trang_thai = 1;
        console.log('statusAll', updateCart[index].id_trang_thai);
        setInvoice(updateCart);
    }
    const handleHuy = async (index, id_khach_hang, id_hd_dat) => {
        const result = await statusAPI.UpdateStatus({ id_trang_thai: 4, id_khach_hang: id_khach_hang, id_hd_dat: id_hd_dat });
        const updateCart = [...invoiceAll];
        updateCart[index].id_trang_thai = 4;
        setInvoice(updateCart);
    }

    const handleVanChuyen = async (index, id_khach_hang, id_hd_dat) => {
        const result = await statusAPI.UpdateStatus({ id_trang_thai: 2, id_khach_hang: id_khach_hang, id_hd_dat: id_hd_dat });
        const updateCart = [...invoiceAll];
        updateCart[index].id_trang_thai = 2;
        setInvoice(updateCart);
    }

    const handleGiaoHang = async (index, id_khach_hang, id_hd_dat) => {
        const result = await statusAPI.UpdateStatus({ id_trang_thai: 3, id_khach_hang: id_khach_hang, id_hd_dat: id_hd_dat });
        const updateCart = [...invoiceAll];
        updateCart[index].id_trang_thai = 3;
        setInvoice(updateCart);
    }

    return (
        <Box sx={{ width: '100%', minHeight: '550px', backgroundColor: 'white', paddingTop: '20px' }}>

            <div style={{ textAlign: 'center' }}>
                <h1 style={{ marginLeft: '10px', color: '#800000' }}>L???c theo</h1>
                <IconButton sx={{ fontFamily: 'Oswald', fontSize: '20px' }} onClick={() => reverseInvoice()} >
                    <ArrowUpwardIcon /> S???p x???p ????n h??ng
                </IconButton>
                <IconButton sx={{ fontFamily: 'Oswald', fontSize: '20px' }} onClick={() => HandleFillter(0)} >
                    <CheckBoxOutlineBlankIcon /> ????n h??ng ch??a x??c nh???n
                </IconButton>
                <IconButton sx={{ fontFamily: 'Oswald', fontSize: '20px' }} onClick={() => HandleFillter(1)} >
                    <CheckBoxIcon /> ????n h??ng ???? x??c nh???n
                </IconButton>
                <IconButton sx={{ fontFamily: 'Oswald', fontSize: '20px' }} onClick={() => HandleFillter(2)}>
                    <DirectionsCarIcon /> ????n h??ng ??ang v???n chuy???n
                </IconButton>
                <IconButton sx={{ fontFamily: 'Oswald', fontSize: '20px' }} onClick={() => HandleFillter(3)}>
                    <CheckCircleOutlineIcon /> ????n h??ng ??ang giao h??ng
                </IconButton>
                <IconButton sx={{ fontFamily: 'Oswald', fontSize: '20px' }} onClick={() => HandleFillter(4)}>
                    <DeleteForeverIcon /> ????n h??ng ???? h???y
                </IconButton>

            </div>
            {
                invoiceAll.map((item, index) => (
                    <LazyLoad key={index} throttle={500} height={1000}>
                        <Grid key={index} sx={{ padding: '20px', textAlign: 'center', fontSize: '20px' }}>
                            <Grid sx={{ fontSize: '20px' }}>
                                ID h??a ????n : {item.id_hd_dat}
                            </Grid>
                            <Grid sx={{}}>
                                T??n : {item.ten_khach_hang}
                            </Grid>
                            <Grid sx={{}}>
                                ID kh??ch h??ng : {item.id_khach_hang}
                            </Grid>
                            <Grid sx={{}}>
                                ?????a ch??? nh???n h??ng: {item.ten_dia_chi}
                            </Grid>
                            <Grid sx={{}}>
                                Ng??y l???p h??a ????n: {item.ngay_lap_hd_dat}
                            </Grid>
                            <Grid sx={{ paddingBottom: '30px' }}>
                                T???ng ti???n: {item.tong_tien}
                            </Grid >
                            <IconButton sx={{ fontSize: '20px' }} onClick={(e) => HandleShowDetail(item.id_hd_dat)}  >
                                <RemoveRedEyeIcon /> Xem chi ti???t h??a ????n
                            </IconButton>
                            <br />
                            <br />
                            < Stepper activeStep={item.id_trang_thai} alternativeLabel >
                                {
                                    statusAllList.map((item, index) => (
                                        <Step key={item.id_trang_thai}>
                                            <StepLabel>{item.ten_trang_thai}</StepLabel>
                                        </Step>
                                    ))
                                }
                            </Stepper>
                            <Grid sx={{ textAlign: 'center', alignItems: 'center' }}>

                                <IconButton sx={{ fontSize: '20px' }} onClick={() => handleXacNhan(index, item.id_khach_hang, item.id_hd_dat)}  >
                                    <DoneAllIcon /> X??c nh???n
                                </IconButton>
                                <IconButton sx={{ fontSize: '20px' }} onClick={() => handleVanChuyen(index, item.id_khach_hang, item.id_hd_dat)}>
                                    <DriveEtaIcon /> ??ang v???n chuy???n
                                </IconButton>
                                <IconButton sx={{ fontSize: '20px' }} onClick={() => handleGiaoHang(index, item.id_khach_hang, item.id_hd_dat)}>
                                    <PhoneForwardedIcon /> Ho??n th??nh
                                </IconButton>
                                <IconButton sx={{ fontSize: '20px' }} onClick={() => handleHuy(index, item.id_khach_hang, item.id_hd_dat)}>
                                    <DeleteForeverIcon /> H???y
                                </IconButton>
                            </Grid >
                            <br />
                            <br />
                            <hr />
                        </Grid>
                    </LazyLoad>))

            }
            <Dialog fullScreen open={open} onClose={handleClose}>
                <hr />
                <Grid >
                    <Grid sx={{ display: 'flex', alignItems: 'center', textAlign: 'center', fontFamily: 'Oswald', fontSize: '20px' }}>
                        <Grid item xl={5} lg={5} xs={5} sm={5} md={5}>T??n sp:</Grid>
                        <Grid item xl={5} lg={5} xs={5} sm={5} md={5}>M??u s???c:</Grid>
                        <Grid item xl={5} lg={5} xs={5} sm={5} md={5}>K??ch th?????c:</Grid>
                        <Grid item xl={5} lg={5} xs={5} sm={5} md={5}>S??? L?????ng:</Grid>
                        <Grid item xl={5} lg={5} xs={5} sm={5} md={5}>H??nh ???nh</Grid>
                    </Grid>
                    <hr />
                    {detailclone.map((item, index) => (
                        <Grid key={index}>
                            <Grid sx={{ display: 'flex', alignItems: 'center', textAlign: 'center', fontFamily: 'Oswald', fontSize: '20px' }}>
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
                    Tho??t
                </Button>
            </Dialog>
        </Box >
    );
}
