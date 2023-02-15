import React from "react";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import Container from "@mui/material/Container";
import "./Product.scss";
import { useNavigate } from 'react-router-dom';



function Product(props) {
  const navigate = useNavigate();
  const handleClickProduct = () => {
    navigate(`/detail`)

  }


  return (

    <Box className="fullbox" >
      <Box onClick={handleClickProduct}>
        <img
          className="img"
          src="https://raw.githubusercontent.com/DayNguyen22022022/images/main/ULTRABOOST-21-SHOES-20-768x768.jpg"
          alt="anh 1"
        />
        <p className="detail-item">Giay nike</p>
        <p className="detail-item">23000000{'đ'}</p>

      </Box>
    </Box>

  );
}

export default Product;
