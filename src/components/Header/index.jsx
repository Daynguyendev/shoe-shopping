import * as React from 'react';
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import IconButton from '@mui/material/IconButton';
import Typography from '@mui/material/Typography';
import Menu from '@mui/material/Menu';
import Container from '@mui/material/Container';
import Button from '@mui/material/Button';
import Tooltip from '@mui/material/Tooltip';
import MenuItem from '@mui/material/MenuItem';
import { styled, alpha } from '@mui/material/styles';
import InputBase from '@mui/material/InputBase';
import MenuIcon from '@mui/icons-material/Menu';
import SearchIcon from '@mui/icons-material/Search';
import './header.scss'
import Badge from '@mui/material/Badge';
import ShoppingCartIcon from '@mui/icons-material/ShoppingCart';
import { createTheme } from '@mui/material/styles';
import { createSvgIcon } from '@mui/material/utils';
import { useNavigate } from 'react-router-dom';
import { useParams } from 'react-router-dom';
import { useSelector } from 'react-redux';
import userAPI from '../API/userAPI';
import { useState, useEffect } from 'react';
import ManageAccountsIcon from '@mui/icons-material/ManageAccounts';



const pages = ['Sneaker', 'Adidas', 'Nike'];
const settings = ['Thông tin', 'Quản Lý Đơn Hàng', 'Quản Lý Sản Phẩm', 'Đăng Xuất'];

function Header() {

  const theme = createTheme({
    palette: {
      primary: {
        main: '#212121',
      },
      secondary: {
        main: '#212121',
      },
    },
  });

  const StyledBadge = styled(Badge)(({ theme }) => ({
    '& .MuiBadge-badge': {
      right: -3,
      top: 13,
      border: `2px solid ${theme.palette.background.paper}`,
      padding: '0 4px',
    },
  }));

  const navigate = useNavigate();


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

  const [idUser, setIdUser] = useState();
  let email_khach_hang = useSelector((state) => state?.user?.user?.email_khach_hang);
  const isLogin = useSelector((state) => state?.user.isLogin);


  useEffect(() => {

    try {
      const fetchIdUser = async () => {
        // console.log('test_header', email_khach_hang);
        if (isLogin) {
          const res = await userAPI.getID({ email_khach_hang: email_khach_hang });
          setIdUser(res.data.data[0]?.id_khach_hang)

        }

        // console.log('test_head', idUser);



      };
      fetchIdUser();
    } catch (error) {
      console.log('Failed to fetch idUser: ', error);
    }
  }, []);

  const [anchorElNav, setAnchorElNav] = React.useState(null);
  const [anchorElUser, setAnchorElUser] = React.useState(null);

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
              {pages.map((page) => (
                <MenuItem key={page} onClick={handleCloseNavMenu}>
                  <Typography textAlign="center">{page}</Typography>
                </MenuItem>
              ))}
            </Menu>
            {/* ///////// */}
          </Box>
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
            }}
          >
            HN STORE
          </Typography>
          <Search>
            <SearchIconWrapper>
              <SearchIcon />
            </SearchIconWrapper>
            <StyledInputBase
              placeholder="Search…"
              inputProps={{ 'aria-label': 'search' }}
              sx={{ fontFamily: 'Jura' }}
            />
          </Search>
          <Box sx={{ flexGrow: 1, display: { xs: 'none', md: 'flex' } }}>
            {pages.map((page) => (
              <Button
                key={page}
                onClick={handleCloseNavMenu}
                sx={{ color: 'white', display: 'block', fontSize: '15px', fontWeight: 'normal', fontFamily: 'Jura' }}
              >
                <h3> {page}</h3>
              </Button>
            ))}

          </Box>

          <ManageAccountsIcon onClick={handleAccount} sx={{ padding: '10px', cursor: 'pointer' }} ></ManageAccountsIcon>

          <Box sx={{ flexGrow: 0, color: 'white', textAlign: 'center', alignItems: 'center', display: 'flex', cursor: 'pointer', fontFamily: 'Jura' }} onClick={handlecClickcart}>
            <ShoppingCartIcon />

            <Tooltip title="Open settings">

              <IconButton onClick={handleOpenUserMenu} sx={{ p: 0 }}>
                {/* <Avatar alt="Remy Sharp" src="/static/images/avatar/3.jpg" /> */}
              </IconButton>


            </Tooltip>
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
              {settings.map((setting) => (
                <MenuItem key={setting} onClick={handleCloseUserMenu}>
                  <Typography textAlign="center">{setting}</Typography>
                </MenuItem>
              ))}
            </Menu>

          </Box>
        </Toolbar>
      </Container>
    </AppBar >
  );
}
export default Header;