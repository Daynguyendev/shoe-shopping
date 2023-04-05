import React from 'react';
import Product from '../Product';
import { Grid } from '@material-ui/core';
import './ItemSale.scss'
import { Typography } from '@mui/material';
import productAPI from '../../../../API/productAPI';
import { useState, useEffect, useLayoutEffect, useMemo } from 'react';
import Button from '@mui/material/Button';
import { useSearchParams } from 'react-router-dom';
import Breadcrumbs from '@mui/material/Breadcrumbs';
import { useNavigate } from 'react-router-dom';
import { useParams } from 'react-router-dom';
import { Container } from '@mui/material';


function ItemSale({ Sale, value2 }) {
    const [productList, setProductList] = useState([]);

    const QueryStringParse = (array) => {
        const query = [...array].reduce((previous, current) => {
            // check urlParams wrong - if wrong set default
            const objKey = current[0];
            if (
                objKey !== '_offset' &&
                objKey !== '_limit' &&
                objKey !== '_page' &&
                objKey !== 'product_khuyenmai'
            )
                return {
                    _page: 1,
                };
            // urlParams true convert to Object
            else {
                let objValue;

                if (current[1] === 'true') objValue = true;
                else if (current[1] === 'false') objValue = false;
                else if (isNaN(parseInt(current[1]))) objValue = current[1];
                else objValue = parseInt(current[1]);
                return { ...previous, [objKey]: objValue };
            }
        }, {});
        return query;
    };


    const [pagination, setPagination] = useState({
        page: 1,
        total: 4,
        limit: 4,
    });
    const [filters] = useState({
        product_khuyenmai: true,
        _limit: 4,
    });

    const [searchParams, setSearchParams] = useSearchParams(filters);
    // when searchParams change - get queryParams
    const queryParams = useMemo(() => QueryStringParse([...searchParams]), [searchParams]);

    // Call API when queryParams change
    useEffect(() => {
        const fectProduct = async () => {
            try {
                const { data, pagination } = await productAPI.Fillter(queryParams);
                setProductList(data);
                setPagination(pagination);
                console.log('test pagination', pagination);
            } catch (error) {
                console.log('Failed to fetch product list: ', error);
            }
        };
        fectProduct();
    }, [queryParams]);

    const handlePaginationChange = (e, page) => {
        const filters = {
            ...queryParams,
            _page: page,
        };
        console.log('Filters: ', filters);
        setSearchParams(filters);
    };


    console.log('product List', productList);

    return (
        <Container disableGutters maxWidth="xl"  >
            <Grid item xs={12} className='item-sale'>
                <Grid item xs={4} sm={4} md={4} lg={4} xl={4}>
                    <hr />
                </Grid>
                <Grid item xs={4} sm={4} md={4} lg={4} xl={4}>
                    <h1>Sale</h1>
                </Grid>
                <Grid item xs={4} sm={4} md={4} lg={4} xl={4}>
                    <hr />
                </Grid>
            </Grid>
            <Grid container spacing={2} className='ListItemsale' >
                <Product xs={6} sm={6} md={4} lg={3} xl={3} so_luong={4} Sale={productList} handlePaginationChange={handlePaginationChange} pagesale={pagination} value2={2} />
            </Grid>
        </Container >
    );
}

export default ItemSale;