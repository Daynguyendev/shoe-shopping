import * as React from 'react';
import Box from '@mui/material/Box';
import { useState, useEffect } from 'react';
import userAPI from '../../../../API/userAPI';
import tableIcons from '../MaterialTableControl';
import MaterialTable from 'material-table';
import detailinvoiceoutputAPI from '../../../../API/detailinvoiceoutputAPI';
import DatePicker from "react-multi-date-picker";
import Button from '@mui/material/Button';
import {
    BarChart,
    Bar,
    XAxis,
    YAxis,
    CartesianGrid,
    Legend,
    Tooltip,
} from "recharts";
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

    const [productAll, setProductAll] = useState([]);
    const [year, setYear] = useState([]);
    const [month, setMonth] = useState(null);
    const [day, setDay] = useState(null);
    const [everyYear, setEveryYear] = useState(false);
    const [quantitySell, setQuantitySell] = useState(false);
    const [inventory, setInventory] = useState(false);





    useEffect(() => {
        try {
            const fetchProductAll = async () => {
                if (productAll !== null) {
                    const result = await detailinvoiceoutputAPI.getAllItem({ bill_year: year, bill_month: month, bill_day: day, bill_everyYear: everyYear });
                    setProductAll(result.data);
                }
            };
            fetchProductAll();
        } catch (error) {
            console.log('Failed to fetch Customer: ', error);
        }
    }, [year, month, day]);

    console.log('productAll', productAll)

    const newData = productAll.map(obj => {
        return {
            ...obj,
            ngay_lap_hd_dat: parseInt(obj.ngay_lap_hd_dat?.slice(8, 10)) + 1
        };
    });

    console.log('test', newData);

    const [userDetailStatistical, setUserDetailStatistical] = useState([]);

    useEffect(() => {
        try {
            const fetchCustomerDetail = async () => {
                if (userDetailStatistical !== null) {
                    const result = await userAPI.getSale();
                    setUserDetailStatistical(result.data.data);
                }
            };
            fetchCustomerDetail();
        } catch (error) {
            console.log('Failed to fetch Customer: ', error);
        }
    }, []);

    console.log('Customer', userDetailStatistical)



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
    console.log('tesst', userDetail)

    const handleYear = (year) => {
        setDay(null);
        setMonth(null);
        setYear(year);
        setEveryYear(false);
        setInventory(false);

    }

    const handleEveryYear = () => {
        setDay(null);
        setMonth(null);
        setYear(null);
        setEveryYear(!everyYear);
        setInventory(false);

    }

    const handleQuantitySell = () => {
        setDay(null);
        setMonth(null);
        setYear(null);
        setEveryYear(false);
        setQuantitySell(!quantitySell)
        setInventory(false);

    }

    const handleInventory = () => {
        setDay(null);
        setMonth(null);
        setYear(null);
        setEveryYear(false);
        setQuantitySell(false);
        setInventory(!inventory);

    }
    const handleMonth = (month, year) => {
        setDay(null);
        setMonth(month);
        setYear(year);
        setEveryYear(false);
        setInventory(false);

    }
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
            <h1>THỐNG KÊ THEO</h1>


            <div style={{ display: 'flex', justifyContent: 'center' }}>

                <div style={{ margin: '50px' }}>
                    <h3>DOANH THU THEO THÁNG</h3>
                    <DatePicker
                        onlyMonthPicker
                        onChange={(e) => handleMonth(e.month.number, e.year)}
                    />
                </div>
                <div style={{ margin: '50px' }}>
                    <h3>DOANH THU THEO NĂM</h3>
                    <DatePicker
                        onlyYearPicker
                        onChange={(e) => handleYear(e.year)}
                    />
                </div>

                <div style={{ margin: '50px' }}>

                    <h3>DOANH THU HÀNG NĂM</h3>
                    <Button variant="outlined" onClick={() => handleEveryYear()}>
                        Xem
                    </Button>
                </div>

                <div style={{ margin: '50px' }}>
                    <h3>SỐ LƯỢNG BÁN</h3>
                    <Button variant="outlined" onClick={() => handleQuantitySell()}>
                        Xem
                    </Button>

                </div>
                <div style={{ margin: '50px' }}>
                    <h3>TỒN KHO</h3>
                    <Button variant="outlined" onClick={() => handleInventory()}>
                        Xem
                    </Button>

                </div>



            </div>

            {day === null && month === null && year === null && everyYear === false && quantitySell === false && inventory === true ? (<>  <BarChart
                width={1500}
                height={500}
                data={userDetail}
                margin={{
                    top: 5,
                    right: 30,
                    left: 20,
                    bottom: 5
                }}
            >
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="id_sp" />
                <YAxis />
                <Tooltip />
                <Legend />
                <Bar dataKey="tong_so_luong_kho" stackId="a" barSize={20} fill="#8884d8" />
            </BarChart></>) : ('')}


            {day === null && month === null && year === null && everyYear === false && quantitySell === true ? (<>  <BarChart
                width={1500}
                height={500}
                data={userDetailStatistical}
                margin={{
                    top: 5,
                    right: 30,
                    left: 20,
                    bottom: 5
                }}
            >
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="ten_sp" />
                <YAxis />
                <Tooltip />
                <Legend />
                <Bar dataKey="tong_so_luong_ban" stackId="a" barSize={20} fill="#8884d8" />
            </BarChart></>) : ('')}



            {day === null && month !== null && year !== null && everyYear === false ? (<> <BarChart
                width={1500}
                height={500}
                data={newData}
                margin={{
                    top: 5,
                    right: 10,
                    left: 30,
                    bottom: 5
                }}
            >

                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="ngay_lap_hd_dat" />
                <YAxis />
                <Tooltip />
                <Legend />
                <Bar dataKey="tong_tien_lai" stackId="a" barSize={20} fill="#8884d8" />
            </BarChart></>) : ('')}


            {day === null && month === null && year !== null && everyYear === false ? (<>
                <BarChart
                    width={1500}
                    height={500}
                    data={newData}
                    margin={{
                        top: 5,
                        right: 10,
                        left: 30,
                        bottom: 5
                    }}
                >

                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis dataKey="thang" />
                    <YAxis />
                    <Legend />
                    <Tooltip />

                    <Bar dataKey="tong_tien_lai" stackId="a" barSize={20} fill="#8884d8" />
                </BarChart></>) : ('')}



            {everyYear === true ? (<><BarChart
                width={1500}
                height={500}
                data={newData}
                margin={{
                    top: 5,
                    right: 10,
                    left: 30,
                    bottom: 5
                }}
            >

                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="nam" />
                <YAxis />
                <Legend />
                <Tooltip />

                <Bar dataKey="tong_tien_lai" stackId="a" barSize={20} fill="#8884d8" />
            </BarChart>
            </>) : ('')}


        </Box >
    );
}

export default Statistical;