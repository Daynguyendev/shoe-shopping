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
import { DataGrid } from '@mui/x-data-grid';

const columns = [
    { field: 'id_dia_chi', headerName: 'ID', width: 70 },
    { field: 'ten_dia_chi', headerName: 'ten_dia_chi', width: 130 },
    { field: 'ten_khach_hang', headerName: 'ten_khach_hang', width: 130 },
    { field: 'sdt_khach_hang', headerName: 'sdt_khach_hang', width: 130 },

];
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
                enqueueSnackbar('Th??m ?????a ch??? th??nh c??ng', {
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
            })
        }

    }
    useEffect(() => {
        if (idUser)
            try {
                const fetchCategorry = async () => {
                    if (listAddress !== null) {

                    }
                };
                fetchCategorry();
            } catch (error) {
                console.log('Failed to fetch listAddress: ', error);
            }
    }, [idUser]);

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
                    <p>Xin ch??o , {email.user.email_khach_hang}!</p>
                    <Grid container spacing={2}>
                        <Grid item xs={4}>
                            <List
                                sx={{ width: '100%', maxWidth: 360, bgcolor: 'background.paper' }}
                                aria-label="contacts"
                            >
                                <ListItem disablePadding>
                                    <ListItemButton >
                                        <ListItemText primary="Th??m ?????a ch???" />
                                    </ListItemButton>
                                </ListItem>
                                <ListItem disablePadding>
                                    <ListItemButton onClick={handlemyBill}>
                                        <ListItemText primary="????n h??ng c???a t??i" />
                                    </ListItemButton>
                                </ListItem>
                                <ListItem disablePadding>
                                    <ListItemButton onClick={handleLogout}>
                                        <ListItemText primary="????ng xu???t" />
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
                                    label="T??n"
                                    onChange={(event) => (setName(event.target.value))}
                                    autoFocus
                                />
                                <TextField
                                    fullWidth
                                    label="?????a ch???"
                                    onChange={(event) => (setAddress(event.target.value))}
                                    sx={{ marginTop: '17px' }}

                                />

                                <TextField
                                    fullWidth
                                    label="S??? ??i???n tho???i"
                                    onChange={(event) => (setPhone(event.target.value))}
                                    sx={{ marginTop: '20px' }}
                                />
                                <Stack sx={{ paddingTop: '17px' }}>
                                    <Button variant="contained" endIcon={<SendIcon />} onClick={handleSubmit}>
                                        Th??m ?????a ch???
                                    </Button>
                                </Stack>
                            </Box>
                        </Grid>
                    </Grid>

                    <div style={{ width: '100%', height: '500px', paddingTop: '50px' }}>
                        <button onClick={removeAddress}>X??a</button>
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