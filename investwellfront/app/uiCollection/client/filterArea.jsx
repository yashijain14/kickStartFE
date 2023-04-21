import React from 'react'
import DropDown from './dropDown.jsx'
import { useState } from 'react'
// import "/home/shubham/Documents/portfolioCorrelation/kickStartFE/investwellfront/app/media/scss/loader.scss"

export default function FilterArea(props) {
    // const [shubh, setShubh] = useState({})

    const legend = () => {
        props.setCount(props.count+1)
        return "SC" + props.count;
    }

    const tableData = (setSelected) => {
        console.log("return setselected",setSelected)
        setSelected['legend'] = legend()
        props.schemeArr.push(setSelected)
        // const tabadla = props.schemeArr
        console.log("vishal vashisht",props.schemeArr)
        return props.schemeArr
    } 
    

     let abc = props.schemeArr;
  


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
  
                {/* {  console.log("list of schemes:",props.schemeOption) } */}
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
         
            <div className='selectionArea' >
                <input type='button' onClick= { () => tableData(props.scheme)} className='goButton' value='GO' />

            </div>
                            
        
            <div className='schemeList'>
                <div className='displayList'>
                    <div className='listTitle' >
                        <label> 
                            Schemes:
                        </label>
                    </div>
                    


                    { abc.map(obj => ( 
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
                    <button className='clearBtn'>Clear All<span className='deleteBtn'>X</span></button>
                     
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




// import React from 'react'
// import DropDown from './dropDown.jsx'

// export default function FilterArea(props) {

//     const gh = (setSelected) => {
//         // console.log("heello", setSelected)
//         const array = setSelected.name 
        
//         m(array)
//     }
//     const m = (array) => {
//         let ab = array 
//         console.log("hanji ab ", ab)
//         return ab


//         // console.log("hello " ,array )
//         }
//     // const abcd = (array) => {
//     //     console.log("abcd",array)
//     //     return array

//     // }         

//     // const mytable = this.m;    
    
//     return (
//         <div className='contentArea'>
//             <div className='selectionArea'>
//                 <label className='labels'>Category</label>
//                 <DropDown
//                     field='category'
//                     placeHolder='Select'
//                     isSearchable
//                     option={props.categoryOption}
//                     onChange={(value) => console.log(value)}
//                     selected = {props.category}
//                     setSelected = {props.setCategory}
//                 />
//             </div>
//             <div className='selectionArea' onChange={gh(props.scheme)}>
//                 <label className='labels'>Scheme:</label>
  
//                 {/* {  console.log("list of schemes:",props.schemeOption) } */}
//                 <DropDown
//                     field='scheme'
//                     placeHolder='Select'
//                     isSearchable
//                     option={props.schemeOption}
//                     onChange={(value) => console.log(value)}
//                     selected = {props.scheme}
//                     setSelected = {props.setScheme}
//                 />
//             </div>
//             <div className='selectionArea' >
//                 <input type='button' onClick= {m()} className='goButton' value='GO' />

//             </div>

//             <div className='schemeList'>
//                 <span className='date'>Launch Date: {props.currentDate()}</span>
//                 <div className='displayList'>
//                     <div className='listTitle'>
//                         <label >
//                             Schemes:
//                         </label>
//                     </div>
                   


//                     <div className='listBox'>
//                        <li className='list' >
                         
//                          <span> {props.ab}</span> 
//                             <span className='deleteBtn'>X</span>
//                      </li>
//                         <button className='clearBtn'>Clear All<span className='deleteBtn'>X</span></button>
//                     </div>
//                 </div>

//             </div>
//             <div className='timePeriodBox'>
//                 <label className='labels'>Period:</label>
//                 <DropDown
//                     field='timePeriod'
//                     option={props.timePeriodOption}
//                     isSearchable
//                     onChange={(value) => console.log(value)}
//                     selected = {props.timePeriod}
//                     setSelected = {props.setTimePeriod}
//                 />
//             </div>
//             <button className='applyButton'>Apply</button>
//         </div>
//     )
// }