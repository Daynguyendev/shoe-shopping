import * as React from 'react';
import Box from '@mui/material/Box';
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import { DataGrid } from '@mui/x-data-grid';
import { useState, useEffect } from 'react';
import { useSnackbar } from 'notistack';
import detailInvoiceAPI from './../../../../API/detailinvoiceAPI';
import MenuItem from '@mui/material/MenuItem';
import sizeAPI from './../../../../API/sizeAPI';
import colorAPI from '../../../../API/colorAPI';
import productAPI from '../../../../API/productAPI'
import invoiceAPI from '../../../../API/invoiceAPI';
import DetailProductAPI from '../../../../API/detailproductAPI';
import { useParams } from 'react-router-dom';



const columns = [
    { field: 'id_chi_tiet_hd', headerName: 'id_chi_tiet_hd', width: 70 },
    { field: 'id_sp', headerName: 'id_sp', width: 70 },
    { field: 'id_hd_nhap_hang', headerName: 'id_hd_nhap_hang', width: 70 },
    { field: 'ten_mau_sac', headerName: 'ten_mau_sac', width: 70 },
    { field: 'ten_kich_thuoc', headerName: 'ten_kich_thuoc', width: 70 },
    { field: 'so_luong', headerName: 'so_luong', width: 70 },
    { field: 'gia_nhap', headerName: 'gia_nhap', width: 200 },

];

