import React from "react";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import "./Product.scss";
import { useNavigate } from 'react-router-dom';
import { useState, useEffect } from 'react';
import { Grid } from '@material-ui/core';
import LazyLoad from 'react-lazyload';
import Pagination from '@mui/material/Pagination';


function Product({ xs, sm, md, lg, xl, so_luong, product, productCategory, display, newcolor, colortext, page, handleReset, Sale, value1, value2 }) {
  const navigate = useNavigate();
  const [currentPage, setCurrentPage] = useState(1);
  const now = new Date();
  const mysqlDateString = now.toISOString().slice(0, 19).replace('T', ' ');
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

    if (display == 1 || display == 2 || display == 3) {
      return productCategory.slice(startIndex, endIndex).map((product, index) => (
        <Grid item xs={xs} sm={sm} md={md} lg={lg} xl={xl} key={product.id_sp}   >
          <Box className="fullbox" style={{ backgroundColor: newcolor }}  >
            <LazyLoad throttle={300} height={393} className="fade-in">
              <img onClick={handleClickDetail}
                className="img"
                src={product.hinh_anh_chinh}
                alt={product.id_sp}
              />
              {mysqlDateString >= product.ngay_bat_dau && mysqlDateString <= product.ngay_ket_thuc ? (<div className="detail-item" style={{ display: 'flex', justifyContent: 'center' }}>
                <p className="detail-item" style={{ fontFamily: 'Oswald', marginRight: '10px', textDecoration: 'line-through', color: colortext }} >{product.gia_sp.toLocaleString('vi-VN', { style: 'currency', currency: 'VND' })}</p>

                <p className="detail-item" style={{ color: 'red' }}>{(product.gia_sp - (product.phan_tram_giam / 100 * product.gia_sp)).toLocaleString('vi-VN', { style: 'currency', currency: 'VND' })}</p>


              </div>

              ) : (<div className="detail-item" style={{ display: 'flex', justifyContent: 'center', color: colortext }}><p sx={{ fontFamily: 'Oswald' }} >{product.gia_sp.toLocaleString('vi-VN', { style: 'currency', currency: 'VND' })}</p></div>
              )}
            </LazyLoad>
          </Box>
        </Grid>
      ))

    }
    console.log('salele', Sale)
    if (value2 = 2 && Sale) {
      return Sale.slice(startIndex, endIndex).map((product, index) => (
        <Grid item xs={xs} sm={sm} md={md} lg={lg} xl={xl} key={product.id_sp}   >
          <Box className="fullbox" style={{ backgroundColor: newcolor }}  >
            <LazyLoad throttle={300} height={393} className="fade-in">
              <img onClick={handleClickDetail}
                className="img"
                src={product.hinh_anh_chinh}
                alt={product.id_sp}
              />

              <p className="detail-item" style={{ color: colortext }}>{product.ten_sp.replace(/-+/g, ' ')}</p>
              {mysqlDateString >= product.ngay_bat_dau && mysqlDateString <= product.ngay_ket_thuc ? (<div className="detail-item" style={{ display: 'flex', justifyContent: 'center' }}>
                <p className="detail-item" style={{ fontFamily: 'Oswald', marginRight: '10px', textDecoration: 'line-through', }} >{product.gia_sp.toLocaleString('vi-VN', { style: 'currency', currency: 'VND' })}</p>

                <p className="detail-item" style={{ color: 'red' }}>{(product.gia_sp - (product.phan_tram_giam / 100 * product.gia_sp)).toLocaleString('vi-VN', { style: 'currency', currency: 'VND' })}</p>


              </div>

              ) : (<div className="detail-item" style={{ display: 'flex', justifyContent: 'center' }}><p sx={{ fontFamily: 'Oswald' }} >{product.gia_sp.toLocaleString('vi-VN', { style: 'currency', currency: 'VND' })}</p></div>
              )}

            </LazyLoad>
          </Box>
        </Grid>
      ))

    }
    if (value1 = 1 && product) {
      console.log('vai pro duct', product)
      return product.slice(startIndex, endIndex).map((product, index) => (
        <Grid item xs={xs} sm={sm} md={md} lg={lg} xl={xl} key={product.id_sp}   >
          <Box className="fullbox" style={{ backgroundColor: newcolor }}  >
            <LazyLoad throttle={300} height={393} className="fade-in">
              <img onClick={handleClickDetail}
                className="img"
                src={product.hinh_anh_chinh}
                alt={product.id_sp}
              />
              <p className="detail-item" style={{ color: colortext }}>{product.ten_sp.replace(/-+/g, ' ')}</p>
              {mysqlDateString >= product.ngay_bat_dau && mysqlDateString <= product.ngay_ket_thuc ? (<div className="detail-item" style={{ display: 'flex', justifyContent: 'center' }}>
                <p className="detail-item" style={{ fontFamily: 'Oswald', marginRight: '10px', textDecoration: 'line-through', color: colortext }} >{product.gia_sp.toLocaleString('vi-VN', { style: 'currency', currency: 'VND' })}</p>

                <p className="detail-item" style={{ color: 'red' }}>{(product.gia_sp - (product.phan_tram_giam / 100 * product.gia_sp)).toLocaleString('vi-VN', { style: 'currency', currency: 'VND' })}</p>


              </div>

              ) : (<div className="detail-item" style={{ display: 'flex', justifyContent: 'center', color: colortext }}><p sx={{ fontFamily: 'Oswald' }} >{product.gia_sp.toLocaleString('vi-VN', { style: 'currency', currency: 'VND' })}</p></div>
              )}
            </LazyLoad>
          </Box>
        </Grid>
      ));

    }

  };

  return (

    <>
      {renderProductList()}
      <Pagination
        count={product ? Math.ceil(product?.length / 8) : 0}
        page={currentPage}
        onChange={handlePageChange}
        color="primary"
        sx={{ width: '100%', display: 'flex', justifyContent: 'center', marginBottom: '20px' }}
      />
    </>
  );
}

export default Product;
