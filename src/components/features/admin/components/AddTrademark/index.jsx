import * as React from 'react';
import Box from '@mui/material/Box';
import { useState, useEffect } from 'react';
import trademarkAPI from './../../../../API/trademarkAPI';
import tableIcons from '../MaterialTableControl';
import MaterialTable from 'material-table';

function AddTrademark() {
    const [trademarkDetail, setTrademarkDetail] = useState([]);

    const columns = [
        { field: 'id_thuong_hieu', title: 'ID', width: 70 },
        { field: 'ten_thuong_hieu', title: 'Tên thương hiệu', width: 130 },
    ];

    useEffect(() => {
        try {
            const fetchtrademarkDetail = async () => {
                if (trademarkDetail !== null) {
                    const result = await trademarkAPI.get();
                    setTrademarkDetail(result.data.data);
                }
            };
            fetchtrademarkDetail();
        } catch (error) {
            console.log('Failed to fetch trademark: ', error);
        }
    }, []);

    const getTrademarkDetail = async () => {

        const result = await trademarkAPI.get();
        setTrademarkDetail(result.data.data);
    };


    const handleRowUpdate = (newData, oldData, resolve) => {
        const updateTrademark = async () => {
            try {
                const { data } = await trademarkAPI.update({ id_thuong_hieu: newData.id_thuong_hieu, ten_thuong_hieu: newData.ten_thuong_hieu });
                getTrademarkDetail();
            } catch (error) {
                console.log('Failed to update trademarkDetail list: ', error);
            }
        };
        updateTrademark();
        resolve();
    };

    const handleRowAdd = (newData, resolve) => {
        const addTrademark = async () => {
            try {
                const { data } = await trademarkAPI.add({ ten_thuong_hieu: newData.ten_thuong_hieu });
                getTrademarkDetail();
            } catch (error) {
                console.log('Failed toadd trademarkDetail list: ', error);
            }
        };
        addTrademark();
        resolve();
    };

    const handleRowDelete = (oldData, resolve) => {
        const deleteTrademark = async () => {
            try {
                const { data } = await trademarkAPI.delete(oldData.id_thuong_hieu);
                getTrademarkDetail();
            } catch (error) {
                console.log('Failed to update trademarkDetail list: ', error);
            }
        };
        deleteTrademark();
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
                , paddingTop: '80px'
            }}
        >
            <h1>THƯƠNG HIỆU</h1>

            <MaterialTable
                title="Danh sách thương hiệu"
                columns={columns}
                data={trademarkDetail}
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
        </Box >
    );
}

export default AddTrademark;