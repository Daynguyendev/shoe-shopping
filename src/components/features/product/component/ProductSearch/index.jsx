import React from 'react';
import PropTypes from 'prop-types';
import './ProductSearch.scss'
import { Grid } from '@mui/material';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemText from '@mui/material/ListItemText';
import ListSubheader from '@mui/material/ListSubheader';
import { useNavigate } from 'react-router-dom';
ProductSearch.propTypes = {

};

function ProductSearch({ searchResult, setOpen }) {
    const navigate = useNavigate();
    const handleClickDetail = (item) => {
        navigate(`/colection/${item.target.alt}`)
        window.location.reload();
    }
    return (
        <Grid className='Search'>
            <List
                sx={{
                    width: '100%',
                    maxWidth: 360,
                    position: 'relative',
                    overflow: 'auto',
                    maxHeight: 300,
                    '& ul': { padding: 0 },
                }}

            >

                {
                    searchResult.map((item, index) => (
                        <Grid key={index} item xs={12} style={{ display: 'flex', alignItems: 'center' }}>
                            <Grid item xs={4}>{item.ten_sp}</Grid>
                            <Grid item xs={4}>{item.gia_sp}</Grid>
                            <Grid item xs={4}>
                                <img onClick={handleClickDetail} style={{ width: '60px', height: '60px' }} src={item.hinh_anh_chinh} alt={item.id_hinh_anh} />

                            </Grid>

                        </Grid>
                    ))
                }
            </List>
        </Grid>


    );
}

export default ProductSearch;