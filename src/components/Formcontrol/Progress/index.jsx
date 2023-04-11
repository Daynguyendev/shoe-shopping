import * as React from 'react';
import CircularProgress from '@mui/material/CircularProgress';
import Box from '@mui/material/Box';

export default function CircularIndeterminate() {
    return (
        <Box sx={{ display: 'flex', justifyContent: 'center', minHeight: '560px', alignItems: 'center' }}>
            <CircularProgress />
            <p style={{ color: 'white' }}>Server chậm khoảng 40s</p>
        </Box>
    );
}