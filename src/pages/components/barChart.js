import React from 'react';
import XAxis from './XAxis';
import YAxis from './YAxis';
import Bars from './Bars';

function BarChart(props){
    const {offsetX, offsetY, data, xScale, yScale, height, width} = props;
    //task1: transform the <g> with the offsets so that the barchart can show properly 
    //task2: import the components needed and uncomment the components in the return 
    return (
        <g transform={`translate(${offsetX}, ${offsetY})`}>
            {/* 渲染柱状条 */}
            <Bars
                data={data}
                xScale={xScale}
                yScale={yScale}
                height={height}
                hoveredStation={hoveredStation}
                onMouseEnter={onMouseEnter}
                onMouseOut={onMouseOut}
            />
            <YAxis yScale={yScale} height={height} axisLabel={"Bikers start from"} />
            <XAxis xScale={xScale} height={height} width={width} axisLabel={"Station"} />
        </g>
    );
}

export default BarChart