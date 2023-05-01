import React from 'react'
import HeatMap from 'react-heatmap-grid'

const correlationMatrix = (props) => {
    
    const labels = []
    // making array for labels
    props.schemeArr.map((object) => (labels.push(object.legend)))
    const xLabels = labels
    const yLabels = labels

    const data = new Array(yLabels.length)
        .fill()
        .map((_, yIndex) =>
            new Array(xLabels.length)
                .fill()
                .map((_, xIndex) => props.navData && props.navData[xIndex] && props.navData[yIndex] && props.navData[xIndex][yIndex])
                
        );

    return (
        <div className='correlationMatrix'>
            <div className='heatMap'>
                <HeatMap
                    xLabels={xLabels}
                    yLabels={yLabels}
                    xLabelsLocation={"top"}
                    xLabelWidth={100}
                    data={data}
                    squares
                    onClick={(x, y) => alert(`Clicked ${x}, ${y}`)}
                    cellStyle={(background, value, min, max, data, x, y) => ({
                        background:
                            value >= -1.0 && value < -0.4 ? 'rgb(138, 236, 49)' :
                                value >= -0.4 && value < 0.0 ? 'rgb(135, 243, 193)' :
                                    value >= 0.0 && value < 0.6 ? 'rgb(232, 119, 16)' :
                                        value >= 0.6 && value < 1.0 ? 'rgb(228, 69, 11)' :
                                            'rgb(0, 0, 0)',
                        color: 'rgb(255, 255, 255)',
                        fontSize: "5px",
                        // padding: "2px"
                    })}
                    cellRender={(value) => value && `${value}`}
                    title={(value, unit) => `${value}`}
                    // xLabelsOffset = {100}
                />
            </div>
        </div>
    )
}

export default correlationMatrix