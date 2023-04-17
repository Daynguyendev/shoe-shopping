import * as React from 'react';
import Box from '@mui/material/Box';
import { useState, useEffect } from 'react';
import sizeAPI from '../../../../API/sizeAPI';
import tableIcons from '../MaterialTableControl';
import MaterialTable from 'material-table';
import * as yup from 'yup';

function AddSize() {
    const [sizeDetail, setSizeDetail] = useState([]);
    const columns = [
        { field: 'id_kich_thuoc', title: 'ID', width: 70 },
        { field: 'ten_kich_thuoc', title: 'Tên kích thước', width: 130 },
    ];

    const schema = yup
        .object()
        .shape({
            ten_kich_thuoc: yup
                .number()
                .max(100, 'Tối đa size 100')
                .min(30, 'Tối thiểu size 30')

        })


    useEffect(() => {
        try {
            const fetchSizeDetail = async () => {
                if (sizeDetail !== null) {
                    const result = await sizeAPI.get();
                    setSizeDetail(result.data.data);
                }
            };
            fetchSizeDetail();
        } catch (error) {
            console.log('Failed to fetch SizeDetail: ', error);
        }
    }, []);

    const getSizeDetail = async () => {

        const result = await sizeAPI.get();
        setSizeDetail(result.data.data);
    };


    const handleRowUpdate = (newData, oldData, resolve) => {
        const updateSize = async () => {
            try {
                const { data } = await sizeAPI.update({ id_kich_thuoc: newData.id_kich_thuoc, ten_kich_thuoc: newData.ten_kich_thuoc });
                getSizeDetail();
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

                const { data } = await sizeAPI.add({ ten_kich_thuoc: newData.ten_kich_thuoc });
                getSizeDetail();
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
                const { data } = await sizeAPI.delete(oldData.id_kich_thuoc);
                getSizeDetail();
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
                display: 'list-item'
                , paddingTop: '80px'
            }}
        >
            <h1>KÍCH THƯỚC</h1>
            <MaterialTable
                title="Danh sách kích thước"
                columns={columns}
                data={sizeDetail}
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

export default AddSize;