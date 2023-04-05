import * as React from 'react';
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import IconButton from '@mui/material/IconButton';
import Typography from '@mui/material/Typography';
import Menu from '@mui/material/Menu';
import Container from '@mui/material/Container';
import Button from '@mui/material/Button';
import MenuItem from '@mui/material/MenuItem';
import { styled, alpha } from '@mui/material/styles';
import InputBase from '@mui/material/InputBase';
import MenuIcon from '@mui/icons-material/Menu';
import SearchIcon from '@mui/icons-material/Search';
import './header.scss'
import ShoppingCartIcon from '@mui/icons-material/ShoppingCart';
import { useNavigate } from 'react-router-dom';
import { useSelector } from 'react-redux';
import userAPI from '../API/userAPI';
import { useState, useEffect, useRef } from 'react';
import ManageAccountsIcon from '@mui/icons-material/ManageAccounts';
import trademarkAPI from '../API/trademarkAPI';
import productAPI from './../API/productAPI';

function Header() {
  const navigate = useNavigate();
  const [idUser, setIdUser] = useState();
  const [tradeMarkAll, setTradeMarkAll] = useState([]);
  const [products, setProducts] = useState([]);
  const [searchResult, setSearchResult] = useState(null);
  const [searchValue, setSearchValue] = useState('');
  const [open, setOpen] = useState(false);
  const listTrademark = [...tradeMarkAll] || [];
  const isLogin = useSelector((state) => state?.user.isLogin);
  let email_khach_hang = useSelector((state) => state?.user?.user?.email_khach_hang);
  const [auto, setAuto] = useState(false);
  const inputRef = useRef(null);

  const [isAdmin, setIsAdmin] = useState(null);
  useEffect(() => {
    try {
      const fetchIdUser = async () => {
        if (isLogin) {
          const res = await userAPI.getAdmin({ email_khach_hang: email_khach_hang });
          if (res !== null) {
            setIsAdmin(true);
          }
        }
      };
      fetchIdUser();
    } catch (error) {
      console.log('Failed to fetch idUser: ', error);
    }
  }, []);
  const handleClick = () => {
    const value = inputRef.current.value;

    if (value != '') {
      navigate(`colections/danh-muc?product_ten=${value}`)
    }

  };
  useEffect(() => {
    try {
      const fetchProduct = async () => {
        if (products !== null) {
          const result = await productAPI.getAll();
          setProducts(result.data.data);
        }
      };
      fetchProduct();
    } catch (error) {
      console.log('Failed to fetch Product: ', error);
    }
  }, []);


  const searchProducts = (keyword) => {
    setOpen(true);
    setAuto(true);
    setSearchValue(keyword);
    if (keyword.length == 0) {
      setOpen(false);
      setAuto(false);
    }
    const filteredProducts = products.filter((product) =>
      (product.ten_sp).toLowerCase().includes(keyword.toLowerCase())
    );
    setSearchResult(filteredProducts);
  };

  const Search = styled('div')(({ theme }) => ({
    position: 'relative',
    borderRadius: theme.shape.borderRadius,
    backgroundColor: alpha(theme.palette.common.white, 0.15),
    '&:hover': {
      backgroundColor: alpha(theme.palette.common.white, 0.25),
    },
    marginLeft: 0,
    width: '33%',
    [theme.breakpoints.up('sm')]: {
      marginLeft: theme.spacing(1),
      width: 'auto',
    },
  }));

  const SearchIconWrapper = styled('div')(({ theme }) => ({
    padding: theme.spacing(0, 2),
    height: '100%',
    position: 'absolute',
    pointerEvents: 'none',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
  }));

  const StyledInputBase = styled(InputBase)(({ theme }) => ({
    color: 'inherit',
    '& .MuiInputBase-input': {
      padding: theme.spacing(1, 1, 1, 0),
      paddingLeft: `calc(1em + ${theme.spacing(4)})`,
      transition: theme.transitions.create('width'),
      width: '100%',
      [theme.breakpoints.up('sm')]: {
        width: '12ch',
        '&:focus': {
          width: '20ch',
        },
      },
    },
  }));


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
      const fetchIdUser = async () => {
        if (isLogin) {
          const res = await userAPI.getID({ email_khach_hang: email_khach_hang });
          setIdUser(res.data.data[0]?.id_khach_hang)
        }
      };
      fetchIdUser();
    } catch (error) {
      console.log('Failed to fetch idUser: ', error);
    }
  }, [isLogin]);

  const handlecClickcart = () => {
    navigate(`/cart/${idUser}/id_sp/id_mau_sac/id_kich_thuoc`)
  }

  const handlecClicklogo = () => {
    navigate(`/`)
  }

  const handlecClickSneaker = (name) => {
    navigate(`/colections/danh-muc`)
  }

  const [anchorEl, setAnchorEl] = useState(null);


  const handleMenu = (event) => {
    if (isLogin) {
      setAnchorEl(event.currentTarget);
    }
    else {
      navigate(`/login`)
    }

  };

  const handleClose = () => {
    setAnchorEl(null);
  };
  const handleLogout = () => {
    localStorage.removeItem('user');
    localStorage.removeItem('token');
    navigate('/');
    handleClose()
    window.location.reload();

  }

  const handlemyBill = () => {
    if (idUser)
      navigate(`/status/${idUser}`);
    handleClose()

  }


  const handleAdmin = () => {
    if (isAdmin)
      navigate(`/admin`);
    handleClose()

  }

  return (
    <AppBar position="static" sx={{ backgroundColor: 'black', position: 'fixed', zIndex: '100' }} >
      <Container disableGutters sx={{ maxWidth: 'xl', zIndex: 20, backgroundColor: 'black' }} >
        <Toolbar disableGutters >
          <Box className='box-img' sx={{ display: { xl: 'block', lg: 'block', md: 'block', sm: 'none', xs: 'none', cursor: 'pointer' } }} onClick={handlecClicklogo}>
            <img src="https://raw.githubusercontent.com/DayNguyen22022022/images/main/logoStore.png" alt="logoStore" style={{ width: '90%' }} />
          </Box>
          <Typography

            variant="h7"
            noWrap
            component="a"
            href="/"
            sx={{
              display: { xs: 'flex', md: 'none' },
              fontWeight: 700,
              marginLeft: '-10px',
              color: 'white',
              textDecoration: 'none',
              paddingLeft: '20px',
              width: '50px'
            }}
          >
            <img src="https://raw.githubusercontent.com/DayNguyen22022022/images/main/logoStore.png" alt="logoStore" style={{ width: '90%' }} />

          </Typography>

          <div style={{ display: 'flex' }}>

            <input className='search' type="search" placeholder="Tìm kiếm…" ref={inputRef} onKeyUp={event => {
              if (event.key === 'Enter') {
                handleClick()
              }
            }
            } />
            < IconButton color="secondary" onClick={handleClick} > <SearchIcon /></IconButton>
            {/* {open && searchResult ? <ProductSearch searchResult={searchResult} setOpen={setOpen} /> : ''
            } */}
          </div>
          <Box sx={{ display: { xs: 'flex', md: 'none' }, }}>
            <IconButton
              size="large"
              aria-label="account of current user"
              aria-controls="menu-appbar"
              aria-haspopup="true"
              onClick={handlecClickSneaker}
              color="inherit"
            >
              <MenuIcon />
            </IconButton>
          </Box>
          <Box sx={{ flexGrow: 1, display: { xs: 'none', md: 'flex' } }}>
            <Button

              onClick={() => handlecClickSneaker()}
              sx={{ color: 'white', display: 'block', fontSize: '15px', fontWeight: 'normal', fontFamily: 'Oswald' }}
            >
              <h3> DANH MỤC </h3>
            </Button>

          </Box>

          <ManageAccountsIcon onClick={handleMenu} sx={{ padding: '10px', cursor: 'pointer', color: 'white' }} ></ManageAccountsIcon>
          <Menu
            id="menu-appbar"
            anchorEl={anchorEl}
            anchorOrigin={{
              vertical: 'top',
              horizontal: 'right',
            }}
            keepMounted
            transformOrigin={{
              vertical: 'top',
              horizontal: 'right',
            }}
            open={Boolean(anchorEl)}
            onClose={handleClose}
            style={{ marginTop: '40px' }}
          >
            <MenuItem disabled><h4>Email: {email_khach_hang}</h4></MenuItem>


            <MenuItem
              onClick={handlemyBill}> <h4>Đơn hàng của tôi</h4></MenuItem>
            {isAdmin ? <MenuItem onClick={handleAdmin}><h4>Quản lý Store</h4></MenuItem> : ''}
            <MenuItem onClick={handleLogout}><h4>Đăng xuất</h4></MenuItem>
          </Menu>

          <Box sx={{ flexGrow: 0, color: 'white', textAlign: 'center', alignItems: 'center', display: 'flex', cursor: 'pointer', fontFamily: 'Oswald' }} onClick={handlecClickcart}>
            <ShoppingCartIcon />
          </Box>
        </Toolbar>
      </Container>
    </AppBar >
  );
}
export default Header;