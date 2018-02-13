//Initial set up
const chartWidth = 800;
const chartHeight = 600;

//Create projection
const projection = d3.geoAlbersUsa()
  .scale([chartWidth])
  .translate([chartWidth / 2, chartHeight / 2]);

const path = d3.geoPath(projection);

//Create svg
const svg = d3.select('#chart')
  .append('svg')
  .attr('width', chartWidth)
  .attr('height', chartHeight);

//Prep json
d3.json('us.json', data => {
  svg.selectAll('path')
    .data(data.features)
    .enter()
    .append('path')
    .attr('d', path)
    .attr('fill', '#006bb6')
    .attr('stroke', 'darkgrey')
    .attr('stroke-width', 1);
});
