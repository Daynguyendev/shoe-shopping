import { useState } from 'react';
import './Counter.scss'
function Counter(props) {
    const [quantity, setQuantity] = useState(props.quantity);

    function handleIncrease() {
        setQuantity(quantity + 1);
        props.onChange(props.productId, quantity + 1);
    }

    function handleDecrease() {
        if (quantity > 1) {
            setQuantity(quantity - 1);
            props.onChange(props.productId, quantity - 1);
        }
    }

    return (
        <div className="tang-giam-so-luong">
            <button
                className="quantity-button"
                data-action="decrease"
                onClick={() => props.handleDecrease()}
            >
                -
            </button>
            <div className="quantity-number">{props.quantity}</div>
            <button
                className="quantity-button"
                data-action="increase"
                onClick={() => props.handleIncrease()}
            >
                +
            </button>
        </div>
    );
}
export default Counter;