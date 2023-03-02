import * as React from 'react';
import Avatar from '@mui/material/Avatar';
import Button from '@mui/material/Button';
import CssBaseline from '@mui/material/CssBaseline';
import TextField from '@mui/material/TextField';
import FormControlLabel from '@mui/material/FormControlLabel';
import Checkbox from '@mui/material/Checkbox';
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
import { setUser } from '../userSlice';
import { useDispatch } from 'react-redux';
import { login } from '../userSlice';


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
    const [email, setEmail] = useState();
    const [password, setPassword] = useState();

    const { enqueueSnackbar } = useSnackbar();
    const dispatch = useDispatch();
    const handleNextPage = () => {
        navigate(`/register`)
    }
    /////
    // const handleLogin = async (email, password) => {
    //     try {
    //         const res = await userAPI.login({
    //             email_khach_hang: email,
    //             mat_khau_khach_hang: password
    //         });
    //         if (res.data.success) {
    //             const { user, token, } = res.data;
    //             localStorage.setItem('token', token);
    //             // localStorage.setItem('refreshToken', refreshToken);
    //             dispatch(setUser(user)); // Lưu thông tin người dùng vào store
    //         }
    //     } catch (error) {
    //         console.log(error);
    //     }
    // };



    /////
    const handleSubmit = (event) => {
        userAPI.login({
            email_khach_hang: email,
            mat_khau_khach_hang: password
        })

            .then(function (response) {
                dispatch(login({ email_khach_hang: email, token: response.data.token }));
                let data = { email_khach_hang: email, token: response.data.token, isLogin: true }
                localStorage.setItem('user', JSON.stringify(data));
                navigate(`/`)
                enqueueSnackbar('Đăng nhập thành công', {
                    variant: 'success',
                    autoHideDuration: 800,
                    anchorOrigin: {
                        vertical: 'top',
                        horizontal: 'right',
                    },
                });
            })
            .catch(error => enqueueSnackbar(error.message, { variant: 'error', autoHideDuration: 1000 })
            );

    };
    return (
        <ThemeProvider theme={theme}>
            <Container component="main" maxWidth="lg" sx={{

                backgroundColor: 'white',

            }}>
                <CssBaseline />
                {/* {console.log('têst', JSON.parse(localStorage.getItem('user'))?.)} */}

                <Box
                    sx={{
                        marginTop: 8,
                        display: 'flex',
                        flexDirection: 'column',
                        alignItems: 'center',
                        backgroundColor: 'white',

                    }}
                >
                    <Avatar sx={{ m: 1, bgcolor: 'secondary.main' }}>
                        <LockOutlinedIcon />
                    </Avatar>
                    <Typography component="h1" variant="h5">
                        Sign in
                    </Typography>
                    <Box component="form" noValidate sx={{ mt: 1 }}>
                        <TextField
                            margin="normal"
                            fullWidth
                            label="Email Address"
                            autoFocus
                            onChange={(e) => setEmail(e.target.value)}
                        />
                        <TextField
                            margin="normal"
                            fullWidth
                            label="Password"
                            type="password"
                            onChange={(e) => setPassword(e.target.value)}
                        />
                        <FormControlLabel
                            control={<Checkbox value="remember" color="primary" />}
                            label="Remember me"
                        />

                        <Grid container>
                            <Grid item xs>
                                <Link href="#" variant="body2">
                                    Forgot password?
                                </Link>
                            </Grid>
                            <Grid item>
                                <Link href="" variant="body2" onClick={handleNextPage}>
                                    {"Don't have an account? Sign Up"}

                                </Link>
                            </Grid>
                        </Grid>

                    </Box>
                    <Button
                        type="submit"
                        fullWidth
                        variant="contained"
                        sx={{ mt: 3, mb: 2 }}
                        onClick={handleSubmit}

                    >
                        Sign In
                    </Button>
                </Box>
                <Copyright sx={{ mt: 8, mb: 4 }} />
            </Container>
        </ThemeProvider >
    );
}