


function YAxis(props){
    const { yScale, height, axisLable } = props;
    if(yScale){
        const isLinear = typeof yScale.domain()[0] === "number";
        return (
            <g>
                {/* Y 轴主线 */}
                <line x1={0} x2={0} y1={0} y2={height} stroke="black" />

                {/* Y 轴刻度和标签 */}
                {isLinear
                    ? yScale.ticks(13).map((tickValue) => (
                        <g key={tickValue} transform={`translate(0, ${yScale(tickValue)})`}>
                            <line x1={-6} x2={0} stroke="black" />
                            <text x={-10} dy=".32em" style={{ textAnchor: "end", fontSize: "12px" }}>
                                {tickValue}
                            </text>
                        </g>
                    ))
                    : yScale.domain().map((tickValue) => (
                        <g key={tickValue} transform={`translate(0, ${yScale(tickValue) + yScale.bandwidth() / 2})`}>
                            <line x1={-6} x2={0} stroke="black" />
                            <text x={-10} dy=".32em" style={{ textAnchor: "end", fontSize: "12px" }}>
                                {tickValue}
                            </text>
                        </g>
                    ))
                }

                {/* Y 轴标签 */}
                <text style={{ textAnchor: 'end', fontSize: '15px' }} transform={`translate(20, 0) rotate(-90)`}>
                    {axisLabel}
                </text>
            </g>
        );
    } else {
        return <g></g>
    }

}

export default YAxis