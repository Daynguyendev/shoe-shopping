import * as React from 'react';
import Box from '@mui/material/Box';
import { useState, useEffect } from 'react';
import providerAPI from '../../../../API/providerAPI';
import tableIcons from '../MaterialTableControl';
import MaterialTable from 'material-table';

function AddProvider() {
    const [providerDetail, setProviderDetail] = useState([]);
    const columns = [
        { field: 'id_nha_cc', title: 'ID', width: 70 },
        { field: 'ten_nha_cc', title: 'ten_nha_cc', width: 130 },
        { field: 'dia_chi_cc', title: 'dia_chi_cc', width: 130 },

    ];
    useEffect(() => {
        try {
            const fetchProviderDetail = async () => {
                if (providerDetail !== null) {
                    const result = await providerAPI.get();
                    setProviderDetail(result.data.data);
                }
            };
            fetchProviderDetail();
        } catch (error) {
            console.log('Failed to fetch providerDetail: ', error);
        }
    }, []);


    const getProviderDetail = async () => {

        const result = await providerAPI.get();
        setProviderDetail(result.data.data);
    };


    const handleRowUpdate = (newData, oldData, resolve) => {
        const updateProvider = async () => {
            try {
                const { data } = await providerAPI.update({ id_nha_cc: newData.id_nha_cc, ten_nha_cc: newData.ten_nha_cc, dia_chi_cc: newData.dia_chi_cc });
                getProviderDetail();
            } catch (error) {
                console.log('Failed to update providerDetail list: ', error);
            }
        };
        updateProvider();
        resolve();
    };

    const handleRowAdd = (newData, resolve) => {
        const addProvider = async () => {
            try {
                const { data } = await providerAPI.add({ ten_nha_cc: newData.ten_nha_cc, dia_chi_cc: newData.dia_chi_cc });
                getProviderDetail();
            } catch (error) {
                console.log('Failed toadd providerDetail list: ', error);
            }
        };
        addProvider();
        resolve();
    };

    const handleRowDelete = (oldData, resolve) => {
        const deleteProvider = async () => {
            try {
                const { data } = await providerAPI.delete(oldData.id_nha_cc);
                getProviderDetail();
            } catch (error) {
                console.log('Failed to update providerDetail list: ', error);
            }
        };
        deleteProvider();
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
            <h1>NHÀ CUNG CẤP</h1>


            <MaterialTable
                title="Danh sách nhà cung cấp"
                columns={columns}
                data={providerDetail}
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

export default AddProvider;