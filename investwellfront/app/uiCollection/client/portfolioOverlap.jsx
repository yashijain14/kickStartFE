import React from 'react'
import GraphArea from '../../../app/uiCollection/client/graphArea.jsx'
import DonutChart from '../../../app/uiCollection/client/donutChart.jsx'
import UpperLogo from '../../../app/media/images/commonStock.png'
import LowerLogo from '../../../app/media/images/unCommonStock.png'

export default function PortfolioOverlap(props) {
  return (
      <div className='portfolioOverlap'>
            <GraphArea values={props.data.vennDiagram}/>
            <div className='rightDiv'>
              <div className='rightContainerA'><DonutChart values={props.data.overlapValue.overlapPercentage} /></div>

              <div className='rightContainerB'>
                <div className='outerDivFirst'>
                  <div className='commonStockDiv'><img src={UpperLogo} className='commonStockIcon' ></img></div>
                  <span className='commonStock'>{props.data.overlapValue.commonHoldings}<br />
                    <div className='text'>#common stocks</div>
                  </span>
                </div>
              </div>



              <div className='rightContainerC'>
                <div className='outerDivSecond'>
                  <div className='unCommonStockDiv'><img src={LowerLogo} className='unCommonStockIcon' ></img></div>
                  <span className='unCommonStockA'>{props.data.overlapValue.unCommonHoldingsInA}<br />
                    <div className='text'>#uncommon stocks in A</div>
                  </span>
                  <span className='totalStockA'>{props.data.overlapValue.totalHoldingsInA}<br />
                    <div className='text'>#total stocks in A</div>
                  </span>
                </div>
              </div>



              <div className='rightContainerD'>
                <div className='outerDivThird'>
                  <div className='unCommonStockDiv'><img src={LowerLogo} className='unCommonStockIcon' ></img></div>
                  <span className='unCommonStockA'>{props.data.overlapValue.unCommonHoldingsInB}<br />
                    <div className='text'>#uncommon stocks in B</div>
                  </span>
                  <span className='totalStockA'>{props.data.overlapValue.totalHoldingsInB}<br />
                    <div className='text'>#total stocks in B</div>
                  </span>
                </div>
              </div>
            </div>

          </div>
  )
}

