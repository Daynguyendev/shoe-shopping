import * as React from 'react';
import Box from '@mui/material/Box';
import Grid from '@mui/material/Grid';
import statusAPI from '../../../../API/statusAPI';
import { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import invoiceoutputAPI from '../../../../API/invoiceoutputAPI';
import IconButton from '@mui/material/IconButton';
import DeleteForeverIcon from '@mui/icons-material/DeleteForever';
import detailinvoiceoutputAPI from '../../../../API/detailinvoiceoutputAPI';
import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import ArrowUpwardIcon from '@mui/icons-material/ArrowUpward';
import CheckBoxOutlineBlankIcon from '@mui/icons-material/CheckBoxOutlineBlank';
import CheckBoxIcon from '@mui/icons-material/CheckBox';
import DirectionsCarIcon from '@mui/icons-material/DirectionsCar';
import CheckCircleOutlineIcon from '@mui/icons-material/CheckCircleOutline';
import DetailProductAPI from '../../../../API/detailproductAPI';
import MaterialTable, { MTableToolbar } from 'material-table';
import tableIcons from '../MaterialTableControl';

export default function OrderConfirmation() {
    const { id_khach_hang } = useParams();
    const [status, setStatus] = useState();
    const [statusAll, setStatusAll] = useState([]);
    const [invoiceDetail, setInvoiceDetail] = useState([]);
    const [invoice, setInvoice] = useState();
    const [open, setOpen] = useState(false);
    const invoiceDetailDisplay = invoiceDetail || [];
    const statusList = status || [];
    const statusAllList = statusAll || [];
    const invoiceAll = invoice || []
    const [detail, setDetail] = useState([]);
    const detailclone = detail || [];
    const [fillter, setFillter] = useState();
    const [idBill, setIdBill] = useState()

    const columns = [
        { field: 'id_hd_dat', title: 'ID', width: 10 },
        { field: 'ten_khach_hang', title: 'ten_khach_hang', width: 10 },
        { field: 'id_khach_hang', title: 'ID_KH', width: 10 },
        { field: 'ten_dia_chi', title: 'ten_dia_chi', width: 10 },
        { field: 'ngay_lap_hd_dat', title: 'ngay_lap_hd_dat', width: 10 },
        { field: 'tong_tien', title: 'tong_tien', width: 10 },
        {
            title: 'Trạng thái',
            render: (rowData) => {
                return (
                    <div >
                        {rowData.id_trang_thai === 4 ? (<Button variant="contained" color="error" >{rowData.id_trang_thai}</Button>
                        ) : (<div style={{ display: 'flex' }}>                    <Button variant="contained" color="success" sx={{ fontSize: '10px' }} >{rowData.id_trang_thai}</Button>
                        </div>)}

                    </div>
                );
            },
        },
        {
            title: 'Xem chi tiết',
            render: (rowData) => {
                return (
                    <Button variant="contained" color="success" sx={{ fontSize: '10px', width: '120px', height: '30px' }} onClick={(e) => HandleShowDetail(rowData.id_hd_dat)}>Xem chi tiết</Button>
                );
            },
        },
        {
            title: 'Thao tác', width: 10,
            render: (rowData) => {
                return (

                    <div >
                        {rowData.id_trang_thai === 4 ? ('') : (<div style={{ display: 'flex' }}>
                            <div style={{ padding: '2px' }}>
                                <Button sx={{ fontSize: '10px', width: '120px', height: '30px', padding: '2px' }} variant="contained" color="success" onClick={() => handleXacNhan(rowData.id_hd_dat - 1, rowData.id_khach_hang, rowData.id_hd_dat)}  >
                                    Xác nhận
                                </Button>
                                <Button variant="contained" color="warning" sx={{ fontSize: '10px', width: '120px', height: '30px', padding: '2px' }} onClick={() => handleVanChuyen(rowData.id_hd_dat - 1, rowData.id_khach_hang, rowData.id_hd_dat)}>
                                    Đang vận chuyển
                                </Button>

                            </div>
                            <div style={{ padding: '2px' }}>
                                <Button sx={{ fontSize: '10px', width: '120px', height: '30px', color: 'black', backgroundColor: 'DeepSkyBlue', padding: '2px' }} onClick={() => handleGiaoHang(rowData.id_hd_dat - 1, rowData.id_khach_hang, rowData.id_hd_dat)}>
                                    Hoàn thành
                                </Button>
                                <Button variant="contained" color="error" sx={{ fontSize: '10px', width: '120px', height: '30px', padding: '2px' }} onClick={() => handleHuy(rowData.id_hd_dat - 1, rowData.id_khach_hang, rowData.id_hd_dat)}>
                                    Hủy
                                </Button>

                            </div>


                        </div>)
                        }

                    </div >
                );
            },
        },
    ];


    function reverseInvoice() {
        const newInvoiceAll = [...invoiceAll];
        newInvoiceAll.reverse();
        setInvoice(newInvoiceAll);
    }
    console.log('testttt', invoiceAll)


    const handleClickOpen = () => {
        setOpen(true);
    };

    const handleClose = () => {
        setOpen(false);
    };

    useEffect(() => {
        try {
            const fetchCart = async () => {
                if (invoice !== null) {
                    const result = await invoiceoutputAPI.getAll()
                    setInvoice(result.data.data);

                }
            };
            fetchCart();
        } catch (error) {
            console.log('Failed to fetch invoice: ', error);
        }
    }, []);

    useEffect(() => {
        try {
            const fetchCart = async () => {
                if (invoiceDetail !== null) {
                    const result = await detailinvoiceoutputAPI.getAll()
                    setInvoiceDetail(result.data.data);

                }
            };
            fetchCart();
        } catch (error) {
            console.log('Failed to fetch invoiceDetail: ', error);
        }
    }, []);

    const HandleShowDetail = async (id_hd_dat) => {
        const result = await detailinvoiceoutputAPI.getDetail({ id_hd_dat: id_hd_dat })
        setDetail(result.data.data);
        setOpen(true);
    };

    const HandleFillter = async (id_trang_thai) => {
        const result = await statusAPI.getBillByStatus({ id_trang_thai: id_trang_thai })
        setInvoice(result.data.data);
    };

    useEffect(() => {
        try {
            const fetchCart = async () => {
                if (statusAll !== null) {
                    const result = await statusAPI.getAll();
                    setStatusAll(result.data.data);

                }
            };
            fetchCart();
        } catch (error) {
            console.log('Failed to fetch statusAll: ', error);
        }
    }, []);

    const handleXacNhan = async (index, id_khach_hang, id_hd_dat) => {
        const result = await statusAPI.UpdateStatus({ id_trang_thai: 1, id_khach_hang: id_khach_hang, id_hd_dat: id_hd_dat });
        const updateCart = [...invoiceAll];
        updateCart[index].id_trang_thai = 1;
        setInvoice(updateCart);
    }
    const handleHuy = async (index, id_khach_hang, id_hd_dat) => {
        const result = await statusAPI.UpdateStatus({ id_trang_thai: 4, id_khach_hang: id_khach_hang, id_hd_dat: id_hd_dat });
        setIdBill(id_hd_dat);
        const resultDetailInvoice = await detailinvoiceoutputAPI.getDetail({ id_hd_dat: id_hd_dat })
        for (let i = 0; i < (resultDetailInvoice.data.data).length; i++) {
            const results = await DetailProductAPI.UpdateQuantityRemove({
                so_luong: resultDetailInvoice.data.data[i].so_luong,
                id_sp: resultDetailInvoice.data.data[i].id_sp,
                id_mau_sac: resultDetailInvoice.data.data[i].id_mau_sac,
                id_kich_thuoc: resultDetailInvoice.data.data[i].id_kich_thuoc,
            })

        }
        const updateCart = [...invoiceAll];
        updateCart[index].id_trang_thai = 4;
        setStatus(updateCart);
    }

    const handleVanChuyen = async (index, id_khach_hang, id_hd_dat) => {
        const result = await statusAPI.UpdateStatus({ id_trang_thai: 2, id_khach_hang: id_khach_hang, id_hd_dat: id_hd_dat });
        const updateCart = [...invoiceAll];
        updateCart[index].id_trang_thai = 2;
        setInvoice(updateCart);
    }

    const handleGiaoHang = async (index, id_khach_hang, id_hd_dat) => {
        const result = await statusAPI.UpdateStatus({ id_trang_thai: 3, id_khach_hang: id_khach_hang, id_hd_dat: id_hd_dat });
        const updateCart = [...invoiceAll];
        updateCart[index].id_trang_thai = 3;
        setInvoice(updateCart);
    }

    return (
        <Box sx={{ width: '100%', minHeight: '550px', backgroundColor: 'white', paddingTop: '20px', justifyContent: 'space-evenly' }}>

            <div style={{ textAlign: 'center' }}>
                <h1 style={{ marginLeft: '10px', color: '#800000' }}>Lọc theo</h1>
                <IconButton sx={{ fontFamily: 'Oswald', fontSize: '20px' }} onClick={() => reverseInvoice()} >
                    <ArrowUpwardIcon /> Sắp xếp đơn hàng
                </IconButton>
                <IconButton sx={{ fontFamily: 'Oswald', fontSize: '20px' }} onClick={() => HandleFillter(0)} >
                    <CheckBoxOutlineBlankIcon /> Đơn hàng chưa xác nhận
                </IconButton>
                <IconButton sx={{ fontFamily: 'Oswald', fontSize: '20px' }} onClick={() => HandleFillter(1)} >
                    <CheckBoxIcon /> Đơn hàng đã xác nhận
                </IconButton>
                <IconButton sx={{ fontFamily: 'Oswald', fontSize: '20px' }} onClick={() => HandleFillter(2)}>
                    <DirectionsCarIcon /> Đơn hàng đang vận chuyển
                </IconButton>
                <IconButton sx={{ fontFamily: 'Oswald', fontSize: '20px' }} onClick={() => HandleFillter(3)}>
                    <CheckCircleOutlineIcon /> Đơn hàng đang giao hàng
                </IconButton>
                <IconButton sx={{ fontFamily: 'Oswald', fontSize: '20px' }} onClick={() => HandleFillter(4)}>
                    <DeleteForeverIcon /> Đơn hàng đã hủy
                </IconButton>

            </div>
            <MaterialTable
                title="Danh sách nhà cung cấp"
                columns={columns}
                data={invoice}
                icons={tableIcons}

            />

            <Dialog fullScreen open={open} onClose={handleClose}>
                <hr />
                <Grid >
                    <Grid sx={{ display: 'flex', alignItems: 'center', textAlign: 'center', fontFamily: 'Oswald', fontSize: '20px', justifyContent: 'space-evenly' }}>
                        <Grid item xl={5} lg={5} sm={5} md={5}>Tên sp:</Grid>
                        <Grid item xl={5} lg={5} sm={5} md={5}>Màu sắc:</Grid>
                        <Grid item xl={5} lg={5} sm={5} md={5}>Kích thước:</Grid>
                        <Grid item xl={5} lg={5} sm={5} md={5}>Số Lượng:</Grid>
                        <Grid item xl={5} lg={5} sm={5} md={5}>Hình ảnh</Grid>
                    </Grid>
                    <hr />
                    {detailclone.map((item, index) => (
                        <Grid key={index} >
                            <Grid sx={{ display: 'flex', alignItems: 'center', textAlign: 'center', fontFamily: 'Oswald', fontSize: '20px', justifyContent: 'space-evenly' }}>
                                <Grid item xl={5} lg={5} xs={5} sm={5} md={5}>{item.ten_sp}</Grid>
                                <Grid item xl={5} lg={5} xs={5} sm={5} md={5}>{item.ten_mau_sac}</Grid>
                                <Grid item xl={5} lg={5} xs={5} sm={5} md={5}> {item.ten_kich_thuoc}</Grid>
                                <Grid item xl={5} lg={5} xs={5} sm={5} md={5}> {item.so_luong}</Grid>
                                <Grid item xl={5} lg={5} xs={5} sm={5} md={5}><img style={{ width: '100px', height: '100px' }} src={item.hinh_anh_chinh} alt={index} /></Grid>
                            </Grid>
                            <hr />
                        </Grid>
                    ))}

                </Grid>
                <Button autoFocus onClick={handleClose}>
                    Thoát
                </Button>
            </Dialog>

        </Box >
    );
}
