var data = [6, 20, 21, 14, 2, 30, 7, 16, 25, 5, 11, 28, 10, 26, 9];

// Create SVG Element
var chart_width = 800;
var chart_height = 400;
var bar_padding = 5;
var svg = d3.select('#chart')
  .append('svg')
  .attr('width', chart_width)
  .attr('height', chart_height);

// Create scales
const xScale = d3.scaleBand()
  .domain(d3.range(data.length))
  .rangeRound([0, chart_width])
  .paddingInner(0.05);

const yScale = d3.scaleLinear()
  .domain([0, d3.max(data)])
  .range([0, chart_height]);

// Bind Data and create bars
svg.selectAll('rect')
  .data(data)
  .enter()
  .append('rect')
  .attr('x', function (d, i) {
    return xScale(i);
  })
  .attr('y', function (d) {
    return chart_height - yScale(d);
  })
  .attr('width', xScale.bandwidth())
  .attr('height', function (d) {
    return yScale(d);
  })
  .attr('fill', '#7ED26D');

// Create Labels
svg.selectAll('text')
  .data(data)
  .enter()
  .append('text')
  .text(function (d) {
    return d;
  })
  .attr('x', function (d, i) {
    return xScale(i) +
      xScale.bandwidth() / 2;
  })
  .attr('y', function (d) {
    return chart_height - yScale(d) + 20;
  })
  .attr('font-size', 14)
  .attr('fill', '#fff')
  .attr('text-anchor', 'middle');

//Events
d3.select('button').on('click', () => {
  data.reverse();
  svg.selectAll('rect')
    .data(data)
    .transition()
    .delay((d, i) => i * 100)
    .duration(1000)
    .ease(d3.easeElasticOut)
    .attr('y', function (d) {
      return chart_height - yScale(d);
    })
    .attr('height', function (d) {
      return yScale(d);
    })
  
  svg.selectAll('text')
    .data(data)
    .transition()
    .delay((d, i) => i * 140)
    .duration(1000)
    .ease(d3.easeElasticOut)
    .text(function (d) {
      return d;
    })
    .attr('x', function (d, i) {
      return xScale(i) +
        xScale.bandwidth() / 2;
    })
    .attr('y', function (d) {
      return chart_height - yScale(d) + 20;
    });
});