import React from 'react'
import HeatMap from 'react-heatmap-grid'

const correlationMatrix = () => {
    const xLabels = new Array(15).fill(0).map((_, i) => `${i}`);

    // Display only even labels
    const xLabelsVisibility = new Array(15)
        .fill(0)
        .map((_, i) => (i));

    const yLabels = ["SC1", "SC2", "SC3","SC4","SC5"];
    const data = new Array(yLabels.length)
        .fill(0)
        .map(() =>
            new Array(xLabels.length).fill(0).map(() => Math.round(Math.random()*10))
        );
        // console.log(data)
    return (
        <div className='correlationMatrix'>
            <HeatMap
                xLabels={xLabels}
                yLabels={yLabels}
                xLabelsLocation={"bottom"}
                xLabelsVisibility={xLabelsVisibility}
                xLabelWidth={50}
                data={data}
                squares
                onClick={(x, y) => alert(`Clicked ${x}, ${y}`)}
                cellStyle={(background, value, min, max, data, x, y) => ({
                    background: `rgba(66, 86, 244, ${1 - (max - value) / (max - min)})`,
                    fontSize: "11px",
                })}
                cellRender={(value) => value && `${value}%`}
                title={(value, unit) => `${value}`}
            />
        </div>
    )
}

export default correlationMatrix