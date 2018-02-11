const data0 = [25, 25, 25, 25];
const data = [35, 6, 20, 47, 19];
const chartWidth = 600;
const chartHeight = 600;
const color = d3.scaleOrdinal(d3.schemeCategory10);

//Create pie
const pie = d3.pie();

//Create arc
const outerRadius = chartWidth / 2;
const innerRadius = 200;

const arc = d3.arc()
  .innerRadius(innerRadius)
  .outerRadius(outerRadius);

const svg = d3.select('#chart')
  .append('svg')
  .attr('width', chartWidth)
  .attr('height', chartWidth);

//Create groups
const arcs = svg.selectAll('g.arc')
  .data(pie(data))
  .enter()
  .append('g')
  .attr('class', 'arc')
  .attr('transform', `translate(${outerRadius}, ${chartHeight / 2})`);

//Create arcs
arcs.append('path')
  .attr('fill', (d, i) => color(i))
  .attr('d', arc);

//Create labels
arcs.append('text')
  .attr('transform', (d, i) => `translate(${arc.centroid(d)})`)
  .attr('text-anchor', 'text-middle')
  .text(d => d.value);