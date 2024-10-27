import React from 'react';
import Points from './points';
import XAxis from './xAxis';
import YAxis from './yAxis';

function ScatterPlot(props) {
    const { offsetX, offsetY, data,
            xScale, yScale,
            height, width,
            hoveredStation,
            onMouseEnter, onMouseOut,
            setTooltipData, setTooltipPos,} = props;

    return (
        <g transform={`translate(${offsetX}, ${offsetY})`}>
            <Points
                data={data}
                xScale={xScale} yScale={yScale}
                height={height} width={width}
                hoveredStation={hoveredStation}
                onMouseEnter={onMouseEnter} onMouseOut={onMouseOut}
                setTooltipData={setTooltipData} setTooltipPos={setTooltipPos}
            />
            <YAxis
                yScale={yScale}
                height={height}
                axisLabel="Trip duration end in"
            />
            <XAxis
                xScale={xScale}
                height={height}
                width={width}
                axisLabel="Trip duration start from"
            />
        </g>
    );
}

export default ScatterPlot;