import React from "react";
import Box from "@mui/material/Box";
import "./Product.scss";
import { useNavigate } from 'react-router-dom';
import { useState, useEffect } from 'react';
import { Grid } from '@material-ui/core';
import LazyLoad from 'react-lazyload';
import Pagination from '@mui/material/Pagination';

function Product({ xs, sm, md, lg, xl, so_luong, product, productCategory, display, newcolor, colortext, page, handleReset }) {
  const navigate = useNavigate();
  const [currentPage, setCurrentPage] = useState(1);

  useEffect(() => {
    if (page) {
      setCurrentPage(1);
      handleReset();

    }
  }, [page, handleReset])


  const handleClickDetail = (item) => {
    navigate(`/colection/${item.target.alt}`)
  }

  const handlePageChange = (event, pageNumber) => {
    setCurrentPage(pageNumber);

  };

  const startIndex = (currentPage - 1) * so_luong;
  const endIndex = startIndex + so_luong;


  const renderProductList = () => {
    console.log('show display', productCategory)
    if (display == 1 || display == 2 || display == 3) {
      return productCategory.slice(startIndex, endIndex).map((product, index) => (
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
      ))

    }
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
