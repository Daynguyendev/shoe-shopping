import * as React from 'react';
import Rating from '@mui/material/Rating';
import Box from '@mui/material/Box';
import Grid from '@mui/material/Grid';
import StarIcon from '@mui/icons-material/Star';
import RateProduct from '../RateProduct';
import Button from '@mui/material/Button';
import rateAPI from '../../../../API/rateAPI';
import { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import TextField from '@mui/material/TextField';
import { useSnackbar } from 'notistack';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';
import { useNavigate } from 'react-router-dom';
import Typography from '@mui/material/Typography';
import UploadImage from '../../../admin/components/UploadImage';
import DisabledByDefaultIcon from '@mui/icons-material/DisabledByDefault';
import IconButton from '@mui/material/IconButton';
import ButtonForm from '../../../../Formcontrol/ButtonForm';
import Stack from '@mui/material/Stack';

export default function PageRateProduct() {
    const { enqueueSnackbar } = useSnackbar();
    const { id } = useParams();
    const [rate, setRate] = useState([]);
    const rateList = [...rate] || [];
    const [open, setOpen] = useState(false);
    const navigate = useNavigate();
    const [nameRate, setNameRate] = useState();
    const [content, setContent] = useState();
    const [imgRate, setImgRate] = useState();
    const [start, setStart] = useState(2)
    const [value, setValue] = React.useState(2);


    const handleClickOpen = () => {
        setOpen(true);
    };

    const handleClose = () => {
        setOpen(false);
    };
    const handleSubmit = (event) => {
        rateAPI.add({
            ten_nguoi_danh_gia: nameRate,
            noi_dung: content,
            id_sp: id,
            hinh_anh_danh_gia: imgRate,
            so_sao_danh_gia: start,
        })




            .then(function (response) {

                const dataAdd = [...rate]
                const data = ({
                    id_danh_gia: response.data.data,
                    ten_nguoi_danh_gia: nameRate,
                    noi_dung: content,
                    id_sp: id,
                    hinh_anh_danh_gia: imgRate,
                    so_sao_danh_gia: start,
                })

                dataAdd.push(data)
                setRate(dataAdd)



                enqueueSnackbar('Đánh giá thành công', {
                    variant: 'success',
                    autoHideDuration: 800,
                    anchorOrigin: {
                        vertical: 'top',
                        horizontal: 'right',
                    },
                }); setOpen(false);
            })
            .catch(error => enqueueSnackbar(error.message, { variant: 'error', autoHideDuration: 1000 })
            );

    };

    useEffect(() => {
        try {
            const fetchPageDetail = async () => {
                if (rate !== null) {
                    const Ratedetail = await rateAPI.getById(id);
                    setRate(Ratedetail.data.data);
                    console.log('rate', Ratedetail.data.data)
                }
            };
            fetchPageDetail();
        } catch (error) {
            console.log('Failed to fetch rate: ', error);
        }
    }, []);
    let total = 0;

    rateList.filter(function (element) {
        total += element.so_sao_danh_gia;
    });



    return (
        <Box
            sx={{
                minHeight: '400px',
                backgroundColor: 'white',
                paddingTop: '20px',
                padding: '20px',
                textAlign: 'center',
                alignItems: 'center'
            }}
        >
            <Grid>
                <hr size={10} style={{ backgroundColor: 'black', width: '50%' }} />

                <h1>Tổng quan đánh giá</h1>

                <Rating
                    name="text-feedback"
                    value={total / rateList.length}
                    readOnly
                    precision={0.5}
                    emptyIcon={<StarIcon style={{ opacity: 0.55 }} fontSize="inherit" />}
                />
            </Grid>



            <Grid >
                <RateProduct rate={rate} />
            </Grid>
            <Stack spacing={2} sx={{ display: 'flex', alignItems: 'center', textAlign: 'center', paddingTop: '30px' }} >
                <Button variant="outlined" onClick={handleClickOpen}>Viết đánh giá</Button>
                <Button variant="outlined">Xem đánh giá</Button>

            </Stack>


            <Dialog open={open} onClose={handleClose}>
                <DialogActions>


                    <IconButton onClick={handleClose}>
                        <DisabledByDefaultIcon />
                    </IconButton>
                </DialogActions>
                <DialogTitle>Đánh giá</DialogTitle>
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

        </Box >
    );
}