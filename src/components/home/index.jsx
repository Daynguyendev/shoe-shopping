import React from 'react';
import ListProduct from './../features/product/component/ListProduct';
import { Container } from '@mui/material';
import ReviewShop from '../features/product/component/ReviewShop';
import ItemtypeReview from '../features/product/component/ItemtypeReview';
import ItemSale from '../features/product/component/ItemSale';
import NewHot from '../features/product/component/NewHot';
import { useState, useEffect } from 'react';
import productAPI from './../API/productAPI';
function Home(props) {

    const [product, setProduct] = useState([]);
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
            console.log('Failed to fetch Product: ', error);
        }
    }, []);

    return (
        <Container maxWidth="xl" >
            <ReviewShop />
            {/* <ItemtypeReview /> */}
            <ListProduct product={product} />
            <ItemSale product={product} />
            <NewHot />
        </Container>
    );
}

export default Home;