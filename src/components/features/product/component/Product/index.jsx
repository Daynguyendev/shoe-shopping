import React from "react";
import PropTypes from "prop-types";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import "./Product.scss";



function Product(props) {

  return (

    <Box minHeight="198px">
      <img
        className="img"
        src="https://raw.githubusercontent.com/DayNguyen22022022/images/main/ULTRABOOST-21-SHOES-20-768x768.jpg"
        alt="anh 1"
      />
      <Typography variant="h6">Giay nike</Typography>
      <Typography variant="h6">23000000</Typography>
    </Box>

  );
}

export default Product;
