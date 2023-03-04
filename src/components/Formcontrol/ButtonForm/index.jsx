import React from 'react';
import PropTypes from 'prop-types';
import './Button.scss'
ButtonForm.propTypes = {

};

function ButtonForm({ name, onClick }) {
    return (
        <div>
            <button onClick={onClick} className="custom-btn btn-8"><span>{name}</span></button>
        </div>
    );
}

export default ButtonForm;