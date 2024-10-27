import React, { useState } from 'react';

function Bars(props) {
    const {data, xScale, yScale, height} = props;

    // 定义一个状态，用于存储当前悬停的 station 名称
    const [selectedStation, setSelectedStation] = useState(null);

    // 定义颜色函数：如果当前 station 被悬停，返回红色，否则返回蓝色
    const getColor = (hoveredStation, station) => {
        return station === hoveredStation ? 'red' : 'steelblue';
    };

    //Note: 
    //the if(data){...} means when data is not null, the component will return the bars; otherwise, it returns <g></g>
    //we use the if ... else ... in this place so that the code can work with the SSR in Next.js;
    if(data){
        return (
            <g>
                {data.map(d => (
                    <rect
                        key={d.station} // 使用 station 作为唯一键
                        x={xScale(d.station)} // 使用 station 字段获取 X 轴位置
                        y={yScale(d.start)} // 使用 start 字段来计算条形的高度
                        width={xScale.bandwidth()} // 条形的宽度
                        height={height - yScale(d.start)} // 条形的高度
                        fill={getColor(hoveredStation, d.station)}
                        onMouseEnter={() => onMouseEnter(d.station)}
                        onMouseOut={onMouseOut}// 鼠标离开事件
                    />
                ))}
            </g>
        );
    } else {
        return <g></g>
    }
}

export default Bars