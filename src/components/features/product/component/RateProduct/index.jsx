import * as React from 'react';
import Rating from '@mui/material/Rating';
import Grid from '@mui/material/Grid';
import StarIcon from '@mui/icons-material/Star';
import { Typography } from '@mui/material';
import './RateProduct.scss';
import { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import Pagination from '@mui/material/Pagination';
import Stack from '@mui/material/Stack';

export default function RateProduct({ rate }) {
    const rateList = [...rate] || [];
    const [currentPage, setCurrentPage] = useState(1);
    const handlePageChange = (event, pageNumber) => {
        setCurrentPage(pageNumber);
    };
    const startIndex = (currentPage - 1) * 3;
    const endIndex = startIndex + 3;
    const renderRateList = () => {
        return rateList.slice(startIndex, endIndex).map((item, index) => (
            <Grid key={index}>
                <h3>Khách hàng: {item.ten_khach_hang}</h3>
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
        ));
    };

    return (
        <Grid
            item xs={12}
            sx={{
                minHeight: '400px',
                backgroundColor: 'white',
                paddingTop: '20px',
            }}
        >
            {renderRateList()}
            <Stack spacing={2} sx={{ textAlign: 'center', alignItems: 'center' }}>
                <Pagination
                    count={Math.ceil(rateList.length / 3)}
                    page={currentPage}
                    onChange={handlePageChange}
                    shape="rounded"
                />
            </Stack>
        </Grid>
    );
}
