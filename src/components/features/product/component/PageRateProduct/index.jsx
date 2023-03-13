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
    let total = 0;

    rateList.filter(function (element) {
        total += element.so_sao_danh_gia;
    });

    const handleClickOpen = () => {
        setOpen(true);
    };

    const handleClose = () => {
        setOpen(false);
    };


    useEffect(() => {
        try {
            const fetchPageDetail = async () => {
                if (rate !== null) {
                    const Ratedetail = await rateAPI.getById(id);
                    setRate(Ratedetail.data.data);
                }
            };
            fetchPageDetail();
        } catch (error) {
            console.log('Failed to fetch rate: ', error);
        }
    }, [id]);

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



            <Grid sx={{ paddingBottom: '50px' }} >
                <RateProduct rate={rate} />
            </Grid>
            {/* <Stack spacing={2} sx={{ display: 'flex', alignItems: 'center', textAlign: 'center', paddingTop: '30px' }} >
                <Button variant="outlined" onClick={handleClickOpen}>Viết đánh giá</Button>
                <Button variant="outlined">Xem đánh giá</Button>

            </Stack> */}




        </Box >
    );
}