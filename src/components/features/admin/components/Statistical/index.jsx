import * as React from 'react';
import Box from '@mui/material/Box';
import { useState, useEffect } from 'react';
import userAPI from '../../../../API/userAPI';
import tableIcons from '../MaterialTableControl';
import MaterialTable from 'material-table';

function Statistical() {
    const [userDetail, setUserDetail] = useState([]);
    const columns = [
        { field: 'id_sp', title: 'ID', width: 10 },
        { field: 'ten_sp', title: 'Tên sản phẩm', width: 130 },
        { field: 'gia_nhap', title: 'Giá nhập vào', width: 130 },
        { field: 'gia_sp', title: 'Giá bán', width: 130 },
        { field: 'ten_mau_sac', title: 'Tên màu sắc', width: 130 },
        { field: 'ten_kich_thuoc', title: 'Tên kích thước', width: 130 },
        { field: 'so_luong', title: 'Số lượng nhập', width: 130 },
        { field: 'so_luong_kho', title: 'Số lượng kho', width: 130 },
        { field: 'so_luong_kho', title: 'Lãi thu được', width: 130, render: rowData => ((rowData.gia_sp - rowData.gia_nhap) * (rowData.so_luong - rowData.so_luong_kho)).toLocaleString('vi-VN', { style: 'currency', currency: 'VND' }) },

    ];
    let total = 0;
    const totalMap = userDetail.map((item, index) => (
        total += ((item.gia_sp - item.gia_nhap) * (item.so_luong - item.so_luong_kho))

    ))
    console.log('tong tien lai', total)

    useEffect(() => {
        try {
            const fetchCustomerDetail = async () => {
                if (userDetail !== null) {
                    const result = await userAPI.getStatistical();
                    setUserDetail(result.data.data);
                }
            };
            fetchCustomerDetail();
        } catch (error) {
            console.log('Failed to fetch Customer: ', error);
        }
    }, []);

    return (
        <Box
            sx={{
                width: 500,
                maxWidth: '100%',
                backgroundColor: 'white',
                minHeight: '550px',
                minWidth: '100%',
                textAlign: 'center',
                alignItems: 'center',
                paddingTop: '50px',
                display: 'list-item'
                , paddingTop: '80px'
            }}
        >
            <h1>THỐNG KÊ</h1>
            <h3>Tổng tiền lãi : {total.toLocaleString('vi-VN', { style: 'currency', currency: 'VND' })}</h3>
            <MaterialTable
                title="Danh sách sản phẩm"
                columns={columns}
                data={userDetail}
                icons={tableIcons}

            />
        </Box >
    );
}

export default Statistical;