function AddInvoiceInput() {
    let { name } = useParams();
    const { enqueueSnackbar } = useSnackbar();
    const [invoiceDetail, setInvoiceDetail] = useState([]);
    const [idproduct, setIdProduct] = useState('');
    const [idHd, setIdHd] = useState('');
    const [idColor, setIdColor] = useState('');
    const [idSize, setIdSize] = useState('');
    const [quantity, setQuantity] = useState('');
    const [priceInput, setPriceInput] = useState('');
    const [nameHD, setNameHD] = useState('');
    const [total, setTotal] = useState('');
    const [sizeDetail, setSizeDetail] = useState([]);
    const [product, setProduct] = useState([]);



    const [productItem, setProductItem] = useState('');
    const [colorItem, setColorItem] = useState('');
    const [sizeItem, setSizeItem] = useState('');

    const handleProduct = event => {
        setProductItem(event.target.value);
        console.log(event.target.value);
    };
    const handleColor = event => {
        setColorItem(event.target.value);
        console.log(event.target.value);

    };
    const handleSize = event => {
        setSizeItem(event.target.value);
        console.log(event.target.value);

    };




    const [idCustomer, setIdCustomer] = useState('1');
    const [invoice, setInvoice] = useState();
    const [namebill, setNamebill] = useState('');
    const [totalHD, setTotalHD] = useState('0');





    useEffect(() => {
        try {
            const fetchProduct = async () => {
                if (product !== null) {
                    const result = await productAPI.getAll();
                    setProduct(result.data.data);
                    console.log('product', result.data.data)
                }
            };
            fetchProduct();
        } catch (error) {
            console.log('Failed to fetch product: ', error);
        }
    }, []);


    useEffect(() => {
        try {
            const fetchSizeDetail = async () => {
                if (sizeDetail !== null) {
                    const result = await sizeAPI.get();
                    setSizeDetail(result.data.data);
                    console.log('sizeDetail', result.data.data)
                }
            };
            fetchSizeDetail();
        } catch (error) {
            console.log('Failed to fetch SizeDetail: ', error);
        }
    }, []);



    ///
    const [colorDetail, setColorDetail] = useState([]);


    useEffect(() => {
        try {
            const fetchColorDetail = async () => {
                if (colorDetail !== null) {
                    const result = await colorAPI.get();
                    setColorDetail(result.data.data);
                    console.log('colorDetail', result.data)
                }
            };
            fetchColorDetail();
        } catch (error) {
            console.log('Failed to fetch colorDetail: ', error);
        }
    }, []);
    ///

    /////////////////////////////////////////////////
    useEffect(() => {
        try {
            const fetchInvoiceDetail = async () => {
                if (invoiceDetail !== null) {
                    const result = await invoiceAPI.getByName(name);
                    setInvoiceDetail(result.data.data[0].id_hd_nhap_hang);
                    console.log('invoiceadd', result.data.data[0].id_hd_nhap_hang)

                }
            };
            fetchInvoiceDetail();
        } catch (error) {
            console.log('Failed to fetch invoice: ', error);
        }
    }, []);



    const [invoiceFull, setInvoiceFull] = useState([]);


    useEffect(() => {
        try {
            const fetchInvoiceFull = async () => {
                if (invoiceFull !== null) {
                    const result = await detailInvoiceAPI.get();
                    setInvoiceFull(result.data.data);
                }
            };
            fetchInvoiceFull();
        } catch (error) {
            console.log('Failed to fetch invoiceFull: ', error);
        }
    }, []);

    const [namebillDetail, setNameBillDetail] = useState();

    const handleSubmit = (event) => {

        detailInvoiceAPI.add({
            id_sp: productItem,
            id_hd_nhap_hang: invoiceDetail,
            ten_mau_sac: colorItem,
            ten_kich_thuoc: sizeItem,
            so_luong: quantity,
            gia_nhap: priceInput,
        })
        DetailProductAPI.add({
            id_sp: productItem,
            ten_mau_sac: colorItem,
            ten_kich_thuoc: sizeItem,
            so_luong: quantity,

        })


            .then(function (response) {

                enqueueSnackbar('Thêm chi tiết hóa đơn thành công', {
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


    const handleRowSelection = (e) => {
        console.log(e)

    };
    return (

        <Box
            component="form"
            sx={{
                '& .MuiTextField-root': { m: 1, width: '45ch' },
                backgroundColor: 'white',
            }}
            noValidate
            autoComplete="off"
        >

            <div>
                <div>
                    <TextField
                        select
                        label="ID Sản phẩm"
                        value={productItem}
                        onChange={handleProduct}
                        helperText="Vui lòng ID sản phẩm"
                    >
                        {product.map((option) => (
                            <MenuItem key={option.id_sp} value={option.id_sp}>
                                {option.ten_sp}
                            </MenuItem>
                        ))}
                    </TextField>

                </div>
                <div>
                    <TextField
                        select
                        label="kích thước"
                        value={sizeItem}
                        onChange={handleSize}
                        helperText="Vui lòng chọn kích thước"
                    >
                        {sizeDetail.map((option) => (
                            <MenuItem key={option.id_kich_thuoc} value={option.ten_kich_thuoc}>
                                {option.ten_kich_thuoc}
                            </MenuItem>
                        ))}
                    </TextField>

                    <TextField
                        select
                        label="Màu sắc"
                        value={colorItem}
                        onChange={handleColor}
                        helperText="Vui lòng chọn màu sắc"

                    >
                        {colorDetail.map((option) => (
                            <MenuItem key={option.id_mau_sac} value={option.ten_mau_sac}>
                                {option.ten_mau_sac}
                            </MenuItem>
                        ))}
                    </TextField>

                </div>
                <div>
                    <TextField onChange={(e) => setQuantity(e.target.value)} value={quantity} label="Số lượng" sx={{ width: '250px', height: '60px', fontSize: '10px' }} />
                    <TextField onChange={(e) => setPriceInput(e.target.value)} value={priceInput} label="Giá nhập" sx={{ width: '250px', height: '60px', fontSize: '10px' }} />
                </div>



                <Button onClick={handleSubmit} variant="contained" sx={{ width: '250px', height: '55px', fontSize: '15px' }}>
                    Nhập sản phẩm
                </Button>
                <div>
                    <TextField onChange={(e) => setTotal(e.target.value)} value={total} label="Tổng tiền" sx={{ width: '250px', height: '60px', fontSize: '10px' }} />

                </div>



                <div style={{ height: 400, width: '100%', paddingTop: '50px' }}>
                    <DataGrid
                        getRowId={(row) => row.id_chi_tiet_hd}
                        rows={invoiceFull}
                        columns={columns}
                        pageSize={10}
                        rowsPerPageOptions={[5]}
                        checkboxSelection
                        onRowSelected={handleRowSelection}
                        onSelectionModelChange={handleRowSelection}
                    />
                </div>

            </div>




        </Box>
    );
}

export default AddInvoiceInput;