import React from 'react';
import ListProduct from './../features/product/component/ListProduct';
import { Container } from '@mui/material';
import ReviewShop from '../features/product/component/ReviewShop';
function Home(props) {

    return (
        <Container maxWidth="xl" >
            <ReviewShop />
            <ListProduct />
        </Container>
    );
}

export default Home;