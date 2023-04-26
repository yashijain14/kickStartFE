import React from 'react'
// import LeftSideTable from './leftSideTable.jsx'
import BottomTable from './bottomTable.jsx'
import CorrelationMatrix from './correlationMatrix.jsx'
// import BottomTable from ''

export default function MatrixArea(props){
    return(
        <div className="matrixArea">
            {/* <LeftSideTable
                schemeArr = {props.schemeArr}
            
            /> */}
            <CorrelationMatrix/>
            
            <BottomTable/>
        </div>
    )
}