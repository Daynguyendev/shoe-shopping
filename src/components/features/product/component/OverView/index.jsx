import React from 'react';
import { Grid } from '@material-ui/core';
import './OverView.scss'
import Product from '../Product';
import Breadcrumbs from '@mui/material/Breadcrumbs';
import { useNavigate } from 'react-router-dom';
import { useParams } from 'react-router-dom';
import productAPI from '../../../../API/productAPI';
import { useState, useEffect } from 'react';
import trademarkAPI from '../../../../API/trademarkAPI';
import categoryAPI from '../../../../API/categoryAPI';
import { Container } from '@mui/material';

function OverView() {
    const [tradeMarkAll, setTradeMarkAll] = useState([]);
    const { name } = useParams();
    const navigate = useNavigate();
    const [page, setPage] = useState(null);
    const [product, setProduct] = useState([]);
    const [productCategory, setProductCategory] = useState([]);
    const [category, setCategory] = useState([]);
    const [display, setDisplay] = useState(null);
    const [productDefault, setProductDefault] = useState([]);
    const handleClickDetail = (item) => {
        navigate(`/colections/${item}`)
        setPage(1);
        setDisplay(item);
    }
    const handleHome = () => {
        navigate('/');
    }

    function onResetData() {
        setPage(null);
    }

    useEffect(() => {
        try {
            const fetchProduct = async () => {
                if (category !== null) {
                    const result = await categoryAPI.get();
                    setCategory(result.data.data);
                }
            };
            fetchProduct();
        } catch (error) {
            console.log('Failed to fetch category: ', error);
        }
    }, []);

    useEffect(() => {
        try {
            const fetchProduct = async () => {
                if (tradeMarkAll !== null) {
                    const result = await trademarkAPI.get();
                    setTradeMarkAll(result.data.data);
                }
            };
            fetchProduct();
        } catch (error) {
            console.log('Failed to fetch Product: ', error);
        }
    }, []);
    useEffect(() => {
        try {
            const fetchProduct = async () => {
                if (product !== null) {
                    const result = await productAPI.getName(name);
                    setProduct(result.data.data);
                }
            };
            fetchProduct();
        } catch (error) {
            console.log('Failed to fetch Product: ', error);
        }
    }, [name]);

    useEffect(() => {
        try {
            const fetchProduct = async () => {
                if (productDefault !== null) {
                    const result = await productAPI.getAll();
                    setProductDefault(result.data.data);
                }
            };
            fetchProduct();
        } catch (error) {
            console.log('Failed to fetch productDefault: ', error);
        }
    }, []);

    useEffect(() => {
        try {
            const fetchProduct = async () => {
                if (productCategory !== null) {
                    const result = await productAPI.getCategory(name);
                    setProductCategory(result.data.data);
                }
            };
            fetchProduct();
        } catch (error) {
            console.log('Failed to fetch productCategory: ', error);
        }
    }, [name]);


    return (
        <Container disableGutters maxWidth="xl" >
            <Breadcrumbs aria-label="breadcrumb" style={{ backgroundColor: 'white', padding: '5px' }}>
                <p style={{ cursor: 'pointer', fontSize: '21px', fontFamily: 'Jura' }} onClick={handleHome}>Trang chủ </p>
                <p style={{ cursor: 'pointer', fontSize: '21px', fontFamily: 'Jura' }}  >{name} </p>
            </Breadcrumbs>
            <Grid item xs={12} className='overview' >
                <Grid item xs={3} className='danh-muc'  >
                    <h3 style={{ color: 'red', marginTop: '-5px' }}>Thương hiệu</h3>
                    {tradeMarkAll.map((item, index) => (
                        <h4 key={index} style={{ fontFamily: 'Jura', cursor: 'pointer' }} onClick={() => handleClickDetail(item.ten_thuong_hieu)}>
                            {item.ten_thuong_hieu}
                        </h4>
                    ))}
                    <h3 style={{ color: 'red' }}>Loại</h3>
                    {category.map((item, index) => (
                        <h4 key={index} style={{ fontFamily: 'Jura', cursor: 'pointer' }} onClick={() => handleClickDetail(item.id_loai_sp)}>
                            {item.ten_loai_sp}
                        </h4>
                    ))}
                </Grid>
                <Grid container className='product' >
                    <Product xs={12} sm={6} md={4} lg={4} xl={4} productDefault={productDefault} display={display} value5={5} so_luong={2} productView={product} productCategory={productCategory} newcolor="white" colortext="black" page={page} handleReset={onResetData} />
                </Grid>

            </Grid>
        </Container>
    );
}

export default OverView;