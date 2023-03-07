import * as React from 'react';
import Box from '@mui/material/Box';
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import { DataGrid } from '@mui/x-data-grid';
import { useState, useEffect } from 'react';
import { useSnackbar } from 'notistack';
import invoiceAPI from '../../../../API/invoiceAPI';
import detailInvoiceAPI from '../../../../API/detailinvoiceAPI';

import { useNavigate } from 'react-router-dom';
// const columns = [
//     { field: 'id_chi_tiet_hd', headerName: 'id_chi_tiet_hd', width: 70 },
//     { field: 'id_sp', headerName: 'id_sp', width: 70 },
//     { field: 'id_hd_nhap_hang', headerName: 'id_hd_nhap_hang', width: 70 },
//     { field: 'id_mau_sac', headerName: 'id_mau_sac', width: 70 },
//     { field: 'id_kich_thuoc', headerName: 'id_kich_thuoc', width: 70 },
//     { field: 'so_luong', headerName: 'so_luong', width: 70 },
//     { field: 'gia_nhap', headerName: 'gia_nhap', width: 200 },

// ];

function AddInvoice() {
    const navigate = useNavigate();
    const { enqueueSnackbar } = useSnackbar();
    const [invoiceDetail, setInvoiceDetail] = useState([]);
    const [idproduct, setIdProduct] = useState('');
    const [idCustomer, setIdCustomer] = useState('1');
    const [invoice, setInvoice] = useState();
    const [namebill, setNamebill] = useState('');
    const [totalHD, setTotalHD] = useState('0');

    const handleClickDetail = (item) => {
        handleSubmitHD()
        navigate(`/invoice/${namebill}`)

    }

    const [namebillDetail, setNameBillDetail] = useState();



    const handleCallAPI = () => {

        try {
            const fetchNameBill = async () => {
                if (namebillDetail !== null) {
                    const result = await detailInvoiceAPI.get(namebill);
                    setNameBillDetail(result.data.data);
                    console.log(namebillDetail)
                }
            };
            fetchNameBill();
        } catch (error) {
            console.log('Failed to fetch namebillDetail: ', error);
        }

    }

    const handleSubmitHD = () => {
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
            })
            .catch(error => enqueueSnackbar(error.message, { variant: 'error', autoHideDuration: 1000 }));


    }


    return (

        <Box
            component="form"
            sx={{
                '& .MuiTextField-root': { m: 1, width: '45ch' },
                backgroundColor: 'white', textAlign: 'center', minHeight: '600px', paddingTop: '50px'
            }}
            noValidate
            autoComplete="off"
        >
            <h1>NHẬP HÀNG (TÊN HÓA ĐƠN) </h1>


            <div>

                <div>
                    <TextField onChange={(e) => setNamebill(e.target.value)} label="Tên Hóa Đơn" sx={{ width: '250px', height: '60px', fontSize: '10px' }} />
                    <Button onClick={handleClickDetail} disableElevation sx={{ width: '215px', height: '55px', fontSize: '10px', marginTop: '9px', marginLeft: '8px' }} variant="contained">
                        Tạo hóa đơn
                    </Button>
                </div>
            </div>

        </Box>
    );
}

export default AddInvoice;