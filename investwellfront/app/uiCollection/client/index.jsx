import React, {useState} from 'react'
import axios from 'axios'
import FilterArea from '../../../app/uiCollection/client/filterArea.jsx'
import StocksTable from '../../../app/uiCollection/client/stocksTable.jsx'
import PortfolioOverlap from '../../../app/uiCollection/client/portfolioOverlap.jsx'

export default function Index() {
  const [loading, setLoading] = useState(false)
  const [holdingsDetails, setHoldingsDetails] = useState()
  const [dropdownA, setDropdownA] = useState(true)
  const [dropdownB, setDropdownB] = useState(true)
  const [schemeA, setSchemeA] = useState({})
  const [schemeB, setSchemeB] = useState({})
  const [mutualFunds, setMutualFunds] = useState('')
  const [debounce, setDebounce] = useState()

  const handleInputChange = (event, label) => {
    let debounceTimer = debounce
    clearTimeout(debounceTimer)
    const name = event.target.value
    debounceTimer = setTimeout(() => {
      axios
        .get(`http://localhost:3000/getSchemes`, { params: { name } })
        .then((res) => {
          if (res.data && res.data.status == 0) {
            setMutualFunds(res.data.result);
          } else {
            setMutualFunds();
          }
        })
    }, 600)
    setDebounce(debounceTimer)
    switch (label) {
      case "Scheme A":
        setSchemeA({ scheme: name, id: 0 })
        break
      case "Scheme B":
        setSchemeB({ scheme: name, id: 0 })
        break
    }
  }


  const handleSubmit = () => {
    setLoading(true);
    axios.get(`http://localhost:3000/getPortfolioOverlap`, { params: { schid1: schemeA.id, schid2: schemeB.id } })
      .then(res => {
        if (res.data && res.data.status == 0) {
          setHoldingsDetails(res.data.result)
          setLoading(false);
        }


      })
  }

  const proceedDisable = () => {
    if (schemeA.id > 0 && schemeB.id > 0)
      return false
    else
      return true
  }

  return (
    <div className='outerContainer '>
      <h3 className='info'> Diversity the holding across different categories of fund investing in different asset classes after comparing the portfolio of various fund houses
        to avoid portfolio overlap</h3>
      <div className='filterArea'>
        <FilterArea
          mutualFunds={mutualFunds}
          setSchemeA={setSchemeA}
          schemeA={schemeA}
          setSchemeB={setSchemeB}
          schemeB={schemeB}
          handleSubmit={handleSubmit}
          proceedDisable={proceedDisable}
          dropdownA={dropdownA}
          setDropdownA={setDropdownA}
          dropdownB={dropdownB}
          setDropdownB={setDropdownB}
          handleInputChange={handleInputChange}
        />
      </div>
      {loading ? <div className='loader' /> : <>  {holdingsDetails && <PortfolioOverlap holdingsDetails={holdingsDetails} />}   {holdingsDetails && <StocksTable holdingsDetails={holdingsDetails} schemeA={schemeA} schemeB={schemeB} />} </>}
    </div>
  )
}

