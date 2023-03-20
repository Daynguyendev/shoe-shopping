import * as React from 'react';
import Box from '@mui/material/Box';
import TextField from '@mui/material/TextField';
import MenuItem from '@mui/material/MenuItem';
import { useState, useEffect } from 'react';
import sizeAPI from './../../../../API/sizeAPI';
import categoryAPI from '../../../../API/categoryAPI';
import colorAPI from '../../../../API/colorAPI';
import imageAPI from '../../../../API/imageAPI';
import discountAPI from '../../../../API/discountAPI';
import providerAPI from '../../../../API/providerAPI';
import trademarkAPI from '../../../../API/trademarkAPI';
import Button from '@mui/material/Button';
import productAPI from './../../../../API/productAPI';
import { useSnackbar } from 'notistack';
import tableIcons from '../MaterialTableControl';
import MaterialTable from 'material-table';


export default function UploadProduct() {
    const { enqueueSnackbar } = useSnackbar();
    const [sizeDetail, setSizeDetail] = useState([]);
    const [imgDetail, setImgDetail] = useState('');
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
    const [product, setProduct] = useState([]);

    const columns = [
        { field: 'id_sp', title: 'id_sp', width: 70 },
        { field: 'ten_sp', title: 'ten_sp', width: 130 },
        { field: 'gia_sp', title: 'gia_sp', width: 130 },
        { field: 'hinh_anh_chinh', title: 'hinh_anh_chinh', width: 130 },
        { field: 'thong_tin_sp', title: 'thong_tin_sp', width: 70 },
        { field: 'id_thuong_hieu', title: 'id_thuong_hieu', width: 50 },
        { field: 'id_loai_sp', title: 'id_loai_sp', width: 50 },
        { field: 'id_khuyen_mai', title: 'id_khuyen_mai', width: 50 },

    ];

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


    const handleSubmit = () => {
        productAPI.add({
            ten_sp: nameProduct,
            gia_sp: priceProduct,
            hinh_anh_chinh: mainImg,
            thong_tin_sp: inforProduct,
            id_hinh_anh: imgDetail,
            id_thuong_hieu: trademark,
            id_loai_sp: category,
        })
            .then(function (response) {
                enqueueSnackbar('Thêm sản phẩm thành công', {
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

    const getProduct = async () => {

        const result = await productAPI.getAll();
        setProduct(result.data.data);
        console.log('setProduct', result.data)
    };


    const handleRowUpdate = (newData, oldData, resolve) => {
        const updateProduct = async () => {
            try {
                const { data } = await productAPI.update({
                    id_sp: newData.id_sp,
                    ten_sp: newData.ten_sp,
                    gia_sp: newData.gia_sp,
                    thong_tin_sp: newData.thong_tin_sp,
                    id_thuong_hieu: newData.id_thuong_hieu,
                    id_loai_sp: newData.id_loai_sp,
                    hinh_anh_chinh: newData.hinh_anh_chinh,
                    id_khuyen_mai: newData.id_khuyen_mai,
                });
                getProduct();
            } catch (error) {
                console.log('Failed to update providerDetail list: ', error);
            }
        };
        updateProduct();
        resolve();
    };

    const handleRowAdd = (newData, resolve) => {
        const addProduct = async () => {
            try {
                const { data } = await productAPI.add({
                    ten_sp: newData.ten_sp,
                    gia_sp: newData.gia_sp,
                    thong_tin_sp: newData.thong_tin_sp,
                    id_thuong_hieu: newData.id_thuong_hieu,
                    id_loai_sp: newData.id_loai_sp,
                    hinh_anh_chinh: newData.hinh_anh_chinh,
                    id_khuyen_mai: newData.id_khuyen_mai,
                });
                getProduct();
            } catch (error) {
                console.log('Failed toadd providerDetail list: ', error);
            }
        };
        addProduct();
        resolve();
    };

    const handleRowDelete = (oldData, resolve) => {
        const deleteProduct = async () => {
            try {
                const { data } = await productAPI.delete(oldData.id_sp);
                getProduct();
            } catch (error) {
                console.log('Failed to update providerDetail list: ', error);
            }
        };
        deleteProduct();
        resolve();
    };

    return (
        <Box
        >
            <h1>THÊM SẢN PHẨM</h1>

            {/* 
            <TextField
                select
                label="Thương hiệu"
                value={trademark}
                onChange={handleTrademark}
                fullWidth
                helperText="Chọn thương hiệu"
            >
                {trademarkDetail.map((option) => (
                    <MenuItem key={option.id_thuong_hieu} value={option.id_thuong_hieu} >
                        {option.ten_thuong_hieu}
                    </MenuItem>
                ))}
            </TextField>
            <TextField
                select
                label="Nhà cung cấp"
                value={provider}
                onChange={handleProvider}
                fullWidth
                helperText="Chọn nhà cung cấp"
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
                label="Loại"
                value={category}
                onChange={handleCategory}
                helperText="Chọn loại"
            >
                {categoryDetail.map((option) => (
                    <MenuItem key={option.id_loai_sp} value={option.id_loai_sp}>
                        {option.ten_loai_sp}
                    </MenuItem>
                ))}
            </TextField>
            <TextField helperText="Nhập tên sản phẩm" fullWidth id="outlined-basic" label="Tên sản phẩm" variant="outlined" onChange={(e) => setNameProduct(e.target.value)} />
            <TextField helperText="Nhập giá sản phẩm" fullWidth id="filled-basic" label="Giá sản phẩm" variant="outlined" onChange={(e) => setPriceProduct(e.target.value)} />
            <TextField helperText="Nhập thông tin sản phẩm" fullWidth id="standard-basic" label="Thông tin sản phẩm" variant="outlined" onChange={(e) => setInforProduct(e.target.value)} /> */}
            {/* <TextField fullWidth id="standard-basic" label="id hình ảnh chi tiết" variant="outlined" onChange={(e) => setImgDetail(e.target.value)} /> */}
            {/* <TextField helperText="Nhập liên kết ảnh chính" fullWidth id="outlined-basic" label="URL ảnh chính" variant="outlined" onChange={(e) => setMainImg(e.target.value)} /> */}
            {/* <Button onClick={handleSubmit} disableElevation sx={{ width: '215px', height: '55px', fontSize: '10px', marginTop: '9px', marginLeft: '8px' }} variant="contained">
                Thêm sản phẩm
            </Button> */}
            <MaterialTable
                title="Danh sách nhà cung cấp"
                columns={columns}
                data={product}
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

        </Box>
    );
}