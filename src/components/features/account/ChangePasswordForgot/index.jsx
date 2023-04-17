import * as React from 'react';
import Avatar from '@mui/material/Avatar';
import Button from '@mui/material/Button';
import CssBaseline from '@mui/material/CssBaseline';
import TextField from '@mui/material/TextField';
import Grid from '@mui/material/Grid';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import Container from '@mui/material/Container';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import { useNavigate } from 'react-router-dom';
import { useSnackbar } from 'notistack';
import { useState, useEffect } from 'react';
import userAPI from '../../../API/userAPI';
import * as yup from 'yup';
import { useParams } from 'react-router-dom';

const theme = createTheme();

export default function ChangePassWordForgot() {
    const navigate = useNavigate();
    const { email_khach_hang, token } = useParams();
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [passwordRepeat, setPasswordRepeat] = useState();

    const [birthday, setBirthday] = useState('');
    const [role, setRole] = useState(1);
    const { enqueueSnackbar } = useSnackbar();
    const [passwordError, setPasswordError] = useState('');

    const schema = yup
        .object()
        .shape({
            password: yup
                .string()
                .min(6, "Tối thiểu 6 ký tự"),
        })

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


    const handleSubmit = async (event) => {

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


        const result = await userAPI.changePassEMail({
            email_khach_hang: email_khach_hang,
            token: token,
            mat_khau_moi: password,
        })


            .then(async function (response) {

                enqueueSnackbar('Đổi mật khẩu thành công', {
                    variant: 'success',
                    autoHideDuration: 800,
                    anchorOrigin: {
                        vertical: 'top',
                        horizontal: 'right',
                    },
                });
                navigate(`/login`)
            })
            .catch(error => enqueueSnackbar('Đổi mật khẩu thất bại', {
                variant: 'error',
                autoHideDuration: 800,
                anchorOrigin: {
                    vertical: 'top',
                    horizontal: 'right',
                },
            })
            );
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
                        minHeight: '550px',
                        minWidth: 'sm'

                    }}
                >

                    <Typography component="h1" variant="h3" sx={{ fontWeight: '1000', fontFamily: 'Oswald', paddingBottom: '20px', paddingTop: '30px', textAlign: 'center' }}>
                        ĐỔI MẬT KHẨU MỚI
                    </Typography>
                    <Box >
                        <Grid container spacing={0.1} sx={{ textAlign: 'center', maxWidth: 'sm' }}>

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

                        <Button
                            type="submit"
                            fullWidth

                            variant="contained"
                            sx={{ fontFamily: 'Oswald', textAlign: 'center', marginTop: '5px', fontSize: '20px', width: '100%', color: 'white', backgroundColor: ' #d2143a', marginBottom: '20px' }}
                            onClick={handleSubmit}
                        >
                            Đổi mật khẩu
                        </Button>
                    </Box>
                </Box>

            </Container>
        </ThemeProvider>
    );
}