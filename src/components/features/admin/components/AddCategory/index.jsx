import * as React from 'react';
import Box from '@mui/material/Box';
import { useState, useEffect } from 'react';
import categoryAPI from './../../../../API/categoryAPI';
import { useSnackbar } from 'notistack';
import tableIcons from '../MaterialTableControl';
import MaterialTable from 'material-table';


function AddCategory() {
    const [category, setCategory] = useState([]);
    const columns = [
        { field: 'id_loai_sp', title: 'ID', width: 70 },
        { field: 'ten_loai_sp', title: 'Tên loại sản phẩm', width: 130 },
    ];

    useEffect(() => {
        try {
            const fetchCategorry = async () => {
                if (category !== null) {
                    const result = await categoryAPI.get();
                    setCategory(result.data.data);

                }
            };
            fetchCategorry();
        } catch (error) {
            console.log('Failed to fetch SizeDetail: ', error);
        }
    }, []);

    const getCategoryDetail = async () => {
        const result = await categoryAPI.get();
        setCategory(result.data.data);
    };

    const handleRowUpdate = (newData, oldData, resolve) => {
        const updateSize = async () => {
            try {
                const { data } = await categoryAPI.update({ id_loai_sp: newData.id_loai_sp, ten_loai_sp: newData.ten_loai_sp });
                getCategoryDetail();
            } catch (error) {
                console.log('Failed to update category list: ', error);
            }
        };
        updateSize();
        resolve();
    };

    const handleRowAdd = (newData, resolve) => {
        const addSize = async () => {
            try {
                const { data } = await categoryAPI.add({ ten_loai_sp: newData.ten_loai_sp });
                getCategoryDetail();
            } catch (error) {
                console.log('Failed toadd category list: ', error);
            }
        };
        addSize();
        resolve();
    };

    const handleRowDelete = (oldData, resolve) => {
        const deleteSize = async () => {
            try {
                const { data } = await categoryAPI.delete(oldData.id_loai_sp);
                getCategoryDetail();
            } catch (error) {
                console.log('Failed to update category list: ', error);
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
            <h1>LOẠI SẢN PHẨM</h1>
            <MaterialTable
                title="Danh sách loại sản phẩm"
                columns={columns}
                data={category}
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

export default AddCategory;