import * as React from 'react';
import Box from '@mui/material/Box';
import Grid from '@mui/material/Grid';
import Stepper from '@mui/material/Stepper';
import Step from '@mui/material/Step';
import StepLabel from '@mui/material/StepLabel';
import statusAPI from '../../../../API/statusAPI';
import { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';

export default function StatusNew() {
    const { id_khach_hang } = useParams();
    const { id_hd_dat } = useParams()
    const [status, setStatus] = useState();
    const [statusAll, setStatusAll] = useState([]);
    const statusList = status || [];
    const statusAllList = statusAll || [];
    useEffect(() => {
        try {
            const fetchCart = async () => {
                if (status !== null) {
                    const result = await statusAPI.getStatusNew(id_khach_hang, id_hd_dat);
                    setStatus(result.data.data);
                }
            };
            fetchCart();
        } catch (error) {
            console.log('Failed to fetch status: ', error);
        }
    }, []);

    useEffect(() => {
        try {
            const fetchCart = async () => {
                if (statusAll !== null) {
                    const result = await statusAPI.getAll();
                    setStatusAll(result.data.data);
                }
            };
            fetchCart();
        } catch (error) {
            console.log('Failed to fetch statusAll: ', error);
        }
    }, []);
    return (
        <Box sx={{ width: '100%', minHeight: '550px', backgroundColor: 'white', paddingTop: '80px' }}>
            {
                statusList.map((item, index) => (
                    <Grid key={index} sx={{ padding: '20px' }}>
                        <Grid sx={{ fontFamily: 'Oswald', fontSize: '20px' }} >
                            ID hóa đơn : {item.id_hd_dat}
                        </Grid>
                        <Grid sx={{ fontFamily: 'Oswald', fontSize: '20px' }} >
                            Ngày lập hóa đơn: {item.ngay_lap_hd_dat}
                        </Grid>
                        <Grid sx={{ paddingBottom: '30px', fontFamily: 'Oswald', fontSize: '20px' }}>
                            Tổng tiền: {item.tong_tien}
                        </Grid >
                        < Stepper activeStep={item.id_trang_thai} alternativeLabel  >
                            {
                                statusAllList.map((item, index) => (
                                    <Step key={item.id_trang_thai}>
                                        <StepLabel

                                        >{item.ten_trang_thai}</StepLabel>
                                    </Step>
                                ))
                            }
                        </Stepper>
                    </Grid>))
            }
        </Box >
    );
}
