import React from 'react';
import PropTypes from 'prop-types';

NotFound.propTypes = {

};

function NotFound(props) {
    return (
        <div style={{ backgroundColor: 'white', minHeight: '600px', textAlign: 'center', paddingTop: '50px', color: 'red' }}>
            <h1>404 NotFound</h1>

        </div>
    );
}

export default NotFound;