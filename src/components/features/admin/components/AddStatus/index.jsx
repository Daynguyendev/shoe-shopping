import * as React from 'react';
import Box from '@mui/material/Box';
import { useState, useEffect } from 'react';
import tableIcons from '../MaterialTableControl';
import MaterialTable from 'material-table';
import statusAPI from './../../../../API/statusAPI';

function AddStatus() {
    const [statusDetail, setStatusDetail] = useState([]);
    const columns = [
        { field: 'id_trang_thai', title: 'ID', width: 70 },
        { field: 'ten_trang_thai', title: 'ten_trang_thai', width: 130 },
    ];
    useEffect(() => {
        try {
            const fetchColorDetail = async () => {
                if (statusDetail !== null) {
                    const result = await statusAPI.get();
                    setStatusDetail(result.data.data);
                }
            };
            fetchColorDetail();
        } catch (error) {
            console.log('Failed to fetch statusDetail: ', error);
        }
    }, []);


    const getStatusDetail = async () => {
        const result = await statusAPI.get();
        setStatusDetail(result.data.data);
    };

    const handleRowUpdate = (newData, oldData, resolve) => {
        const updateStatus = async () => {
            try {
                const { data } = await statusAPI.update({ id_trang_thai: newData.id_trang_thai, ten_trang_thai: newData.ten_trang_thai });
                getStatusDetail();
            } catch (error) {
                console.log('Failed to update status list: ', error);
            }
        };
        updateStatus();
        resolve();
    };

    const handleRowAdd = (newData, resolve) => {
        const addStatus = async () => {
            try {
                const { data } = await statusAPI.add({ ten_trang_thai: newData.ten_trang_thai });
                getStatusDetail();
            } catch (error) {
                console.log('Failed toadd status list: ', error);
            }
        };
        addStatus();
        resolve();
    };

    const handleRowDelete = (oldData, resolve) => {
        const deleteStatus = async () => {
            try {
                const { data } = await statusAPI.delete(oldData.id_trang_thai);
                getStatusDetail();
            } catch (error) {
                console.log('Failed to update status list: ', error);
            }
        };
        deleteStatus();
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
            <h1>TRẠNG THÁI ĐƠN HÀNG</h1>

            <MaterialTable
                title="Danh sách trạng thái"
                columns={columns}
                data={statusDetail}
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

export default AddStatus;