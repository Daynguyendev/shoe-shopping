import React from "react";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import "./Product.scss";



function Product(props) {

  return (

    <Box >
      <img
        className="img"
        src="https://raw.githubusercontent.com/DayNguyen22022022/images/main/ULTRABOOST-21-SHOES-20-768x768.jpg"
        alt="anh 1"
      />
      <div className="detail-item">
        <p>Giay nike</p>
        <p>23000000{'đ'}</p>
      </div>

    </Box>

  );
}

export default Product;
