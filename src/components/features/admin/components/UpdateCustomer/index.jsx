import * as React from 'react';
import Box from '@mui/material/Box';
import { useState, useEffect } from 'react';
import userAPI from '../../../../API/userAPI';
import tableIcons from '../MaterialTableControl';
import MaterialTable from 'material-table';

function UpdateCustomer() {
    const [userDetail, setUserDetail] = useState([]);
    const columns = [
        { field: 'id_khach_hang', title: 'ID', width: 70 },
        { field: 'email_khach_hang', title: 'Email', width: 130 },
        { field: 'chuc_vu', title: 'Chức vụ: 1 User, 2 Admin', width: 130 },

    ];

    useEffect(() => {
        try {
            const fetchCustomerDetail = async () => {
                if (userDetail !== null) {
                    const result = await userAPI.getAll();
                    setUserDetail(result.data.data);
                }
            };
            fetchCustomerDetail();
        } catch (error) {
            console.log('Failed to fetch Customer: ', error);
        }
    }, []);

    const getCustomerDetail = async () => {

        const result = await userAPI.getAll();
        setUserDetail(result.data.data);
    };


    const handleRowUpdate = (newData, oldData, resolve) => {
        const updateCustomer = async () => {
            try {
                const { data } = await userAPI.update({ id_khach_hang: newData.id_khach_hang, chuc_vu: newData.chuc_vu });
                getCustomerDetail();
            } catch (error) {
                console.log('Failed to update Customer list: ', error);
            }
        };
        updateCustomer();
        resolve();
    };

    const handleRowAdd = (newData, resolve) => {
        const addCustomer = async () => {
            try {
                const { data } = await userAPI.add({ ten_kich_thuoc: newData.ten_kich_thuoc });
                getCustomerDetail();
            } catch (error) {
                console.log('Failed toadd Customer list: ', error);
            }
        };
        addCustomer();
        resolve();
    };

    const handleRowDelete = (oldData, resolve) => {
        const deleteCustomer = async () => {
            try {
                const { data } = await userAPI.delete(oldData.id_khach_hang);
                getCustomerDetail();
            } catch (error) {
                console.log('Failed to update Customer list: ', error);
            }
        };
        deleteCustomer();
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
            <h1>KHÁCH HÀNG</h1>
            <MaterialTable
                title="Danh sách kích thước"
                columns={columns}
                data={userDetail}
                icons={tableIcons}
                editable={{
                    onRowUpdate: (newData, oldData) =>
                        new Promise((resolve) => {
                            handleRowUpdate(newData, oldData, resolve);
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

export default UpdateCustomer;