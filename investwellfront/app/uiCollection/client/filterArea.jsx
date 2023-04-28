import React from 'react'
import DropDown from './dropDown.jsx'

export default function FilterArea(props) {
    console.log("scheme arr:",props.schemeArr)
    return (
        <div className='contentArea'>
            <div className='selectionArea'>
                <label className='labels'>Category</label>
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
                <input type='button' onClick={() => {props.tableData(props.scheme)}}  className='goButton' value='GO' />

            </div>


            {/* <div className='schemeList'>
                {props.schemeArr.length > 0 && <div className='displayList'>
                    <div className='listTitle'>
                        <label>
                            Schemes:
                        </label>
                    </div>



                    {props.schemeArr.map(obj => (
                        <div className='listBox'>
                           <span className='date'>Launch Date: {obj.launchDate}</span>

                            <li className='list' >

                                {obj.name}
                                {" "}
                                {obj.legend}
                                <span className='deleteBtn' >X</span>

                            </li>

                        </div>
                    ))}
                    <button className={props.schemeArr.length%2==0?'clearBtnEvenList':'clearBtnOddList'} onClick={() => window.location.reload()}>Clear All<span className='deleteBtn'>X</span></button>

                </div>}

            </div> */}
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
                                        <span className='deleteBtn' onClick={() => clearData('clearOne', obj)}>X</span>

                                    </li>

                                </div>
                            ))}
                            <button className='clearButton' onClick={() => window.location.reload()}>Clear All<span className='deleteBtn' onClick={() => clearData('clearAll', abc)}>X</span></button>

                        </div>
                    </div>}

            </div>
            <div className='timePeriodBox'>
                <label className='labels'>Period:</label>
                <DropDown
                    // isSelected={props.isSelected}
                    field='timePeriod'
                    placeHolder='Select'
                    option={props.timePeriodOption}
                    isSearchable
                    // check={props.category}
                    selected={props.timePeriod}
                    setSelected={props.setTimePeriod}
                    check={true}
                />
            </div>
            
            <button className='applyButton' onClick={() => props.ApplyButton(props.timeperiod && props.timePeriod.value)}>Apply</button>
        </div>
    )
}