import React from 'react';
import PropTypes from 'prop-types';
import DatePicker from "react-multi-date-picker"
import DatePanel from "react-multi-date-picker/plugins/date_panel"
Chart.propTypes = {

};

function Chart(props) {
    return (
        <div>
            <DatePicker
                onlyYearPicker
                multiple
                sort
                plugins={[
                    <DatePanel />
                ]}
            />

        </div>
    );
}

export default Chart;