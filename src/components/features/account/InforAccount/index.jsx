import * as React from 'react';
import Box from '@mui/material/Box';
import Grid from '@mui/material/Grid';
import Container from '@mui/material/Container';
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import Stack from '@mui/material/Stack';
import SendIcon from '@mui/icons-material/Send';
import './account.scss'
import { useNavigate } from 'react-router-dom';
import { useSnackbar } from 'notistack';
import { useState, useEffect } from 'react';
import addresskAPI from '../../../API/addressAPI';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemText from '@mui/material/ListItemText';
import { useSelector } from 'react-redux';
import SignIn from '../SignIn';
import userAPI from '../../../API/userAPI';
import tableIcons from '../../admin/components/MaterialTableControl';
import MaterialTable from 'material-table';


export default function InforAccount() {
    const { enqueueSnackbar } = useSnackbar();
    const navigate = useNavigate();
    const [address, setAddress] = useState();
    const [phone, setPhone] = useState();
    const [name, setName] = useState();
    const [idUser, setIdUser] = useState(null);
    const [listAddress, setListAddress] = useState();
    const [editAddress, setEditAddress] = useState();
    const [remove, setRemove] = useState();
    const ListShow = listAddress || [];
    let email_khach_hang = useSelector((state) => state?.user?.user?.email_khach_hang);
    const isLogin = useSelector((state) => state.user.isLogin);
    const email = useSelector((state) => state.user);
    const columns = [
        { field: 'id_dia_chi', title: 'ID', width: 70 },
        { field: 'ten_dia_chi', title: 'ten_dia_chi', width: 130 },
        { field: 'ten_khach_hang', title: 'ten_khach_hang', width: 130 },
        { field: 'sdt_khach_hang', title: 'sdt_khach_hang', width: 130 },

    ];

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
        localStorage.removeItem('token');
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
            })
        }

    }

    useEffect(() => {
        if (idUser)
            try {
                const fetchCategorry = async () => {
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

    };

    const getAddress = async () => {

        const result = await addresskAPI.getAddress({ id_khach_hang: idUser });
        setListAddress(result.data.data);
        console.log('ListAddress', result.data)
    };

    const handleRowUpdate = (newData, oldData, resolve) => {
        const updateListAddress = async () => {
            try {
                const { data } = await addresskAPI.update({ id_dia_chi: newData.id_dia_chi, ten_dia_chi: newData.ten_dia_chi, ten_khach_hang: newData.ten_khach_hang, sdt_khach_hang: newData.sdt_khach_hang });
                getAddress();
            } catch (error) {
                console.log('Failed to update ListAddress: ', error);
            }
        };
        updateListAddress();
        resolve();
    };

    const handleRowAdd = (newData, resolve) => {
        const addListAddress = async () => {
            try {
                const { data } = await addresskAPI.add({ id_khach_hang: idUser, ten_dia_chi: newData.ten_dia_chi, ten_khach_hang: newData.ten_khach_hang, sdt_khach_hang: newData.sdt_khach_hang });
                getAddress();
            } catch (error) {
                console.log('Failed toadd ListAddress: ', error);
            }
        };
        addListAddress();
        resolve();
    };

    const handleRowDelete = (oldData, resolve) => {
        const deleteListAddress = async () => {
            try {
                const { data } = await addresskAPI.delete(oldData.id_dia_chi);
                getAddress();
            } catch (error) {
                console.log('Failed to update ListAddress: ', error);
            }
        };
        deleteListAddress();
        resolve();
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
                    <h3>Xin chào , {email.user.email_khach_hang}!</h3>
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



                </Box>
                <MaterialTable
                    title="Danh sách địa chỉ"
                    columns={columns}
                    data={listAddress}
                    icons={tableIcons}
                    editable={{
                        onRowUpdate: (newData, oldData) =>
                            new Promise((resolve) => {
                                handleRowUpdate(newData, oldData, resolve);
                            }),
                        onRowAdd: (newData) =>
                            new Promise((resolve) => {
                                // handleRowAdd(newData, resolve);
                                handleRowAdd(newData, resolve);
                            }),
                        onRowDelete: (oldData) =>
                            new Promise((resolve) => {
                                handleRowDelete(oldData, resolve);
                            }),
                    }}
                />
            </Container>

        ) : (
            <SignIn />
        )
        }</>
    );
}