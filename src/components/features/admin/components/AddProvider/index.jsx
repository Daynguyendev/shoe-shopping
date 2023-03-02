import * as React from 'react';
import Box from '@mui/material/Box';
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import { DataGrid } from '@mui/x-data-grid';
import { useState, useEffect } from 'react';
import providerAPI from '../../../../API/providerAPI';
import { useSnackbar } from 'notistack';

const columns = [
    { field: 'id_nha_cc', headerName: 'id_nha_cc', width: 70 },
    { field: 'ten_nha_cc', headerName: 'ten_nha_cc', width: 130 },
    { field: 'dia_chi_cc', headerName: 'dia_chi_cc', width: 130 },

];

function AddProvider() {
    const [providerDetail, setProviderDetail] = useState([]);
    const [nameprovider, setNameProvider] = useState('');
    const [addressProvider, setAddressProvider] = useState('');
    const { enqueueSnackbar } = useSnackbar();


    useEffect(() => {
        try {
            const fetchProviderDetail = async () => {
                if (providerDetail !== null) {
                    const result = await providerAPI.get();
                    setProviderDetail(result.data.data);
                    console.log('providerDetail', result.data)
                }
            };
            fetchProviderDetail();
        } catch (error) {
            console.log('Failed to fetch providerDetail: ', error);
        }
    }, []);

    const handleSubmit = (event) => {

        providerAPI.add({
            ten_nha_cc: nameprovider,
            dia_chi_cc: addressProvider
        })


            .then(function (response) {
                enqueueSnackbar('Thêm nhà cung cấp thành công', {
                    variant: 'success',
                    autoHideDuration: 800,
                    anchorOrigin: {
                        vertical: 'top',
                        horizontal: 'right',
                    },
                });
                setNameProvider('');
                setAddressProvider('');
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
            <TextField onChange={(e) => setNameProvider(e.target.value)} value={nameprovider} label="Tên nhà cung cấp" sx={{ width: '250px', height: '60px', fontSize: '10px' }} />
            <TextField onChange={(e) => setAddressProvider(e.target.value)} value={addressProvider} label="Địa chỉ nhà cung cấp" sx={{ width: '250px', height: '60px', fontSize: '10px' }} />


            <Button onClick={handleSubmit} variant="contained" sx={{ width: '250px', height: '55px', fontSize: '15px' }}>
                Thêm nhà cung cấp
            </Button>

            <div style={{ height: 400, width: '100%', paddingTop: '50px' }}>
                <DataGrid
                    getRowId={(row) => row.id_nha_cc}
                    rows={providerDetail}
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

export default AddProvider;