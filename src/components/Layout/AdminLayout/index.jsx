import * as React from 'react';
import Box from '@mui/material/Box';
import { styled, ThemeProvider, createTheme } from '@mui/material/styles';
import Divider from '@mui/material/Divider';
import List from '@mui/material/List';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';
import Paper from '@mui/material/Paper';
import KeyboardArrowDown from '@mui/icons-material/KeyboardArrowDown';
import Dns from '@mui/icons-material/Dns';
import { useNavigate } from 'react-router-dom';

export default function CustomizedList() {
    const [open, setOpen] = React.useState(true);
    const navigate = useNavigate();

    const data = [
        { icon: <Dns />, label: 'Quản lý loại', handle: 'category' },
        { icon: <Dns />, label: 'Quản lý màu sắc', handle: 'color' },
        { icon: <Dns />, label: 'Quản lý kích thước', handle: 'size' },
        { icon: <Dns />, label: 'Quản lý thương hiệu', handle: 'trademark' },
        { icon: <Dns />, label: 'Quản lý sản phẩm', handle: 'product' },
        { icon: <Dns />, label: 'Quản lý khuyến mãi', handle: 'promotion' },
        { icon: <Dns />, label: 'Quản lý hình ảnh chi tiết', handle: 'image' },
        { icon: <Dns />, label: 'Quản lý hóa đơn nhập', handle: 'invoice' },
        { icon: <Dns />, label: 'Quản lý nhà cung cấp', handle: 'provider' },
        { icon: <Dns />, label: 'Quản lý nhà hóa đơn đặt', handle: 'accept' },
        { icon: <Dns />, label: 'Quản lý trạng thái', handle: 'accept' },
        { icon: <Dns />, label: 'Quản lý phương thức thanh toán', handle: 'accept' },




    ];


    const handleClick = (item) => {
        navigate(`/admin/${item}`)

    }

    const FireNav = styled(List)({
        '& .MuiListItemButton-root': {
            paddingLeft: 24,
            paddingRight: 24,
        },
        '& .MuiListItemIcon-root': {
            minWidth: 0,
            marginRight: 16,
        },
        '& .MuiSvgIcon-root': {
            fontSize: 20,
        },
    });

    return (
        <Box sx={{ display: 'flex' }}>
            <ThemeProvider
                theme={createTheme({
                    components: {
                        MuiListItemButton: {
                            defaultProps: {
                                disableTouchRipple: true,
                            },
                        },
                    },
                    palette: {
                        mode: 'dark',
                        primary: { main: 'rgb(102, 157, 246)' },
                        background: { paper: 'rgb(5, 30, 52)' },
                    },
                })}
            >
                <Paper elevation={0} sx={{ maxWidth: '100%' }}>
                    <FireNav component="nav" disablePadding>
                        <ListItemButton >
                            <ListItemIcon sx={{ fontSize: 20 }}>🔥</ListItemIcon>
                            <ListItemText
                                sx={{ my: 0 }}
                                primary="Quản Lý Store"
                                primaryTypographyProps={{
                                    fontSize: 20,
                                    fontWeight: 'medium',
                                    letterSpacing: 0,
                                }}
                            />
                        </ListItemButton>
                        <Divider />

                        <Divider />
                        <Box
                            sx={{
                                bgcolor: open ? 'rgba(71, 98, 130, 0.2)' : null,
                                pb: open ? 2 : 0,
                            }}
                        >
                            <ListItemButton
                                alignItems="flex-start"
                                onClick={() => setOpen(!open)}
                                sx={{
                                    px: 3,
                                    pt: 2.5,
                                    pb: open ? 0 : 2.5,
                                    '&:hover, &:focus': { '& svg': { opacity: open ? 1 : 0 } },
                                }}
                            >
                                <ListItemText
                                    primary="Danh mục quản lý"
                                    primaryTypographyProps={{
                                        fontSize: 15,
                                        fontWeight: 'medium',
                                        lineHeight: '20px',
                                        mb: '2px',
                                    }}
                                    secondary="Authentication, Firestore Database, Realtime Database, Storage, Hosting, Functions, and Machine Learning"
                                    secondaryTypographyProps={{
                                        noWrap: true,
                                        fontSize: 12,
                                        lineHeight: '16px',
                                        color: open ? 'rgba(0,0,0,0)' : 'rgba(255,255,255,0.5)',
                                    }}
                                    sx={{ my: 0 }}
                                />
                                <KeyboardArrowDown
                                    sx={{
                                        mr: -1,
                                        opacity: 0,
                                        transform: open ? 'rotate(-180deg)' : 'rotate(0)',
                                        transition: '0.2s',
                                    }}
                                />
                            </ListItemButton>
                            {open &&
                                data.map((item) => (
                                    <ListItemButton
                                        key={item.label}
                                        sx={{ py: 0, minHeight: 32, color: 'rgba(255,255,255,.8)' }}
                                        onClick={() => handleClick(item.handle)}
                                    >
                                        <ListItemIcon sx={{ color: 'inherit' }}>
                                            {item.icon}
                                        </ListItemIcon>
                                        <ListItemText
                                            primary={item.label}
                                            primaryTypographyProps={{ fontSize: 14, fontWeight: 'medium' }}
                                        />
                                    </ListItemButton>
                                ))}
                        </Box>
                    </FireNav>
                </Paper>
            </ThemeProvider>
        </Box>
    );
}