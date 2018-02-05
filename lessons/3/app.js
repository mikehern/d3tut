const data = [];

const chartWidth = 800;
const chartHeight = 200;
const barPadding = 5;

for (let i = 0; i < 20; i++) {
  const randomValue = Math.floor(Math.random() * 10 + 1);
  data.push(randomValue);
  console.log(randomValue);
}

//Initialize chart
const chart = d3.select('#chart')
  .append('svg')
  .attr('width', chartWidth)
  .attr('height', chartHeight);

//Bind and format data
chart.selectAll('svg')
  .data(data)
  .enter()
  .append('rect')
  .attr('x', (d, i) => i * (chartWidth / data.length))
  .attr('y', d => chartHeight - d * 20)
  .attr('width', chartWidth / data.length - barPadding)
  .attr('height', d => d * 20)
  .attr('fill', 'gold');
  // .attr('class', 'bar')
  // .style('margin-right', '1px')
  // .style('width', '10px')
  // .style('height', d => {
  //   const height = d * 30;
  //   return height + 'px';
  // });

//Create labels
chart.selectAll('text')
  .data(data)
  .enter()
  .append('text')
  .text(d => d)
  .attr('x', (d, i) => i * (chartWidth / data.length) + (chartWidth / data.length - barPadding) / 2)
  .attr('y', d => chartHeight - d * 10 + 15)
  .attr('font-size', '2vh')
  .attr('text-anchor', 'middle')
  .style('fill', '#006bb6');