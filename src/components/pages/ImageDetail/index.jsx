import * as React from 'react';
import PropTypes from 'prop-types';
import Tabs from '@mui/material/Tabs';
import Tab from '@mui/material/Tab';
import Typography from '@mui/material/Typography';
import Box from '@mui/material/Box';
import Grid from '@mui/material/Grid';
import './ImageDetail.scss'
import { Carousel } from 'react-responsive-carousel';
import "react-responsive-carousel/lib/styles/carousel.min.css";

export default function ImageDetail() {
    const [value, setValue] = React.useState(0);

    const handleChange = (event, newValue) => {
        setValue(newValue);
    };

    return (

        <Carousel className='img-list'>
            <div >
                <img src="https://raw.githubusercontent.com/DayNguyen22022022/images/main/ULTRABOOST-21-SHOES-20-768x768.jpg" />
            </div>
            <div>
                <img src="https://raw.githubusercontent.com/DayNguyen22022022/images/main/ULTRABOOST-21-SHOES-20-768x768.jpg" />
            </div>
            <div>
                <img src="https://raw.githubusercontent.com/DayNguyen22022022/images/main/ULTRABOOST-21-SHOES-20-768x768.jpg" />
            </div>
            <div>
                <img src="https://raw.githubusercontent.com/DayNguyen22022022/images/main/ULTRABOOST-21-SHOES-20-768x768.jpg" />
            </div>
            <div>
                <img src="https://raw.githubusercontent.com/DayNguyen22022022/images/main/ULTRABOOST-21-SHOES-20-768x768.jpg" />
            </div>
            <div>
                <img src="https://raw.githubusercontent.com/DayNguyen22022022/images/main/ULTRABOOST-21-SHOES-20-768x768.jpg" />
            </div>
        </Carousel>
    );
}