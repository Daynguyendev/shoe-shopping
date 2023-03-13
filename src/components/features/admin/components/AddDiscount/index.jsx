import Box from '@mui/material/Box';
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import { DataGrid } from '@mui/x-data-grid';
import { useState, useEffect } from 'react';
import { useSnackbar } from 'notistack';
import promotionAPI from './../../../../API/promotionAPI';
import React from 'react';
import tableIcons from '../MaterialTableControl';
import MaterialTable from 'material-table';

const columns = [
    { field: 'id_khuyen_mai', title: 'id_khuyen_mai', width: 70 },
    { field: 'ten_khuyen_mai', title: 'ten_khuyen_mai', width: 130 },
    { field: 'ngay_bat_dau', title: 'ngay_bat_dau', width: 130 },
    { field: 'ngay_ket_thuc', title: 'ngay_ket_thuc', width: 130 },
    { field: 'phan_tram_giam', title: 'phan_tram_giam', width: 130 },

];

function AddDiscount() {
    const [promotionDetail, setPromotionDetail] = useState([]);
    const [namePromotion, setNamPromotion] = useState('');
    const [dateStart, setDateStart] = useState('');
    const [dateEnd, setDateEnd] = useState('');
    const [discount, setDiscount] = useState('');

    const [state, setState] = useState([]);

    const [pricediscount, setPriceDiscount] = useState('');
    const { enqueueSnackbar } = useSnackbar();

    const [data, setData] = useState([]);

    const handleAdd = (newData) => {
        setData([...data, newData]);
    };

    const handleUpdate = (newData, oldData) => {
        const index = data.indexOf(oldData);
        data[index] = newData;
        setData([...data]);
    };

    const handleDelete = (oldData) => {
        const index = data.indexOf(oldData);
        data.splice(index, 1);
        setData([...data]);
    };

    useEffect(() => {
        try {
            const fetchpromotionDetail = async () => {
                if (promotionDetail !== null) {
                    const result = await promotionAPI.get();
                    setPromotionDetail(result.data.data);
                    console.log('promotionDetail', result.data)
                }
            };
            fetchpromotionDetail();
        } catch (error) {
            console.log('Failed to fetch promotionDetail: ', error);
        }
    }, []);

    const handleSubmit = (event) => {
        promotionAPI.addPromotion({
            ten_khuyen_mai: namePromotion,
            ngay_bat_dau: dateStart,
            ngay_ket_thuc: dateEnd,
            phan_tram_giam: discount,
        })
            .then(function (response) {
                enqueueSnackbar('Thêm mã giảm giá thành công', {
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
        // setNameDiscount(e);
        console.log(e)

    };
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
            {/* <h1>THÊM GIẢM GIÁ</h1>
            <TextField onChange={(e) => setNamPromotion(e.target.value)} value={namePromotion} label="Tên khuyến mãi" sx={{ width: '250px', height: '60px', fontSize: '10px' }} />
            <TextField type='date' onChange={(e) => setDateStart(e.target.value)} value={dateStart} label="Ngày bắt đầu" sx={{ width: '250px', height: '60px', fontSize: '10px' }} />
            <TextField type='date' onChange={(e) => setDateEnd(e.target.value)} value={dateEnd} label="Ngày kết thúc" sx={{ width: '250px', height: '60px', fontSize: '10px' }} />
            <TextField onChange={(e) => setDiscount(e.target.value)} value={discount} label="Phần trăm giảm" sx={{ width: '250px', height: '60px', fontSize: '10px' }} />
            <Button onClick={handleSubmit} variant="contained" sx={{ width: '250px', height: '55px', fontSize: '15px' }}>
                Thêm khuyến mãi
            </Button> */}
            <div style={{ maxWidth: "100%" }}>
                <MaterialTable
                    title="Danh sách khuyến mãi"
                    columns={columns}
                    data={promotionDetail}
                    icons={tableIcons}
                    editable={{
                        onRowAdd: (newData) =>
                            new Promise((resolve) => {
                                setTimeout(() => {
                                    resolve();
                                    setState((prevState) => {
                                        const data = [...prevState.data];
                                        data.push(newData);
                                        return { ...prevState, data };
                                    });
                                }, 600);
                            }),
                        onRowUpdate: (newData, oldData) =>
                            new Promise((resolve) => {
                                setTimeout(() => {
                                    resolve();
                                    if (oldData) {
                                        setState((prevState) => {
                                            const data = [...prevState.data];
                                            data[data.indexOf(oldData)] = newData;
                                            return { ...prevState, data };
                                        });
                                    }
                                }, 600);
                            }),
                        onRowDelete: (oldData) =>
                            new Promise((resolve) => {
                                setTimeout(() => {
                                    resolve();
                                    setState((prevState) => {
                                        const data = [...prevState.data];
                                        data.splice(data.indexOf(oldData), 1);
                                        return { ...prevState, data };
                                    });
                                }, 600);
                            }),
                    }}
                />

            </div>
        </Box >
    );
}

export default AddDiscount;