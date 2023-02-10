import React from 'react';
import ListProduct from './../features/product/component/ListProduct';
import { Container } from '@mui/material';
import ReviewShop from '../features/product/component/ReviewShop';
import ItemtypeReview from '../features/product/component/ItemtypeReview';
import ItemSale from '../features/product/component/ItemSale';
import NewHot from '../features/product/component/NewHot';
function Home(props) {

    return (
        <Container maxWidth="xl" >
            <ReviewShop />
            <ItemtypeReview />
            <ListProduct />
            <ItemSale />
            <NewHot />
        </Container>
    );
}

export default Home;