import * as React from 'react';
import Box from '@mui/material/Box';
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import { DataGrid } from '@mui/x-data-grid';
import { useState, useEffect } from 'react';
import categoryAPI from './../../../../API/categoryAPI';
import { useSnackbar } from 'notistack';
import tableIcons from '../MaterialTableControl';
import MaterialTable from 'material-table';


function AddCategory() {
    const { enqueueSnackbar } = useSnackbar();
    const [category, setCategory] = useState([]);
    const [sizeadd, setSizeadd] = useState('');
    const columns = [
        { field: 'id_loai_sp', title: 'id_loai_sp', width: 70 },
        { field: 'ten_loai_sp', title: 'ten_loai_sp', width: 130 },
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

    const handleSubmit = (event) => {
        categoryAPI.add({ ten_loai_sp: sizeadd })
            .then(function (response) {
                enqueueSnackbar('Thêm loại thành công', {
                    variant: 'success',
                    autoHideDuration: 800,
                    anchorOrigin: {
                        vertical: 'top',
                        horizontal: 'right',
                    },
                });
                setSizeadd(' ');
            })
            .catch(error => enqueueSnackbar(error.message, { variant: 'error', autoHideDuration: 1000 })
            );
    };
    const getCategoryDetail = async () => {

        const result = await categoryAPI.get();
        setCategory(result.data.data);
        console.log('setCategory', result.data)
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
            }}
        >
            <h1>THÊM LOẠI SẢN PHẨM</h1>

            {/* <TextField onChange={(e) => setSizeadd(e.target.value)} value={sizeadd} label="Loại" sx={{ width: '250px', height: '60px', fontSize: '10px' }} />

            <Button onClick={handleSubmit} variant="contained" sx={{ width: '250px', height: '55px', fontSize: '15px' }}>
                Thêm loại
            </Button> */}

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
                            // handleRowAdd(newData, resolve);
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