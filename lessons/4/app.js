// const data = [
//   [400, 200],
//   [210, 140],
//   [722, 300],
//   [70, 160],
//   [250, 50],
//   [110, 280],
//   [699, 255],
//   [90, 200]
// ];

const data = [
  {date: '07/01/2018', num: 20},
  {date: '07/02/2018', num: 37},
  {date: '07/03/2018', num: 25},
  {date: '07/04/2018', num: 45},
  {date: '07/05/2018', num: 23},
  {date: '07/06/2018', num: 33},
  {date: '07/07/2018', num: 49},
  {date: '07/08/2018', num: 40},
  {date: '07/09/2018', num: 36},
  {date: '07/10/2018', num: 27},
];

const timeParse = d3.timeParse('%m/%d/%Y');
const timeFormat = d3.timeFormat('%b %e');
const chartWidth = 1000;
const chartHeight = 400;
const padding = 50;

data.forEach(el => el.date = timeParse(el.date));

//Scale data
const xScale = d3.scaleTime()
  .domain([d3.min(data, d => d.date), d3.max(data, d => d.date)])
  .range([padding, chartWidth - padding * 2]);

const yScale = d3.scaleLinear()
  .domain([0, d3.max(data, d => d.num)])
  .range([chartHeight -padding, padding]);

const rScale = d3.scaleLinear()
  .domain([0, d3.max(data, d => d[1])])
  .range([5, 30]);

const aScale = d3.scaleSqrt()
  .domain([0, d3.max(data, d => d.num)])
  .range([5, 25]);

//Init chart
const chart = d3.select('#chart')
  .append('svg')
  .attr('width', chartWidth)
  .attr('height', chartHeight);

//Init axes
const xAxis = d3.axisBottom(xScale)
  .ticks(5);
chart.append('g')
  .attr('class', 'x-axis')
  .attr('transform', `translate(0, ${chartHeight - padding})`)
  .call(xAxis);

//Format data
chart.selectAll('circle')
  .data(data)
  .enter()
  .append('circle')
  .attr('cx', d => xScale(d.date))
  .attr('cy', d => yScale(d.num))
  .attr('r', d => aScale(d.num))
  .attr('fill', 'gold');

//Create labels
chart.append('g')
  .selectAll('text')
  .data(data)
  .enter()
  .append('text')
  .text(d => timeFormat(d.date))
  .attr('x', d => xScale(d.date))
  .attr('y', d => yScale(d.num))
  .style('fill', '#006bb6')