import * as React from 'react';
import Box from '@mui/material/Box';
import Grid from '@mui/material/Grid';
import { useState, useEffect } from 'react';
import invoiceoutputAPI from '../../../../API/invoiceoutputAPI';
import detailinvoiceoutputAPI from '../../../../API/detailinvoiceoutputAPI';
import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';
import UploadImage from '../../../admin/components/UploadImage';
import ButtonForm from '../../../../Formcontrol/ButtonForm';
import Rating from '@mui/material/Rating';
import TextField from '@mui/material/TextField';
import Typography from '@mui/material/Typography';
import DisabledByDefaultIcon from '@mui/icons-material/DisabledByDefault';
import IconButton from '@mui/material/IconButton';
import { useSnackbar } from 'notistack';
import rateAPI from '../../../../API/rateAPI';
import './Listitem.scss'
export default function ListItemDetail({ id_hd, id_trang_thai, id_khach_hang }) {
    const [status, setStatus] = useState();
    const [statusAll, setStatusAll] = useState([]);
    const [detail, setDetail] = useState([]);
    const [statusRate, setStatusRate] = useState()
    const [open2, setOpen2] = useState(false);
    const [idSP, setidSP] = useState('');
    const [nameRate, setNameRate] = useState();
    const [content, setContent] = useState();
    const [imgRate, setImgRate] = useState();
    const [start, setStart] = useState(2)
    const { enqueueSnackbar } = useSnackbar();

    const handleClickOpen2 = async (id_sp) => {
        setidSP(id_sp)
        const checkrate = await invoiceoutputAPI.checkRate({ id_sp: id_sp, id_hd_dat: id_hd }, id_khach_hang);
        if (checkrate.data.data.length > 0) {
            alert('Bạn đã đánh giá sản phẩm này rồi')

        }
        else
            setOpen2(true);
    };
    const handleClose2 = () => {
        setOpen2(false);
    };

    useEffect(() => {
        try {
            const fetchCart = async () => {
                const result = await detailinvoiceoutputAPI.getDetail({ id_hd_dat: id_hd })
                const results = await invoiceoutputAPI.getByIdBill({ id_hd_dat: id_hd })
                setDetail(result.data.data);
                setStatusRate(results.data.data)
            };
            fetchCart();
        } catch (error) {
            console.log('Failed to fetch status: ', error);
        }
    }, []);


    const handleSubmit = async (event) => {

        const result = await rateAPI.add({
            id_khach_hang: id_khach_hang,
            id_hd_dat: id_hd,
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

    return (
        <Box>
            {
                detail.map((item, index) => (
                    <Grid key={index} sx={{ marginTop: '20px' }}>

                        <Grid sx={{ display: 'flex', alignItems: 'center', textAlign: 'center', fontFamily: 'Oswald', fontSize: '20px' }}>
                            <Grid className='detail-title-status' item xl={5} lg={5} xs={5} sm={5} md={5}>{item.ten_sp}</Grid>
                            <Grid className='detail-title-status' item xl={5} lg={5} xs={5} sm={5} md={5}>{item.ten_mau_sac}</Grid>
                            <Grid className='detail-title-status' item xl={5} lg={5} xs={5} sm={5} md={5}> {item.ten_kich_thuoc}</Grid>
                            <Grid className='detail-title-status' item xl={5} lg={5} xs={5} sm={5} md={5}> {item.so_luong}</Grid>
                            <Grid className='detail-title-status' item xl={5} lg={5} xs={5} sm={5} md={5}><img className='img-detail-status' src={item.hinh_anh_chinh} alt={index} /></Grid>
                            {id_trang_thai === 3 ? (<Button variant='contained' onClick={() => handleClickOpen2(item.id_sp)} sx={{ marginTop: '5px', fontSize: '13px', marginLeft: '20px', width: '180px', height: '40px', color: 'white', backgroundColor: ' #d2143a', marginBottom: '20px' }}> Đánh giá</Button>) : ('')}
                        </Grid>
                    </Grid>
                ))
            }
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
        </Box >
    );
}
