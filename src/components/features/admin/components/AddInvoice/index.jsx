import * as React from 'react';
import Box from '@mui/material/Box';
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import { useState, useEffect } from 'react';
import { useSnackbar } from 'notistack';
import invoiceAPI from '../../../../API/invoiceAPI';
import detailInvoiceAPI from '../../../../API/detailinvoiceAPI';
import tableIcons from '../MaterialTableControl';
import MaterialTable from 'material-table';
import { useNavigate } from 'react-router-dom';
import * as yup from 'yup';

function AddInvoice() {
    const navigate = useNavigate();
    const { enqueueSnackbar } = useSnackbar();
    const [idCustomer, setIdCustomer] = useState('1');
    const [namebill, setNamebill] = useState('');
    const [totalHD, setTotalHD] = useState('0');
    const [billDetail, setBillDetail] = useState([]);
    const [nameError, setNameError] = useState('');
    const schema = yup
        .object()
        .shape({
            namebill: yup
                .string().matches(/^[a-zA-Z0-9]+$/, "Không được chứa ký tự đặc biệt")
                .max(20, 'Tối đa 20 kí tự')
                .min(3, 'Tối thiểu 3 kí tự')

        })
    const handleNameBillChange = (event) => {
        const value = event.target.value;
        setNamebill(value);

        schema
            .validate({ namebill: value })
            .then(() => {
                setNameError('');
            })
            .catch((error) => {
                setNameError(error.message);
            });
    };


    const columns = [
        { field: 'id_hd_nhap_hang', title: 'ID', width: 70 },
        { field: 'ten_hoa_don_nhap', title: 'Tên hóa đơn nhập', width: 130 },
        {
            title: 'Ngày lập',
            render: (rowData) => {
                return (
                    <p>{(rowData.ngay_lap_hd).slice(0, 10)}</p>
                );
            },
        },
        {
            title: 'Tổng tiền',
            render: (rowData) => {
                return (
                    <p>{(rowData.tong_tien).toLocaleString('vi-VN', { style: 'currency', currency: 'VND' })}</p>
                );
            },
        }, {
            title: 'Xem chi tiết',
            render: (rowData) => {

                const handleViewDetail = () => {
                    navigate(`/admin/invoice/${rowData.ten_hoa_don_nhap}`);
                };

                return (
                    <Button sx={{ fontSize: '13px', width: '120px', height: '30px', color: 'white', backgroundColor: 'DeepSkyBlue' }} onClick={handleViewDetail}>
                        Xem chi tiết
                    </Button>
                );
            },
        },

    ];

    const [namebillDetail, setNameBillDetail] = useState();

    useEffect(() => {
        try {
            const fetchBillDetail = async () => {
                if (billDetail !== null) {
                    const result = await invoiceAPI.getAll();
                    setBillDetail(result.data.data);
                }
            };
            fetchBillDetail();
        } catch (error) {
            console.log('Failed to fetch billDetail: ', error);
        }
    }, []);

    const handleCallAPI = () => {

        try {
            const fetchNameBill = async () => {
                if (namebillDetail !== null) {
                    const result = await detailInvoiceAPI.get(namebill);
                    setNameBillDetail(result.data.data);
                }
            };
            fetchNameBill();
        } catch (error) {
            console.log('Failed to fetch namebillDetail: ', error);
        }

    }

    const handleSubmitHD = () => {
        if (namebill == '' || nameError !== '') {

            enqueueSnackbar('Nhập đúng định dạng hóa đơn', {
                variant: 'error',
                autoHideDuration: 800,
                anchorOrigin: {
                    vertical: 'top',
                    horizontal: 'right',
                },
            });
            return;

        }
        invoiceAPI.add({
            id_quan_ly: idCustomer,
            ten_hoa_don_nhap: namebill,
            tong_tien: totalHD,
        })
            .then(function (response) {
                enqueueSnackbar('Thêm hóa đơn thành công', {
                    variant: 'success',
                    autoHideDuration: 800,
                    anchorOrigin: {
                        vertical: 'top',
                        horizontal: 'right',
                    },
                });
                navigate(`/admin/invoice/${namebill}`)
            })
            .catch(error => enqueueSnackbar(error.message, { variant: 'error', autoHideDuration: 1000 }));
    }

    const getBill = async () => {

        const result = await invoiceAPI.getAll();
        setBillDetail(result.data.data);
    };


    const handleRowUpdate = (newData, oldData, resolve) => {
        const updateSize = async () => {
            try {
                const { data } = await invoiceAPI.update({ id_hd_nhap_hang: newData.id_hd_nhap_hang, ten_hoa_don_nhap: newData.ten_hoa_don_nhap });
                getBill();
            } catch (error) {
                console.log('Failed to update size list: ', error);
            }
        };
        updateSize();
        resolve();
    };

    const handleRowAdd = (newData, resolve) => {
        const addSize = async () => {
            try {
                const { data } = await invoiceAPI.add({ ten_hoa_don_nhap: newData.ten_hoa_don_nhap, tong_tien: '0' });
                getBill();
            } catch (error) {
                console.log('Failed toadd size list: ', error);
            }
        };
        addSize();
        resolve();
    };

    const handleRowDelete = (oldData, resolve) => {
        const deleteSize = async () => {
            try {
                const { data } = await invoiceAPI.delete(oldData.id_hd_nhap_hang);
                getBill();
            } catch (error) {
                console.log('Failed to update product list: ', error);
            }
        };
        deleteSize();
        resolve();
    };
    return (
        <Box
            component="form"
            sx={{
                '& .MuiTextField-root': { m: 1, width: '45ch' },
                backgroundColor: 'white', textAlign: 'center', minHeight: '600px', paddingTop: '80px'
            }}
            noValidate
            autoComplete="off"
        >
            <h1>NHẬP HÀNG (TÊN HÓA ĐƠN) </h1>
            <div>
                <div>
                    <TextField onChange={handleNameBillChange} value={namebill} label="Tên Hóa Đơn" sx={{ width: '250px', paddingBottom: '15px', height: '60px', fontSize: '10px' }} error={Boolean(nameError)}
                        helperText={nameError} />
                    <Button onClick={handleSubmitHD} disableElevation sx={{ width: '215px', height: '55px', fontSize: '10px', marginTop: '9px', marginLeft: '8px' }} variant="contained">
                        Tạo hóa đơn
                    </Button>
                </div>
            </div>
            <MaterialTable
                title="Danh sách hóa đơn"
                columns={columns}
                data={billDetail}
                icons={tableIcons}
                editable={{
                    onRowUpdate: (newData, oldData) =>
                        new Promise((resolve) => {
                            handleRowUpdate(newData, oldData, resolve);
                        }),
                    onRowAdd: (newData) =>
                        new Promise((resolve) => {
                            handleRowAdd(newData, resolve);
                        }),
                    onRowDelete: (oldData) =>
                        new Promise((resolve) => {
                            handleRowDelete(oldData, resolve);
                        }),
                }}
            />
        </Box>
    );
}

export default AddInvoice;