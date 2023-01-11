import * as React from 'react';
import Box from '@mui/material/Box';
import Grid from '@mui/material/Grid';
import Typography from '@mui/material/Typography';

import Container from '@mui/material/Container';


export default function InforAccount() {

    return (

        <Container component="main" maxWidth="lg">
            <Box sx={{
                marginTop: '68px',
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center',
                backgroundColor: 'yellow'
            }}>
                <Grid container spacing={2}>
                    <Grid item xs={8}>


                        <Grid item xs={12}>
                            <Typography variant="h6">
                                Infor
                            </Typography>
                        </Grid>

                    </Grid>
                    <Grid item xs={4}>

                    </Grid>
                    <Grid item xs={4}>
                    </Grid>
                    <Grid item xs={8}>
                    </Grid>
                </Grid>
            </Box>
        </Container>

    );
}