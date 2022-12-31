import * as React from 'react';
import PropTypes from 'prop-types';
import './footer.scss';
import Box from '@mui/material/Box';
import Container from '@mui/material/Container';



function Footer(props) {
    return (
        <React.Fragment>
             <Box
      sx={{
        width: "100%",
        height: '80px',
        '&:hover': {
         
          opacity: [0.9, 0.8, 0.7],
        },
      }}
      className="root"
    > 
   
        
        </Box>
      
      </React.Fragment>
    );
}

export default Footer;