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
import RemoveRedEyeIcon from '@mui/icons-material/RemoveRedEye';
import PageRateProduct from '../../../product/component/PageRateProduct';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';
import detailinvoiceoutputAPI from '../../../../API/detailinvoiceoutputAPI';
import UploadImage from '../../../admin/components/UploadImage';
import ButtonForm from '../../../../Formcontrol/ButtonForm';
import Rating from '@mui/material/Rating';
import StarIcon from '@mui/icons-material/Star';
import TextField from '@mui/material/TextField';
import { useSnackbar } from 'notistack';
import rateAPI from '../../../../API/rateAPI';
import Typography from '@mui/material/Typography';
import DisabledByDefaultIcon from '@mui/icons-material/DisabledByDefault';
import Stack from '@mui/material/Stack';
import invoiceoutputAPI from '../../../../API/invoiceoutputAPI';
import './Status.scss'
import DoneAllIcon from '@mui/icons-material/DoneAll';
import DeleteForeverIcon from '@mui/icons-material/DeleteForever';
import DetailProductAPI from '../../../../API/detailproductAPI'
export default function Status() {
    const { id_khach_hang } = useParams();
    const { enqueueSnackbar } = useSnackbar();
    const { id } = useParams();
    const [rate, setRate] = useState([]);
    const [status, setStatus] = useState();
    const [statusAll, setStatusAll] = useState([]);
    const statusList = status || [];
    const statusAllList = statusAll || [];
    const [detail, setDetail] = useState([]);
    const detailclone = detail || [];
    const [idSP, setidSP] = useState('');
    const [open, setOpen] = useState(false);
    const [open2, setOpen2] = useState(false);
    const [nameRate, setNameRate] = useState();
    const [content, setContent] = useState();
    const [imgRate, setImgRate] = useState();
    const [start, setStart] = useState(2)
    const [statusRate, setStatusRate] = useState()
    const [idBill, setIdBill] = useState()
    let statusRateList = statusRate || [];
    const [invoice, setInvoice] = useState();
    const invoiceAll = invoice || []

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
    const handleClickOpen = () => {
        setOpen(true);
    };
    const handleClose = () => {
        setOpen(false);
    };

    const handleClickOpen2 = async (id_sp) => {
        setidSP(id_sp)
        const checkrate = await invoiceoutputAPI.checkRate({ id_sp: id_sp, id_hd_dat: idBill }, id_khach_hang);
        if (checkrate.data.data.length > 0) {
            alert('Bạn đã đánh giá sản phẩm này rồi')

        }
        else
            setOpen2(true);
    };
    const handleClose2 = () => {
        setOpen2(false);
    };

    const handleSubmit = async (event) => {

        const result = await rateAPI.add({
            id_khach_hang: id_khach_hang,
            id_hd_dat: idBill,
            ten_nguoi_danh_gia: nameRate,
            noi_dung: content,
            id_sp: idSP,
            hinh_anh_danh_gia: imgRate,
            so_sao_danh_gia: start,
        })
            .then(function (response) {

                enqueueSnackbar('Đánh giá thành công', {
                    variant: 'success',
                    autoHideDuration: 800,
                    anchorOrigin: {
                        vertical: 'top',
                        horizontal: 'right',
                    },
                }); setOpen2(false);
            })
            .catch(error => enqueueSnackbar(error.message, { variant: 'error', autoHideDuration: 1000 })
            );
    };


    const HandleShowDetail = async (id_hd_dat, id_sp) => {
        setIdBill(id_hd_dat);
        const result = await detailinvoiceoutputAPI.getDetail({ id_hd_dat: id_hd_dat })
        const results = await invoiceoutputAPI.getByIdBill({ id_hd_dat: id_hd_dat })
        setDetail(result.data.data);
        setStatusRate(results.data.data)
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
    console.log('test statusList ',)


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

                                Hóa đơn : {item.id_hd_dat}
                            </Grid>

                            <Grid sx={{ fontFamily: 'Oswald', fontSize: '20px' }} >

                                Tên : {item.ten_khach_hang}
                            </Grid>
                            <Grid sx={{ fontFamily: 'Oswald', fontSize: '20px' }} >

                                Địa chỉ nhận hàng: {item.ten_dia_chi}
                            </Grid>

                        </Grid>

                        <Button sx={{ fontSize: '10px', width: '120px', height: '30px', color: 'black', backgroundColor: 'DeepSkyBlue', marginBottom: '20px' }} onClick={(e) => HandleShowDetail(item.id_hd_dat, item.id_sp)}>
                            Xem chi tiết hóa đơn
                        </Button>
                        <Grid sx={{ textAlign: 'end', paddingBottom: '30px', fontFamily: 'Oswald', fontSize: '20px', fontWeight: 'bold' }}>
                            Tổng tiền: {item.tong_tien.toLocaleString('vi-VN', { style: 'currency', currency: 'VND' })}
                        </Grid>
                        {/* {
                            detailclone.map((item, index) => (
                                <Grid key={index}>

                                    <Grid sx={{ display: 'flex', alignItems: 'center', textAlign: 'center', fontFamily: 'Oswald', fontSize: '20px' }}>
                                        <Grid className='detail-title-status' item xl={5} lg={5} xs={5} sm={5} md={5}><img className='img-detail-status' src={item.hinh_anh_chinh} alt={index} /></Grid>
                                        <Grid className='detail-title-status' item xl={5} lg={5} xs={5} sm={5} md={5}>{item.ten_sp}</Grid>
                                        <Grid className='detail-title-status' item xl={5} lg={5} xs={5} sm={5} md={5}>{item.ten_mau_sac}</Grid>
                                        <Grid className='detail-title-status' item xl={5} lg={5} xs={5} sm={5} md={5}> {item.ten_kich_thuoc}</Grid>
                                        <Grid className='detail-title-status' item xl={5} lg={5} xs={5} sm={5} md={5}> {item.so_luong}</Grid>
                                    </Grid>
                                    <hr />
                                </Grid>
                            ))
                        } */}


                        {item.id_trang_thai < 4 ? (
                            <div >
                                <Stepper activeStep={item.id_trang_thai} alternativeLabel>
                                    {statusAllList.map((item1, index) => (
                                        <Step key={item1.id_trang_thai}>
                                            <StepLabel StepIconProps={{ style: { color: index === item.id_trang_thai ? 'red' : 'yellow' } }}>
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

            <Dialog fullScreen open={open} onClose={handleClose}>
                <hr />
                <Grid >
                    <Grid sx={{ display: 'flex', alignItems: 'center', textAlign: 'center', fontFamily: 'Oswald', fontSize: '20px' }}>
                        <Grid className='detail-title-status' item xl={5} lg={5} xs={5} sm={5} md={5}>Tên sp</Grid>
                        <Grid className='detail-title-status' item xl={5} lg={5} xs={5} sm={5} md={5}>Màu sắc</Grid>
                        <Grid className='detail-title-status' item xl={5} lg={5} xs={5} sm={5} md={5}>Kích thước</Grid>
                        <Grid className='detail-title-status' item xl={5} lg={5} xs={5} sm={5} md={5}>Số Lượng</Grid>
                        <Grid className='detail-title-status' item xl={5} lg={5} xs={5} sm={5} md={5}>Hình ảnh</Grid>
                        {statusRateList?.id_trang_thai === 3 ? (<Grid className='detail-title-status' item xl={5} lg={5} xs={5} sm={5} md={5}>Đánh giá</Grid>) : ('')}
                    </Grid>
                    <hr />
                    {statusRateList?.id_trang_thai === 3 ? (<>
                        {
                            detailclone.map((item, index) => (
                                <Grid key={index}>

                                    <Grid sx={{ display: 'flex', alignItems: 'center', textAlign: 'center', fontFamily: 'Oswald', fontSize: '20px' }}>
                                        <Grid className='detail-title-status' item xl={5} lg={5} xs={5} sm={5} md={5}>{item.ten_sp}</Grid>
                                        <Grid className='detail-title-status' item xl={5} lg={5} xs={5} sm={5} md={5}>{item.ten_mau_sac}</Grid>
                                        <Grid className='detail-title-status' item xl={5} lg={5} xs={5} sm={5} md={5}> {item.ten_kich_thuoc}</Grid>
                                        <Grid className='detail-title-status' item xl={5} lg={5} xs={5} sm={5} md={5}> {item.so_luong}</Grid>
                                        <Grid className='detail-title-status' item xl={5} lg={5} xs={5} sm={5} md={5}><img className='img-detail-status' src={item.hinh_anh_chinh} alt={index} /></Grid>
                                        <Grid className='detail-title-status' item xl={5} lg={5} xs={5} sm={5} md={5}>
                                            <Button onClick={() => handleClickOpen2(item.id_sp)}
                                            > Đánh giá</Button>
                                        </Grid>
                                        <Dialog open={open2} onClose={handleClose2}>
                                            <DialogActions>
                                                <IconButton onClick={handleClose2}>
                                                    <DisabledByDefaultIcon />
                                                </IconButton>
                                            </DialogActions>
                                            <DialogTitle >Đánh giá sản phẩm

                                            </DialogTitle>
                                            <DialogContent>
                                                <DialogContentText>
                                                    Vui lòng đánh giá thật để giúp chúng tôi cải thiện chất lượng
                                                </DialogContentText>

                                                <TextField
                                                    fullWidth
                                                    label="Tên"
                                                    onChange={(event) => (setNameRate(event.target.value))}
                                                    autoFocus
                                                />

                                                <TextField
                                                    fullWidth
                                                    label="Nội dung đánh giá"
                                                    onChange={(event) => (setContent(event.target.value))}
                                                    sx={{ marginTop: '17px' }}

                                                />
                                                <Typography sx={{ paddingTop: '10px' }}>Sao đánh giá</Typography>
                                                <Rating
                                                    name="simple-controlled"
                                                    value={start}
                                                    onChange={(event, newValue) => {
                                                        setStart(newValue);
                                                    }}
                                                    size="large"
                                                />
                                                <UploadImage />

                                                <TextField
                                                    fullWidth
                                                    label="Dán URL hình ảnh đánh giá"
                                                    onChange={(event) => (setImgRate(event.target.value))}
                                                    sx={{ marginTop: '20px' }}

                                                />

                                            </DialogContent>
                                            <DialogActions>
                                                <ButtonForm name={'Đánh giá'} onClick={handleSubmit} />
                                            </DialogActions>

                                        </Dialog>


                                    </Grid>
                                    <hr />
                                </Grid>
                            ))
                        }</>
                    ) : (<>
                        {
                            detailclone.map((item, index) => (
                                <Grid key={index}>

                                    <Grid sx={{ display: 'flex', alignItems: 'center', textAlign: 'center', fontFamily: 'Oswald', fontSize: '20px' }}>
                                        <Grid className='detail-title-status' item xl={5} lg={5} xs={5} sm={5} md={5}>{item.ten_sp}</Grid>
                                        <Grid className='detail-title-status' item xl={5} lg={5} xs={5} sm={5} md={5}>{item.ten_mau_sac}</Grid>
                                        <Grid className='detail-title-status' item xl={5} lg={5} xs={5} sm={5} md={5}> {item.ten_kich_thuoc}</Grid>
                                        <Grid className='detail-title-status' item xl={5} lg={5} xs={5} sm={5} md={5}> {item.so_luong}</Grid>
                                        <Grid className='detail-title-status' item xl={5} lg={5} xs={5} sm={5} md={5}><img className='img-detail-status' src={item.hinh_anh_chinh} alt={index} /></Grid>
                                    </Grid>
                                    <hr />
                                </Grid>
                            ))
                        }</>)}

                </Grid>
                <Button autoFocus onClick={handleClose}>
                    Thoát
                </Button>
            </Dialog>



        </Box >
    );
}
