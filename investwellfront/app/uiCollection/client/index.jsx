import React, { useEffect, useState, useRef } from 'react'
import RightMain from './rightMain.jsx'
import { categoryOption, timePeriodOption } from '../../constants/index.js'
import axios from 'axios'

export default function Index() {

  const [schemeOption, setSchemeOption] = useState()
  const [category, setCategory] = useState(null)
  const [timePeriod, setTimePeriod] = useState(null)
  const [scheme, setScheme] = useState([])
  const [count, setCount] = useState(1)
  const [schemeArr, setSchemeArray] = useState([])
  const [showMatrix, setShowMatrix] = useState(false)
  const [navData, SetNavData] = useState()
 
  const drillDownData = (obj) => {

    axios.get("http://localhost:3000/getLaunchDate", {
      params: {
        schid: obj.schid
      }
    })
      .then((response) => {
        if (response.data.status == -1) {
          const newObj = { ...obj, launchDate: '' }
          let updatedSchemeArray = Array.from(schemeArr)
          updatedSchemeArray.push(newObj)
          setSchemeArray(updatedSchemeArray)

        }
        else{
          const newObj = { ...obj, launchDate: response.data && response.data.result, legend: `SC${count}` }
          let updatedSchemeArray = Array.from(schemeArr)
          updatedSchemeArray.push(newObj)
          setSchemeArray(updatedSchemeArray)
          setCount(count+1)
          setScheme('')
        }
      })
      .catch(error => {
        console.log("error", error)
      })
  }

  const matrixData = () => {
    if (!(schemeArr.length > 1)) {
      return
    }
    let data = []
    schemeArr.map((object) => (
      data.push(object.schid)
    ))
      
    axios.get("http://localhost:3000/getNavs", {
      params: {
        schid: { 'arr': data },
        timePeriod: timePeriod && timePeriod.value
      }
    })
      .then((response) => {
        if (response.data.status == -1) {
          alert(response.data.result)

        }
        else {
          setShowMatrix(true)
          let responseData = response.data.result
          SetNavData(responseData)
        }
      })
      .catch(error => {

        console.log("error", error)
      })
  }

  useEffect(() => {
    axios.get("http://localhost:3000/getSchemes", {
      params: {
        category: category && category.value
      }
    })
      .then((response) => {
        if (response.data && response.data.status == 0) {
          setSchemeOption(response.data.result)
        }
      })
      .catch(error => {
        console.log("error", error)
      })
  }, [category])

  return (
    <div className='mainBox'>
      <div className='navHeader'></div>
      <div className='logo'></div>

      <div className={showMatrix?'sideNavWithMatrix':'sideNav'}></div>
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
        showMatrix={showMatrix}
        setShowMatrix={setShowMatrix}
        matrixData={matrixData}
        navData={navData}
        drillDownData={drillDownData}
      
      />
    </div>
  )
}
