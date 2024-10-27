//`<XAxis />` has the following properties,
// - xScale: the scale of the x-axis
// - height: the height of the scatter plot
// - width: the width of the scatter plot
// - axisLabel: the name of the axis
// - `<YAxis />` has the following properties,
// - yScale: the scale of y-axis
// - height: the height of the scatter plot
// - axisLabel: the name of the axis
// - **`<Points />`**: it is defined in the module points.js. The radius of each `<circle />` is 5 and the color is `steelblue`, and the `<Points />` has the following properties,
// - data: the data items
// - xScale: the scale for the x coordinate
// - yScale: the scale for the y coordinate




function XAxis(props){
    const { xScale, height, width, axisLabel } = props;
    //Note:
    //1. XAxis works for two cases: the xScale is linear (i.e., scatter plot) and the xScalse is discrete (i.e., bar chart)
    //2. you can use typeof(xScale.domain()[0]) to decide the return value
    //3. if typeof(xScale.domain()[0]) is a number, xScale is a linear scale; if it is a string, it is a scaleBand.
    const isLinear = typeof xScale.domain()[0] === "number";

    if(xScale) {
        return (
            <g>
                {/* X 轴主线 */}
                <line x1={0} x2={width} y1={height} y2={height} stroke="black" />

                {/* 渲染 X 轴刻度 */}
                {isLinear
                    ? xScale.ticks(13).map((tickValue) => (
                          <g key={tickValue} transform={`translate(${xScale(tickValue)}, ${height})`}>
                              <line y1={0} y2={6} stroke="black" />
                              <text y={20} style={{ textAnchor: "middle", fontSize: "12px" }}>
                                  {tickValue}
                              </text>
                          </g>
                      ))
                    : xScale.domain().map((tickValue) => (
                          <g key={tickValue} transform={`translate(${xScale(tickValue) + xScale.bandwidth() / 2}, ${height})`}>
                              <line y1={0} y2={6} stroke="black" />
                              <text
                                  y={20}
                                  transform="rotate(-45)" // 旋转标签
                                  dy="0.71em" // 调整对齐
                                  style={{ textAnchor: "end", fontSize: "10px" }} // 设置对齐和字体大小
                              >
                                  {tickValue}
                              </text>
                          </g>
                      ))
                }

                {/* X 轴标签 */}
                {axisLabel && (
                    <text
                        x={width / 2}
                        y={height + 40}
                        style={{ textAnchor: "middle", fontSize: "14px" }}
                    >
                        {axisLabel}
                    </text>
                )}
            </g>
        );
    }else {
    return <g></g>
}
}

export default XAxis