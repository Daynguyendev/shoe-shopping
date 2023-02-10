import React from "react";
import { Box } from '@mui/material';
import './Itemtype.scss';

function Itemtype(props) {
    return (
        <Box >
            <img
                className="imgtype"
                src="https://raw.githubusercontent.com/DayNguyen22022022/images/main/adidas1.jpg"
                alt="itemtype"
            />
        </Box>
    );
}

export default Itemtype;