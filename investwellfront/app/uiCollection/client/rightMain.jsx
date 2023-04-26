import React from 'react'
import FilterArea from './filterArea.jsx'
import MatrixArea from './matrixArea.jsx'

export default function RightMain(props) {
    return (
        <div className="rightMain">
            <FilterArea {...props} />
            {props.showMatrix?  <MatrixArea 
                schemeArr = {props.schemeArr}
            />:""}
          

        </div>

    )
}