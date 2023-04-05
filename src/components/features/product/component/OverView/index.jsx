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

import Fillter from '../Fillter';

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


    const [testFillter, setTestFillter] = useState();


    useEffect(() => {
        try {
            const fetchProduct = async () => {
                if (testFillter !== null) {
                    const result = await productAPI.Fillter();
                    setTestFillter(result.data);
                    setPage(result.data[0].total_count)
                }
            };
            fetchProduct();
        } catch (error) {
            console.log('Failed to fetch testFillter: ', error);
        }
    }, []);


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
                    if (name == 'danh-muc') {
                        setProductDefault(result.data.data);
                    }
                    else {
                        const filteredProducts = await result.data.data.filter((product) =>
                            (product.ten_sp.replace(/\s+/g, '-')).toLowerCase().includes(name.toLowerCase())
                        );
                        setProductDefault(filteredProducts);

                    }
                }
            };
            fetchProduct();
        } catch (error) {
            console.log('Failed to fetch productDefault: ', error);
        }
    }, [name]);

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
            <Fillter />
        </Container>
    );
}

export default OverView;