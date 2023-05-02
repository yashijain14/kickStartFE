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

  const clearData = (field, data) => {
    switch (field) {
      case 'clearOne':
        setCount(1)
        const index = schemeArr.findIndex((item) => item.schid === data.schid)
        schemeArr.splice(index, 1)
        for (let i = 0; i < schemeArr.length; i++) {
          schemeArr[i].legend = "SC" + (i + 1)
          setCount(count - 1)
        }
        break
      case 'clearAll':
        setCount(1)
        schemeArr.splice(0,)
        break
      default:
    }
  }
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
        else {
          if (response.data.result == "Scheme ID doesn't exist") {
            alert('Invalid Scheme!')
            setScheme('')
          }
          else {
            const newObj = { ...obj, launchDate: response.data && response.data.result, legend: `SC${count}` }
            let updatedSchemeArray = Array.from(schemeArr)
            updatedSchemeArray.push(newObj)
            setSchemeArray(updatedSchemeArray)
            setCount(count + 1)
            setScheme('')
            setShowMatrix(false)
          }
        }
      })
      .catch(error => {
        console.log("error", error)
      })
  }
  const matrixData = () => {
    if (!(schemeArr.length > 1 && timePeriod.value > 1)) {
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
          // schemeArr.splice(0,)
          setCategory('')
          setScheme('')
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
      <div className={showMatrix ? 'sideNavWithMatrix' : 'sideNav'}></div>
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
        count={count}
        setCount={setCount}
        clearData={clearData}
      />
    </div>
  )
}
