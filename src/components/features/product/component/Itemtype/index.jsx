import React from "react";
import { Box } from '@mui/material';
import './Itemtype.scss';
import LazyLoad from "react-lazyload";
function Itemtype({ src, alt }) {
    return (
        <Box >
            <Box className="box">
                <img
                    className="img-type"
                    src={src}
                    alt={alt}
                />

            </Box>
        </Box>

    );
}

export default Itemtype;