import React, { useEffect } from 'react'
import DropDown from './dropDown.jsx'

function FilterArea(props) {
    return (
        <div className='contentArea'>
            <div className='selectionArea'>
                <label className='labels'>Category:</label>
                <DropDown
                    field='category'
                    placeHolder='Select'
                    isSearchable
                    option={props.categoryOption}
                    selected={props.category}
                    setSelected={props.setCategory}
                    check={true}
                />
            </div>
            <div className='selectionArea'>
                <label className='labels'>Scheme:</label>
                <DropDown
                    field='scheme'
                    placeHolder='Select'
                    isSearchable
                    option={props.schemeOption}
                    check={props.category}
                    selected={props.scheme}
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
                    field='timePeriod'
                    placeHolder='Select'
                    option={props.timePeriodOption}
                    isSearchable
                    selected={props.timePeriod}
                    setSelected={props.setTimePeriod}
                    check={true}
                />
            </div>
            <button className='applyButton' onClick={() => props.matrixData(props.timePeriod && props.timePeriod.value)}>Apply</button>
        </div>
    )
}

export default FilterArea