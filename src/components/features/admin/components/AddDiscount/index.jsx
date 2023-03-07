import * as React from 'react';
import Box from '@mui/material/Box';
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import { DataGrid } from '@mui/x-data-grid';
import { useState, useEffect } from 'react';
import discountAPI from '../../../../API/discountAPI';
import { useSnackbar } from 'notistack';

const columns = [
    { field: 'id_giam_gia', headerName: 'id_giam_gia', width: 70 },
    { field: 'ten_giam_gia', headerName: 'ten_giam_gia', width: 130 },
    { field: 'gia_giam', headerName: 'gia_giam', width: 130 },

];

function AddDiscount() {
    const [discountDetail, setDiscountDetail] = useState([]);
    const [namediscount, setNameDiscount] = useState('');
    const [pricediscount, setPriceDiscount] = useState('');
    const { enqueueSnackbar } = useSnackbar();


    useEffect(() => {
        try {
            const fetchDiscountDetail = async () => {
                if (discountDetail !== null) {
                    const result = await discountAPI.get();
                    setDiscountDetail(result.data.data);
                    console.log('discountDetail', result.data)
                }
            };
            fetchDiscountDetail();
        } catch (error) {
            console.log('Failed to fetch discountDetail: ', error);
        }
    }, []);

    const handleSubmit = (event) => {

        discountAPI.add({
            ten_giam_gia: namediscount,
            gia_giam: pricediscount
        })


            .then(function (response) {
                enqueueSnackbar('Thêm mã giảm giá thành công', {
                    variant: 'success',
                    autoHideDuration: 800,
                    anchorOrigin: {
                        vertical: 'top',
                        horizontal: 'right',
                    },
                });
                setNameDiscount('');
                setPriceDiscount('');
            })
            .catch(error => enqueueSnackbar(error.message, { variant: 'error', autoHideDuration: 1000 })
            );

    };


    const handleRowSelection = (e) => {
        // setNameDiscount(e);
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
            <h1>THÊM GIẢM GIÁ</h1>

            <TextField onChange={(e) => setNameDiscount(e.target.value)} value={namediscount} label="Tên khuyến mãi" sx={{ width: '250px', height: '60px', fontSize: '10px' }} />
            <TextField onChange={(e) => setPriceDiscount(e.target.value)} value={pricediscount} label="Giá giảm" sx={{ width: '250px', height: '60px', fontSize: '10px' }} />


            <Button onClick={handleSubmit} variant="contained" sx={{ width: '250px', height: '55px', fontSize: '15px' }}>
                Thêm khuyến mãi
            </Button>

            <div style={{ height: 400, width: '100%', paddingTop: '50px' }}>
                <DataGrid
                    getRowId={(row) => row.id_giam_gia}
                    rows={discountDetail}
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

export default AddDiscount;