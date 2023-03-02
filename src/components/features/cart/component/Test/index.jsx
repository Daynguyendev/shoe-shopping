import React from 'react';
import Product from "../Product";
import { useState } from "react";
function Test(props) {
    const [cart, setCart] = useState([
        { id: 1, name: "Product 1", price: 10, quantity: 1 },
        { id: 2, name: "Product 2", price: 20, quantity: 2 },
        { id: 3, name: "Product 3", price: 30, quantity: 3 },
    ]);

    const handleIncrease = (id) => {
        const updatedCart = cart.map((item) => {
            if (item.id === id) {
                return {
                    ...item,
                    quantity: item.quantity + 1,
                };
            }
            return item;
        });
        setCart(updatedCart);
    }

    const handleDecrease = (id) => {
        const updatedCart = cart.map((item) => {
            if (item.id === id && item.quantity > 1) {
                return {
                    ...item,
                    quantity: item.quantity - 1,
                };
            }
            return item;
        });
        setCart(updatedCart);
    };

    return (
        <div className="cart" style={{ backgroundColor: 'white', minHeight: '600px' }}>
            <p>heheeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeee</p>
            {cart.map((item) => (
                <Product
                    key={item.id}
                    id={item.id}
                    name={item.name}
                    price={item.price}
                    quantity={item.quantity}
                    onIncrease={handleIncrease}
                    onDecrease={handleDecrease}
                />
            ))}
        </div>
    );
};
export default Test;