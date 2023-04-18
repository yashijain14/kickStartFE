import React from 'react'
import FilterArea from './filterArea.jsx'
import MatrixArea from './matrixArea.jsx'

export default function RightMain(props) {
    return (
        <div className="rightMain">
            <FilterArea 
                currentDate={props.currentDate}
                categoryOption={props.categoryOption} 
                timePeriodOption={props.timePeriodOption} 
                schemeOption={props.schemeOption}
                category={props.category}
                setCategory={props.setCategory}
                timePeriod={props.timePeriod} setTimePeriod={props.setTimePeriod}
                setSchemeOption={props.setCategory}
                scheme = {props.scheme}
                setScheme = {props.setScheme}
            />
            <MatrixArea />
        </div>
    )
}
