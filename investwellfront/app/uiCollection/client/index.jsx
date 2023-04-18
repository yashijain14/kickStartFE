import React, { useEffect, useState } from 'react'
import RightMain from './rightMain.jsx'
import { categoryOption, timePeriodOption } from '../../constants/index.js'
import axios from 'axios'


export default function Index() {
  const [schemeOption, setSchemeOption] = useState()
  const [category, setCategory] = useState(null)
  const [timePeriod, setTimePeriod] = useState(null)
  const [scheme, setScheme] = useState([])

  const currentDate = (separator = '-') => {
    let newDate = new Date()
    let date = newDate.getDate()
    let month = newDate.getMonth() + 1
    let year = newDate.getFullYear()
    return `${date}${separator}${month < 10 ? `0${month}` : `${month}`}${separator}${year}`
  }

  useEffect(()=>{
    axios.get("http://localhost:3000/getSchemes",{
      params:{
        category : category && category.value
      }
    })
    .then((response)=> {
      // console.log(response.data)
      setSchemeOption(response.data)
    })
    .catch(error=>{
      console.log("error",error)
     })
   },[category])
  

  //  setSchemeOption(res)
  return (
    <div className='mainBox'>
      <div className='navHeader'></div>
      <div className='logo'></div>

      <div className='sideNav'></div>
      <RightMain 
      currentDate={currentDate} 
      category={category} 
      setSchemeOption={setSchemeOption} 
      setCategory={setCategory} 
      categoryOption={categoryOption} 
      timePeriodOption={timePeriodOption} 
      schemeOption = {schemeOption} 
      timePeriod={timePeriod} 
      setTimePeriod={setTimePeriod}
      scheme ={scheme}
      setScheme = {setScheme}
      />
    </div>
  )
}
