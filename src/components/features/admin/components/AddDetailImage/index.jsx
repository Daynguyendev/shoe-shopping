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
import tableIcons from '../MaterialTableControl';
import MaterialTable from 'material-table';



function AddDetailImage() {
    const [imageDetail, setImageDetailDetail] = useState([]);
    const [idImage, setIdImage] = useState('');
    const [linkImage, setLinkImage] = useState('');
    const { enqueueSnackbar } = useSnackbar();
    const [idProduct, setIdproduct] = useState('');
    const [idColor, setidColor] = useState('');
    const [product, setProduct] = useState([]);
    const [colorDetail, setColorDetail] = useState([]);
    const columns = [
        { field: 'id_anh', title: 'id_anh', width: 70 },
        { field: 'id_sp', title: 'id_sp', width: 130 },
        { field: 'id_mau_sac', title: 'id_mau_sac', width: 130 },
        { field: 'link_hinh_anh_ct', title: 'link_hinh_anh_ct', width: 130 },

    ];

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
    const getImageDetail = async () => {

        const result = await imageAPI.getAll();
        setImageDetailDetail(result.data.data);
        console.log('imageDetail', result.data)
    };

    const handleRowUpdate = (newData, oldData, resolve) => {
        const updateImage = async () => {
            try {
                const { data } = await imageAPI.update({ id_anh: newData.id_anh, id_sp: newData.id_sp, id_mau_sac: newData.id_mau_sac, link_hinh_anh_ct: newData.link_hinh_anh_ct });
                getImageDetail();
            } catch (error) {
                console.log('Failed to update size list: ', error);
            }
        };
        updateImage();
        resolve();
    };

    const handleRowAdd = (newData, resolve) => {
        const addImage = async () => {
            try {
                const { data } = await imageAPI.add({ id_sp: newData.id_sp, id_mau_sac: newData.id_mau_sac, link_hinh_anh_ct: newData.link_hinh_anh_ct });
                getImageDetail();
            } catch (error) {
                console.log('Failed toadd size list: ', error);
            }
        };
        addImage();
        resolve();
    };

    const handleRowDelete = (oldData, resolve) => {
        const deleteImage = async () => {
            try {
                const { data } = await imageAPI.delete(oldData.id_anh);
                getImageDetail();
            } catch (error) {
                console.log('Failed to update product list: ', error);
            }
        };
        deleteImage();
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
                paddingTop: '50px',
                display: 'list-item'
                , paddingTop: '80px'
            }}
        >
            <h1>THÊM HÌNH ẢNH CHI TIẾT</h1>
            <UploadImage />
            <br />
            <br />
            <TextField
                fullWidth
                select
                label="ID sản phẩm"
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
                label="ID màu sắc"
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
            <TextField fullWidth onChange={(e) => setLinkImage(e.target.value)} value={linkImage} label="link hình ảnh" />
            <br />
            <br />
            <Button onClick={handleSubmit} variant="contained" sx={{ width: '250px', height: '55px', fontSize: '15px' }}>
                Thêm hình ảnh
            </Button>
            <MaterialTable
                title="Danh sách màu sắc"
                columns={columns}
                data={imageDetail}
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

export default AddDetailImage;