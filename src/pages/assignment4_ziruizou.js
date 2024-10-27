
import React from 'react'
import * as d3 from "d3"
import 'bootstrap/dist/css/bootstrap.css'
import { Row, Col, Container} from 'react-bootstrap'
import ScatterPlot from './components/scatterPlot'
import BarChart from './components/barChart'
import Tooltip from './components/tooltips'


const csvUrl = 'https://gist.githubusercontent.com/hogwild/3b9aa737bde61dcb4dfa60cde8046e04/raw/citibike2020.csv'

function useData(csvPath){
    const [dataAll, setData] = React.useState(null);
    React.useEffect(()=>{
        d3.csv(csvPath).then(data => {
            data.forEach(d => {
                d.start = +d.start;
                d.tripdurationS = +d.tripdurationS;
                d.end = +d.end;
                d.tripdurationE = +d.tripdurationE;
            });
            setData(data);
        });
    }, []);
    return dataAll;
}

const Charts = () => {
    const [hoveredStation, setHoveredStation] = useState(null); // 当前悬停的站点名称
    const [tooltipData, setTooltipData] = useState(null); // Tooltip 的数据
    const [tooltipX, setTooltipX] = useState(null); // Tooltip X 坐标
    const [tooltipY, setTooltipY] = useState(null); // Tooltip Y 坐标

    const dataAll = useData(csvUrl);
    if (!dataAll) {
        return <pre>Loading...</pre>;
    };
    const WIDTH = 600;
    const HEIGHT = 400;
    const margin = { top: 20, right: 20, bottom: 20, left: 35};
    const innerHeightScatter = HEIGHT - margin.top - margin.bottom;
    const innerHeightBar = HEIGHT - margin.top - margin.bottom-120;
    const innerWidth = WIDTH - margin.left - margin.right;
    const MONTH = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];
    const data = dataAll.filter( d => { 
        return d.month === MONTH[month] 
    });

   
    const xScaleScatter = d3.scaleLinear()
        .domain([0, d3.max(dataAll, d => d.tripdurationS)])
        .range([0, innerWidth])
        .nice();
    const yScaleScatter = d3.scaleLinear()
        .domain([0, d3.max(dataAll, d => d.tripdurationE)])
        .range([innerHeightScatter, 0])
        .nice();

//Q1.2: Complete the xScaleBar and yScaleBar
//Hint: use d3.scaleBand for xScaleBar
    const xScaleBar = d3.scaleBand()
    .domain(data.map(d => d.station)) 
    .range([0, innerWidth])
    .padding(0.1);
    const yScaleBar = d3.scaleLinear()
    .domain([0, d3.max(data, d => d.start)]) // start 是柱状图的高度值
    .range([innerHeightBar, 0])
    .nice();

    const handleMouseEnter = (station, event, data) => {
        setHoveredStation(station);
        setTooltipData(data);
        setTooltipX(event.pageX);
        setTooltipY(event.pageY);
    };

    const handleMouseOut = () => {
        setHoveredStation(null);
        setTooltipData(null);
        setTooltipX(null);
        setTooltipY(null);
    };

    return (
        <Container >
            <Row>
                <Col lg={3} md={2}>
                    <input key="slider" type='range' min='0' max='11' value={month} step='1' onChange={changeHandler}/>
                    <input key="monthText" type="text" value={MONTH[month]} readOnly/>
                </Col>
                
            </Row>
            <Row className='justify-content-md-center'>
                <Col>
                    <svg width={WIDTH} height={HEIGHT}>
                        <ScatterPlot offsetX={margin.left} offsetY={margin.top} data={data} xScale={xScaleScatter} yScale={yScaleScatter} 
                        height={innerHeightScatter} width={innerWidth}hoveredStation={hoveredStation} // 传递状态
                        onMouseEnter={handleMouseEnter}
                        onMouseOut={handleMouseOut}/>
                    </svg>
                </Col>
                <Col>
                    <svg width={WIDTH} height={HEIGHT}>
                        <BarChart offsetX={margin.left} offsetY={margin.top} data={data} xScale={xScaleBar} 
                        yScale={yScaleBar} height={innerHeightBar} width={innerWidth}hoveredStation={hoveredStation} // 传递状态
                        onMouseEnter={handleMouseEnter}
                        onMouseOut={handleMouseOut}/>
                    </svg>
                </Col>
            </Row>
            <Tooltip x={tooltipX} y={tooltipY} station={hoveredStation} /> {/* 添加 Tooltip */}
        </Container>
    )   
}


export default Charts

