import * as React from 'react';
import Box from '@mui/material/Box';
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import { DataGrid } from '@mui/x-data-grid';
import { useState, useEffect } from 'react';
import colorAPI from '../../../../API/colorAPI';
import { useSnackbar } from 'notistack';

const columns = [
    { field: 'id_mau_sac', headerName: 'id_mau_sac', width: 70 },
    { field: 'ten_mau_sac', headerName: 'ten_mau_sac', width: 130 },
];

function AddColor() {
    const [colorDetail, setColorDetail] = useState([]);
    const [color, setColor] = useState('');
    const { enqueueSnackbar } = useSnackbar();

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

    const handleSubmit = (event) => {

        colorAPI.add({ ten_mau_sac: color })


            .then(function (response) {
                enqueueSnackbar('Thêm màu sắc thành công', {
                    variant: 'success',
                    autoHideDuration: 800,
                    anchorOrigin: {
                        vertical: 'top',
                        horizontal: 'right',
                    },
                });
                setColor('');
            })
            .catch(error => enqueueSnackbar(error.message, { variant: 'error', autoHideDuration: 1000 })
            );

    };


    const handleRowSelection = (e) => {
        setColor(e);
        console.log(e)

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
            <TextField onChange={(e) => setColor(e.target.value)} value={color} label="Màu sắc" sx={{ width: '250px', height: '60px', fontSize: '10px' }} />

            <Button onClick={handleSubmit} variant="contained" sx={{ width: '250px', height: '55px', fontSize: '15px' }}>
                Thêm màu sắc
            </Button>

            <div style={{ height: 400, width: '100%', paddingTop: '50px' }}>
                <DataGrid
                    getRowId={(row) => row.id_mau_sac}
                    rows={colorDetail}
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

export default AddColor;