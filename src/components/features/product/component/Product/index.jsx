import React from "react";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import Container from "@mui/material/Container";
import "./Product.scss";
import { useNavigate } from 'react-router-dom';
import { useState, useEffect } from 'react';
import productAPI from './../../../../API/productAPI';
import { Grid } from '@material-ui/core';
import LazyLoad from 'react-lazyload';


function Product(props) {
  const [load, setLoad] = useState()
  const navigate = useNavigate();
  const handleClickProduct = () => {
    navigate(`/detail`)

  }

  const handleClickDetail = (item) => {
    // console.log(item.target.alt);.replace(/\s+/g, '-')
    navigate(`/product/${item.target.alt}`)

  }
  const [product, setProduct] = useState([]);
  useEffect(() => {
    try {
      const fetchProduct = async () => {
        if (product !== null) {
          const result = await productAPI.getAll();
          setProduct(result.data.data);
          // console.log(result.data.data)
        }
      };
      fetchProduct();
    } catch (error) {
      console.log('Failed to fetch Product: ', error);
    }
  }, []);


  return (

    <>


      {product.map((product) => (
        <Grid item xs={6} sm={6} md={4} lg={3} xl={3} key={product.id_sp}  >
          <Box className="fullbox" >


            <LazyLoad throttle={300} height={393} className="fade-in">
              <img onClick={handleClickDetail}
                className="img"
                src={product.hinh_anh_chinh}
                alt={product.id_hinh_anh}
              />
              <p className="detail-item">{product.ten_sp}</p>
              <p className="detail-item">{product.gia_sp}{'đ'}</p>
            </LazyLoad>



          </Box>
        </Grid>
      ))}

    </>

  );
}

export default Product;
