import React from "react";
import { Box } from '@mui/material';
import './DetailNewHot.scss';

function DetailNewHot({ Background, title, onClick }) {
    return (
        <Box >
            <Box className="imgtype" style={{ backgroundImage: `url(${Background})` }}>
                <Box className="detail" onClick={onClick}>{title.toUpperCase()}</Box>

            </Box>
        </Box >
    );
}

export default DetailNewHot;