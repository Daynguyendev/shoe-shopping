import * as React from 'react';
import Box from '@mui/material/Box';
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import { DataGrid } from '@mui/x-data-grid';
import { useState, useEffect } from 'react';
import providerAPI from '../../../../API/providerAPI';
import { useSnackbar } from 'notistack';
import promotionAPI from '../../../../API/promotionAPI';
import './AddPromotion.scss'
import MenuItem from '@mui/material/MenuItem';
import categoryAPI from '../../../../API/categoryAPI';
import productAPI from '../../../../API/productAPI';
import trademarkAPI from '../../../../API/trademarkAPI';
const columns = [
    { field: 'id_nha_cc', headerName: 'id_nha_cc', width: 70 },
    { field: 'ten_nha_cc', headerName: 'ten_nha_cc', width: 130 },
    { field: 'dia_chi_cc', headerName: 'dia_chi_cc', width: 130 },

];

function AddPromotion() {
    const [promotionDetail, setPromotionDetail] = useState();
    const [namePromotion, setNamePromotion] = useState('');
    const [dateStart, setDateStart] = useState('');
    const [dateEnd, setDateEnd] = useState('');
    const [discount, setDiscount] = useState('');
    const [category, setCagory] = useState();
    const [trademark, setTrademark] = useState();
    const [product, setProduct] = useState();
    const [categoryAdd, setCagoryAdd] = useState();
    const [trademarkAdd, setTrademarkAdd] = useState();
    const [productAdd, setProductAdd] = useState();
    const [promotionAdd, setPromotionAdd] = useState();
    const listCategory = category || [];
    const listTrademark = trademark || [];
    const listProduct = product || [];
    const listPromotion = promotionDetail || [];

    const { enqueueSnackbar } = useSnackbar();

    const handleCategory = event => {
        setCagoryAdd(event.target.value);
        console.log(event.target.value);
    };

    const handleTrademark = event => {
        setTrademarkAdd(event.target.value);
        console.log(event.target.value);
    };
    const handleProduct = event => {
        setProductAdd(event.target.value);
        console.log(event.target.value);
    };
    const handlePromotion = event => {
        setPromotionAdd(event.target.value);
        console.log(event.target.value);
    };


    useEffect(() => {
        try {
            const fetchProviderDetail = async () => {
                if (promotionDetail !== null) {
                    const result = await promotionAPI.get();
                    setPromotionDetail(result.data.data);
                    console.log('promotionDetail', result.data)
                }
            };
            fetchProviderDetail();
        } catch (error) {
            console.log('Failed to fetch promotionDetail: ', error);
        }
    }, []);


    useEffect(() => {
        try {
            const fetchProviderDetail = async () => {
                if (category !== null) {
                    const result = await categoryAPI.get();
                    setCagory(result.data.data);
                    console.log('category', result.data)
                }
            };
            fetchProviderDetail();
        } catch (error) {
            console.log('Failed to fetch category: ', error);
        }
    }, []);

    useEffect(() => {
        try {
            const fetchProviderDetail = async () => {
                if (trademark !== null) {
                    const result = await trademarkAPI.get();
                    setTrademark(result.data.data);
                    console.log('trademark', result.data)
                }
            };
            fetchProviderDetail();
        } catch (error) {
            console.log('Failed to fetch trademark: ', error);
        }
    }, []);


    useEffect(() => {
        try {
            const fetchProviderDetail = async () => {
                if (product !== null) {
                    const result = await productAPI.getAll();
                    setProduct(result.data.data);
                    console.log('product', result.data)
                }
            };
            fetchProviderDetail();
        } catch (error) {
            console.log('Failed to fetch product: ', error);
        }
    }, []);

    // const handleSubmit = (event) => {
    //     providerAPI.add({
    //         ten_nha_cc: nameprovider,
    //         dia_chi_cc: addressProvider
    //     })
    //         .then(function (response) {
    //             enqueueSnackbar('Th??m nh?? cung c???p th??nh c??ng', {
    //                 variant: 'success',
    //                 autoHideDuration: 800,
    //                 anchorOrigin: {
    //                     vertical: 'top',
    //                     horizontal: 'right',
    //                 },
    //             });
    //             setNameProvider('');
    //             setAddressProvider('');
    //         })
    //         .catch(error => enqueueSnackbar(error.message, { variant: 'error', autoHideDuration: 1000 })
    //         );
    // };

    // const handleRowSelection = (e) => {
    //     console.log(e)

    // };

    return (
        <Box
            sx={{
                width: 500,
                maxWidth: '100%',
                backgroundColor: 'white',
                minHeight: '550px',
                minWidth: '100%',
                textAlign: 'center',
                alignItems: 'center',
                paddingTop: '50px',
                display: 'list-item'
            }}
        >
            <h1>C??I ?????T KHUY???N M??I</h1>

            <TextField onChange={(e) => setNamePromotion(e.target.value)} value={namePromotion} label="T??n khuy???n m??i" sx={{ width: '250px', height: '60px', fontSize: '10px' }} />
            <TextField
                sx={{ width: '250px', height: '60px', fontSize: '10px' }}
                type="date"
                defaultValue="2022-05-20"
                onChange={(e) => setDateStart(e.target.value)}
            />

            <TextField
                sx={{ width: '250px', height: '60px', fontSize: '10px' }}
                type="date"
                defaultValue="2022-05-22"
                onChange={(e) => setDateEnd(e.target.value)}
            />
            <TextField onChange={(e) => setDiscount(e.target.value)} value={discount} label="Ph???n tr??m gi???m" sx={{ width: '250px', height: '60px', fontSize: '10px' }} />


            <Button variant="contained" sx={{ width: '250px', height: '55px', fontSize: '15px' }}>
                Th??m m?? khuy???n m??i
            </Button>

            <h1>C??I ?????T THEO LO???I</h1>

            <TextField
                select
                label="Lo???i s???n ph???m"
                value={category}
                onChange={handleCategory}
                sx={{ width: '250px', height: '55px', fontSize: '15px' }}
            >
                {listCategory.map((option) => (
                    <MenuItem key={option.id_loai_sp} value={option.id_loai_sp}>
                        {option.ten_loai_sp}
                    </MenuItem>
                ))}
            </TextField>

            <TextField
                select
                label="M?? khuy???n m??i"
                value={promotionDetail}
                onChange={handlePromotion}
                sx={{ width: '250px', height: '55px', fontSize: '15px' }}
            >
                {listPromotion.map((option) => (
                    <MenuItem key={option.id_khuyen_mai} value={option.id_khuyen_mai}>
                        {option.phan_tram_giam}
                    </MenuItem>
                ))}
            </TextField>


            <Button variant="contained" sx={{ width: '250px', height: '55px', fontSize: '15px' }}>
                Th??m m?? khuy???n m??i
            </Button>
            <h1>C??I ?????T THEO TH????NG HI???U</h1>

            <TextField onChange={(e) => setNamePromotion(e.target.value)} value={namePromotion} label="T??n khuy???n m??i" sx={{ width: '250px', height: '60px', fontSize: '10px' }} />
            <TextField onChange={(e) => setDateStart(e.target.value)} value={dateStart} label="Ng??y b???t ?????u" sx={{ width: '250px', height: '60px', fontSize: '10px' }} />
            <TextField onChange={(e) => setDateEnd(e.target.value)} value={dateEnd} label="Ng??y k???t th??c" sx={{ width: '250px', height: '60px', fontSize: '10px' }} />
            <TextField onChange={(e) => setDiscount(e.target.value)} value={discount} label="Ph???n tr??m gi???m" sx={{ width: '250px', height: '60px', fontSize: '10px' }} />


            <Button variant="contained" sx={{ width: '250px', height: '55px', fontSize: '15px' }}>
                Th??m m?? khuy???n m??i
            </Button>
            <h1>C??I ?????T THEO ID</h1>

            <TextField onChange={(e) => setNamePromotion(e.target.value)} value={namePromotion} label="T??n khuy???n m??i" sx={{ width: '250px', height: '60px', fontSize: '10px' }} />
            <TextField onChange={(e) => setDateStart(e.target.value)} value={dateStart} label="Ng??y b???t ?????u" sx={{ width: '250px', height: '60px', fontSize: '10px' }} />
            <TextField onChange={(e) => setDateEnd(e.target.value)} value={dateEnd} label="Ng??y k???t th??c" sx={{ width: '250px', height: '60px', fontSize: '10px' }} />
            <TextField onChange={(e) => setDiscount(e.target.value)} value={discount} label="Ph???n tr??m gi???m" sx={{ width: '250px', height: '60px', fontSize: '10px' }} />


            <Button variant="contained" sx={{ width: '250px', height: '55px', fontSize: '15px' }}>
                Th??m m?? khuy???n m??i
            </Button>

            {/* <div style={{ height: 400, width: '100%', paddingTop: '50px' }}>
                <DataGrid
                    getRowId={(row) => row.id_nha_cc}
                    rows={providerDetail}
                    columns={columns}
                    pageSize={5}
                    rowsPerPageOptions={[5]}
                    checkboxSelection
                    onRowSelected={handleRowSelection}
                    onSelectionModelChange={handleRowSelection}
                />
            </div> */}
        </Box >
    );
}

export default AddPromotion;