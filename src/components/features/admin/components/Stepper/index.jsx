import React from 'react';
import PropTypes from 'prop-types';
import DatePicker from "react-multi-date-picker"
import DatePanel from "react-multi-date-picker/plugins/date_panel"
Stepper.propTypes = {

};

function Stepper(props) {
    return (
        <div>
            <DatePicker
                multiple
                plugins={[
                    <DatePanel />
                ]}
            />

        </div>
    );
}

export default Stepper;