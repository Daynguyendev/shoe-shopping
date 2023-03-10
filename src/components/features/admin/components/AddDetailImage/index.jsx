import * as React from 'react';
import Box from '@mui/material/Box';
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import { DataGrid } from '@mui/x-data-grid';
import { useState, useEffect } from 'react';
import imageAPI from '../../../../API/imageAPI';
import UploadImage from '../UploadImage';
import { useSnackbar } from 'notistack';
import productAPI from '../../../../API/productAPI'
import colorAPI from '../../../../API/colorAPI';
import MenuItem from '@mui/material/MenuItem';


const columns = [
    { field: 'id_anh', headerName: 'id_anh', width: 70 },
    { field: 'id_sp', headerName: 'id_sp', width: 130 },
    { field: 'id_mau_sac', headerName: 'id_mau_sac', width: 130 },
    { field: 'link_hinh_anh_ct', headerName: 'link_hinh_anh_ct', width: 130 },

];
function AddDetailImage() {
    const [imageDetail, setImageDetailDetail] = useState([]);
    const [idImage, setIdImage] = useState('');
    const [linkImage, setLinkImage] = useState('');
    const { enqueueSnackbar } = useSnackbar();
    const [idProduct, setIdproduct] = useState('');
    const [idColor, setidColor] = useState('');
    const [product, setProduct] = useState([]);
    const [colorDetail, setColorDetail] = useState([]);

    useEffect(() => {
        try {
            const fetchProduct = async () => {
                if (product !== null) {
                    const result = await productAPI.getAll();
                    setProduct(result.data.data);
                    console.log('product', result.data.data)
                }
            };
            fetchProduct();
        } catch (error) {
            console.log('Failed to fetch product: ', error);
        }
    }, []);

    useEffect(() => {
        try {
            const fetchColorDetail = async () => {
                if (colorDetail !== null) {
                    const result = await colorAPI.get();
                    setColorDetail(result.data.data);
                    console.log('colorDetail', result.data)
                }
            };
            fetchColorDetail();
        } catch (error) {
            console.log('Failed to fetch colorDetail: ', error);
        }
    }, []);

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
            id_sp: idProduct,
            id_mau_sac: idColor,
            link_hinh_anh_ct: linkImage
        })
            .then(function (response) {
                enqueueSnackbar('Th??m h??nh ???nh chi ti???t th??nh c??ng', {
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
            <h1>TH??M H??NH ???NH CHI TI???T</h1>
            <UploadImage />
            <br />
            <br />
            <TextField
                fullWidth
                select
                label="ID s???n ph???m"
                value={idProduct}
                onChange={(e) => setIdproduct(e.target.value)}


            >
                {product.map((option) => (
                    <MenuItem key={option.id_sp} value={option.id_sp}>
                        {option.ten_sp}
                    </MenuItem>
                ))}
            </TextField>
            <br />
            <br />
            <TextField
                fullWidth
                select
                label="ID m??u s???c"
                value={idColor}
                onChange={(e) => setidColor(e.target.value)}
            >
                {colorDetail.map((option) => (
                    <MenuItem key={option.id_mau_sac} value={option.id_mau_sac}>
                        {option.ten_mau_sac}
                    </MenuItem>
                ))}
            </TextField>
            <br />
            <br />
            <TextField fullWidth onChange={(e) => setLinkImage(e.target.value)} value={linkImage} label="link h??nh ???nh" />
            <br />
            <br />
            <Button onClick={handleSubmit} variant="contained" sx={{ width: '250px', height: '55px', fontSize: '15px' }}>
                Th??m h??nh ???nh
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