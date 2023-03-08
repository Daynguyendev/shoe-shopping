import * as React from 'react';
import Box from '@mui/material/Box';
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import { DataGrid } from '@mui/x-data-grid';
import { useState, useEffect } from 'react';
import categoryAPI from './../../../../API/categoryAPI';
import { useSnackbar } from 'notistack';

const columns = [
    { field: 'id_loai_sp', headerName: 'ID', width: 70 },
    { field: 'ten_loai_sp', headerName: 'ten_loai_sp', width: 130 },
];

function AddCategory() {
    const { enqueueSnackbar } = useSnackbar();
    const [category, setCategory] = useState([]);
    const [sizeadd, setSizeadd] = useState('');


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

    const handleRowSelection = (e) => {
        setSizeadd(e);
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

            <TextField onChange={(e) => setSizeadd(e.target.value)} value={sizeadd} label="Loại" sx={{ width: '250px', height: '60px', fontSize: '10px' }} />

            <Button onClick={handleSubmit} variant="contained" sx={{ width: '250px', height: '55px', fontSize: '15px' }}>
                Thêm loại
            </Button>

            <div style={{ height: 400, width: '100%', paddingTop: '50px' }}>
                <DataGrid
                    getRowId={(row) => row.id_loai_sp}
                    rows={category}
                    columns={columns}
                    pageSize={5}
                    rowsPerPageOptions={[5]}
                    checkboxSelection
                    onRowSelected={handleRowSelection}
                    onSelectionModelChange={handleRowSelection}
                />
            </div>
        </Box >
    );
}

export default AddCategory;