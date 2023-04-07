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
import SpeechRecognition, { useSpeechRecognition } from 'react-speech-recognition'
import MicNoneIcon from '@mui/icons-material/MicNone';



function Header() {
  const navigate = useNavigate();
  const [idUser, setIdUser] = useState();
  const [tradeMarkAll, setTradeMarkAll] = useState([]);
  const [products, setProducts] = useState([]);
  const listTrademark = [...tradeMarkAll] || [];
  const isLogin = useSelector((state) => state?.user.isLogin);
  let email_khach_hang = useSelector((state) => state?.user?.user?.email_khach_hang);
  const inputRef = useRef(null);
  const [isAdmin, setIsAdmin] = useState(null);
  const [searchValue, setSearchValue] = useState('');
  // Hàm xử lý sự kiện onChange để cập nhật giá trị của input
  const handleSearchInputChange = event => {
    setSearchValue(event.target.value);
  }

  const { transcript, resetTranscript } = useSpeechRecognition()

  if (!SpeechRecognition.browserSupportsSpeechRecognition()) {
    console.log('không hỗ trợ thư viện')
  }

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
    console.log('value', value);

    if (value != '') {
      navigate(`colections/danh-muc?product_ten=${value}`)
    }

  };
  const [start, setStart] = useState(true);

  const handleVoice = () => {
    setStart(!start)

    if (start === true) {
      SpeechRecognition.startListening();

    }
    SpeechRecognition.stopListening();

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

  useEffect(() => {
    if (transcript) {
      setSearchValue('')
      setSearchValue(transcript);
    }
  }, [transcript]);




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
            {transcript.length >= 1 ? (<>
              <input className='search' type="search" placeholder="Tìm kiếm…" ref={inputRef} value={searchValue}
                autoFocus
                onChange={handleSearchInputChange}
                onKeyUp={event => {
                  if (event.key === 'Enter') {
                    handleClick()
                  }
                }}
              />
            </>) : (<>
              <input className='search' type="search" placeholder="Tìm kiếm…" ref={inputRef}
                onChange={handleSearchInputChange}
                onKeyUp={event => {
                  if (event.key === 'Enter') {
                    handleClick()
                  }
                }}
              />
            </>)}

            {/* <input className='search' type="search" placeholder="Tìm kiếm…" ref={inputRef} onKeyUp={event => {
              if (event.key === 'Enter') {
                handleClick()
              }
            }
            } /> */}
            < IconButton color="secondary" onClick={handleVoice} > <MicNoneIcon /></IconButton>
            < IconButton color="secondary" onClick={handleClick} > <SearchIcon /></IconButton>

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