import * as React from 'react';
import Box from '@mui/material/Box';
import { useState, useEffect } from 'react';
import colorAPI from '../../../../API/colorAPI';
import tableIcons from '../MaterialTableControl';
import MaterialTable from 'material-table';


function AddColor() {
    const [colorDetail, setColorDetail] = useState([]);
    const columns = [
        { field: 'id_mau_sac', title: 'ID', width: 70 },
        { field: 'ten_mau_sac', title: 'Tên màu sắc', width: 130 },
    ];


    useEffect(() => {
        try {
            const fetchColorDetail = async () => {
                if (colorDetail !== null) {
                    const result = await colorAPI.get();
                    setColorDetail(result.data.data);
                }
            };
            fetchColorDetail();
        } catch (error) {
            console.log('Failed to fetch colorDetail: ', error);
        }
    }, []);


    const getColorDetail = async () => {

        const result = await colorAPI.get();
        setColorDetail(result.data.data);
    };

    const handleRowUpdate = (newData, oldData, resolve) => {
        const updateSize = async () => {
            try {
                const { data } = await colorAPI.update({ id_mau_sac: newData.id_mau_sac, ten_mau_sac: newData.ten_mau_sac });
                getColorDetail();
            } catch (error) {
                console.log('Failed to update size list: ', error);
            }
        };
        updateSize();
        resolve();
    };

    const handleRowAdd = (newData, resolve) => {
        const addSize = async () => {
            try {
                const { data } = await colorAPI.add({ ten_mau_sac: newData.ten_mau_sac });
                getColorDetail();
            } catch (error) {
                console.log('Failed toadd size list: ', error);
            }
        };
        addSize();
        resolve();
    };

    const handleRowDelete = (oldData, resolve) => {
        const deleteSize = async () => {
            try {
                const { data } = await colorAPI.delete(oldData.id_mau_sac);
                getColorDetail();
            } catch (error) {
                console.log('Failed to update product list: ', error);
            }
        };
        deleteSize();
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
            <h1>MÀU SẮC</h1>
            <MaterialTable
                title="Danh sách màu sắc"
                columns={columns}
                data={colorDetail}
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

export default AddColor;