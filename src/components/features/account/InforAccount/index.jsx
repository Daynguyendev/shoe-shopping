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
import { useNavigate } from 'react-router-dom';
import { useSnackbar } from 'notistack';
import { useState, useEffect } from 'react';
import addresskAPI from '../../../API/addressAPI';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';
import StarIcon from '@mui/icons-material/Star';
import { useSelector } from 'react-redux';
import SignIn from '../SignIn';
import cartAPI from '../../../API/cartAPI';
import userAPI from '../../../API/userAPI';
import { DataGrid } from '@mui/x-data-grid';
import { height } from '@mui/system';
import { forwardRef } from 'react';

const columns = [
    { field: 'id_dia_chi', headerName: 'ID', width: 70 },
    { field: 'ten_dia_chi', headerName: 'ten_dia_chi', width: 130 },
    { field: 'ten_khach_hang', headerName: 'ten_khach_hang', width: 130 },
    { field: 'sdt_khach_hang', headerName: 'sdt_khach_hang', width: 130 },

];


export default function InforAccount() {
    const isLogin = useSelector((state) => state.user.isLogin);
    const email = useSelector((state) => state.user);

    const navigate = useNavigate();
    const [address, setAddress] = useState();
    const [phone, setPhone] = useState();
    const [name, setName] = useState();

    const { enqueueSnackbar } = useSnackbar();
    const [idUser, setIdUser] = useState(null);
    let email_khach_hang = useSelector((state) => state?.user?.user?.email_khach_hang);
    const [listAddress, setListAddress] = useState();
    const [editAddress, setEditAddress] = useState();
    const ListShow = listAddress || [];
    console.log('co data ko', listAddress)
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

    const handleSubmit = (event) => {
        addresskAPI.add({
            id_khach_hang: idUser,
            ten_dia_chi: address,
            ten_khach_hang: name,
            sdt_khach_hang: phone
        })

            .then(function (response) {
                enqueueSnackbar('Thêm địa chỉ thành công', {
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
    const handleLogout = () => {
        localStorage.removeItem('user');
        navigate('/');
        window.location.reload();

    }

    const handlemyBill = () => {
        if (idUser)
            navigate(`/status/${idUser}`);

    }

    const removeAddress = () => {
        {
            remove.map((item, index) => {
                const result = addresskAPI.remove({ id_dia_chi: item });
                console.log('ket qua xoa', item);

            })
        }

    }
    useEffect(() => {
        if (idUser)
            try {
                const fetchCategorry = async () => {
                    console.log('có data', idUser);
                    if (listAddress !== null) {

                    }
                };
                fetchCategorry();
            } catch (error) {
                console.log('Failed to fetch listAddress: ', error);
            }
    }, [idUser]);
    const [remove, setRemove] = useState();
    useEffect(() => {
        if (idUser)
            try {
                const fetchCategorry = async () => {
                    console.log('có data', idUser);
                    if (listAddress !== null) {
                        const result = await addresskAPI.getAddress({ id_khach_hang: idUser });
                        setListAddress(result.data.data);

                    }
                };
                fetchCategorry();
            } catch (error) {
                console.log('Failed to fetch listAddress: ', error);
            }
    }, [idUser]);

    const handleRowSelection = (e) => {
        setRemove(e);
        navigate(`/account/${e}`);

        console.log('rm', e)

    };

    return (
        <>   {isLogin ? (
            <Container component="main" maxWidth="xl" >

                <Box sx={{
                    display: 'flex',
                    flexDirection: 'column',
                    alignItems: 'center',
                    backgroundColor: 'white',
                    minHeight: '650px'

                }}>
                    <p>Xin chào , {email.user.email_khach_hang}!</p>


                    <Grid container spacing={2}>


                        <Grid item xs={4}>
                            <List
                                sx={{ width: '100%', maxWidth: 360, bgcolor: 'background.paper' }}
                                aria-label="contacts"
                            >
                                <ListItem disablePadding>
                                    <ListItemButton >
                                        <ListItemText primary="Thêm địa chỉ" />
                                    </ListItemButton>
                                </ListItem>
                                <ListItem disablePadding>
                                    <ListItemButton onClick={handlemyBill}>
                                        <ListItemText primary="Đơn hàng của tôi" />
                                    </ListItemButton>
                                </ListItem>
                                <ListItem disablePadding>
                                    <ListItemButton onClick={handleLogout}>
                                        <ListItemText primary="Đăng xuất" />
                                    </ListItemButton>
                                </ListItem>

                            </List>


                        </Grid>
                        <Grid item xs={8} sx={{ marginTop: '17px' }}>
                            <Box


                                component="form" onSubmit={handleSubmit} noValidate sx={{ mt: 1 }}

                            >
                                <TextField
                                    fullWidth
                                    label="Tên"
                                    onChange={(event) => (setName(event.target.value))}
                                    autoFocus
                                />

                                <TextField
                                    fullWidth
                                    label="Địa chỉ"
                                    onChange={(event) => (setAddress(event.target.value))}
                                    sx={{ marginTop: '17px' }}

                                />

                                <TextField
                                    fullWidth
                                    label="Số điện thoại"
                                    onChange={(event) => (setPhone(event.target.value))}
                                    sx={{ marginTop: '20px' }}

                                />
                                <Stack sx={{ paddingTop: '17px' }}>
                                    <Button variant="contained" endIcon={<SendIcon />} onClick={handleSubmit}>
                                        Thêm địa chỉ
                                    </Button>
                                </Stack>
                            </Box>



                        </Grid>


                    </Grid>

                    <div style={{ width: '100%', height: '500px', paddingTop: '50px' }}>
                        <button onClick={removeAddress}>Xóa</button>
                        <DataGrid
                            getRowId={(row) => row.id_dia_chi}
                            rows={ListShow}
                            columns={columns}
                            pageSize={5}
                            rowsPerPageOptions={[5]}
                            checkboxSelection
                            onRowSelected={handleRowSelection}
                            onSelectionModelChange={handleRowSelection}
                        />
                    </div>
                </Box>



            </Container>

        ) : (
            <SignIn />
        )}</>



    );
}