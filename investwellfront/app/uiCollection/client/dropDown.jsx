import React, { useState } from "react"

const Dropdown = (props) => {
  const [showMenu, setShowMenu] = useState(false)
  const [currentMenu, setCurrentMenu] = useState()
  const [value, setValue] = useState('')

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
    {props.isSearchable && <div className="dropdownContainer" onClick={() => { setShowMenu(!showMenu); setCurrentMenu(props.option);  }}>
      <input type="text" className='searchInput' onChange={(event) => { handleChangeSchemeOption(event); setValue(event.target.value) }} placeholder="Search" value={value}></input>
      <div className="dropdownTool">
        <a href="#" class="close" onClick={() => setValue('')} />
      </div>
    </div>
    }
    {showMenu && (<div className="dropdownMenu">
      {currentMenu && currentMenu.map((id) => (
        <div onClick={(e) => { setValue(id.name), props.setSelected(id), setShowMenu(!showMenu) }} key={id.value} className={`dropdownItem ${(!props.selected) ? false : props.selected.value === id.value && "selected"}`} >
          {id.name}
        </div>
      ))}
    </div>
    )}
  </>
}

export default Dropdown