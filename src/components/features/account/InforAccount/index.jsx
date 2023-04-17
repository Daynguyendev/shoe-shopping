import * as React from 'react';
import Box from '@mui/material/Box';
import Grid from '@mui/material/Grid';
import Container from '@mui/material/Container';
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import './account.scss'
import { useNavigate } from 'react-router-dom';
import { useSnackbar } from 'notistack';
import { useState, useEffect, useLayoutEffect } from 'react';
import addresskAPI from '../../../API/addressAPI';
import { useSelector } from 'react-redux';
import SignIn from '../SignIn';
import userAPI from '../../../API/userAPI';
import tableIcons from '../../admin/components/MaterialTableControl';
import MaterialTable from 'material-table';
import * as yup from 'yup';


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
    const [password, setPassword] = useState('');
    const [passwordold, setPasswordOld] = useState('');
    const [passwordRepeat, setPasswordRepeat] = useState();
    const [passwordError, setPasswordError] = useState('');
    const [display, setDisplay] = useState(false);

    const columns = [
        { field: 'ten_dia_chi', title: 'Tên địa chỉ', width: 130 },
        { field: 'ten_khach_hang', title: 'Tên khách hàng', width: 130 },
        { field: 'sdt_khach_hang', title: 'SĐT khách hàng', width: 130 },

    ];

    const schema = yup
        .object()
        .shape({
            password: yup
                .string()
                .min(6, "Tối thiểu 6 ký tự"),

        })

    const handleChangePass = (event) => {
        setDisplay(!display)

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
        userAPI.changePass({
            email_khach_hang: email_khach_hang,
            mat_khau_khach_hang: passwordold,
            mat_khau_moi: password,
        })

            .then(function (response) {
                enqueueSnackbar('Đổi mật khẩu thành công', {
                    variant: 'success',
                    autoHideDuration: 800,
                    anchorOrigin: {
                        vertical: 'top',
                        horizontal: 'right',
                    },
                });
            })
            .catch(error => enqueueSnackbar('Mật khẩu cũ không đúng', { variant: 'error', autoHideDuration: 1000 })
            );

    };


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
    useLayoutEffect(() => {
        window.scrollTo(0, 0);
    }, []);

    return (
        <>   {isLogin ? (
            <Container component="main" maxWidth="xl" >

                <Box sx={{
                    display: 'flex',
                    flexDirection: 'column',
                    alignItems: 'center',
                    backgroundColor: 'white',
                    paddingTop: '80px'
                }}>
                    <h3>Xin chào , {email.user.email_khach_hang}!</h3>
                    <Button variant="contained" disableElevation sx={{ width: '200px' }} onClick={handleChangePass}>
                        ĐỔI MẬT KHẨU
                    </Button>

                    <h1>QUẢN LÝ ĐỊA CHỈ</h1>
                    {display === true ? (<>  <Grid item xs={12}>
                        <TextField
                            margin="normal"

                            fullWidth
                            label="Mật khẩu cũ"
                            type="password"
                            value={passwordold}
                            onChange={(e) => setPasswordOld(e.target.value)}
                        />
                    </Grid>
                        <Grid item xs={12}>
                            <TextField
                                margin="normal"

                                fullWidth
                                label="Mật khẩu mới"
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
                                    label=" Nhập lại mật khẩu mới"
                                    type="password"
                                    onChange={(e) => setPasswordRepeat(e.target.value)}
                                />
                            </Grid>


                        </Grid>    <Button variant="contained" sx={{ marginBottom: '20px' }} onClick={() => handleSubmit()}>
                            THAY ĐỔI MẬT KHẨU
                        </Button></>) : ('')}
                </Box >

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
            </Container >

        ) : (
            <SignIn />
        )
        }</>
    );
}