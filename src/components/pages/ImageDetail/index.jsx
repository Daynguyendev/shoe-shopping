import * as React from 'react';
import './ImageDetail.scss'
import { Carousel } from 'react-responsive-carousel';
import "react-responsive-carousel/lib/styles/carousel.min.css";
import imageAPI from '../../API/imageAPI';
import { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';

export default function ImageDetail({ colorAdd }) {
    let { id } = useParams();
    const [imageDetail, setImagedetail] = useState([]);
    const [imageDisplay, setImageDisplay] = useState(imageDetail);

    console.log('test anh hien thi', imageDetail);
    useEffect(() => {
        try {
            const fetchImagedetail = async () => {
                if (imageDetail !== null) {
                    const listImg = await imageAPI.get(id);
                    setImagedetail(listImg.data.data);
                }
            };
            fetchImagedetail();
        } catch (error) {
            console.log('Failed to fetch Imagedetail: ', error);
        }
    }, []);


    useEffect(() => {
        if (colorAdd !== undefined) {
            const product = imageDetail.filter((p) => p.ten_mau_sac === colorAdd);
            const list = [...product]
            setImageDisplay(list);
            console.log('test product', product)
        }
    }, [colorAdd])




    return (
        <Carousel className='img-list' >

            {
                imageDisplay.length === 0 ? (imageDetail.map((item, index) => (
                    <div key={item.id_mau_sac} >
                        <img className='imgdetail' src={item.link_hinh_anh_ct} alt={index} />
                    </div>
                ))) : (imageDisplay.map((item, index) => (
                    <div key={item.id_mau_sac} >
                        <img className='imgdetail' src={item.link_hinh_anh_ct} alt={index} />
                    </div>
                )))
            }
        </Carousel >
    );
}
