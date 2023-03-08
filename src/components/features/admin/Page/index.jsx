import React from 'react';
import UploadImage from '../components/UploadImage';
import UploadProduct from '../components/UploadProduct';
import Box from '@mui/material/Box';

function Page(props) {
    return (
        <Box>
            <UploadImage />
            <UploadProduct />
        </Box>
    );
}
export default Page;