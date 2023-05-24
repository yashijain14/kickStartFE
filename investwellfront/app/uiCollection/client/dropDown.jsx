import React, { useState } from "react"

const Dropdown = (props) => {
  const [currentMenu, setCurrentMenu] = useState()
  const [value, setValue] = useState('')

  // const option = props.option.filter(props.schemeArr)
  // const filterOption = () => {
  //   const arr = []
  //   if (props.label == 'scheme' && ) {
  //     for (let i = 0; i < props.option.length; i++) {
  //       if (props.option[i].filter(props.schemeArr[i])){
  //         arr.push(props.option)
  //       }
  //   }
  //     console.log('option', props.option)
  //     console.log('schemearray', props.schemeArr)
  //   }
  // }

  function handleChangeSchemeOption(event) {
    const arr = []

    if (event.target.value == '' || props.selected && props.selected.length < 0) {
      setCurrentMenu(props.option)
    }
    else {
      for (let i = 0; i < props.option.length; i++) {
        if ((props.option[i].name.toLowerCase()).startsWith(event.target.value.toLowerCase())) {
          arr.push(props.option[i])
        }
      }
      setCurrentMenu(arr)
    }
  }

  return <>
    {props.isSearchable && <div className="dropdownContainer" onClick={() => { props.setShowMenu(props.label); setCurrentMenu(props.option) }} >
      <input type="text" className='searchInput' onChange={(event) => { handleChangeSchemeOption(event); setValue(event.target.value) }} placeholder="Search" value={value}></input>
      <div className="dropdownTool">
        <a href='#' className="close" onClick={() => { setValue(''); props.setSchemeOption(''); props.setSelected('') }} />
      </div>
    </div>
    }
    {props.showMenu == props.label && (<div className="dropdownMenu">
      {currentMenu && currentMenu.map((id) => (
        <div onClick={(e) => { setValue(id.name), props.setSelected(id), props.setShowMenu('') }} key={id.value} className={`dropdownItem ${(!props.selected) ? false : props.selected.value === id.value && "selected"}`} >
          {id.name}
        </div>
      ))}
    </div>
    )}
  </>
}

export default Dropdown