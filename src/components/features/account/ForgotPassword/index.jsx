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
import * as yup from 'yup';

const theme = createTheme();

export default function ForgotPassword() {

    const navigate = useNavigate();
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const { enqueueSnackbar } = useSnackbar();
    const dispatch = useDispatch();
    const [idUser, setIdUser] = useState(null);
    let email_khach_hang = useSelector((state) => state?.user?.user?.email_khach_hang);
    const isLogin = useSelector((state) => state?.user.isLogin);
    const [quantityError, setQuantityError] = useState('');
    const [EmailError, setEmailError] = useState('');
    const [passwordError, setPasswordError] = useState('');
    const schema = yup
        .object()
        .shape({
            email: yup
                .string()
                .email('Vui lòng nhập đúng địa chỉ email'),

        })
    const handleQuantityChange = (event) => {
        const value = event.target.value;
        setEmail(value);
        console.log(value);

        schema
            .validate({ email: value })
            .then(() => {
                setEmailError('');
            })
            .catch((error) => {
                setEmailError(error.message);
            });
    };





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
        if (email == '' || email == null || EmailError !== '') {
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

        const result = await userAPI.Forgot({
            email_khach_hang: email,
        })

            .then(async function (response) {

                enqueueSnackbar('Gửi đường dẫn đổi mật khẩu thành công', {
                    variant: 'success',
                    autoHideDuration: 800,
                    anchorOrigin: {
                        vertical: 'top',
                        horizontal: 'right',
                    },
                });
            })
            .catch(error => enqueueSnackbar('Email không tồn tại', {
                variant: 'error',
                autoHideDuration: 800,
                anchorOrigin: {
                    vertical: 'top',
                    horizontal: 'right',
                },
            }))
    };

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
                        Quên mật khẩu
                    </Typography>
                    <Box component="form" noValidate >
                        <TextField
                            margin="normal"
                            fullWidth
                            label="Địa chỉ Email"
                            autoFocus
                            value={email}
                            onChange={handleQuantityChange}
                            error={Boolean(EmailError)}
                            helperText={EmailError}
                        />

                        <Button
                            fullWidth
                            onClick={handleSubmit}
                            variant="contained"
                            sx={{ display: 'inline-block', fontFamily: 'Oswald', marginTop: '5px', fontSize: '15px', width: '100%', color: 'white', backgroundColor: ' #d2143a', marginBottom: '20px' }}  >
                            Quên mật khẩu
                        </Button>
                    </Box>
                </Box>
            </Container>
        </ThemeProvider >
    );
}