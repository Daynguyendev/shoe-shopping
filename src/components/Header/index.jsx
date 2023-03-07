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
import { useState, useEffect } from 'react';
import ManageAccountsIcon from '@mui/icons-material/ManageAccounts';
import trademarkAPI from '../API/trademarkAPI';
import productAPI from './../API/productAPI';
import ProductSearch from '../features/product/component/ProductSearch';
function Header() {
  const navigate = useNavigate();
  const [idUser, setIdUser] = useState();
  const [tradeMarkAll, setTradeMarkAll] = useState([]);
  const [anchorElNav, setAnchorElNav] = useState(null);
  const [anchorElUser, setAnchorElUser] = useState(null);
  const [products, setProducts] = useState([]);
  const [searchResult, setSearchResult] = useState(null);
  const [searchValue, setSearchValue] = useState('');
  const [open, setOpen] = useState(false);

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
    setSearchValue(keyword);
    if (keyword.length == 0) {
      setOpen(false);
    }
    const filteredProducts = products.filter((product) =>
      product.ten_sp.includes(keyword)
    );
    console.log('Filtered Products: ', filteredProducts);
    setSearchResult(filteredProducts);
  };



  const listTrademark = [...tradeMarkAll] || [];
  let email_khach_hang = useSelector((state) => state?.user?.user?.email_khach_hang);
  const isLogin = useSelector((state) => state?.user.isLogin);

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
      // vertical padding + font size from searchIcon
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

  const handleOpenNavMenu = (event) => {
    setAnchorElNav(event.currentTarget);
  };

  const handleOpenUserMenu = (event) => {
    setAnchorElUser(event.currentTarget);
  };

  const handleCloseNavMenu = () => {
    setAnchorElNav(null);
  };

  const handleCloseUserMenu = () => {
    setAnchorElUser(null);
  };

  const handlecClickcart = () => {
    navigate(`/cart/${idUser}/id_sp/ten_mau_sac/ten_kich_thuoc`)
    window.location.reload();
  }

  const handlecClicklogo = () => {
    navigate(`/`)
  }

  const handlecClickSneaker = () => {
    navigate(`/colections/Nike`)
    window.location.reload()
  }

  const handleAccount = () => {
    navigate(`/account`)
  }

  return (
    <AppBar position="static" sx={{ backgroundColor: 'black' }} >
      <Container disableGutters sx={{ maxWidth: 'xl', zIndex: 20, backgroundColor: 'black' }} >
        <Toolbar disableGutters >
          <Box className='box-img' sx={{ display: { xl: 'block', lg: 'block', md: 'none', sm: 'none', xs: 'none', cursor: 'pointer' } }} onClick={handlecClicklogo}>
            <img src="https://raw.githubusercontent.com/DayNguyen22022022/images/main/logoStore.png" alt="logoStore" style={{ width: '90%' }} />

          </Box>


          <Box sx={{ flexGrow: 1, display: { xs: 'flex', md: 'none' } }}>
            <IconButton
              size="large"
              aria-label="account of current user"
              aria-controls="menu-appbar"
              aria-haspopup="true"
              onClick={handleOpenNavMenu}
              color="inherit"
            >
              <MenuIcon />
            </IconButton>



            {/* ///// */}
            <Menu
              id="menu-appbar"
              anchorEl={anchorElNav}
              anchorOrigin={{
                vertical: 'bottom',
                horizontal: 'left',
              }}
              keepMounted
              transformOrigin={{
                vertical: 'top',
                horizontal: 'left',
              }}
              open={Boolean(anchorElNav)}
              onClose={handleCloseNavMenu}
              sx={{
                display: { xs: 'block', md: 'none', xl: 'none' },
              }}
            >
              {listTrademark.map((item, index) => (
                <MenuItem key={index} sx={{ width: '350px' }} onClick={() => handlecClickSneaker(item.ten_thuong_hieu)}>
                  <h3>{item.ten_thuong_hieu}</h3>
                </MenuItem>
              ))}
            </Menu>
            {/* ///////// */}
          </Box>
          <Search>
            <SearchIconWrapper>
              <SearchIcon />
            </SearchIconWrapper>
            <StyledInputBase
              placeholder="Search…"
              inputProps={{
                'aria-label': 'search',
                onChange: (e) => searchProducts(e.target.value)
              }}
              value={searchValue}
              autoFocus

              sx={{ fontFamily: 'Jura' }}
            />
            {open && searchResult ? <ProductSearch searchResult={searchResult} setOpen={setOpen} /> : ''


            }
          </Search>
          <Typography

            variant="h7"
            noWrap
            component="a"
            href="/"
            sx={{
              mr: 2,
              display: { xs: 'flex', md: 'none' },
              flexGrow: 1,
              fontWeight: 700,
              marginLeft: '-10px',
              color: 'inherit',
              textDecoration: 'none',
              paddingLeft: '20px'
            }}
          >
            HN STORE

          </Typography>


          <Box sx={{ flexGrow: 1, display: { xs: 'none', md: 'flex' } }}>

            <Button

              onClick={() => handlecClickSneaker()}
              sx={{ color: 'white', display: 'block', fontSize: '15px', fontWeight: 'normal', fontFamily: 'Jura' }}
            >
              <h3> SNEAKER </h3>
            </Button>

          </Box>

          <ManageAccountsIcon onClick={handleAccount} sx={{ padding: '10px', cursor: 'pointer' }} ></ManageAccountsIcon>

          <Box sx={{ flexGrow: 0, color: 'white', textAlign: 'center', alignItems: 'center', display: 'flex', cursor: 'pointer', fontFamily: 'Jura' }} onClick={handlecClickcart}>
            <ShoppingCartIcon />


            <Menu
              sx={{ mt: '45px' }}
              id="menu-appbar"
              anchorEl={anchorElUser}
              anchorOrigin={{
                vertical: 'top',
                horizontal: 'right',
              }}
              keepMounted
              transformOrigin={{
                vertical: 'top',
                horizontal: 'right',
              }}
              open={Boolean(anchorElUser)}
              onClose={handleCloseUserMenu}
            >
            </Menu>

          </Box>
        </Toolbar>
      </Container>
    </AppBar >
  );
}
export default Header;