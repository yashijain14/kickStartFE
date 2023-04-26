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
  const [launchDate , setLaunchDate] = useState()
  const [showMatrix, setShowMatrix] = useState(false)
  const [schid, setSchid] = useState()
  const [navData , setNavData] = useState()

  useEffect(() => {
    axios.get("http://localhost:3000/getSchemes", {
      params: {
        category: category && category.value
      }
    })
      .then((response) => {
        setSchemeOption(response.data.result)
      })
      .catch(error => {
        console.log("error", error)
      })
  }, [category])



  useEffect(() => {
    if(schid != undefined){
    axios.get("http://localhost:3000/getLaunchDate", {
      params: {
        schid : schid
      }
    })
      .then((response) => {
        // console.log("atete0", response.data)

        setLaunchDate(response.data.result)
      })
      .catch(error => {
        console.log("error", error)
      })
    }
  }, [schid])



  useEffect(() => {
    axios.get("http://localhost:3000/getNavs", {
      params: {
        schid : {"arr" : [229,1403,1013,706]},
        timePeriod : 12
      }
    })
      .then((response) => {
        console.log("axios of nav",response.data  )
        setNavData(response && response.data.result)
      })
      .catch(error => {
        console.log("error", error)
      })
  }, [schid])

  // console.log()

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
        count = {count}
        setCount = {setCount}
        setLaunchDate = {setLaunchDate}
        launchDate = {launchDate!=undefined && launchDate}
        showMatrix={showMatrix}
        setShowMatrix= {setShowMatrix}
        schid = {schid}
        setSchid= {setSchid}
      />
    </div>
  )
}

