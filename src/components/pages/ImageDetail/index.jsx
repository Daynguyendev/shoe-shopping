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
import imageAPI from '../../API/imageAPI';
import { useState, useEffect } from 'react';
import axios from 'axios';
import { useParams } from 'react-router-dom';
import { useNavigate } from 'react-router-dom';



export default function ImageDetail() {
    let { id } = useParams();
    console.log(id);
    const navigate = useNavigate();
    // const handleClickProduct = () => {
    //     navigate(`/detail`)

    // }

    // const handleClickDetail = (item) => {
    //     // console.log(item.target.alt);
    //     navigate(`/product/${item.target.alt}`)

    // }
    const [imagedetail, setImagedetail] = useState([]);
    useEffect(() => {
        try {
            const fetchImagedetail = async () => {
                if (imagedetail !== null) {
                    const listImg = await imageAPI.get(id);
                    setImagedetail(listImg.data.data);
                    console.log('img', listImg.data.data)
                }
            };
            fetchImagedetail();
        } catch (error) {
            console.log('Failed to fetch Imagedetail: ', error);
        }
    }, []);


    return (
        <Carousel className='img-list' >
            {
                imagedetail.map((item, index) => (
                    <div key={index}>

                        <img src={item.link_hinh_anh_ct} alt={index} />

                    </div>
                ))
            }
        </Carousel>
    );
}
