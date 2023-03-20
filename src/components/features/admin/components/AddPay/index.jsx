import * as React from 'react';
import Box from '@mui/material/Box';
import { useState, useEffect } from 'react';
import tableIcons from '../MaterialTableControl';
import MaterialTable from 'material-table';
import checkoutAPI from './../../../../API/checkoutAPI';

function AddPay() {
    const [checkoutDetail, setCheckoutDetail] = useState([]);
    const columns = [
        { field: 'id_phuong_thuc_tt', title: 'ID', width: 70 },
        { field: 'ten_phuong_thuc_tt', title: 'ten_phuong_thuc_tt', width: 130 },
    ];
    useEffect(() => {
        try {
            const fetchColorDetail = async () => {
                if (checkoutDetail !== null) {
                    const result = await checkoutAPI.get();
                    setCheckoutDetail(result.data.data);
                }
            };
            fetchColorDetail();
        } catch (error) {
            console.log('Failed to fetch checkoutDetail: ', error);
        }
    }, []);


    const getCheckoutDetail = async () => {

        const result = await checkoutAPI.get();
        setCheckoutDetail(result.data.data);
    };

    const handleRowUpdate = (newData, oldData, resolve) => {
        const updateCheckout = async () => {
            try {
                const { data } = await checkoutAPI.update({ id_phuong_thuc_tt: newData.id_phuong_thuc_tt, ten_phuong_thuc_tt: newData.ten_phuong_thuc_tt });
                getCheckoutDetail();
            } catch (error) {
                console.log('Failed to update checkout list: ', error);
            }
        };
        updateCheckout();
        resolve();
    };

    const handleRowAdd = (newData, resolve) => {
        const addCheckout = async () => {
            try {
                const { data } = await checkoutAPI.add({ ten_phuong_thuc_tt: newData.ten_phuong_thuc_tt });
                getCheckoutDetail();
            } catch (error) {
                console.log('Failed toadd checkout list: ', error);
            }
        };
        addCheckout();
        resolve();
    };

    const handleRowDelete = (oldData, resolve) => {
        const deleteCheckout = async () => {
            try {
                const { data } = await checkoutAPI.delete(oldData.id_phuong_thuc_tt);
                getCheckoutDetail();
            } catch (error) {
                console.log('Failed to update checkout list: ', error);
            }
        };
        deleteCheckout();
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
                display: 'list-item',
                paddingTop: '80px'
            }}
        >
            <h1>PHƯƠNG THỨC THANH TOÁN</h1>
            <MaterialTable
                title="Danh sách trạng thái"
                columns={columns}
                data={checkoutDetail}
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

export default AddPay;