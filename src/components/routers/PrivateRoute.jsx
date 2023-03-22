import React from 'react';
import { Outlet } from 'react-router-dom';
import { useState, useEffect } from 'react';
import { useSelector } from 'react-redux';
import userAPI from '../API/userAPI';
import SignIn from '../features/account/SignIn';
import AdminLayout from '../Layout/AdminLayout'
import Header from '../Header'

function PrivateRoute() {
    const [isAdmin, setIsAdmin] = useState(null);
    const isLogin = useSelector((state) => state?.user.isLogin);
    let email_khach_hang = useSelector((state) => state?.user?.user?.email_khach_hang);
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

    if (!isLogin) {
        return (<SignIn />)

    }


    if (isAdmin) {
        return (
            <>
                <Header />
                < AdminLayout />

                <Outlet >

                </Outlet>
            </>






        )
    }
    else {
        return (<h2 style={{ paddingTop: '100px' }}> Đang kiểm tra! Nếu không phải tài khoản quản trị sẽ không được chuyển hướng </h2>)
    }



}

export default PrivateRoute;
