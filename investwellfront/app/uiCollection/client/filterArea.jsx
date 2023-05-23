import React, { useEffect } from 'react'
import DropDown from './dropDown.jsx'

function FilterArea(props) {
    return (
        <div className='contentArea'>
            <div className='selectionArea'>
                <label className='labels'>Category:</label>
                <DropDown
                    placeHolder='Search'
                    isSearchable
                    option={props.categoryOption}
                    selected={props.category}
                    setSelected={props.setCategory}
                    clearData={props.clearData}
                />
            </div>
            <div className='selectionArea'>
                <label className='labels'>Scheme:</label>
                <DropDown
                    placeHolder='Search'
                    isSearchable
                    option={props.schemeOption}
                    selected={props.scheme}
                    clearData={props.clearData}
                    setSelected={props.setScheme}
                />
            </div>
            <div className='selectionArea' >
                <input type='button' onClick={() => { props.drillDownData(props.scheme) }} className='goButton' value='GO' />
            </div>
            <div className='schemeList'>
                {props.schemeArr.length > 0 &&
                    <div className='displayList'>
                        <div className='listTitle'>
                            <label>
                                Schemes:
                            </label>
                        </div>
                        <div className='listBox'>
                            {props.schemeArr.map(obj => (
                                <div className='lists'>
                                    <span className='date'>Launch Date: {obj.launchDate}</span>
                                    <li className='list' >
                                        {obj.name} &nbsp;&nbsp;&nbsp;{obj.legend}
                                        <span className='deleteBtn' onClick={() => props.clearData('clearOne', obj)}>X</span>
                                    </li>
                                </div>
                            ))}
                            <button className='clearButton' ><span className='clearText'>Clear All</span><span className='deleteBtn' onClick={() => props.clearData('clearAll', props.schemeArr)}>X</span></button>
                        </div>
                    </div>}
            </div>
            <div className='timePeriodBox'>
                <label className='labels'>Period:</label>
                <DropDown
                    placeHolder='Search'
                    option={props.timePeriodOption}
                    isSearchable
                    selected={props.timePeriod}
                    clearData={props.clearData}
                    setSelected={props.setTimePeriod}
                />
            </div>
            <button className='applyButton' onClick={() => props.matrixData(props.timePeriod && props.timePeriod.value)}>Apply</button>
        </div>
    )
}

export default FilterArea