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
import UploadProduct from '../UploadProduct';
import categoryAPI from '../../../../API/categoryAPI';
import imageAPI from '../../../../API/imageAPI';
import discountAPI from '../../../../API/discountAPI';
import providerAPI from '../../../../API/providerAPI';
import trademarkAPI from '../../../../API/trademarkAPI';
import promotionAPI from '../../../../API/promotionAPI';

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
    const [quantity, setQuantity] = useState('');
    const [priceInput, setPriceInput] = useState('');
    const [total, setTotal] = useState('');
    const [product, setProduct] = useState([]);
    const [productItem, setProductItem] = useState(0);
    const [colorItem, setColorItem] = useState('');
    const [sizeItem, setSizeItem] = useState('');
    const [invoiceFull, setInvoiceFull] = useState([]);
    const [productAdd, setProductAdd] = useState('');
    const [sizeDetail, setSizeDetail] = useState([]);
    const [idPromotion, setIdPromotion] = useState('');
    const [trademark, setTrademark] = useState('');
    const [discount, setDiscount] = useState('');
    const [category, setCategory] = useState('');
    const [provider, setprovider] = useState('');
    const [nameProduct, setNameProduct] = useState('');
    const [priceProduct, setPriceProduct] = useState('');
    const [inforProduct, setInforProduct] = useState('');
    const [mainImg, setMainImg] = useState('');
    const [categoryDetail, setCategoryDetail] = useState([]);
    const [colorDetail, setColorDetail] = useState([]);
    const [imageDetail, setImageDetailDetail] = useState([]);
    const [discountDetail, setDiscountDetail] = useState([]);
    const [providerDetail, setProviderDetail] = useState([]);
    const [promotion, setPromotion] = useState([]);





    const handleProduct = event => {
        setProductItem(event.target.value);
        console.log('id', event.target.value);
    };
    const handleColor = event => {
        setColorItem(event.target.value);
        console.log(event.target.value);

    };
    const handleSize = event => {
        setSizeItem(event.target.value);
        console.log(event.target.value);

    };
    const handlePromotion = event => {
        setIdPromotion(event.target.value);
        console.log(event.target.value);

    };

    const handleTrademark = event => {
        setTrademark(event.target.value);
        console.log(event.target.value);
    };
    const handleDiscount = event => {
        setDiscount(event.target.value);
        console.log(event.target.value);
    };

    const handleProvider = event => {
        setprovider(event.target.value);
        console.log(event.target.value);
    };

    const handleCategory = event => {
        setCategory(event.target.value);
        console.log(event.target.value);
    };

    useEffect(() => {
        try {
            const fetchCategorry = async () => {
                if (categoryDetail !== null) {
                    const result = await categoryAPI.get();
                    setCategoryDetail(result.data.data);
                    console.log('categoryDetail', result.data)
                }
            };
            fetchCategorry();
        } catch (error) {
            console.log('Failed to fetch SizeDetail: ', error);
        }
    }, []);

    useEffect(() => {
        try {
            const fetchImageDetail = async () => {
                if (imageDetail !== null) {
                    const result = await imageAPI.getAll();
                    setImageDetailDetail(result.data.data);
                    console.log('imageDetail', result.data)
                }
            };
            fetchImageDetail();
        } catch (error) {
            console.log('Failed to fetch imageDetail: ', error);
        }
    }, []);

    useEffect(() => {
        try {
            const fetchDiscountDetail = async () => {
                if (discountDetail !== null) {
                    const result = await discountAPI.get();
                    setDiscountDetail(result.data.data);
                    console.log('discountDetail', result.data)
                }
            };
            fetchDiscountDetail();
        } catch (error) {
            console.log('Failed to fetch discountDetail: ', error);
        }
    }, []);

    useEffect(() => {
        try {
            const fetchProviderDetail = async () => {
                if (providerDetail !== null) {
                    const result = await providerAPI.get();
                    setProviderDetail(result.data.data);
                    console.log('providerDetail', result.data)
                }
            };
            fetchProviderDetail();
        } catch (error) {
            console.log('Failed to fetch providerDetail: ', error);
        }
    }, []);

    const [trademarkDetail, setTrademarkDetail] = useState([]);
    useEffect(() => {
        try {
            const fetchtrademarkDetail = async () => {
                if (trademarkDetail !== null) {
                    const result = await trademarkAPI.get();
                    setTrademarkDetail(result.data.data);
                    console.log('trademark', result.data)
                }
            };
            fetchtrademarkDetail();
        } catch (error) {
            console.log('Failed to fetch trademark: ', error);
        }
    }, []);

    useEffect(() => {
        try {
            const fetchCategorry = async () => {
                if (promotion !== null) {
                    const result = await promotionAPI.get();
                    setPromotion(result.data.data);
                    console.log('promotion', result.data)
                }
            };
            fetchCategorry();
        } catch (error) {
            console.log('Failed to fetch promotion: ', error);
        }
    }, []);

    console.log('Promotion', promotion);

    useEffect(() => {
        if (productItem != 0)
            try {
                const fetchProduct = async () => {
                    if (productAdd !== null) {
                        const result = await productAPI.getItemById({ id_sp: productItem });
                        setProductAdd(result.data.data);
                        console.log('productAdd', result.data.data)
                    }
                };
                fetchProduct();
            } catch (error) {
                console.log('Failed to fetch productAdd: ', error);
            }
    }, [productItem]);

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

    const handleSubmit = async (event) => {
        console.log('test0', {
            ten_sp: nameProduct,
            gia_sp: priceProduct,
            hinh_anh_chinh: mainImg,
            thong_tin_sp: inforProduct,
            id_thuong_hieu: trademark,
            id_loai_sp: category,
            id_khuyen_mai: idPromotion,
        })
        const submitProduct = await productAPI.add({
            ten_sp: nameProduct,
            gia_sp: priceProduct,
            hinh_anh_chinh: mainImg,
            thong_tin_sp: inforProduct,
            id_thuong_hieu: trademark,
            id_loai_sp: category,
            id_khuyen_mai: idPromotion,
        })


            .then(async function (response) {
                const setItem = await setProductItem(response.data.data.id_sp);
                const submitDetailInvoice = await detailInvoiceAPI.add({
                    id_sp: response.data.data.id_sp,
                    id_hd_nhap_hang: invoiceDetail,
                    ten_mau_sac: colorItem,
                    ten_kich_thuoc: sizeItem,
                    so_luong: quantity,
                    gia_nhap: priceInput,
                })

                const submitDetailProduct = await DetailProductAPI.add({
                    id_sp: response.data.data.id_sp,
                    ten_sp: nameProduct,
                    gia_sp: priceProduct,
                    hinh_anh_chinh: mainImg,
                    thong_tin_sp: inforProduct,
                    id_thuong_hieu: trademark,
                    id_loai_sp: category,
                    id_khuyen_mai: idPromotion,
                    ten_mau_sac: colorItem,
                    ten_kich_thuoc: sizeItem,
                    so_luong_kho: quantity,
                })
                setColorItem('')
                setSizeItem('')
                setQuantity('')
                setPriceInput('')
                enqueueSnackbar('Nh???p h??ng th??nh c??ng', {
                    variant: 'success',
                    autoHideDuration: 800,
                    anchorOrigin: {
                        vertical: 'top',
                        horizontal: 'right',
                    },
                })
            })



            .catch(error => enqueueSnackbar(error.message, { variant: 'error', autoHideDuration: 1000 })
            );
    };

    const handleRowSelection = (e) => {
        console.log(e)
    };

    return (

        <Box
            sx={{
                backgroundColor: 'white',
            }}

        >

            <div>

                <h1>TH??M S???N PH???M</h1>


                <TextField
                    select
                    label="Th????ng hi???u"
                    value={trademark}
                    onChange={handleTrademark}
                    fullWidth
                    helperText="Ch???n th????ng hi???u"
                >
                    {trademarkDetail.map((option) => (
                        <MenuItem key={option.id_thuong_hieu} value={option.id_thuong_hieu} >
                            {option.ten_thuong_hieu}
                        </MenuItem>
                    ))}
                </TextField>
                <TextField
                    select
                    label="Nh?? cung c???p"
                    value={provider}
                    onChange={handleProvider}
                    fullWidth
                    helperText="Ch???n nh?? cung c???p"
                >
                    {providerDetail.map((option) => (
                        <MenuItem key={option.id_nha_cc} value={option.id_nha_cc}>
                            {option.ten_nha_cc}
                        </MenuItem>
                    ))}
                </TextField>
                <TextField
                    fullWidth
                    select
                    label="Lo???i"
                    value={category}
                    onChange={handleCategory}
                    helperText="Ch???n lo???i"
                >
                    {categoryDetail.map((option) => (
                        <MenuItem key={option.id_loai_sp} value={option.id_loai_sp}>
                            {option.ten_loai_sp}
                        </MenuItem>
                    ))}
                </TextField>
                <TextField helperText="Nh???p t??n s???n ph???m" fullWidth id="outlined-basic" label="T??n s???n ph???m" variant="outlined" onChange={(e) => setNameProduct(e.target.value)} />
                <TextField helperText="Nh???p gi?? s???n ph???m" fullWidth id="filled-basic" label="Gi?? s???n ph???m" variant="outlined" onChange={(e) => setPriceProduct(e.target.value)} />
                <TextField helperText="Nh???p th??ng tin s???n ph???m" fullWidth id="standard-basic" label="Th??ng tin s???n ph???m" variant="outlined" onChange={(e) => setInforProduct(e.target.value)} />
                <TextField helperText="Nh???p li??n k???t ???nh ch??nh" fullWidth id="outlined-basic" label="URL ???nh ch??nh" variant="outlined" onChange={(e) => setMainImg(e.target.value)} />
                <TextField
                    fullWidth
                    select
                    label="ID khuy???n m??i"
                    value={idPromotion}

                    onChange={handlePromotion}
                    helperText="Vui l??ng ch???n m?? khuy???n m??i"
                >
                    {promotion.map((option) => (
                        <MenuItem key={option.id_khuyen_mai} value={option.id_khuyen_mai}>
                            {option.ten_khuyen_mai} <br />
                            {option.ngay_bat_dau} <br />
                            {option.ngay_ket_thuc} <br />
                            {option.phan_tram_giam}
                        </MenuItem>
                    ))}
                </TextField>
                <TextField
                    fullWidth
                    select
                    label="k??ch th?????c"
                    value={sizeItem}
                    onChange={handleSize}
                    helperText="Vui l??ng ch???n k??ch th?????c"
                >
                    {sizeDetail.map((option) => (
                        <MenuItem key={option.id_kich_thuoc} value={option.ten_kich_thuoc}>
                            {option.ten_kich_thuoc}
                        </MenuItem>
                    ))}
                </TextField>

                <TextField
                    select
                    fullWidth
                    label="M??u s???c"
                    value={colorItem}
                    onChange={handleColor}
                    helperText="Vui l??ng ch???n m??u s???c"

                >
                    {colorDetail.map((option) => (
                        <MenuItem key={option.id_mau_sac} value={option.ten_mau_sac}>
                            {option.ten_mau_sac}
                        </MenuItem>
                    ))}
                </TextField>



                <TextField helperText="Nh???p s??? l?????ng"
                    fullWidth onChange={(e) => setQuantity(e.target.value)} value={quantity} label="S??? l?????ng" sx={{ width: '250px', height: '60px', fontSize: '10px' }} />
                <TextField helperText="Gi?? nh???p"
                    fullWidth onChange={(e) => setPriceInput(e.target.value)} value={priceInput} label="Gi?? nh???p" sx={{ width: '250px', height: '60px', fontSize: '10px' }} />




                <Button onClick={handleSubmit} variant="contained" sx={{ width: '250px', height: '55px', fontSize: '15px' }}>
                    Nh???p s???n ph???m
                </Button>

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