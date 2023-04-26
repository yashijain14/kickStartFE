import React, { useEffect, useState } from 'react'
import RightMain from './rightMain.jsx'
import { categoryOption, timePeriodOption } from '../../constants/index.js'
import axios from 'axios'

export default function Index() {


  const [schemeOption, setSchemeOption] = useState()
  const [category, setCategory] = useState(null)
  const [timePeriod, setTimePeriod] = useState(null)
  const [scheme, setScheme] = useState([])
  const [count, setCount] = useState(1)
  const [schemeArr] = useState([])
  const [launchDate, setLaunchDate] = useState()
  const [showMatrix, setShowMatrix] = useState(false)
  const [schid, setSchid] = useState(229)
  const [navData, SetNavData] = useState()
  const [debounce, setDebounce] = useState()



  const dataValue = () => {
    
    let data = []
    setShowMatrix(true)
    schemeArr.map((object) => (
      data.push(object.schid)
    ))
    
    // SetArrayValue(data)

    axios.get("http://localhost:3000/getNavs", {
      params: {
        schid: {'arr': data},
        timePeriod:12
      }
    })
      .then((response) => {

        console.log("****************axios nav", response.data.result)
       let  responseData = response.data.result
         SetNavData(responseData)
      })
      .catch(error => {

        console.log("error", error)
      })
 
    
  }

  // console.log('aaaaaaaaaaaaaaaaaa', arrayValue)

  useEffect(() => {
    let debounceTimer = debounce
    clearTimeout(debounceTimer)
    debounceTimer = setTimeout(() => {
    axios.get("http://localhost:3000/getSchemes", {
      params: {
        category: category && category.value
      }
    })
      .then((response) => {
        if(response.data&& response.data.status==0){
          setSchemeOption(response.data.result)
        }
      })
      .catch(error => {
        console.log("error", error)
      })
    }, 600)
  }, [category])



  useEffect(() => {
    if (schid != undefined) {
      axios.get("http://localhost:3000/getLaunchDate", {
        params: {
          schid: schid
        }
      })
        .then((response) => {
          setLaunchDate(response.data.result)
        })
        .catch(error => {
          console.log("error", error)
        })
    }
 
  }, [schid])



//   useEffect(() => {
//     // if (arrayValue && Object.keys(arrayValue).length !=0) {    
//       console.log('kkkkkkkkkkkk',arrayValue)
//     axios.get("http://localhost:3000/getNavs", {
//       params: {
//         schid: {'arr': arrayValue},
//         timePeriod:12
//       }
//     })
//       .then((response) => {

//         console.log("axios of nav", response.data.result)
//         SetNavData(response && response.data.result)
//       })
//       .catch(error => {

//         console.log("error", error)
//       })

//   // }
// }, [arrayValue])

console.log('***************',navData)

  return (
    <div className='mainBox'>
      <div className='navHeader'></div>
      <div className='logo'></div>

      <div className='sideNav'></div>
      <RightMain
        category={category}
        setSchemeOption={setSchemeOption}
        setCategory={setCategory}
        categoryOption={categoryOption}
        timePeriodOption={timePeriodOption}
        schemeOption={schemeOption}
        timePeriod={timePeriod}
        setTimePeriod={setTimePeriod}
        scheme={scheme}
        setScheme={setScheme}
        schemeArr={schemeArr}
        count={count}
        setCount={setCount}
        setLaunchDate={setLaunchDate}
        launchDate={launchDate != undefined && launchDate}
        showMatrix={showMatrix}
        setShowMatrix={setShowMatrix}
        schid={schid}
        setSchid={setSchid}
        dataValue={dataValue}
        navData={navData}
        // SetNavData={SetNavData}
      />
    </div>
  )
}

