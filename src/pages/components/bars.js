import React from 'react';

function Bars(props) {
    const { data, xScale, yScale, height, hoveredStation, onMouseEnter, onMouseOut } = props;

    const barColor = (station) => {return station === hoveredStation ? 'red' : 'steelblue';};
        //Note:
        //the if(data){...} means when data is not null, the component will return the bars; otherwise, it returns <g></g>
        //we use the if ... else ... in this place so that the code can work with the SSR in Next.js;

    if (data) {
        {/* {task:
                    1. remove this comments and put your code here
                    2. pay attention to the height of the bars, it should be height-yScale(d.start)} */}
        return (
            <g>
                {data.map((d, index) => (
                    <rect
                        key={index}
                        x={xScale(d.station)}
                        y={yScale(d.start)}
                        width={xScale.bandwidth()}
                        height={height - yScale(d.start)}
                        fill={barColor(d.station)}
                        stroke="black"
                        strokeWidth={1}
                        onMouseEnter={() => onMouseEnter(d.station)}
                        onMouseOut={onMouseOut}
                        style={{ transition: 'fill 0.2s' }}
                    />
                ))}
            </g>
        );
    } else {
        return <g></g>;
    }
}

export default Bars;