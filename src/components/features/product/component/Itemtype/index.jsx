import React from "react";
import { Box } from '@mui/material';
import './Itemtype.scss';
import LazyLoad from "react-lazyload";
function Itemtype(props) {
    return (
        <Box >
            <Box className="box">
                <img
                    className="img-type"
                    src="https://raw.githubusercontent.com/DayNguyen22022022/images/main/adidas1.jpg"
                    alt="item-type"
                />

            </Box>
        </Box>

    );
}

export default Itemtype;