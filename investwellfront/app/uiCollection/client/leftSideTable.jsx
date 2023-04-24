import React from 'react'

export default function LeftSideTable(props){
    return(
        <div className='leftSideTable'>
            {props.schemeArr && props.schemeArr.map(
                (tableData,index)=>{
                   return <div>{tableData.name && tableData.name}</div>
                }
            )}
        </div>

    )
}