import React from "react";
import Box from "@mui/material/Box";
import Grid from "@mui/material/Grid";
import "./Product.scss";
import { Typography } from "@mui/material";



function Product(props) {

    return (

        <Box className="full-box-product">
            <Grid>
                <img
                    className="img"
                    src="https://raw.githubusercontent.com/DayNguyen22022022/images/main/ULTRABOOST-21-SHOES-20-768x768.jpg"
                    alt="anh 1"
                />
                <Typography sx={{ fontFamily: 'Jura' }}>Màu đen, size 41</Typography>

            </Grid>

            <Grid>

                <Typography sx={{ fontFamily: 'Jura' }}>Giày Thể Thao Nam MWC</Typography>


            </Grid>


        </Box >

    );
}

export default Product;
