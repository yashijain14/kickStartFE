import React from 'react'
import StackedGraph from '../shared/stackedGraph.jsx'

export default function GraphArea(props) {
  
  return (
    <div className='leftDiv'>
      
        <div className="vennDiagramLeft">
              <div className='vennDiagramLeftLabel'>SCHEME A</div>
              <div className='leftLabel'>%  WEIGHT</div>
              <div className='graphA'>
                <StackedGraph  value = {props.values.holdingAOnlyNetAsset} colorGraph={props.colorGraph} color = {"#39B0DC"}/>
                
              </div> 
              <div className='graphALabel'>IN SCHEME A NOT IN SCHEME B</div>
              <div className='commonGraphA'>
              <StackedGraph  value = {props.values.commonHoldingA} colorGraph={props.colorGraph} color = {"#39B0DC"}/>
              </div>
              <div className='commonGraphB'>
          <StackedGraph  value = {props.values.commonHoldingsB} colorGraph={props.colorGraph} color = {"#F15562"}/>

          </div>
        </div>
        <div className="vennDiagramRight"><div className='vennDiagramRightLabel'>SCHEME B</div>
      

        
          <span className='commonGraphLabel'>COMMON STOCKS</span>

          <div className='graphB'>
          <StackedGraph  value = {props.values.holdingBOnlyNetAsset} colorGraph={props.colorGraph} color = {"#F15562"}/>
         

          </div>
          <div className='graphBLabel'>IN SCHEME B NOT IN SCHEME A</div>
        </div>
        <span className='vennLabel'>Note : The Venn Diagram potrays portfolio Overlap between Scheme A and B. Cash is not included</span>
  
  </div>
  )
}
