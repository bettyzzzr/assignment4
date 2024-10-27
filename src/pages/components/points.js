import React from 'react';

function Points(props) {
    const { data, xScale, yScale, height, width, hoveredStation, setTooltipData, setTooltipPos, onMouseEnter } = props;

    const getColor = (station) => {return station === hoveredStation ? 'red' : 'steelblue';};

    const getRadius = (station) => {return station === hoveredStation ? 10 : 5;};

    const handleMouseEnter = (dataPoint, event) => {
                                                    setTooltipData(dataPoint);
                                                    setTooltipPos({ x: event.pageX, y: event.pageY });
                                                    onMouseEnter(dataPoint.station);
                                                };

    if (data) {
        return (
            <g>
                {hoveredStation && (
                    <rect
                        x={0}
                        y={0}
                        height={height}
                        width={width}
                        opacity={0.5}
                        fill="yellow"
                    />
                )}
                {data.map((d, i) => (
                    <circle
                        key={i}
                        cx={xScale(d.tripdurationS)} 
                        cy={yScale(d.tripdurationE)}
                        r={getRadius(d.station)}
                        fill={getColor(d.station)}
                        strokeWidth={1}
                        stroke="black"
                        onMouseEnter={(event) => handleMouseEnter(d, event)}
                        onMouseOut={() => {setTooltipData(null);}}
                        style={{ transition: 'fill 0.2s, r 0.2s' }}
                    />
                ))}
            </g>
        );
    } else {
        return <g></g>;
    }
}

export default Points;