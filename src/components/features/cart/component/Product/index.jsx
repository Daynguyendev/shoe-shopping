import React from 'react';
import Button from '@mui/material/Button';

function Product({ count, setCount, item }) {
    const handleIncrease = () => {
        setCount(prevCount => prevCount + 1);
    };

    const handleDecrease = () => {
        if (count > 1) {
            setCount(prevCount => prevCount - 1);
        }
    };

    return (
        <div>
            <Button onClick={handleDecrease} style={{ minWidth: '0' }}>
                -
            </Button>
            <input
                className='counter__input'
                type='number'
                style={{ width: '30px' }}
                value={count}
                onChange={e => setCount(parseInt(e.target.value))}
            />
            <Button onClick={handleIncrease} style={{ minWidth: '0' }}>
                +
            </Button>
        </div>
    );
}

export default Product;