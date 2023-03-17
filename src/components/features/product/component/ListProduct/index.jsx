import React from 'react';
import Product from '../Product';
import { Grid } from '@material-ui/core';
import './ListProduct.scss'
import { Container } from '@mui/material';
import { useNavigate } from 'react-router-dom';

function ListProduct({ product, value1 }) {

    const navigate = useNavigate();
    const handleClickProduct = () => {
        navigate(`/detail`)
    }

    const handleClickDetail = (item) => {
        console.log(item.target.alt);
        navigate(`/product/${item.target.alt.replace(/\s+/g, '-')}`)

    }
    return (
        <Container disableGutters maxWidth="xl"  >
            <Grid item xs={12} className='title-sp'>
                <Grid item xs={4} sm={4} md={4} lg={4} xl={4}>
                    <hr />
                </Grid>
                <Grid item xs={4} sm={4} md={4} lg={4} xl={4}>
                    <h1>Sản phẩm</h1>
                </Grid>
                <Grid item xs={4} sm={4} md={4} lg={4} xl={4}>
                    <hr />
                </Grid>
            </Grid>
            <Grid container spacing={2} className='Listproduct' >
                <Product xs={6} sm={6} md={4} lg={3} xl={3} so_luong={8} product={product} value1={1} />
            </Grid>
        </Container >
    );
}

export default ListProduct;