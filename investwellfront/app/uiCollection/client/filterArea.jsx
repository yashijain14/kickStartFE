import React from 'react'
import DropDown from './dropDown.jsx'

export default function FilterArea(props) {
    const date=props.launchDate

    const legend = () => {
        props.setCount(props.count + 1)
        return "SC" + props.count
    }

    const tableData = (obj) => {
        obj['legend'] = legend()
        obj['date'] = date
        props.schemeArr.push(obj)

        const index = props.schemeArr[props.count - 1].schid
        props.setSchid(index)
        return props.schemeArr
    }

    let abc = props.schemeArr
    // props.SetObj(abc)

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
                />
            </div>

            <div className='selectionArea'>
                <label className='labels'>Scheme:</label>
                <DropDown
                    field='scheme'
                    placeHolder='Select'
                    isSearchable
                    option={props.schemeOption}
                    selected={props.scheme}
                    setSelected={props.setScheme}
                />
            </div>

            <div className='selectionArea' >
                <input type='button' onClick={() => {tableData(props.scheme)}} className='goButton' value='GO' />

            </div>


            <div className='schemeList'>
                {abc.length > 0 && <div className='displayList'>
                    <div className='listTitle'>
                        <label>
                            Schemes:
                        </label>
                    </div>



                    {abc.map(obj => (
                        <div className='listBox'>
                            <span className='date'>Launch Date: {obj.date}</span>

                            <li className='list' >

                                {obj.name}
                                {" "}
                                {obj.legend}
                                <span className='deleteBtn' >X</span>

                            </li>

                        </div>
                    ))}
                    <button className={abc.length%2==0?'clearBtnEvenList':'clearBtnOddList'} onClick={() => window.location.reload()}>Clear All<span className='deleteBtn'>X</span></button>

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
                />
            </div>
            <button className='applyButton' onClick={() => props.dataValue()}>Apply</button>
        </div>
    )
}