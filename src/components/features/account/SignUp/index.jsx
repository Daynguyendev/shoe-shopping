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
import * as yup from 'yup';

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
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [passwordRepeat, setPasswordRepeat] = useState();

    const [birthday, setBirthday] = useState('');
    const [role, setRole] = useState(1);
    const { enqueueSnackbar } = useSnackbar();
    const [name, setName] = useState('');
    const [address, setAddress] = useState('');
    const [phone, setPhone] = useState('');
    const [EmailError, setEmailError] = useState('');
    const [passwordError, setPasswordError] = useState('');
    const [birthError, setBirthError] = useState('');
    const [phoneError, setPhoneError] = useState('');
    const [nameError, setNameError] = useState('');
    const [addressError, setAddressError] = useState('');




    const schema = yup
        .object()
        .shape({

            email: yup
                .string()
                .email('Vui lòng nhập đúng địa chỉ email'),
            password: yup
                .string()
                .min(6, "Tối thiểu 6 ký tự"),
            birthday: yup
                .date(),
            phone: yup
                .number().typeError('Số điện thoại phải bắt đầu là 0xxx')
                .max(1000000000, 'Vui lòng nhập SĐT hợp lệ'),
            name: yup
                .string()
                .min(6, "Tối thiểu 6 ký tự")
            ,
            address: yup
                .string()
                .min(10, "Tối thiểu 10 ký tự")
            ,

        })
    const handleEmailChange = (event) => {
        const value = event.target.value;
        setEmail(value);
        schema
            .validate({ email: value })
            .then(() => {
                setEmailError('');
            })
            .catch((error) => {
                setEmailError(error.message);
            });
    };

    const handleAddressChange = (event) => {
        const value = event.target.value;
        setAddress(value);
        schema
            .validate({ address: value })
            .then(() => {
                setAddressError('');
            })
            .catch((error) => {
                setAddressError(error.message);
            });
    };

    const handleNameChange = (event) => {
        const value = event.target.value;
        setName(value);
        schema
            .validate({ name: value })
            .then(() => {
                setNameError('');
            })
            .catch((error) => {
                setNameError(error.message);
            });
    };

    const handlePasswordChange = (event) => {
        const value = event.target.value;
        setPassword(value);

        schema
            .validate({ password: value })
            .then(() => {
                setPasswordError('');
            })
            .catch((error) => {
                setPasswordError(error.message);
            });
    };

    const handleBirthChange = (event) => {
        const value = event.target.value;
        setBirthday(value);

        schema
            .validate({ birthday: value })
            .then(() => {
                setBirthError('');
            })
            .catch((error) => {
                setBirthError(error.message);
            });
    };
    const handlePhoneChange = (event) => {
        const value = event.target.value;
        setPhone(value);

        schema
            .validate({ phone: value })
            .then(() => {
                setPhoneError('');
            })
            .catch((error) => {
                setPhoneError(error.message);
            });
    };




    const handleSubmit = async (event) => {
        if (name == '' || nameError !== '') {
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

        if (email == '' || EmailError !== '') {
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
        if (phone == '' || phoneError !== '') {
            enqueueSnackbar('Vui lòng nhập đúng SĐT', {
                variant: 'error',
                autoHideDuration: 800,
                anchorOrigin: {
                    vertical: 'top',
                    horizontal: 'right',
                },
            });
            return;
        }


        if (birthday == '' || birthday == null || birthError !== '') {
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

        if (password == '' || passwordError !== '') {
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
                        minHeight: '550px',
                        minWidth: 'sm'

                    }}
                >

                    <Typography component="h1" variant="h3" sx={{ fontWeight: '1000', fontFamily: 'Oswald', paddingBottom: '20px', textAlign: 'center' }}>
                        Đăng ký
                    </Typography>
                    <Box >
                        <Grid container spacing={0.1} sx={{ textAlign: 'center', maxWidth: 'sm' }}>
                            <Grid item xs={6}>
                                <TextField
                                    margin="normal"
                                    value={name}
                                    fullWidth
                                    label="Tên khách hàng"
                                    onChange={handleNameChange}
                                    error={Boolean(nameError)}
                                    helperText={nameError}
                                />
                            </Grid>
                            <Grid item xs={6}>
                                <TextField
                                    margin="normal"
                                    fullWidth
                                    label="Địa chỉ Email"
                                    value={email}
                                    onChange={handleEmailChange}
                                    error={Boolean(EmailError)}
                                    helperText={EmailError}
                                />
                            </Grid>
                            <Grid item xs={12}>
                                <TextField
                                    margin="normal"
                                    value={address}
                                    fullWidth
                                    label="Địa chỉ khách hàng"
                                    onChange={handleAddressChange}
                                    error={Boolean(addressError)}
                                    helperText={addressError}
                                />
                            </Grid>
                            <Grid item xs={12}>
                                <TextField
                                    margin="normal"
                                    value={phone}
                                    fullWidth
                                    label="Số điện thoại"
                                    onChange={handlePhoneChange}
                                    error={Boolean(phoneError)}
                                    helperText={phoneError}
                                />
                            </Grid>
                            <Grid item xs={12}>
                                <TextField
                                    margin="normal"

                                    fullWidth
                                    label="Ngày sinh"
                                    type="date"
                                    defaultValue="2000-05-24"
                                    onChange={(e) => setBirthday(e.target.value)}
                                />
                            </Grid>
                            <Grid item xs={12}>
                                <TextField
                                    margin="normal"

                                    fullWidth
                                    label="Mật khẩu"
                                    type="password"
                                    value={password}
                                    onChange={handlePasswordChange}
                                    error={Boolean(passwordError)}
                                    helperText={passwordError}

                                />
                            </Grid>
                            <Grid item xs={12}>
                                <Grid item xs={12}>
                                    <TextField
                                        margin="normal"

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
                        <Button
                            type="submit"
                            fullWidth

                            variant="contained"
                            sx={{ fontFamily: 'Oswald', textAlign: 'center', marginTop: '5px', fontSize: '20px', width: '100%', color: 'white', backgroundColor: ' #d2143a', marginBottom: '20px' }}
                            onClick={handleSubmit}
                        >
                            Đăng Ký
                        </Button>
                    </Box>
                </Box>

                <Copyright sx={{ mt: 5 }} />
            </Container>
        </ThemeProvider>
    );
}