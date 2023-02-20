import * as React from 'react';
import './ImageDetail.scss'
import { Carousel } from 'react-responsive-carousel';
import "react-responsive-carousel/lib/styles/carousel.min.css";
import imageAPI from '../../API/imageAPI';
import { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';



export default function ImageDetail() {
    let { id } = useParams();
    const [imageDetail, setImagedetail] = useState([]);
    useEffect(() => {
        try {
            const fetchImagedetail = async () => {
                if (imageDetail !== null) {
                    const listImg = await imageAPI.get(id);
                    setImagedetail(listImg.data.data);
                    // console.log('img', listImg.data.data)
                }
            };
            fetchImagedetail();
        } catch (error) {
            console.log('Failed to fetch Imagedetail: ', error);
        }
    }, []);


    return (
        <Carousel className='img-list' autoPlay={true} infiniteLoop={true}>
            {
                imageDetail.map((item, index) => (
                    <div key={index}>

                        <img src={item.link_hinh_anh_ct} alt={index} />

                    </div>
                ))
            }
        </Carousel>
    );
}
