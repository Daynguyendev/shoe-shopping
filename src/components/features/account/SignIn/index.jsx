import * as React from 'react';
import Button from '@mui/material/Button';
import CssBaseline from '@mui/material/CssBaseline';
import TextField from '@mui/material/TextField';
import FormControlLabel from '@mui/material/FormControlLabel';
import Checkbox from '@mui/material/Checkbox';
import Link from '@mui/material/Link';
import Grid from '@mui/material/Grid';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import Container from '@mui/material/Container';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import { useNavigate } from 'react-router-dom';
import { useSnackbar } from 'notistack';
import { useState, useEffect } from 'react';
import userAPI from '../../../API/userAPI';
import { useDispatch } from 'react-redux';
import { login } from '../userSlice';
import { useSelector } from 'react-redux';

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

export default function SignIn() {

    const navigate = useNavigate();
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const { enqueueSnackbar } = useSnackbar();
    const dispatch = useDispatch();
    const [idUser, setIdUser] = useState(null);
    let email_khach_hang = useSelector((state) => state?.user?.user?.email_khach_hang);
    const isLogin = useSelector((state) => state?.user.isLogin);

    useEffect(() => {
        try {
            const fetchIdUser = async () => {
                if (isLogin) {
                    const res = await userAPI.getID({ email_khach_hang: email_khach_hang });
                    setIdUser(res.data.data[0]?.id_khach_hang)

                }
            };
            fetchIdUser();
        } catch (error) {
            console.log('Failed to fetch idUser: ', error);
        }
    }, []);





    const handleSubmit = async (event) => {
        if (email == '' || email == null) {
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
        if (password == '' || password == null) {
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
        const result = await userAPI.login({
            email_khach_hang: email,
            mat_khau_khach_hang: password
        })

            .then(async function (response) {
                const results = await dispatch(login({ email_khach_hang: email, token: response.data.token }));
                let data = { email_khach_hang: email, isLogin: true }
                const resultSaveToken = await localStorage.setItem('token', response.data.token);
                const resultsSaveUser = await localStorage.setItem('user', JSON.stringify(data));
                navigate(`/`)
                // window.location.reload();
                enqueueSnackbar('Đăng nhập thành công', {
                    variant: 'success',
                    autoHideDuration: 800,
                    anchorOrigin: {
                        vertical: 'top',
                        horizontal: 'right',
                    },
                });
            })
            .catch(error => enqueueSnackbar('Tài khoản hoặc mật khẩu không chính xác', {
                variant: 'error',
                autoHideDuration: 800,
                anchorOrigin: {
                    vertical: 'top',
                    horizontal: 'right',
                },
            }))
    };

    const handleNextPage = () => {
        navigate(`/register`)
    }

    return (
        <ThemeProvider theme={theme}>
            <Container component="main" maxWidth="xl" sx={{

                backgroundColor: 'white', paddingTop: '20px'

            }}>
                <CssBaseline />
                <Box

                    sx={{
                        marginTop: 8,
                        display: 'flex',
                        flexDirection: 'column',
                        alignItems: 'center',
                        backgroundColor: 'white',
                        minHeight: '585px',


                    }}
                >

                    <Typography component="h1" variant="h3" sx={{ fontWeight: '1000', fontFamily: 'Oswald', paddingBottom: '20px' }}>
                        Đăng Nhập
                    </Typography>
                    <Box component="form" noValidate >
                        <TextField
                            margin="normal"
                            fullWidth
                            label="Địa chỉ Email"
                            autoFocus
                            onChange={(e) => setEmail(e.target.value)}
                        />
                        <TextField
                            margin="normal"
                            fullWidth
                            label="Mật khẩu"
                            type="password"
                            onChange={(e) => setPassword(e.target.value)}
                        />
                        <FormControlLabel
                            control={<Checkbox value="remember" color="primary" />}
                            label="Lưu thông tin"
                        />

                        <Grid container>
                            <Grid item xs>

                            </Grid>
                            <Grid item>
                                <Link href="" variant="body1" onClick={handleNextPage}>
                                    {"Chưa có tải khoản? Đăng Ký"}

                                </Link>
                            </Grid>
                        </Grid>

                        <Button
                            fullWidth
                            onClick={handleSubmit}
                            variant="contained"
                            sx={{ fontFamily: 'Oswald', marginTop: '5px', fontSize: '20px', width: '100%', color: 'white', backgroundColor: ' #d2143a', marginBottom: '20px' }}  >
                            Đăng Nhập
                        </Button>
                    </Box>


                </Box>
                <Copyright sx={{ mb: 8, mt: 4 }} />
            </Container>
        </ThemeProvider >
    );
}