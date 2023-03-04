import * as React from 'react';
import Rating from '@mui/material/Rating';
import Box from '@mui/material/Box';
import Grid from '@mui/material/Grid';
import StarIcon from '@mui/icons-material/Star';
import { Typography } from '@mui/material';
import './RateProduct.scss';
import { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';

const labels = {
    0.5: 'Useless',
    1: 'Useless+',
    1.5: 'Poor',
    2: 'Poor+',
    2.5: 'Ok',
    3: 'Ok+',
    3.5: 'Good',
    4: 'Good+',
    4.5: 'Excellent',
    5: 'Excellent+',
};

function getLabelText(value) {
    return `${value} Star${value !== 1 ? 's' : ''}, ${labels[value]}`;
}

export default function RateProduct({ rate }) {
    const { id } = useParams();
    const [value, setValue] = useState(2);
    const [hover, setHover] = useState(-1);
    const rateList = [...rate] || [];

    return (
        <Grid item xs={12}
            sx={{
                minHeight: '400px',

                backgroundColor: 'white',
                paddingTop: '20px',
            }}
        >
            {rateList.map((item, index) => (
                <Grid key={index} >
                    <h3>Khách hàng: {item.ten_nguoi_danh_gia}</h3>
                    <Rating
                        name="text-feedback"
                        value={item.so_sao_danh_gia}
                        readOnly
                        precision={0.5}
                        emptyIcon={<StarIcon style={{ opacity: 0.55 }} fontSize="inherit" />}
                    />

                    <Typography>Nội dung đánh giá: {item.noi_dung} </Typography>

                    <h2>Hình ảnh đánh giá:</h2>
                    <img className="img" src={item.hinh_anh_danh_gia} alt={index} />

                    <hr />
                </Grid>


            ))}


        </Grid>
    );
}