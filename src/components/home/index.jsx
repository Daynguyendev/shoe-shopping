import React from 'react';
import ListProduct from './../features/product/component/ListProduct';
import { Container } from '@mui/material';
import ReviewShop from '../features/product/component/ReviewShop';
import ItemtypeReview from '../features/product/component/ItemtypeReview';
import ItemSale from '../features/product/component/ItemSale';
import NewHot from '../features/product/component/NewHot';
import { useState, useEffect } from 'react';
import productAPI from './../API/productAPI';
import Progress from '../Formcontrol/Progress'
import BestSaler from '../features/product/component/BestSaler';
import userAPI from '../API/userAPI';
function Home(props) {
    const [userDetail, setUserDetail] = useState([]);
    const [product, setProduct] = useState([]);
    const [productSale, setProductSale] = useState([]);
    const [loading, setLoading] = useState(true);
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



    useEffect(() => {
        try {
            const fetchProduct = async () => {
                if (productSale !== null) {
                    const result = await productAPI.getAllItemSale();
                    setProductSale(result.data.data);
                    setLoading(false);
                }
            };
            fetchProduct();
        } catch (error) {
            console.log('Failed to fetch ProductSale: ', error);
        }
    }, []);

    useEffect(() => {
        try {
            const fetchCustomerDetail = async () => {
                if (userDetail !== null) {
                    const result = await userAPI.getSale();

                    const data = await result.data.data.slice(0, 4)
                    setUserDetail(data);
                }
            };
            fetchCustomerDetail();
        } catch (error) {
            console.log('Failed to fetch Customer: ', error);
        }
    }, []);
    console.log('Customer', userDetail)




    return (
        <Container maxWidth="xl" >
            <ReviewShop />

            {loading ? (
                <Progress />) : (
                <> <BestSaler bestSale={userDetail} value9={9} />
                    <ListProduct product={product} value1={1} />
                    <ItemSale Sale={productSale} value2={2} />
                </>
            )}
            <NewHot />


        </Container>
    );
}

export default Home;