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

    const handleClickOpen = () => {
        setOpen(true);
    };
    const handleClose = () => {
        setOpen(false);
    };

    const handleClickOpen2 = async (id_sp) => {
        console.log('sao lai nhu the', id_sp, id_khach_hang)
        setidSP(id_sp)
        const checkrate = await invoiceoutputAPI.checkRate({ id_sp: id_sp, id_hd_dat: idBill }, id_khach_hang);
        if (checkrate.data.data.length > 0) {
            alert('B???n ???? ????nh gi?? s???n ph???m n??y r???i')

        }
        else
            setOpen2(true);
    };
    const handleClose2 = () => {
        setOpen2(false);
    };
    console.log('test detail', idBill)

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

                enqueueSnackbar('????nh gi?? th??nh c??ng', {
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
        console.log('idsp', id_sp)
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
                        <Grid sx={{ fontFamily: 'Oswald', fontSize: '20px' }} >
                            ID h??a ????n : {item.id_hd_dat}
                        </Grid>
                        <Grid sx={{ fontFamily: 'Oswald', fontSize: '20px' }} >

                            T??n : {item.ten_khach_hang}
                        </Grid>
                        <Grid sx={{ fontFamily: 'Oswald', fontSize: '20px' }} >

                            ?????a ch??? nh???n h??ng: {item.ten_dia_chi}
                        </Grid>
                        <Grid sx={{ fontFamily: 'Oswald', fontSize: '20px' }} >

                            Ng??y l???p h??a ????n: {item.ngay_lap_hd_dat}
                        </Grid>
                        <Grid sx={{ paddingBottom: '30px', fontFamily: 'Oswald', fontSize: '20px' }}>
                            T???ng ti???n: {item.tong_tien}
                        </Grid>
                        {console.log('kakakakakaa', item.id_sp)}
                        <IconButton sx={{ fontFamily: 'Oswald', fontSize: '20px' }} onClick={(e) => HandleShowDetail(item.id_hd_dat, item.id_sp)}  >
                            <RemoveRedEyeIcon /> Xem chi ti???t h??a ????n
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
                        ) : (<> <h1 style={{ fontFamily: 'Oswald' }}>????n h??ng c???a b???n ???? b??? h???y</h1></>)}

                        <br />
                        <br />
                        <hr />
                    </Grid>))
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
                        <Grid item xl={5} lg={5} xs={5} sm={5} md={5}>????nh gi??</Grid>

                    </Grid>
                    <hr />
                    {console.log('teststt', statusRateList)}
                    {statusRateList?.id_trang_thai === 3 ? (<>
                        {
                            detailclone.map((item, index) => (
                                <Grid key={index}>

                                    <Grid sx={{ display: 'flex', alignItems: 'center', textAlign: 'center', fontFamily: 'Oswald', fontSize: '20px' }}>
                                        <Grid item xl={5} lg={5} xs={5} sm={5} md={5}>{item.ten_sp}</Grid>
                                        <Grid item xl={5} lg={5} xs={5} sm={5} md={5}>{item.ten_mau_sac}</Grid>
                                        <Grid item xl={5} lg={5} xs={5} sm={5} md={5}> {item.ten_kich_thuoc}</Grid>
                                        <Grid item xl={5} lg={5} xs={5} sm={5} md={5}> {item.so_luong}</Grid>
                                        <Grid item xl={5} lg={5} xs={5} sm={5} md={5}><img style={{ width: '100px', height: '100px' }} src={item.hinh_anh_chinh} alt={index} /></Grid>
                                        <Grid item xl={5} lg={5} xs={5} sm={5} md={5}>
                                            <Button variant="outlined" onClick={() => handleClickOpen2(item.id_sp)}
                                            >Vi???t ????nh gi??</Button>
                                        </Grid>
                                        <Dialog open={open2} onClose={handleClose2}>
                                            <DialogActions>
                                                <IconButton onClick={handleClose2}>
                                                    <DisabledByDefaultIcon />
                                                </IconButton>
                                            </DialogActions>
                                            <DialogTitle >????nh gi?? s???n ph???m

                                            </DialogTitle>
                                            <DialogContent>
                                                <DialogContentText>
                                                    Vui l??ng ????nh gi?? th???t ????? gi??p ch??ng t??i c???i thi???n ch???t l?????ng
                                                </DialogContentText>

                                                <TextField
                                                    fullWidth
                                                    label="T??n"
                                                    onChange={(event) => (setNameRate(event.target.value))}
                                                    autoFocus
                                                />

                                                <TextField
                                                    fullWidth
                                                    label="N???i dung ????nh gi??"
                                                    onChange={(event) => (setContent(event.target.value))}
                                                    sx={{ marginTop: '17px' }}

                                                />
                                                <Typography sx={{ paddingTop: '10px' }}>Sao ????nh gi??</Typography>
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
                                                    label="D??n URL h??nh ???nh ????nh gi??"
                                                    onChange={(event) => (setImgRate(event.target.value))}
                                                    sx={{ marginTop: '20px' }}

                                                />

                                            </DialogContent>
                                            <DialogActions>
                                                <ButtonForm name={'????nh gi??'} onClick={handleSubmit} />
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
                                        <Grid item xl={5} lg={5} xs={5} sm={5} md={5}>{item.ten_sp}</Grid>
                                        <Grid item xl={5} lg={5} xs={5} sm={5} md={5}>{item.ten_mau_sac}</Grid>
                                        <Grid item xl={5} lg={5} xs={5} sm={5} md={5}> {item.ten_kich_thuoc}</Grid>
                                        <Grid item xl={5} lg={5} xs={5} sm={5} md={5}> {item.so_luong}</Grid>
                                        <Grid item xl={5} lg={5} xs={5} sm={5} md={5}><img style={{ width: '100px', height: '100px' }} src={item.hinh_anh_chinh} alt={index} /></Grid>
                                    </Grid>
                                    <hr />
                                </Grid>
                            ))
                        }</>)}

                </Grid>
                <Button autoFocus onClick={handleClose}>
                    Tho??t
                </Button>
            </Dialog>



        </Box >
    );
}
