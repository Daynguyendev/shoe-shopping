import * as React from 'react';
import Box from '@mui/material/Box';
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import { DataGrid } from '@mui/x-data-grid';
import { useState, useEffect } from 'react';
import imageAPI from '../../../../API/imageAPI';
import UploadImage from '../UploadImage';
import { useSnackbar } from 'notistack';

const columns = [
    { field: 'id_anh', headerName: 'id_anh', width: 70 },
    { field: 'id_hinh_anh', headerName: 'id_hinh_anh', width: 130 },
    { field: 'link_hinh_anh_ct', headerName: 'link_hinh_anh_ct', width: 130 },

];
function AddDetailImage() {
    const [imageDetail, setImageDetailDetail] = useState([]);
    const [idImage, setIdImage] = useState('');
    const [linkImage, setLinkImage] = useState('');
    const { enqueueSnackbar } = useSnackbar();

    useEffect(() => {
        try {
            const fetchImageDetail = async () => {
                if (imageDetail !== null) {
                    const result = await imageAPI.getAll();
                    setImageDetailDetail(result.data.data);
                    console.log('imageDetail', result.data)
                }
            };
            fetchImageDetail();
        } catch (error) {
            console.log('Failed to fetch imageDetail: ', error);
        }
    }, []);

    const handleSubmit = (event) => {

        imageAPI.add({
            id_hinh_anh: idImage,
            link_hinh_anh_ct: linkImage
        })
            .then(function (response) {
                enqueueSnackbar('Thêm hình ảnh chi tiết thành công', {
                    variant: 'success',
                    autoHideDuration: 800,
                    anchorOrigin: {
                        vertical: 'top',
                        horizontal: 'right',
                    },
                });
                setLinkImage('');
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

                paddingTop: '50px',
                display: 'list-item'
            }}
        >
            <h1>THÊM HÌNH ẢNH CHI TIẾT</h1>
            <UploadImage />
            <br />
            <TextField onChange={(e) => setIdImage(e.target.value)} label="id của ảnh chính" sx={{ width: '250px', height: '60px', fontSize: '10px' }} />
            <TextField onChange={(e) => setLinkImage(e.target.value)} value={linkImage} label="link hình ảnh" sx={{ width: '250px', height: '60px', fontSize: '10px' }} />
            <Button onClick={handleSubmit} variant="contained" sx={{ width: '250px', height: '55px', fontSize: '15px' }}>
                Thêm hình ảnh
            </Button>
            <div style={{ height: 400, width: '100%', paddingTop: '50px' }}>
                <DataGrid
                    getRowId={(row) => row.id_anh}
                    rows={imageDetail}
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

export default AddDetailImage;