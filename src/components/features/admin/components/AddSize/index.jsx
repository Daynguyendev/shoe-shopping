import * as React from 'react';
import Box from '@mui/material/Box';
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import { DataGrid } from '@mui/x-data-grid';
import { useState, useEffect } from 'react';
import sizeAPI from '../../../../API/sizeAPI';
import { useSnackbar } from 'notistack';
import tableIcons from '../MaterialTableControl';
import MaterialTable from 'material-table';

const columns = [
    { field: 'id_kich_thuoc', title: 'id_kich_thuoc', width: 70 },
    { field: 'ten_kich_thuoc', title: 'ten_kich_thuoc', width: 130 },
];

function AddSize() {
    const [sizeDetail, setSizeDetail] = useState([]);
    const [size, setSize] = useState('');
    const { enqueueSnackbar } = useSnackbar();
    const [state, setState] = React.useState({
        columns: [
            { title: 'Name', field: 'name' },
            { title: 'Age', field: 'age', type: 'numeric' },
            { title: 'Email', field: 'email' },
        ],
        data: [
            { name: 'John Doe', age: 25, email: 'johndoe@example.com' },
            { name: 'Jane Doe', age: 32, email: 'janedoe@example.com' },
        ],
    });

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

    const getSizeDetail = async () => {

        const result = await sizeAPI.get();
        setSizeDetail(result.data.data);
        console.log('pageDetail', result.data)
    };

    const handleSubmit = (event) => {
        sizeAPI.add({ ten_kich_thuoc: size })
            .then(function (response) {
                enqueueSnackbar('Thêm kích thước thành công', {
                    variant: 'success',
                    autoHideDuration: 800,
                    anchorOrigin: {
                        vertical: 'top',
                        horizontal: 'right',
                    },
                });
                setSize('');
            })
            .catch(error => enqueueSnackbar(error.message, { variant: 'error', autoHideDuration: 1000 })
            );
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
            }}
        >
            <h1>THÊM KÍCH THƯỚC</h1>
            <TextField onChange={(e) => setSize(e.target.value)} value={size} label="Kích thước" sx={{ width: '250px', height: '60px', fontSize: '10px' }} />
            <Button onClick={handleSubmit} variant="contained" sx={{ width: '250px', height: '55px', fontSize: '15px' }}>
                Thêm kích thước
            </Button>
            <MaterialTable
                title="Danh sách khuyến mãi"
                columns={columns}
                data={sizeDetail}
                icons={tableIcons}
                editable={{
                    onRowUpdate: (newData, oldData) =>
                        new Promise((resolve) => {
                            // handleRowUpdate(newData, oldData, resolve);
                        }),
                    onRowAdd: (newData) =>
                        new Promise((resolve) => {
                            // handleRowAdd(newData, resolve);
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