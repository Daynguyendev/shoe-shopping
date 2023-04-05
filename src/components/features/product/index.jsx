import React, { useState } from 'react';
import VNPay from 'vnpay-js-sdk';

function VNPayButton() {
    const [amount, setAmount] = useState(100000);
    const [description, setDescription] = useState('Thanh toán đơn hàng');

    const handlePayment = () => {
        const vnpay = new VNPay();

        vnpay.pay({
            amount,
            description,
            returnUrl: 'https://example.com/return',
            transactionId: '123456789',
        });
    };

    return <button onClick={handlePayment}>Thanh toán VNPay</button>;
}

export default VNPayButton;
