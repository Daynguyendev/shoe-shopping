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
    const columns = [
        { field: 'id_khuyen_mai', title: 'id_khuyen_mai', width: 70 },
        { field: 'ten_khuyen_mai', title: 'ten_khuyen_mai', width: 130 },
        { field: 'ngay_bat_dau', title: 'ngay_bat_dau', width: 130 },
        { field: 'ngay_ket_thuc', title: 'ngay_ket_thuc', width: 130 },
        { field: 'phan_tram_giam', title: 'phan_tram_giam', width: 130 },

    ];

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

    const getPromotionDetail = async () => {

        const result = await promotionAPI.get();
        setPromotionDetail(result.data.data);
        console.log('setPromotionDetail', result.data)
    };

    const handleRowUpdate = (newData, oldData, resolve) => {
        const updatePromotion = async () => {
            try {
                const { data } = await promotionAPI.update({ id_khuyen_mai: newData.id_khuyen_mai, ten_khuyen_mai: newData.ten_khuyen_mai, ngay_bat_dau: newData.ngay_bat_dau, ngay_ket_thuc: newData.ngay_ket_thuc, phan_tram_giam: newData.phan_tram_giam });
                getPromotionDetail();
            } catch (error) {
                console.log('Failed to update size list: ', error);
            }
        };
        updatePromotion();
        resolve();
    };

    const handleRowAdd = (newData, resolve) => {
        const addPromotion = async () => {
            try {
                const { data } = await promotionAPI.add({ ten_khuyen_mai: newData.ten_khuyen_mai, ngay_bat_dau: newData.ngay_bat_dau, ngay_ket_thuc: newData.ngay_ket_thuc, phan_tram_giam: newData.phan_tram_giam });
                getPromotionDetail();
            } catch (error) {
                console.log('Failed toadd size list: ', error);
            }
        };
        addPromotion();
        resolve();
    };

    const handleRowDelete = (oldData, resolve) => {
        const deletePromotion = async () => {
            try {
                const { data } = await promotionAPI.delete(oldData.id_khuyen_mai);
                getPromotionDetail();
            } catch (error) {
                console.log('Failed to update product list: ', error);
            }
        };
        deletePromotion();
        resolve();
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

            <h1>THÊM KHUYẾN MÃI</h1>
            <div style={{ maxWidth: "100%" }}>
                <MaterialTable
                    title="Danh sách khuyến mãi"
                    columns={columns}
                    data={promotionDetail}
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

            </div>
        </Box >
    );
}

export default AddDiscount;