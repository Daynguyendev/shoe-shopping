import * as React from 'react';
import Box from '@mui/material/Box';
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import { DataGrid } from '@mui/x-data-grid';
import { useState, useEffect } from 'react';
import trademarkAPI from './../../../../API/trademarkAPI';

const columns = [
    { field: 'id_thuong_hieu', headerName: 'id_thuong_hieu', width: 70 },
    { field: 'ten_thuong_hieu', headerName: 'ten_thuong_hieu', width: 130 },
];

function AddTrademark() {
    const [trademarkDetail, setTrademarkDetail] = useState([]);
    const [trademark, setTrademark] = useState('');

    useEffect(() => {
        try {
            const fetchtrademarkDetail = async () => {
                if (trademarkDetail !== null) {
                    const result = await trademarkAPI.get();
                    setTrademarkDetail(result.data.data);
                    console.log('trademark', result.data)
                }
            };
            fetchtrademarkDetail();
        } catch (error) {
            console.log('Failed to fetch trademark: ', error);
        }
    }, []);

    const handleSubmit = (event) => {

        trademarkAPI.add({ ten_thuong_hieu: trademark })


            .then(function (response) {
                return response.status
            })
            .catch(error => console.log(error));

    };


    const handleRowSelection = (e) => {
        setTrademark(e);
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
            <TextField onChange={(e) => setTrademarkDetail(e.target.value)} label="Thương hiệu" sx={{ width: '250px', height: '60px', fontSize: '10px' }} />

            <Button onClick={handleSubmit} variant="contained" sx={{ width: '250px', height: '55px', fontSize: '15px' }}>
                Thêm thương hiệu
            </Button>

            <div style={{ height: 400, width: '100%', paddingTop: '50px' }}>
                <DataGrid
                    getRowId={(row) => row.id_thuong_hieu}
                    rows={trademarkDetail}
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

export default AddTrademark;