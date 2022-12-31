import React from 'react';
import Box from '@mui/material/Box';
import { Slide } from 'react-slideshow-image';
import './home.css'
import 'react-slideshow-image/dist/styles.css'
import image from '../images/image'
import ListProduct from './../features/product/component/ListProduct';

function Home(props) {

    return (
        <Box  style={{backgroundSize: 'cover'}}>

        <Slide>

            {
                image.map((image, index) => (
                    <div key={index} className="each-slide-effect" > 
                    <img  src={image.url} key={index} alt={image.title} />
                    </div>
                ))

            }
       
   
    </Slide>
    <ListProduct/>
 
    </Box>


    );
}

export default Home;