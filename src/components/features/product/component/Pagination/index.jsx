import * as React from 'react';
import Pagination from '@mui/material/Pagination';
import Stack from '@mui/material/Stack';
import './Pagination.scss';
export default function PaginationOutlined() {
    return (
        <Stack spacing={2} className='Pagination' style={{ color: 'white' }}>
            <Pagination count={10} variant="outlined" color="primary" />
        </Stack>
    );
}