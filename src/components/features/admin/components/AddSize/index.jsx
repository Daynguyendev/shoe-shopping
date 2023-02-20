import * as React from 'react';
import Box from '@mui/material/Box';
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import { DataGrid } from '@mui/x-data-grid';
import { useState, useEffect } from 'react';
import sizeAPI from '../../../../API/sizeAPI';
import axios from 'axios';

const columns = [
    { field: 'id_kich_thuoc', headerName: 'ID', width: 70 },
    { field: 'ten_kich_thuoc', headerName: 'ten_kich_thuoc', width: 130 },
];

function AddSize() {
    const [sizeDetail, setSizeDetail] = useState([]);
    const [size, setSize] = useState('');

    useEffect(() => {
        try {
            const fetchSizeDetail = async () => {
                if (sizeDetail !== null) {
                    const result = await sizeAPI.get();
                    setSizeDetail(result.data.data);
                    console.log('pageDetail', result.data)
                }
            };
            fetchSizeDetail();
        } catch (error) {
            console.log('Failed to fetch SizeDetail: ', error);
        }
    }, []);

    const handleSubmit = (event) => {

        sizeAPI.add({ ten_kich_thuoc: size })


            .then(function (response) {
                return response.status
            })
            .catch(error => console.log(error));

    };


    const handleRowSelection = (e) => {
        setSize(e);
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
            <TextField onChange={(e) => setSize(e.target.value)} label="Kích thước" sx={{ width: '250px', height: '60px', fontSize: '10px' }} />

            <Button onClick={handleSubmit} variant="contained" sx={{ width: '250px', height: '55px', fontSize: '15px' }}>
                Thêm kích thước
            </Button>

            <div style={{ height: 400, width: '100%', paddingTop: '50px' }}>
                <DataGrid
                    getRowId={(row) => row.id_kich_thuoc}
                    rows={sizeDetail}
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

export default AddSize;