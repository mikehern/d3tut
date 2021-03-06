// Data
var data = [
  { pigeons: 6, doves: 8, eagles: 15 },
  { pigeons: 9, doves: 15, eagles: 5 },
  { pigeons: 11, doves: 13, eagles: 14 },
  { pigeons: 15, doves: 4, eagles: 20 },
  { pigeons: 22, doves: 25, eagles: 23 }
];

var chartWidth = 800;
var chartHeight = 400;
var color = d3.scaleOrdinal(d3.schemeCategory10);

//Create stack layout
const stack = d3.stack()
  .keys(['pigeons', 'doves', 'eagles']);

const stackData = stack(data);

//Create scales

const xScale = d3.scaleBand()
  .domain(d3.range(data.length))
  .range([0, chartWidth])
  .paddingInner(0.05);

const yScale = d3.scaleLinear()
  .domain([0, d3.max(data, d => d.pigeons + d.doves + d.eagles)])
  .range([chartHeight, 0]);

// Create SVG Element
var svg = d3.select("#chart")
  .append("svg")
  .attr("width", chartWidth)
  .attr("height", chartHeight);

//Create groups
const groups = svg.selectAll('g')
  .data(stackData)
  .enter()
  .append('g')
  .style('fill', (d, i) => color(i));

groups.selectAll('rect')
  .data(d => d)
  .enter()
  .append('rect')
  .attr('x', (d, i) => xScale(i))
  .attr('y', (d, i) => yScale(d[1]))
  .attr('height', d => yScale(d[0]) - yScale(d[1]))
  .attr('width', xScale.bandwidth());