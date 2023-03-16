import * as React from 'react';
import Box from '@mui/material/Box';
import AddCategory from '../AddCategory';
import AddColor from '../AddColor';
import AddDetailImage from '../AddDetailImage';
import AddDiscount from '../AddDiscount';
import AddInvoice from '../AddInvoice';
import AddProvider from '../AddProvider';
import AddTrademark from '../AddTrademark';
import AddSize from '../AddSize';
import UploadProduct from '../UploadProduct';

function AddDetail() {
    return (
        <Box
            sx={{
                width: 500,
                maxWidth: '100%',
                backgroundColor: 'white',
                minHeight: '550px',
                minWidth: '100%',
                textAlign: 'center',
                alignItems: 'center',
                paddingTop: '50px',
                display: 'list-item'
            }}
        >
            {/* <AddSize />
            <AddColor />
            <AddCategory />
            <AddProvider />
            <AddTrademark />
            <AddDiscount />
            <UploadProduct />
            <AddDetailImage />
            <AddInvoice /> */}
        </Box >
    );
}

export default AddDetail;