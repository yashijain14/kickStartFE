import React from 'react'
import HeatMap from 'react-heatmap-grid'

const correlationMatrix = (props) => {
    const labels=[]

    // making array for labels
    props.schemeArr.map((object) => (labels.push(object.legend)))
    const xLabels = labels
    const yLabels = labels

    console.log('mmmmmmmmmmm', props.navData)

    const data = new Array(yLabels.length)
  .fill()
  .map((_, yIndex) =>
    new Array(xLabels.length)
      .fill()
      .map((_, xIndex) =>  props.navData&&props.navData[yIndex][xIndex])
  );

  console.log("vishaldclas")
     

    return (
        <div className='correlationMatrix'>
            <HeatMap
                xLabels={xLabels}
                yLabels={yLabels}
                xLabelsLocation={"bottom"}
                xLabelWidth={100}
                data={data}
                squares
                onClick={(x, y) => alert(`Clicked ${x}, ${y}`)}
                cellStyle={(background, value, min, max, data, x, y) => ({
                    background: `rgba(138, 246, 49, ${1 - (max - value) / (max - min)})`,
                    fontSize: "15px",
                    padding: "12px"
                })}
                cellRender={(value) => value && `${value}`}
                title={(value, unit) => `${value}`}
            />
        </div>
    )
}

export default correlationMatrix