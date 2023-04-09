import * as React from 'react';
import Box from '@mui/material/Box';
import TextField from '@mui/material/TextField';
import MenuItem from '@mui/material/MenuItem';
import colorAPI from '../../../../API/colorAPI';
import trademarkAPI from './../../../../API/trademarkAPI';
import sizeAPI from './../../../../API/sizeAPI';
import categoryAPI from './../../../../API/categoryAPI';
import { useState, useEffect, useLayoutEffect, useMemo } from 'react';
import Button from '@mui/material/Button';
import { useSearchParams } from 'react-router-dom';
import { Grid } from '@material-ui/core';
import Product from '../Product';
import Breadcrumbs from '@mui/material/Breadcrumbs';
import { useNavigate } from 'react-router-dom';
import { useParams } from 'react-router-dom';
import productAPI from '../../../../API/productAPI';
import { Container } from '@mui/material';
import './Fillter.scss'

export default function Fillter() {
    const [trademarkDetail, setTrademarkDetail] = useState([]);
    const [category, setCategory] = useState([]);
    const [sizeDetail, setSizeDetail] = useState([]);
    const [colorDetail, setColorDetail] = useState([]);

    const [productList, setProductList] = useState([]);
    const [loading, setLoading] = useState(true);
    const [loading1, setLoading1] = useState(1);
    const [promotion, setPromotion] = useState(true);
    const [priceStart, setPriceStart] = useState(0);
    const [priceEnd, setPriceEnd] = useState(0);
    const QueryStringParse = (array) => {
        const query = [...array].reduce((previous, current) => {
            // check urlParams wrong - if wrong set default
            const objKey = current[0];
            if (
                objKey !== '_offset' &&
                objKey !== '_limit' &&
                objKey !== '_page' &&
                objKey !== 'product_priceEnd' &&
                objKey !== 'product_priceStart' &&
                objKey !== 'product_khuyenmai' &&
                objKey !== 'product_thuonghieu' &&
                objKey !== 'product_ten' &&
                objKey !== 'product_loai' &&
                objKey !== 'product_size' &&
                objKey !== 'product_color'
            )
                return {
                    _page: 1,
                };
            // urlParams true convert to Object
            else {
                let objValue;

                if (current[1] === 'true') objValue = true;
                else if (current[1] === 'false') objValue = false;
                else if (isNaN(parseInt(current[1]))) objValue = current[1];
                else objValue = parseInt(current[1]);
                return { ...previous, [objKey]: objValue };
            }
        }, {});
        return query;
    };


    const [pagination, setPagination] = useState({
        page: 1,
        total: 3,
        limit: 3,
    });
    const [filters] = useState({
        _limit: 3,
    });

    const [searchParams, setSearchParams] = useSearchParams(filters);
    // when searchParams change - get queryParams
    const queryParams = useMemo(() => QueryStringParse([...searchParams]), [searchParams]);

    // Call API when queryParams change
    useEffect(() => {
        const fectProduct = async () => {
            try {
                const { data, pagination } = await productAPI.Fillter(queryParams);
                setProductList(data);
                setPagination(pagination);
                console.log('test pagination', pagination);
                console.log('product List', productList);
            } catch (error) {
                console.log('Failed to fetch product list: ', error);
            }
            setLoading(false);
        };
        fectProduct();
    }, [queryParams]);


    const handleSortColor = (newValue) => {
        console.log('test new value', newValue);
        const filters = {
            ...queryParams,
            product_color: newValue,
        };
        setSearchParams(filters);
    };
    const handleSortSize = (newValue) => {
        const filters = {
            ...queryParams,
            product_size: newValue,
        };
        setSearchParams(filters);
    };

    const handleSortCategory = (newValue) => {
        const filters = {
            ...queryParams,
            product_loai: newValue,
        };
        setSearchParams(filters);
    };

    const handleSortPromotion = () => {
        setPromotion(!promotion);
        const filters = {
            ...queryParams,
            product_khuyenmai: promotion,
        };
        setSearchParams(filters);
    };

    const handleSortTrademark = (newValue) => {
        const filters = {
            ...queryParams,
            product_thuonghieu: newValue,
        };
        setSearchParams(filters);
    };

    const handleSortPrice = () => {
        const filters = {
            ...queryParams,
            product_priceStart: priceStart,
            product_priceEnd: priceEnd
        };
        setSearchParams(filters);
    };


    useEffect(() => {
        try {
            const fetchtrademarkDetail = async () => {
                if (trademarkDetail !== null) {
                    const result = await trademarkAPI.get();
                    setTrademarkDetail(result.data.data);
                }
            };
            fetchtrademarkDetail();
        } catch (error) {
            console.log('Failed to fetch trademark: ', error);
        }
    }, []);
    useEffect(() => {
        try {
            const fetchCategorry = async () => {
                if (category !== null) {
                    const result = await categoryAPI.get();
                    setCategory(result.data.data);

                }
            };
            fetchCategorry();
        } catch (error) {
            console.log('Failed to fetch SizeDetail: ', error);
        }
    }, []); useEffect(() => {
        try {
            const fetchSizeDetail = async () => {
                if (sizeDetail !== null) {
                    const result = await sizeAPI.get();
                    setSizeDetail(result.data.data);
                }
            };
            fetchSizeDetail();
        } catch (error) {
            console.log('Failed to fetch SizeDetail: ', error);
        }
    }, []);
    useEffect(() => {
        try {
            const fetchColorDetail = async () => {
                if (colorDetail !== null) {
                    const result = await colorAPI.get();
                    setColorDetail(result.data.data);
                }
            };
            fetchColorDetail();
        } catch (error) {
            console.log('Failed to fetch colorDetail: ', error);
        }
    }, []);


    ///////////////////////////////
    const [tradeMarkAll, setTradeMarkAll] = useState([]);
    const { name } = useParams();
    const navigate = useNavigate();
    const [page, setPage] = useState(null);
    const [product, setProduct] = useState([]);
    const [productCategory, setProductCategory] = useState([]);
    const [display, setDisplay] = useState(null);
    const [productDefault, setProductDefault] = useState([]);

    const handleClickDetail = (item) => {
        navigate(`/colections/${item}`)
        setPage(1);
        setDisplay(item);
    }
    const handleHome = () => {
        navigate('/');
    }

    function onResetData() {
        setPage(null);
    }


    const [testFillter, setTestFillter] = useState();


    useEffect(() => {
        try {
            const fetchProduct = async () => {
                if (testFillter !== null) {
                    const result = await productAPI.Fillter();
                    setTestFillter(result.data);
                    setPage(result.data[0].total_count)
                }
            };
            fetchProduct();
        } catch (error) {
            console.log('Failed to fetch testFillter: ', error);
        }
    }, []);

    console.log('Failed to fetch testFillter: ', testFillter);

    useEffect(() => {
        try {
            const fetchProduct = async () => {
                if (category !== null) {
                    const result = await categoryAPI.get();
                    setCategory(result.data.data);
                }
            };
            fetchProduct();
        } catch (error) {
            console.log('Failed to fetch category: ', error);
        }
    }, []);

    useEffect(() => {
        try {
            const fetchProduct = async () => {
                if (tradeMarkAll !== null) {
                    const result = await trademarkAPI.get();
                    setTradeMarkAll(result.data.data);
                }
            };
            fetchProduct();
        } catch (error) {
            console.log('Failed to fetch Product: ', error);
        }
    }, []);
    useEffect(() => {
        try {
            const fetchProduct = async () => {
                if (product !== null) {
                    const result = await productAPI.getName(name);
                    setProduct(result.data.data);
                }
            };
            fetchProduct();
        } catch (error) {
            console.log('Failed to fetch Product: ', error);
        }
    }, [name]);

    useEffect(() => {
        try {
            const fetchProduct = async () => {
                if (productDefault !== null) {
                    const result = await productAPI.getAll();
                    if (name == 'danh-muc') {
                        setProductDefault(result.data.data);
                    }
                    else {
                        const filteredProducts = await result.data.data.filter((product) =>
                            (product.ten_sp.replace(/\s+/g, '-')).toLowerCase().includes(name.toLowerCase())
                        );
                        setProductDefault(filteredProducts);

                    }
                }
            };
            fetchProduct();
        } catch (error) {
            console.log('Failed to fetch productDefault: ', error);
        }
    }, [name]);

    useEffect(() => {
        try {
            const fetchProduct = async () => {
                if (productCategory !== null) {
                    const result = await productAPI.getCategory(name);
                    setProductCategory(result.data.data);
                }
            };
            fetchProduct();
        } catch (error) {
            console.log('Failed to fetch productCategory: ', error);
        }
    }, [name]);
    const handlePaginationChange = (e, page) => {
        const filters = {
            ...queryParams,
            _page: page,
        };
        console.log('Filters: ', filters);
        setSearchParams(filters);
    };



    return (
        <Box>
            <Breadcrumbs aria-label="breadcrumb" style={{ backgroundColor: 'white', padding: '5px' }}>
                <p style={{ cursor: 'pointer', fontSize: '21px', fontFamily: 'Oswald' }} onClick={handleHome}>Trang chủ </p>
                <p style={{ cursor: 'pointer', fontSize: '21px', fontFamily: 'Oswald' }}  >{name} </p>
            </Breadcrumbs>

            <Grid item xs={12} className='overview' >

                <Grid item xs={3} className='danh-muc' >


                    <h3 style={{ color: 'red' }}>BỘ LỌC</h3>
                    <p>Màu</p>
                    <TextField
                        className='Textfile-Fillter'
                        select
                        value={queryParams?.product_color || ''}
                        sx={{ marginTop: '-10px' }}

                        onChange={(e) => handleSortColor(e.target.value)}
                        size="small"
                    >
                        <MenuItem value={null}>
                            Không
                        </MenuItem>
                        {colorDetail.map((option, index) => (
                            <MenuItem key={index} value={option.id_mau_sac}>
                                {option.ten_mau_sac}
                            </MenuItem>
                        ))}
                    </TextField>
                    <p>Kích thước</p>
                    <TextField
                        sx={{ marginTop: '-10px' }}

                        select
                        value={queryParams?.product_size || ''}
                        onChange={(e) => handleSortSize(e.target.value)}
                        className='Textfile-Fillter'


                        size="small"
                    >
                        <MenuItem value={null}>
                            Không
                        </MenuItem>
                        {sizeDetail.map((option, index) => (
                            <MenuItem key={index} value={option.id_kich_thuoc}>
                                {option.ten_kich_thuoc}
                            </MenuItem>
                        ))}
                    </TextField>
                    <p>Loại</p>
                    <TextField
                        sx={{ marginTop: '-10px' }}

                        size="small"
                        onChange={(e) => handleSortCategory(e.target.value)}
                        value={queryParams?.product_loai || ''}
                        select
                        className='Textfile-Fillter'



                    >
                        <MenuItem value={null}>
                            Không
                        </MenuItem>
                        {category.map((option, index) => (
                            <MenuItem key={index} value={option.id_loai_sp}>
                                {option.ten_loai_sp}
                            </MenuItem>
                        ))}

                    </TextField>
                    <p>Thương hiệu</p>
                    <TextField
                        sx={{ marginTop: '-10px' }}

                        size="small"
                        select
                        onChange={(e) => handleSortTrademark(e.target.value)}
                        value={queryParams?.product_thuonghieu || ''}
                        className='Textfile-Fillter'


                    >
                        <MenuItem value={null}>
                            Không
                        </MenuItem>
                        {trademarkDetail.map((option, index) => (
                            <MenuItem key={index} value={option.id_thuong_hieu}>
                                {option.ten_thuong_hieu}
                            </MenuItem>
                        ))}

                    </TextField>
                    <p>Theo giá</p>

                    <TextField className='Textfile-Fillter'
                        sx={{ marginTop: '-10px' }}

                        onChange={(e) => setPriceStart(e.target.value)}

                        size="small" multiline label="Giá từ" />
                    <br />
                    <br />
                    <TextField className='Textfile-Fillter'
                        sx={{ marginTop: '-10px' }}

                        onChange={(e) => setPriceEnd(e.target.value)}
                        size="small" multiline label="Đến" />
                    <br />
                    <Button size="small" className='Textfile-Fillter'
                        sx={{ marginTop: '10px' }}
                        variant="contained" onClick={(e) => handleSortPrice()} >
                        Lọc
                    </Button>

                    <p>Khuyến mãi</p>
                    <Button className='Textfile-Fillter'

                        size="small" variant="contained" onClick={(e) => handleSortPromotion()} sx={{ marginBottom: '10px', marginTop: '-10px' }}>
                        Sale
                    </Button>
                </Grid>

                <Grid container className='product' >
                    <Product xs={12} sm={6} md={4} lg={4} xl={4} productDefault={productList} display={display} value5={5} so_luong={3} productView={product} productCategory={productCategory} newcolor="white" colortext="black" page1={pagination} handlePaginationChange={handlePaginationChange} />
                </Grid>

            </Grid>





        </Box>
    );
}