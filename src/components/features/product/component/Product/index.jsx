import React from "react";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import "./Product.scss";
import { useNavigate } from 'react-router-dom';
import { useState, useEffect } from 'react';
import { Grid } from '@material-ui/core';
import LazyLoad from 'react-lazyload';
import Pagination from '@mui/material/Pagination';


function Product({ xs, sm, md, lg, xl, so_luong, pagesale, productDefault, product, BestSaler, value9, handlePaginationChange, productView, productCategory, display, newcolor, colortext, page, page1, handleReset, Sale, value1, value2, value5 }) {
  const navigate = useNavigate();
  const [currentPage, setCurrentPage] = useState(1);
  const now = new Date();
  const mysqlDateString = now.toISOString().slice(0, 19).replace('T', ' ');

  const handleClickDetail = (item) => {
    navigate(`/colection/${item.target.alt}`)
  }

  const handlePageChange = (event, pageNumber) => {
    setCurrentPage(pageNumber);

  };


  const startIndex = (currentPage - 1) * so_luong;
  const endIndex = startIndex + so_luong;

  const renderProductList = () => {

    if (value9 = 9 && BestSaler) {
      return BestSaler.slice(startIndex, endIndex).map((product, index) => (
        <Grid item xs={xs} sm={sm} md={md} lg={lg} xl={xl} key={product.id_sp}   >
          <Box className="fullbox" style={{ backgroundColor: newcolor }}  >
            <LazyLoad throttle={300} height={393} className="fade-in">
              <img onClick={handleClickDetail}
                className="img"
                src={product.hinh_anh_chinh}
                alt={product.id_sp}
              />
              <p className="detail-item" style={{ color: colortext }}>{product.ten_sp.replace(/-+/g, ' ')}</p>
              <p className="detail-item" style={{ color: 'yellow', fontWeight: '600' }}>Đã bán {product.tong_so_luong_ban}</p>

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

    if (value1 = 1 && product) {
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
    if (productDefault && display == null) {

      return productDefault.slice(startIndex, endIndex).map((product, index) => (
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
        count={display == 2 || display == 1 || display == 3 ? Math.ceil(productCategory?.length / 3) : productDefault && display == null ? Math.ceil(page1.total / page1.limit) : value1 ? Math.ceil(product?.length / 8) : value5 ? Math.ceil(productView?.length / 3) : Sale && value2 ? Math.ceil(pagesale.total / 4) : BestSaler && value9 ? Math.ceil(BestSaler?.length / 4) : 5}
        page={productDefault && display == null ? page1.page : Sale && value2 ? pagesale.page : value1 && product ? currentPage : currentPage}
        onChange={value1 && product ? handlePageChange : handlePaginationChange}
        color="primary"
        sx={{ width: '100%', display: 'flex', justifyContent: 'center', marginBottom: '20px' }}
      />
    </>
  );
}

export default Product;
