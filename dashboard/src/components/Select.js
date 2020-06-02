import React, {useEffect, useState} from 'react';
import "react-dates/initialize";
import {DateRangePicker} from "react-dates";
import "react-dates/lib/css/_datepicker.css";
import '../stylesheets/components/Select.css';

function Select(props) {
    const {parentCallback, defaultData} = props;
    const [startDate, setStartDate] = useState(null);
    const [endDate, setEndDate] = useState(null);
    const [focusedInput, setFocusedInput] = useState(null);
    const handleDatesChange = ({startDate, endDate}) => {
        setStartDate(startDate);
        setEndDate(endDate);
        if (startDate && endDate) {
            parentCallback({
                startDate: startDate.format(),
                endDate: endDate.format()
            });
        }
    };

    useEffect(() => {
        if (defaultData) {
            setStartDate(null);
            setEndDate(null);
        }
    }, [defaultData]);

    return (
        <div className="App-select">
            <DateRangePicker
                startDate={startDate}
                startDateId={"tata-start-date"}
                endDate={endDate}
                endDateId={"tata-end-date"}
                onDatesChange={handleDatesChange}
                focusedInput={focusedInput}
                onFocusChange={focusedInput => setFocusedInput(focusedInput)}
                orientation={window.innerWidth <= 768 ? "vertical" : "horizontal"}
                openDirection={"down"}
                noBorder={true}
                small={window.innerWidth <= 414 ? true : false}
                withFullScreenPortal={window.innerWidth <= 768 ? true : false}
                isOutsideRange={() => false}
            />
        </div>
    );
}

export default Select;
