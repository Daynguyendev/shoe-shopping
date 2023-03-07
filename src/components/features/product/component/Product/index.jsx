import React from "react";
import Box from "@mui/material/Box";
import "./Product.scss";
import { useNavigate } from 'react-router-dom';
import { useState, useEffect } from 'react';
import productAPI from './../../../../API/productAPI';
import { Grid } from '@material-ui/core';
import LazyLoad from 'react-lazyload';
import Pagination from '@mui/material/Pagination';
import { height } from "@mui/system";

function Product({ xs, sm, md, lg, xl, so_luong, product, newcolor, colortext, page, handleReset }) {
  const navigate = useNavigate();
  const [currentPage, setCurrentPage] = useState(1);

  useEffect(() => {
    if (page) {
      setCurrentPage(1);
      handleReset();

    }
  }, [page, handleReset])


  const handleClickDetail = (item) => {
    // console.log(item.target.alt);.replace(/\s+/g, '-')
    navigate(`/colection/${item.target.alt}`)
  }
  const handlePageChange = (event, pageNumber) => {

    setCurrentPage(pageNumber);

  };

  const startIndex = (currentPage - 1) * so_luong;
  const endIndex = startIndex + so_luong;

  const renderProductList = () => {
    return product.slice(startIndex, endIndex).map((product, index) => (
      <Grid item xs={xs} sm={sm} md={md} lg={lg} xl={xl} key={product.id_sp}   >
        <Box className="fullbox" style={{ backgroundColor: newcolor }}  >
          <LazyLoad throttle={300} height={393} className="fade-in">
            <img onClick={handleClickDetail}
              className="img"
              src={product.hinh_anh_chinh}
              alt={product.id_hinh_anh}
            />
            <p className="detail-item" style={{ color: colortext }}>{product.ten_sp}</p>
            <p className="detail-item" style={{ color: colortext }}>{product.gia_sp}{'đ'}</p>
          </LazyLoad>
        </Box>
      </Grid>
    ));

  };


  return (

    <>

      {renderProductList()}

      <Pagination
        count={Math.ceil(product.length / 8)}
        page={currentPage}
        onChange={handlePageChange}
        color="primary"
        sx={{ width: '100%', display: 'flex', justifyContent: 'center', marginBottom: '20px' }}
      />

    </>

  );
}

export default Product;
