import React from 'react'
import DropDown from './dropDown.jsx'

export default function FilterArea(props) {
    return (
        <div className='contentArea'>
            <div className='selectionArea'>
                <label className='labels'>Category</label>
                <DropDown
                    field='category'
                    placeHolder='Select'
                    isSearchable
                    option={props.categoryOption}
                    onChange={(value) => console.log(value)}
                    selected = {props.category}
                    setSelected = {props.setCategory}
                />
            </div>
            <div className='selectionArea'>
                <label className='labels'>Scheme:</label>
  
                {  console.log("list of schemes:",props.schemeOption) }
                <DropDown
                    field='scheme'
                    placeHolder='Select'
                    isSearchable
                    option={props.schemeOption}
                    onChange={(value) => console.log(value)}
                    selected = {props.scheme}
                    setSelected = {props.setScheme}
                />
            </div>
            <div className='selectionArea'>
                <input type='button' className='goButton' value='GO' />
            </div>

            <div className='schemeList'>
                <span className='date'>Launch Date: {props.currentDate()}</span>
                <div className='displayList'>
                    <div className='listTitle'>
                        <label >
                            Schemes:
                        </label>
                    </div>
                    <div className='listBox'>
                        <li className='list'>
                            <span className='deleteBtn'>X</span>
                        </li>
                        <button className='clearBtn'>Clear All<span className='deleteBtn'>X</span></button>
                    </div>
                </div>

            </div>
            <div className='timePeriodBox'>
                <label className='labels'>Period:</label>
                <DropDown
                    field='timePeriod'
                    option={props.timePeriodOption}
                    isSearchable
                    onChange={(value) => console.log(value)}
                    selected = {props.timePeriod}
                    setSelected = {props.setTimePeriod}
                />
            </div>
            <button className='applyButton'>Apply</button>
        </div>
    )
}