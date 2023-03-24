import * as React from 'react';
import Avatar from '@mui/material/Avatar';
import Button from '@mui/material/Button';
import CssBaseline from '@mui/material/CssBaseline';
import TextField from '@mui/material/TextField';
import Link from '@mui/material/Link';
import Grid from '@mui/material/Grid';
import Box from '@mui/material/Box';
import LockOutlinedIcon from '@mui/icons-material/LockOutlined';
import Typography from '@mui/material/Typography';
import Container from '@mui/material/Container';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import { useNavigate } from 'react-router-dom';
import { useSnackbar } from 'notistack';
import { useState, useEffect } from 'react';
import userAPI from '../../../API/userAPI';
import addresskAPI from '../../../API/addressAPI';

function Copyright(props) {
    return (
        <Typography variant="body2" color="text.secondary" align="center" {...props}>
            {'Copyright © '}
            <Link color="inherit" href="https://mui.com/">
                Your Website
            </Link>{' '}
            {new Date().getFullYear()}
            {'.'}
        </Typography>
    );
}

const theme = createTheme();

export default function SignUp() {
    const navigate = useNavigate();
    const [email, setEmail] = useState();
    const [password, setPassword] = useState();
    const [passwordRepeat, setPasswordRepeat] = useState();

    const [birthday, setBirthday] = useState();
    const [role, setRole] = useState(1);
    const { enqueueSnackbar } = useSnackbar();
    const [name, setName] = useState();
    const [address, setAddress] = useState();
    const [phone, setPhone] = useState();



    const handleSubmit = async (event) => {
        if (name == '') {
            enqueueSnackbar('Vui lòng nhập tên', {
                variant: 'error',
                autoHideDuration: 800,
                anchorOrigin: {
                    vertical: 'top',
                    horizontal: 'right',
                },
            });
            return;
        }

        if (email == '') {
            enqueueSnackbar('Vui lòng nhập email', {
                variant: 'error',
                autoHideDuration: 800,
                anchorOrigin: {
                    vertical: 'top',
                    horizontal: 'right',
                },
            });
            return;
        }

        if (birthday == '' || birthday == null) {
            enqueueSnackbar('Vui lòng nhập ngày sinh', {
                variant: 'error',
                autoHideDuration: 800,
                anchorOrigin: {
                    vertical: 'top',
                    horizontal: 'right',
                },
            });
            return;
        }

        if (password == '') {
            enqueueSnackbar('Vui lòng nhập mật khẩu', {
                variant: 'error',
                autoHideDuration: 800,
                anchorOrigin: {
                    vertical: 'top',
                    horizontal: 'right',
                },
            });
            return;
        }

        if (password != passwordRepeat) {
            enqueueSnackbar('Vui lòng nhập lại đúng mật khẩu', {
                variant: 'error',
                autoHideDuration: 800,
                anchorOrigin: {
                    vertical: 'top',
                    horizontal: 'right',
                },
            });
            return;
        }


        const result = await userAPI.register({
            ten_khach_hang: name,
            email_khach_hang: email,
            mat_khau_khach_hang: password,
            ngay_sinh_khach_hang: birthday,
            chuc_vu: role
        })


            .then(async function (response) {
                const results = await addresskAPI.add({
                    id_khach_hang: response.data.users.id_khach_hang,
                    ten_dia_chi: address,
                    ten_khach_hang: name,
                    sdt_khach_hang: phone,
                })
                navigate(`/`)
                enqueueSnackbar('Đăng ký tài khoản thành công', {
                    variant: 'success',
                    autoHideDuration: 800,
                    anchorOrigin: {
                        vertical: 'top',
                        horizontal: 'right',
                    },
                });
            })
            .catch(error => enqueueSnackbar('Địa chỉ email đã tồn tại', {
                variant: 'error',
                autoHideDuration: 800,
                anchorOrigin: {
                    vertical: 'top',
                    horizontal: 'right',
                },
            })
            );
    };

    const handleNextPage = () => {
        navigate(`/login`)
    }

    return (
        <ThemeProvider theme={theme}>
            <Container component="main" maxWidth="xs" sx={{
                backgroundColor: 'white', paddingTop: '20px'

            }}>
                <CssBaseline />
                {console.log(role)}
                <Box
                    sx={{
                        marginTop: 8,
                        display: 'flex',
                        flexDirection: 'column',
                        alignItems: 'center',
                    }}
                >
                    <Avatar sx={{ m: 1, bgcolor: 'secondary.main' }}>
                        <LockOutlinedIcon />
                    </Avatar>
                    <Typography component="h1" variant="h5">
                        Đăng Ký
                    </Typography>
                    <Box sx={{ mt: 3 }}>
                        <Grid container spacing={2}>
                            <Grid item xs={12}>
                                <TextField
                                    fullWidth
                                    label="Tên khách hàng"
                                    onChange={(e) => setName(e.target.value)}
                                />
                            </Grid>
                            <Grid item xs={12}>
                                <TextField
                                    fullWidth
                                    label="Địa chỉ Email"
                                    onChange={(e) => setEmail(e.target.value)}
                                />
                            </Grid>
                            <Grid item xs={12}>
                                <TextField
                                    fullWidth
                                    label="Địa chỉ khách hàng"
                                    onChange={(e) => setAddress(e.target.value)}
                                />
                            </Grid>
                            <Grid item xs={12}>
                                <TextField
                                    fullWidth
                                    label="Số điện thoại"
                                    onChange={(e) => setPhone(e.target.value)}
                                />
                            </Grid>
                            <Grid item xs={12}>
                                <TextField
                                    fullWidth
                                    label="Ngày sinh"
                                    type="date"
                                    defaultValue="2000-05-24"
                                    onChange={(e) => setBirthday(e.target.value)}
                                />
                            </Grid>
                            <Grid item xs={12}>
                                <TextField
                                    fullWidth
                                    label="Mật khẩu"
                                    type="password"
                                    onChange={(e) => setPassword(e.target.value)}
                                />
                            </Grid>
                            <Grid item xs={12}>
                                <Grid item xs={12}>
                                    <TextField
                                        fullWidth
                                        label=" Nhập lại mật khẩu"
                                        type="password"
                                        onChange={(e) => setPasswordRepeat(e.target.value)}
                                    />
                                </Grid>


                            </Grid>
                        </Grid>
                        <Grid container justifyContent="flex-end">
                            <Grid item>
                                <Link href="" variant="body1" onClick={handleNextPage}>
                                    Đã có tài khoản? Đăng Nhập
                                </Link>
                            </Grid>
                        </Grid>
                    </Box>
                </Box>
                <Button
                    type="submit"
                    fullWidth
                    variant="contained"
                    sx={{ mt: 3, mb: 2 }}
                    onClick={handleSubmit}
                >
                    Đăng Ký
                </Button>
                <Copyright sx={{ mt: 5 }} />
            </Container>
        </ThemeProvider>
    );
}