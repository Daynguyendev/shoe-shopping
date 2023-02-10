import * as React from 'react';
import Box from '@mui/material/Box';
import Grid from '@mui/material/Grid';
import Typography from '@mui/material/Typography';
import Container from '@mui/material/Container';
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import IconButton from '@mui/material/IconButton';
import PhotoCamera from '@mui/icons-material/PhotoCamera';
import Stack from '@mui/material/Stack';
import SendIcon from '@mui/icons-material/Send';
import Avatar from '@mui/material/Avatar';
import './account.scss'
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

export default function InforAccount() {
    const handleSubmit = (event) => {
        event.preventDefault();
        const data = new FormData(event.currentTarget);
        axios.post('http://localhost:5000/account', {
            ten_dia_chi: data.get('diachi'),
            ten_khach_hang: data.get('ten'),
            sdt_khach_hang: data.get('sdt'),
        })
            .then(function (response) {
                response.status(200);
            })
            .catch(error => console.log(error));

    };

    const navigate = useNavigate();
    const [name, setName] = React.useState('');
    const handleChange = (event) => {
        setName(event.target.value);
    };

    return (

        <Container component="main" maxWidth="xl">
            <Box sx={{
                marginTop: 8,
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center',
            }}>
                <Grid container spacing={2}>



                    <Grid item xs={4}>
                        <Stack alignItems="center" className='Imgavt' >
                            <Avatar
                                alt="Remy Sharp"
                                src="/static/images/avatar/1.jpg"
                                className="img"

                            />
                        </Stack>


                        <Stack alignItems="center" >
                            <Button variant="contained" component="label">
                                Upload
                                <input hidden accept="image/*" multiple type="file" />
                            </Button>
                            <IconButton color="primary" aria-label="upload picture" component="label">
                                <input hidden accept="image/*" type="file" />
                                <PhotoCamera />
                            </IconButton>
                        </Stack>
                    </Grid>
                    <Grid item xs={8}>
                        <Box
                            component="form" onSubmit={handleSubmit} noValidate sx={{ mt: 1 }}
                        >
                            {/* <Typography variant="h6">
                                Tên Khách Hàng
                            </Typography> */}
                            <TextField
                                required
                                fullWidth
                                id="ten"
                                label="Tên"
                                name="ten"
                                onChange={handleChange}
                                autoFocus
                            />
                            {/* <Typography variant="h6">
                                Tên Địa Chỉ
                            </Typography> */}
                            <TextField
                                required
                                fullWidth
                                id="diachi"
                                label="Địa chỉ"
                                name="diachi"

                            />
                            {/* <Typography variant="h6">
                                Số Điện Thoại
                            </Typography> */}
                            <TextField
                                required
                                fullWidth
                                id="sdt"
                                label="Số điện thoại"
                                name="sdt"

                            />
                            <Stack sx={{ paddingTop: '20px' }}>
                                <Button variant="contained" endIcon={<SendIcon />} type="submit">
                                    Cập nhật
                                </Button>
                            </Stack>
                        </Box>



                    </Grid>
                    {/* <Grid item xs={4}>

                    </Grid>
                    <Grid item xs={4}>
                    </Grid>
                    <Grid item xs={8}>
                    </Grid> */}
                </Grid>
            </Box>
        </Container>

    );
}