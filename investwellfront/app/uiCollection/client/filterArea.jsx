import React from 'react'
import DropDown from './dropDown.jsx'

export default function FilterArea(props) {

    const legend = () => {
        props.setCount(props.count + 1)
        return "SC" + props.count;
    }

    const tableData = (obj) => {
        obj['legend'] = legend()
        props.schemeArr.push(obj)

        const index = props.schemeArr[props.count-1].schid
        console.log('vvvvvvvvvvvvv',index)
        props.setSchid(index)
        return props.schemeArr
    }

    let abc = props.schemeArr;
console.log("props data",props.LaunchDate)
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
                    // onChange={(value) => console.log(value)}
                    selected={props.scheme}
                    setSelected={props.setScheme}
                />
            </div>

            <div className='selectionArea' >
                <input type='button' onClick={() => tableData(props.scheme)} className='goButton' value='GO' />

            </div>


            <div className='schemeList'>
                <div className='displayList'>
                    <div>
                        {abc.length > 0 && <label>
                            Schemes:
                        </label>}
                    </div>



                    {abc.map(obj => (
                        <div className='listBox'>
                            <span className='date'>Launch Date: {props.LaunchDate}</span>

                            <li className='list' >

                                {obj.name}
                                {" "}
                                {obj.legend}
                                <span className='deleteBtn' >X</span>

                            </li>

                        </div>
                    ))}
                    <span>
                        {abc.length > 0 && <button className='clearBtn'>Clear All<span className='deleteBtn'>X</span></button>}
                    </span>


                </div>

            </div>
            <div className='timePeriodBox'>
                <label className='labels'>Period:</label>
                <DropDown
                    field='timePeriod'
                    option={props.timePeriodOption}
                    isSearchable
                    onChange={(value) => console.log(value)}
                    selected={props.timePeriod}
                    setSelected={props.setTimePeriod}
                />
            </div>
            <button className='applyButton' onClick={() => { props.setShowMatrix(true) }}>Apply</button>
        </div>
    )
}