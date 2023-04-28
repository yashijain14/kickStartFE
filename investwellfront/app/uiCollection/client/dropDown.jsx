import React, { useEffect, useRef, useState } from "react"

const Dropdown = ({ field,placeHolder, option, isSearchable, onChange,selected, setSelected,check,isSelected}) => {
  const [showMenu, setShowMenu] = useState(false)
  const [currentMenu, setCurrentMenu] = useState()
  const inputRef = useRef()
 

  // useEffect(() => {
  //   const handler = (e) => {
  //     if (inputRef.current && !inputRef.current.contains(e.target)) {
  //       setShowMenu(false)
  //     }
  //   }

  //   window.addEventListener("click", handler)
  //   return () => {
  //     console.log(window.removeEventListener("click", handler))
  //     window.removeEventListener("click", handler)
  //   }
  // })

  return (
    <div className="dropdownContainer">
      <div ref={inputRef} onClick={() => {check && setShowMenu(!showMenu); setCurrentMenu(option)}} className="dropdownInput">
        <div className="dropdownSelectedValue" >{(!selected || selected.length === 0)?placeHolder:selected.name}</div>

        <div className="dropdownTool">
          <svg height="20" width="20" viewBox="0 0 20 20">
            <path d="M4.516 7.548c0.436-0.446 1.043-0.481 1.576 0l3.908 3.747 3.908-3.747c0.533-0.481 1.141-0.446 1.574 0 0.436 0.445 0.408 1.197 0 1.615-0.406 0.418-4.695 4.502-4.695 4.502-0.217 0.223-0.502 0.335-0.787 0.335s-0.57-0.112-0.789-0.335c0 0-4.287-4.084-4.695-4.502s-0.436-1.17 0-1.615z"></path>
          </svg>
        </div>
      </div>
      {showMenu && (<div className="dropdownMenu">
        {isSearchable && (<div className='searchBox'>
          {/* <input onChange={onSearch} value={searchValue} className='searchInput' ref={searchRef}></input> */}
        </div>)}

        {currentMenu && currentMenu.map((option) => (
          <div onClick={(e) =>{ ('click') ? setSelected(option) : setSelected(e.target.value);setShowMenu(false)}} key={option.value} className={`dropdownItem ${(!selected) ? false : selected.value === option.value && "selected"}`} >
            {option.name}
          </div>
        ))}
      </div>
      )}
    </div>
  )
}

export default Dropdown





//  console.log("*************MENU",showMenu,option)
  // const handleInput = (event, option) => {
  //   if (event == 'click')
  //   {
  //     console.log("***************",option)
  //     setSelected(option)
  //   }
  //   else
  //     setSelected(event.target.value)

  // }

  // const getDisplay = () => {
  //   if (!selected || selected.length === 0) {
  //     return placeHolder
  //   }
  //   return selected.name
  // }

  // const removeOption = (option) => {
  //   return selected.filter((o) => o.value !== option.value)
  // }

  // const onItemClick = (option) => {
  //   let newValue = option
  //   setSelected(newValue)
  //   onChange(newValue)
  // }

  

  // const onSearch = (e) => {
  //   setSearchValue(e.target.value)
  //   if (!searchValue) {
  //     return setCurrentMenu(option)
  //   }

  //   return setCurrentMenu(option.filter(
  //     (option) =>
  //       option.name.toLowerCase().startsWith(searchValue.toLowerCase()) >= 0
  //   ))
  // }

  // const getOptions = () => {
  //   if (!searchValue) {
  //     return setCurrentMenu(option)
  //   }
  //   else
  //     return option.filter(
  //       (option) => {
  //         option.name.toLowerCase().indexOf(searchValue.toLowerCase()) >= 0
  //       }
  //     )
      
  // }
  // useEffect(() => {
  //   setSearchValue("")
  //   if (showMenu && searchRef.current) {
  //     searchRef.current.focus()
  //   }
  // }, [showMenu])
