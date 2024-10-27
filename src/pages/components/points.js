import React, { useState } from 'react';

function Points(props) {
    const {data, xScale, yScale, height, width} = props;
    //Note: 
    //the if(data){...} means when data is not null, the component will return the points; otherwise, it returns <g></g>
    //we use the if ... else ... in this place so that the code can work with the SSR in Next.js;
    // 定义一个状态变量，用于存储当前悬停的站点名称
    const [selectedStation, setSelectedStation] = useState(null);

    const getColor = (hoveredStation, station) => {
        return station === hoveredStation ? 'red' : 'steelblue';
    };

    const getRadius = (hoveredStation, station) => {
        return station === hoveredStation ? 10 : 5;
    };

    if(data){
        return (
            <g>
                {hoveredStation && (
                <rect x={0} y={0} width={width} height={height} fill="yellow" opacity={0.3} />
            )}

            {data.map(d => (
                <circle
                    key={d.index}
                    cx={xScale(d.waiting)}
                    cy={yScale(d.eruptions)}
                    r={getRadius(hoveredStation, d.station)}
                    fill={getColor(hoveredStation, d.station)}
                    stroke="black"
                    onMouseEnter={(event) => onMouseEnter(d.station, event, d)} // 更新以传递数据对象和事件
                    onMouseOut={onMouseOut}
                />
            ))}

            {hoveredStation &&
                data
                    .filter(d => d.station === hoveredStation)
                    .map(d => (
                        <circle
                            key={`${d.index}-highlight`}
                            cx={xScale(d.waiting)}
                            cy={yScale(d.eruptions)}
                            r={getRadius(hoveredStation, d.station)}
                            fill={getColor(hoveredStation, d.station)}
                            stroke="black"
                        />
                    ))}
            </g>
        );
    } else {
        return <g></g>
    }
}

export default Points