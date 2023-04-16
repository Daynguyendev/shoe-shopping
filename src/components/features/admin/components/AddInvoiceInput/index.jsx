import * as React from 'react';
import Box from '@mui/material/Box';
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
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
import categoryAPI from '../../../../API/categoryAPI';
import imageAPI from '../../../../API/imageAPI';
import discountAPI from '../../../../API/discountAPI';
import providerAPI from '../../../../API/providerAPI';
import trademarkAPI from '../../../../API/trademarkAPI';
import promotionAPI from '../../../../API/promotionAPI';
import tableIcons from '../MaterialTableControl';
import MaterialTable from 'material-table';
import UploadImage from '../UploadImage';
import ToggleButton from '@mui/material/ToggleButton';
function AddInvoiceInput() {
    let { name } = useParams();
    const { enqueueSnackbar } = useSnackbar();
    const [invoiceDetail, setInvoiceDetail] = useState([]);
    const [quantity, setQuantity] = useState('');
    const [priceInput, setPriceInput] = useState('');
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
    const [detaiIinvoice, setDetailInvoice] = useState([]);
    const [loading, setLoading] = useState(true);
    const [selectedButtons, setSelectedButtons] = useState([]);
    const [selectedButtonsize, setSelectedButtonsize] = useState([]);


    const columns = [
        { field: 'id_chi_tiet_hd', title: 'ID', width: 70 },
        { field: 'id_sp', title: 'ID sản phẩm', width: 70 },
        { field: 'id_hd_nhap_hang', title: 'ID HĐ nhập', width: 70 },
        { field: 'id_mau_sac', title: 'ID màu sắc', width: 70 },
        { field: 'id_kich_thuoc', title: 'ID kích thước', width: 70 },
        { field: 'so_luong', title: 'Số lượng', width: 70 },
        { field: 'gia_nhap', title: 'Giá nhập', width: 200 },


    ];

    const handlePromotion = event => {
        setIdPromotion(event.target.value);

    };

    const handleTrademark = event => {
        setTrademark(event.target.value);
    };
    const handleDiscount = event => {
        setDiscount(event.target.value);
    };

    const handleProvider = event => {
        setprovider(event.target.value);
    };

    const handleCategory = event => {
        setCategory(event.target.value);
    };
    const handleClick = (buttonId) => {
        if (selectedButtons.includes(buttonId)) {
            setSelectedButtons(selectedButtons.filter(id => id !== buttonId));
        } else {
            setSelectedButtons([...selectedButtons, buttonId]);
        }
    };

    const handleClickSize = (buttonId) => {
        if (selectedButtonsize.includes(buttonId)) {
            setSelectedButtonsize(selectedButtonsize.filter(id => id !== buttonId));
        } else {
            setSelectedButtonsize([...selectedButtonsize, buttonId]);
        }
    };


    useEffect(() => {
        try {
            const fetchCategorry = async () => {
                if (categoryDetail !== null) {
                    const result = await categoryAPI.get();
                    setCategoryDetail(result.data.data);
                    setLoading(false);
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
                    setLoading(false);
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
                    setLoading(false);
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
                    setLoading(false);
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
                    setLoading(false);
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
                    setLoading(false);
                }
            };
            fetchCategorry();
        } catch (error) {
            console.log('Failed to fetch promotion: ', error);
        }
    }, []);


    useEffect(() => {
        if (productItem != 0)
            try {
                const fetchProduct = async () => {
                    if (productAdd !== null) {
                        const result = await productAPI.getItemById({ id_sp: productItem });
                        setProductAdd(result.data.data);
                        setLoading(false);
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
                    setLoading(false);
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
                    setLoading(false);
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
                    setLoading(false);
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
                    setLoading(false);

                }
            };
            fetchInvoiceDetail();
        } catch (error) {
            console.log('Failed to fetch invoice: ', error);
        }
    }, []);


    useEffect(() => {
        try {
            const fetchInvoiceDetailInput = async () => {
                if (detaiIinvoice !== null) {
                    const result = await detailInvoiceAPI.getByNameInvoice(name);
                    setDetailInvoice(result.data.data);
                    setLoading(false);


                }
            };
            fetchInvoiceDetailInput();
        } catch (error) {
            console.log('Failed to fetch detaiIinvoice: ', error);
        }
    }, []);



    useEffect(() => {
        try {
            const fetchInvoiceFull = async () => {
                if (invoiceFull !== null) {
                    const result = await detailInvoiceAPI.get();
                    setInvoiceFull(result.data.data);
                    setLoading(false);
                }
            };
            fetchInvoiceFull();
        } catch (error) {
            console.log('Failed to fetch invoiceFull: ', error);
        }
    }, []);





    const getInvoiceDetail = async () => {
        const result = await detailInvoiceAPI.getByNameInvoice(name);
        setDetailInvoice(result.data.data);

    };

    const handleRowUpdate = (newData, oldData, resolve) => {

        let errorList = [];
        if (newData.id_chi_tiet_hd === '') {
            errorList.push('Please enter id_chi_tiet_hd');
        }
        if (newData.id_sp === '') {
            errorList.push('Please enter id_sp');
        }
        if (newData.id_hd_nhap_hang === '') {
            errorList.push('Please enter id_hd_nhap_hang');
        }
        if (newData.id_mau_sac === '') {
            errorList.push('Please enter id_mau_sac');
        }
        if (newData.id_kich_thuoc === '') {
            errorList.push('Please enter id_kich_thuoc');
        }
        if (newData.gia_nhap === '') {
            errorList.push('Please enter gia_nhap');
        }


        if (errorList.length < 1) {


            const updateInvoiceDetail = async () => {
                try {
                    const { data } = await detailInvoiceAPI.update({
                        id_chi_tiet_hd: newData.id_chi_tiet_hd,
                        id_sp: newData.id_sp,
                        id_hd_nhap_hang: newData.id_hd_nhap_hang,
                        id_mau_sac: newData.id_mau_sac,
                        id_kich_thuoc: newData.id_kich_thuoc,
                        so_luong: newData.so_luong,
                        gia_nhap: newData.gia_nhap
                    });
                    getInvoiceDetail();
                } catch (error) {
                    console.log('Failed to update InvoiceDetail list: ', error);
                }
            };
            updateInvoiceDetail();
            resolve();

        } else {
            resolve();
        }


    };

    const handleRowAdd = (newData, resolve) => {
        let errorList = [];
        if (newData.id_sp === '') {
            errorList.push('Please enter id_sp');
        }
        if (newData.id_hd_nhap_hang === '') {
            errorList.push('Please enter id_hd_nhap_hang');
        }
        if (newData.id_mau_sac === '') {
            errorList.push('Please enter id_mau_sac');
        }
        if (newData.id_kich_thuoc === '') {
            errorList.push('Please enter id_kich_thuoc');
        }
        if (newData.gia_nhap === '') {
            errorList.push('Please enter gia_nhap');
        }


        if (errorList.length < 1) {
            const addInvoiceDetail = async () => {
                try {
                    const { data } = await detailInvoiceAPI.add({
                        id_sp: newData.id_sp,
                        id_hd_nhap_hang: newData.id_hd_nhap_hang,
                        id_mau_sac: newData.id_mau_sac,
                        id_kich_thuoc: newData.id_kich_thuoc,
                        so_luong: newData.so_luong,
                        gia_nhap: newData.gia_nhap
                    });
                    getInvoiceDetail();
                } catch (error) {
                    console.log('Failed toadd InvoiceDetail list: ', error);
                }
            };
            addInvoiceDetail();
            resolve();

        } else {
            resolve();
        }



    };

    const handleRowDelete = (oldData, resolve) => {
        const deleteInvoiceDetail = async () => {
            try {
                const { data } = await detailInvoiceAPI.delete(oldData.id_chi_tiet_hd);
                getInvoiceDetail();
            } catch (error) {
                console.log('Failed to update InvoiceDetail list: ', error);
            }
        };
        deleteInvoiceDetail();
        resolve();
    };

    const handleSubmit = async (event) => {
        if (nameProduct == '' || priceProduct == '' || mainImg == '' || inforProduct == '' || trademark == '' || category == '' || idPromotion == '' || invoiceDetail == '' || selectedButtons.length == 0 || selectedButtonsize.length == 0 || quantity == '' || priceInput == '') {
            enqueueSnackbar('Vui lòng nhập đủ thông tin', {
                variant: 'error',
                autoHideDuration: 800,
                anchorOrigin: {
                    vertical: 'top',
                    horizontal: 'right',
                },
            })

            return;
        }

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


                for (let i = 0; i < selectedButtons.length; i++) {
                    for (let j = 0; j < selectedButtonsize.length; j++) {
                        const submitDetailInvoice = await detailInvoiceAPI.add({
                            id_sp: response.data.data.id_sp,
                            id_hd_nhap_hang: invoiceDetail,
                            id_mau_sac: selectedButtons[i],
                            id_kich_thuoc: selectedButtonsize[j],
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
                            id_mau_sac: selectedButtons[i],
                            id_kich_thuoc: selectedButtonsize[j],
                            so_luong_kho: quantity,
                        })
                    }
                }
                getInvoiceDetail();
                setColorItem('')
                setSizeItem('')
                setQuantity('')
                setPriceInput('')
                enqueueSnackbar('Nhập hàng thành công', {
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
    return (

        <Box
            sx={{
                backgroundColor: 'white',
            }}

        >
            {loading ? (
                <p>Loading...</p>) : (
                <>
                    <Box
                        sx={{
                            backgroundColor: 'white', paddingTop: '80px'
                        }}

                    >

                        <div>

                            <h1 style={{ textAlign: 'center', alignItems: 'center' }}>THÊM SẢN PHẨM</h1>

                            <h3>Thương hiệu</h3>
                            <TextField
                                select
                                label="Thương hiệu"
                                value={trademark}
                                onChange={handleTrademark}
                                fullWidth
                            >
                                {trademarkDetail.map((option) => (
                                    <MenuItem key={option.id_thuong_hieu} value={option.id_thuong_hieu} >
                                        {option.ten_thuong_hieu}
                                    </MenuItem>
                                ))}
                            </TextField>
                            <h3>Nhà cung cấp</h3>
                            <TextField
                                select
                                label="Nhà cung cấp"
                                value={provider}
                                onChange={handleProvider}
                                fullWidth

                            >
                                {providerDetail.map((option) => (
                                    <MenuItem key={option.id_nha_cc} value={option.id_nha_cc}>
                                        {option.ten_nha_cc}
                                    </MenuItem>
                                ))}
                            </TextField>
                            <h3>Loại giày</h3>
                            <TextField
                                fullWidth
                                select
                                label="Loại"
                                value={category}
                                onChange={handleCategory}

                            >
                                {categoryDetail.map((option) => (
                                    <MenuItem key={option.id_loai_sp} value={option.id_loai_sp}>
                                        {option.ten_loai_sp}
                                    </MenuItem>
                                ))}
                            </TextField>
                            <h3>Tên sản phẩm</h3>
                            <TextField fullWidth id="outlined-basic" label="Tên sản phẩm" variant="outlined" onChange={(e) => setNameProduct(e.target.value)} />
                            <h3>Giá sản phẩm</h3>
                            <TextField fullWidth id="filled-basic" label="Giá sản phẩm" variant="outlined" onChange={(e) => setPriceProduct(e.target.value)} />
                            <h3>Thông tin sản phẩm</h3>

                            <TextField fullWidth id="standard-basic" label="Thông tin sản phẩm" variant="outlined" onChange={(e) => setInforProduct(e.target.value)} />
                            <h3>URL</h3>
                            <TextField fullWidth id="outlined-basic" label="URL ảnh chính" variant="outlined" onChange={(e) => setMainImg(e.target.value)} />
                            <h3>Khuyến mãi</h3>
                            <TextField
                                fullWidth
                                select
                                label="ID khuyến mãi"
                                value={idPromotion}

                                onChange={handlePromotion}

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
                            <h3>Kích thước</h3>

                            {sizeDetail.map((item, index) => (
                                <ToggleButton
                                    key={index}
                                    value={item.ten_kich_thuoc}
                                    selected={selectedButtonsize.includes(item.id_kich_thuoc)}
                                    onChange={() => handleClickSize(item.id_kich_thuoc)}
                                >
                                    {item.ten_kich_thuoc}
                                </ToggleButton>
                            ))}

                            <h3>Màu sắc</h3>



                            {colorDetail.map((item, index) => (
                                <ToggleButton
                                    key={index}
                                    value={item.ten_mau_sac}
                                    selected={selectedButtons.includes(item.id_mau_sac)}
                                    onChange={() => handleClick(item.id_mau_sac)}
                                >
                                    {item.ten_mau_sac}
                                </ToggleButton>
                            ))}

                            <h3>Số lượng</h3>

                            <TextField
                                fullWidth onChange={(e) => setQuantity(e.target.value)} value={quantity} label="Số lượng" sx={{ width: '250px', height: '60px', fontSize: '10px' }} />
                            <h3>Giá nhập</h3>
                            <TextField
                                fullWidth onChange={(e) => setPriceInput(e.target.value)} value={priceInput} label="Giá nhập" sx={{ width: '250px', height: '60px', fontSize: '10px' }} />



                            <Button onClick={handleSubmit} variant="contained" sx={{ width: '250px', height: '55px', fontSize: '15px' }}>
                                Nhập sản phẩm
                            </Button>
                            <br />
                            <br />
                            <UploadImage />


                            <MaterialTable
                                title="Danh sách sản phẩm nhập hàng"
                                columns={columns}
                                data={detaiIinvoice}
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
                        </div>




                    </Box>
                </>
            )}





        </Box>
    );
}

export default AddInvoiceInput;