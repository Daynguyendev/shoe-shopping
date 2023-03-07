import * as React from 'react';
import Box from '@mui/material/Box';
import Grid from '@mui/material/Grid';
import TextField from '@mui/material/TextField';
import MenuItem from '@mui/material/MenuItem';
import { useState, useEffect } from 'react';
import addresskAPI from '../../../../API/addressAPI';
import checkoutAPI from '../../../../API/checkoutAPI';
import Button from '@mui/material/Button';
import { useSnackbar } from 'notistack';
import { useSelector } from 'react-redux';
import userAPI from '../../../../API/userAPI';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';
import { useNavigate } from 'react-router-dom';
import { useParams } from 'react-router-dom';
import cartAPI from '../../../../API/cartAPI';
import invoiceoutputAPI from '../../../../API/invoiceoutputAPI';
import detailinvoiceoutputAPI from '../../../../API/detailinvoiceoutputAPI'
import ButtonForm from '../../../../Formcontrol/ButtonForm';
import DetailProductAPI from '../../../../API/detailproductAPI';
import productAPI from '../../../../API/productAPI';

export default function UploadProduct() {
    let { id } = useParams();
    const { enqueueSnackbar } = useSnackbar();
    const [idUser, setIdUser] = useState('');
    let email_khach_hang = useSelector((state) => state?.user?.user?.email_khach_hang);
    const [open, setOpen] = useState(false);
    const navigate = useNavigate();
    const [addressadd, setAddressAdd] = useState();
    const [phone, setPhone] = useState();
    const [name, setName] = useState();
    const [cartJoin, setCartJoin] = useState();
    const cartMap = cartJoin || [];
    const [totalShip, setTotalShip] = useState(0)
    const [total, setTotal] = useState(0)
    const datacart = cartJoin || [];
    const [idHd, setIdHd] = useState(null);
    const [count, setCount] = useState(1);
    let so_luong_kho = 0;







    // useEffect(() => {

    //     console.log('ra naoo', colorAdd, sizeAdd)
    //     const fillterTotal = detailProduct.filter(item => item.ten_kich_thuoc === sizeAdd && item.ten_mau_sac === colorAdd)
    //     console.log('so _luong', fillterTotal[0].so_luong)


    //     for (let i = 0; i < fillterTotal.length; i++) {
    //         so_luong_kho = so_luong_kho + fillterTotal[i].so_luong;
    //     }
    //     setTotal(so_luong_kho)



    // }, [colorAdd, sizeAdd])


    console.log('test cart cái coi', datacart)



    useEffect(() => {

        const NewArray = [...datacart];
        const sum = NewArray.reduce((total, product) => {
            return total + product.so_luong;
        }, 0);

        let Number = Math.ceil(sum / 3);
        const ship = Number * 30000;
        setTotalShip(ship)
    }

        , [datacart]);


    useEffect(() => {

        const NewArray = [...datacart];
        const sum = NewArray.reduce((total, product) => {
            return total + product.so_luong * product.gia_sp;
        }, 0);

        setTotal(sum);
    }
        , [datacart]);

    console.log('testdatacart', datacart);

    useEffect(() => {
        try {
            const fetchCart = async () => {
                if (cartJoin !== null) {
                    const result = await cartAPI.getDetail(id);
                    setCartJoin(result.data.data);
                }
            };
            fetchCart();
        } catch (error) {
            console.log('Failed to fetch cartJoin: ', error);
        }
    }, []);

    const handleClickOpen = () => {
        setOpen(true);
    };

    const handleClose = () => {
        setOpen(false);
    };
    const handleSubmit = (event) => {
        addresskAPI.add({
            id_khach_hang: idUser,
            ten_dia_chi: addressadd,
            ten_khach_hang: name,
            sdt_khach_hang: phone
        })




            .then(function (response) {

                const dataAdd = [...address]
                const data = ({
                    id_dia_chi: response.data.data,
                    id_khach_hang: idUser,
                    ten_khach_hang: name,
                    ten_dia_chi: addressadd,
                    sdt_khach_hang: phone
                })

                dataAdd.push(data)
                setAddress(dataAdd)



                enqueueSnackbar('Thêm địa chỉ thành công', {
                    variant: 'success',
                    autoHideDuration: 800,
                    anchorOrigin: {
                        vertical: 'top',
                        horizontal: 'right',
                    },
                }); setOpen(false);
            })
            .catch(error => enqueueSnackbar(error.message, { variant: 'error', autoHideDuration: 1000 })
            );

    };
    const handleadddetail = () => {
        {
            datacart.map((item, index) => {
                detailinvoiceoutputAPI.add({
                    id_sp: item.id_sp,
                    id_hd_dat: idHd,
                    so_luong: item.so_luong,
                    ten_mau_sac: item.ten_mau_sac,
                    ten_kich_thuoc: item.ten_kich_thuoc,
                })

            })
        }

    }

    useEffect(() => {
        if (idHd) {
            handleadddetail();
            navigate(`/status/${id}/${idHd}`)
        }
    }, [idHd]);


    const handlesubmitFullInvoice = (event) => {
        const promises = datacart.map(item => {
            return DetailProductAPI.UpdateQuantity({
                so_luong: item.so_luong,
                id_sp: item.id_sp,
                ten_mau_sac: item.ten_mau_sac,
                ten_kich_thuoc: item.ten_kich_thuoc,
            });
        });

        Promise.all(promises)
            .then(responses => {
                // Nếu tất cả các Promise đều thành công, tiếp tục thực hiện phần tiếp theo
                invoiceoutputAPI.add({
                    id_khach_hang: idUser,
                    id_dia_chi: addressSubmit,
                    id_phuong_thuc_tt: checkoutSubmit,
                    id_trang_thai: 0,
                    tong_tien: total + totalShip,
                })
                    .then(function (response) {
                        setIdHd(response.data.data)
                        cartAPI.removeAll({ id_khach_hang: id })

                        enqueueSnackbar('Đặt hàng thành công', {
                            variant: 'success',
                            autoHideDuration: 800,
                            anchorOrigin: {
                                vertical: 'top',
                                horizontal: 'right',
                            },
                        });
                        setOpen(false);
                    })
                    .catch(error => {
                        enqueueSnackbar(error.message, { variant: 'error', autoHideDuration: 1000 })
                    });
            })
            .catch(error => {
                enqueueSnackbar('Đặt hàng thất bại, không đủ số lượng', { variant: 'error', autoHideDuration: 1000 })
            });

    };


    useEffect(() => {

        try {
            const fetchIdUser = async () => {
                const res = await userAPI.getID({ email_khach_hang: email_khach_hang });
                setIdUser(res.data.data[0].id_khach_hang)
            };
            fetchIdUser();
        } catch (error) {
            console.log('Failed to fetch idUser: ', error);
        }
    }, []);

    const [addressSubmit, setAddressSubmit] = useState('')
    const [checkoutSubmit, setCheckoutSubmit] = useState('')


    const handleAddress = event => {
        setAddressSubmit(event.target.value);
        console.log(event.target.value);
    }

    const handleCheckout = event => {
        setCheckoutSubmit(event.target.value);
        console.log(event.target.value);
    }

    const [checkout, setCheckout] = useState('');
    useEffect(() => {
        try {
            const fetchCart = async () => {
                if (checkout !== null) {
                    const result = await checkoutAPI.get();
                    setCheckout(result.data.data);
                }
            };
            fetchCart();
        } catch (error) {
            console.log('Failed to fetch checkout: ', error);
        }
    }, []);

    const [address, setAddress] = useState([]);
    const dataAddress = address || [];
    const dataCheckout = checkout || [];
    useEffect(() => {
        try {
            const fetchCart = async () => {
                if (address !== null) {
                    const result = await addresskAPI.getAddress({ id_khach_hang: id });
                    setAddress(result.data.data);
                }
            };
            fetchCart();
        } catch (error) {
            console.log('Failed to fetch checkout: ', error);
        }
    }, []);


    return (
        <Box
            component="form"
            sx={{
                '& .MuiTextField-root': { m: 1 },
                backgroundColor: 'white'
            }}
            noValidate
            autoComplete="off"
        >

            <Grid item xs={12} sx={{ display: { xs: 'block', md: 'flex', xl: 'flex', lg: 'flex', md: 'flex' } }}>


                <Grid item xs={11} xl={5} lg={5} sm={5} md={5} >
                    <h1 style={{ fontFamily: 'Jura', margin: '10px' }}>Thông tin thanh toán</h1>
                    <h3 style={{ fontFamily: 'Jura', margin: '10px' }}>Chọn địa chỉ và số điện thoại*</h3>
                    <TextField
                        select
                        label="Địa chỉ"
                        value={addressSubmit}
                        onChange={handleAddress}
                        fullWidth
                    >
                        {dataAddress.map((option) => (
                            <MenuItem key={option.id_dia_chi} value={option.id_dia_chi} >
                                Địa chỉ:  {option.ten_dia_chi} <br />Số điện thoại: {option.sdt_khach_hang} <br /> Tên: {option.ten_khach_hang}


                            </MenuItem>
                        ))}
                    </TextField>
                    <h3 style={{ fontFamily: 'Jura', margin: '10px' }}>Nếu chưa có ? Hãy nhập</h3>

                    <Button sx={{ marginLeft: '8px', margin: '10px' }} variant="outlined" onClick={handleClickOpen}>
                        Nhập địa chỉ
                    </Button>
                    <h3 style={{ fontFamily: 'Jura', margin: '10px' }}>Chọn phương thức thanh toán*</h3>
                    <TextField
                        select
                        label="Phương thức thanh toán"
                        value={checkoutSubmit}
                        onChange={handleCheckout}
                        fullWidth

                    >
                        {dataCheckout.map((option) => (
                            <MenuItem key={option.id_phuong_thuc_tt} value={option.id_phuong_thuc_tt}>
                                {option.ten_phuong_thuc_tt}

                            </MenuItem>
                        ))}
                    </TextField>


                </Grid>
                <Grid item xs={1} xl={1} lg={1} sm={1} md={1} >
                </Grid>
                <Grid item xs={11} xl={5} lg={5} sm={5} md={5} sx={{ border: '2px solid red', margin: '10px' }}>
                    <h3 style={{ margin: '10px' }}>Đơn hàng của bạn</h3>
                    <Grid sx={{ display: 'flex', margin: '10px' }} >


                        <Grid item xs={6} xl={6} lg={6} sm={6} md={6} >
                            Tên sản phẩm
                        </Grid>
                        <Grid item xs={6} xl={6} lg={6} sm={6} md={6} >
                            Số lượng
                        </Grid>
                        <Grid item xs={6} xl={6} lg={6} sm={6} md={6} >
                            Tạm tính
                        </Grid>

                    </Grid>

                    {cartMap.map((item, index) => (

                        <Grid key={index} sx={{ display: 'flex', margin: '10px' }} >


                            <Grid item xs={6} xl={6} lg={6} sm={6} md={6} >
                                {item.ten_sp}
                            </Grid>
                            <Grid item xs={6} xl={6} lg={6} sm={6} md={6} >
                                {item.so_luong}
                            </Grid>
                            <Grid item xs={6} xl={6} lg={6} sm={6} md={6} >
                                {item.gia_sp * item.so_luong}
                            </Grid>

                        </Grid>





                    ))}
                    <hr />
                    <Grid item xs={12} sx={{ margin: '10px' }} >
                        Tổng sản phẩm : {total}
                    </Grid>
                    <Grid item xs={12} sx={{ margin: '10px' }} >

                        Phí ship : {totalShip}
                    </Grid>
                    <hr />
                    <Grid item xs={12} sx={{ margin: '10px' }}  >

                        Tổng tiền thanh toán : {totalShip + total}
                    </Grid>

                    <Button onClick={handlesubmitFullInvoice} disableElevation sx={{ marginBottom: '10px', fontFamily: 'Jura', fontWeight: 'bold', width: '115px', height: '44px', fontSize: '15px', marginTop: '9px', marginLeft: '8px', color: 'black' }} variant="outlined">
                        Đặt hàng
                    </Button>



                </Grid>

                <br />

            </Grid>

            <Dialog open={open} onClose={handleClose}>
                <DialogTitle>Nhập địa chỉ</DialogTitle>
                <DialogContent>
                    <DialogContentText>
                        Vui lòng nhập đúng địa chỉ để chúng tôi giao hàng tới bạn nhanh nhất
                    </DialogContentText>
                    <TextField
                        fullWidth
                        label="Tên"
                        onChange={(event) => (setName(event.target.value))}
                        autoFocus
                    />

                    <TextField
                        fullWidth
                        label="Địa chỉ"
                        onChange={(event) => (setAddressAdd(event.target.value))}
                        sx={{ marginTop: '17px' }}

                    />

                    <TextField
                        fullWidth
                        label="Số điện thoại"
                        onChange={(event) => (setPhone(event.target.value))}
                        sx={{ marginTop: '20px' }}

                    />
                </DialogContent>
                <DialogActions>
                    <Button onClick={handleSubmit}>Thêm</Button>
                    <Button onClick={handleClose}>Hủy</Button>
                </DialogActions>
            </Dialog>

        </Box>
    );
}