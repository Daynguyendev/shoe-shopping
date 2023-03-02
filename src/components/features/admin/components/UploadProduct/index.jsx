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
import Select from '@mui/material/Select';
import productAPI from './../../../../API/productAPI';
import { useSnackbar } from 'notistack';

export default function UploadProduct() {
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
    const { enqueueSnackbar } = useSnackbar();


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


    const handleSubmit = () => {
        productAPI.add({
            ten_sp: nameProduct,
            gia_sp: priceProduct,
            hinh_anh_chinh: mainImg,
            thong_tin_sp: inforProduct,
            id_hinh_anh: imgDetail,
            id_thuong_hieu: trademark,
            id_giam_gia: discount,
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


    const [categoryDetail, setCategoryDetail] = useState([]);


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
    const [imageDetail, setImageDetailDetail] = useState([]);



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
    ///

    const [discountDetail, setDiscountDetail] = useState([]);


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

    ///
    const [providerDetail, setProviderDetail] = useState([]);



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
    ///

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
    ///



    return (
        <Box
            component="form"
            sx={{
                '& .MuiTextField-root': { m: 1, width: '25ch' },
                backgroundColor: 'white', textAlign: 'center'
            }}
            noValidate
            autoComplete="off"
        >
            <TextField id="outlined-basic" label="Tên sản phẩm" variant="outlined" onChange={(e) => setNameProduct(e.target.value)} />
            <TextField id="filled-basic" label="Giá sản phẩm" variant="outlined" onChange={(e) => setPriceProduct(e.target.value)} />
            <TextField id="standard-basic" label="Thông tin sản phẩm" variant="outlined" onChange={(e) => setInforProduct(e.target.value)} />
            <TextField id="standard-basic" label="id hình ảnh chi tiết" variant="outlined" onChange={(e) => setImgDetail(e.target.value)} />
            {/* <Select
                labelId="demo-simple-select-standard-label"
                id="demo-simple-select-standard"
                value={age}
                onChange={handleChange}
                label="Age"
            >
                {trademarkDetail.map((option) => (
                    <MenuItem key={option.id_thuong_hieu} value={option.id_thuong_hieu} >
                        {option.ten_thuong_hieu}



                    </MenuItem>
                ))}
                {console.log(age)}
            </Select> */}
            <div>
                {/* <TextField
                    id="outlined-select-currency"
                    select
                    label="kích thước"
                    defaultValue="40"
                    helperText="Vui lòng chọn kích thước"
                >
                    {sizeDetail.map((option) => (
                        <MenuItem key={option.id_kich_thuoc} value={option.ten_kich_thuoc}>
                            {option.ten_kich_thuoc}
                        </MenuItem>
                    ))}
                </TextField> */}
                <TextField


                    select
                    label="Thương hiệu"
                    value={trademark}
                    onChange={handleTrademark}

                >
                    {trademarkDetail.map((option) => (
                        <MenuItem key={option.id_thuong_hieu} value={option.id_thuong_hieu} >
                            {option.ten_thuong_hieu}


                        </MenuItem>
                    ))}
                </TextField>

                {/* <TextField
                    id="outlined-select-currency"
                    select
                    label="Màu sắc"
                    defaultValue="xanh-den"
                    helperText="Vui lòng chọn màu sắc"
                >
                    {colorDetail.map((option) => (
                        <MenuItem key={option.id_mau_sac} value={option.ten_mau_sac}>
                            {option.ten_mau_sac}
                        </MenuItem>
                    ))}
                </TextField> */}
                <TextField
                    select
                    label="Mã giảm giá"
                    value={discount}
                    onChange={handleDiscount}

                >
                    {discountDetail.map((option) => (
                        <MenuItem key={option.id_giam_gia} value={option.id_giam_gia}>
                            {option.ten_giam_gia}

                        </MenuItem>
                    ))}
                </TextField>
                <TextField
                    select
                    label="Nhà cung cấp"
                    value={provider}
                    onChange={handleProvider}
                >
                    {providerDetail.map((option) => (
                        <MenuItem key={option.id_nha_cc} value={option.id_nha_cc}>
                            {option.ten_nha_cc}
                        </MenuItem>
                    ))}
                </TextField>
                <TextField
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
            </div>

            <div>

                {/* <TextField id="outlined-basic" label="Số lượng" variant="outlined" /> */}
                <TextField id="outlined-basic" label="URL ảnh chính" variant="outlined" onChange={(e) => setMainImg(e.target.value)} />

                <Button onClick={handleSubmit} disableElevation sx={{ width: '215px', height: '55px', fontSize: '10px', marginTop: '9px', marginLeft: '8px' }} variant="contained">
                    Thêm sản phẩm
                </Button>
            </div>




        </Box>
    );
}