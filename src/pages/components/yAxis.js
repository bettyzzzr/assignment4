import React, { useRef, useEffect } from 'react';
import {select, axisLeft} from 'd3';

function YAxis(props) {
    const { yScale, height, axisLabel } = props;
    const axisRef = useRef(null);

    useEffect(() => {
        if (yScale) {
            const axis = axisLeft(yScale);
            select(axisRef.current).call(axis);
        }
    }, [yScale]);

    return (
        <g>
            <g ref={axisRef}></g>
            <svg>
                <text
                    style={{ textAnchor: 'end', fontSize: '15px' }} 
                    transform={`translate(15, 0) rotate(-90)`}
                >
                    {axisLabel}
                </text>
            </svg>
        </g>
    );
}

export default YAxis;