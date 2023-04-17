import * as React from 'react';
import Box from '@mui/material/Box';
import { useState, useEffect } from 'react';
import sizeAPI from './../../../../API/sizeAPI';
import categoryAPI from '../../../../API/categoryAPI';
import colorAPI from '../../../../API/colorAPI';
import imageAPI from '../../../../API/imageAPI';
import discountAPI from '../../../../API/discountAPI';
import providerAPI from '../../../../API/providerAPI';
import trademarkAPI from '../../../../API/trademarkAPI';
import productAPI from './../../../../API/productAPI';
import tableIcons from '../MaterialTableControl';
import MaterialTable from 'material-table';

export default function UploadProduct() {
    const [sizeDetail, setSizeDetail] = useState([]);
    const [categoryDetail, setCategoryDetail] = useState([]);
    const [colorDetail, setColorDetail] = useState([]);
    const [imageDetail, setImageDetailDetail] = useState([]);
    const [discountDetail, setDiscountDetail] = useState([]);
    const [providerDetail, setProviderDetail] = useState([]);
    const [product, setProduct] = useState([]);

    const columns = [
        { field: 'id_sp', title: 'ID', width: 70 },
        { field: 'ten_sp', title: 'Tên sản phẩm', width: 130 },
        {
            title: 'Giá',
            render: (rowData) => {
                return (
                    <p>{(rowData.gia_sp).toLocaleString('vi-VN', { style: 'currency', currency: 'VND' })}</p>
                );
            },
        },
        {
            field: 'hinh_anh_chinh', title: 'Hình ảnh chính', width: 130,
            render: rowData => <img src={rowData.hinh_anh_chinh} style={{ width: 80, borderRadius: '50%' }} />
        },
        { field: 'thong_tin_sp', title: 'Thông tin sản phẩm', width: 70 },
        { field: 'id_thuong_hieu', title: 'ID thương hiệu', width: 50 },
        { field: 'id_loai_sp', title: 'ID loại sản phẩm', width: 50 },
        { field: 'id_khuyen_mai', title: 'ID khuyến mãi', width: 50 },
        { field: 'id_nha_cc', title: 'ID nhà cung cấp', width: 50 },


    ];

    useEffect(() => {
        try {
            const fetchProduct = async () => {
                if (product !== null) {
                    const result = await productAPI.getAll();
                    setProduct(result.data.data);
                }
            };
            fetchProduct();
        } catch (error) {
            console.log('Failed to fetch product: ', error);
        }
    }, []);

    useEffect(() => {
        try {
            const fetchSizeDetail = async () => {
                if (sizeDetail !== null) {
                    const result = await sizeAPI.get();
                    setSizeDetail(result.data.data);
                }
            };
            fetchSizeDetail();
        } catch (error) {
            console.log('Failed to fetch SizeDetail: ', error);
        }
    }, []);

    useEffect(() => {
        try {
            const fetchCategorry = async () => {
                if (categoryDetail !== null) {
                    const result = await categoryAPI.get();
                    setCategoryDetail(result.data.data);
                }
            };
            fetchCategorry();
        } catch (error) {
            console.log('Failed to fetch SizeDetail: ', error);
        }
    }, []);

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

    useEffect(() => {
        try {
            const fetchImageDetail = async () => {
                if (imageDetail !== null) {
                    const result = await imageAPI.getAll();
                    setImageDetailDetail(result.data.data);
                }
            };
            fetchImageDetail();
        } catch (error) {
            console.log('Failed to fetch imageDetail: ', error);
        }
    }, []);

    useEffect(() => {
        try {
            const fetchDiscountDetail = async () => {
                if (discountDetail !== null) {
                    const result = await discountAPI.get();
                    setDiscountDetail(result.data.data);
                }
            };
            fetchDiscountDetail();
        } catch (error) {
            console.log('Failed to fetch discountDetail: ', error);
        }
    }, []);

    useEffect(() => {
        try {
            const fetchProviderDetail = async () => {
                if (providerDetail !== null) {
                    const result = await providerAPI.get();
                    setProviderDetail(result.data.data);
                }
            };
            fetchProviderDetail();
        } catch (error) {
            console.log('Failed to fetch providerDetail: ', error);
        }
    }, []);

    const [trademarkDetail, setTrademarkDetail] = useState([]);
    useEffect(() => {
        try {
            const fetchtrademarkDetail = async () => {
                if (trademarkDetail !== null) {
                    const result = await trademarkAPI.get();
                    setTrademarkDetail(result.data.data);
                }
            };
            fetchtrademarkDetail();
        } catch (error) {
            console.log('Failed to fetch trademark: ', error);
        }
    }, []);

    const getProduct = async () => {

        const result = await productAPI.getAll();
        setProduct(result.data.data);
    };


    const handleRowUpdate = (newData, oldData, resolve) => {
        const updateProduct = async () => {
            try {
                const { data } = await productAPI.update({
                    id_sp: newData.id_sp,
                    ten_sp: newData.ten_sp,
                    gia_sp: newData.gia_sp,
                    thong_tin_sp: newData.thong_tin_sp,
                    id_thuong_hieu: newData.id_thuong_hieu,
                    id_loai_sp: newData.id_loai_sp,
                    hinh_anh_chinh: newData.hinh_anh_chinh,
                    id_khuyen_mai: newData.id_khuyen_mai,

                });
                getProduct();
            } catch (error) {
                console.log('Failed to update providerDetail list: ', error);
            }
        };
        updateProduct();
        resolve();
    };

    const handleRowAdd = (newData, resolve) => {
        const addProduct = async () => {
            try {
                const { data } = await productAPI.add({
                    ten_sp: newData.ten_sp,
                    gia_sp: newData.gia_sp,
                    thong_tin_sp: newData.thong_tin_sp,
                    id_thuong_hieu: newData.id_thuong_hieu,
                    id_loai_sp: newData.id_loai_sp,
                    hinh_anh_chinh: newData.hinh_anh_chinh,
                    id_khuyen_mai: newData.id_khuyen_mai,

                });
                getProduct();
            } catch (error) {
                console.log('Failed toadd providerDetail list: ', error);
            }
        };
        addProduct();
        resolve();
    };

    const handleRowDelete = (oldData, resolve) => {
        const deleteProduct = async () => {
            try {
                const { data } = await productAPI.delete(oldData.id_sp);
                getProduct();
            } catch (error) {
                console.log('Failed to update providerDetail list: ', error);
            }
        };
        deleteProduct();
        resolve();
    };

    return (
        <Box
        >
            <h1>SẢN PHẨM</h1>
            <MaterialTable
                title="Danh sách nhà cung cấp"
                columns={columns}
                data={product}
                icons={tableIcons}
                editable={{
                    onRowUpdate: (newData, oldData) =>
                        new Promise((resolve) => {
                            handleRowUpdate(newData, oldData, resolve);
                        }),
                    onRowAdd: (newData) =>
                        new Promise((resolve) => {
                            handleRowAdd(newData, resolve);
                        }),
                    onRowDelete: (oldData) =>
                        new Promise((resolve) => {
                            handleRowDelete(oldData, resolve);
                        }),
                }}
            />

        </Box>
    );
}