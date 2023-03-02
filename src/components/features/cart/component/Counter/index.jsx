


function Counter({ value, onIncrease, onDecrease }) {
    const handleIncrease = () => {
        onIncrease();
    };

    const handleDecrease = () => {
        onDecrease();
    };

    return (
        <div className="counter">
            <button className="counter__button" onClick={handleDecrease}>
                -
            </button>
            <input className="counter__input" type="text" value={value} readOnly />
            <button className="counter__button" onClick={handleIncrease}>
                +
            </button>
        </div>
    );
};
export default Counter;