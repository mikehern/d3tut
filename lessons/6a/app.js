var data = [
  { key: 0, num: 6 },
  { key: 1, num: 20 },
  { key: 2, num: 21 },
  { key: 3, num: 14 },
  { key: 4, num: 2 },
  { key: 5, num: 30 },
  { key: 6, num: 7 },
  { key: 7, num: 16 },
  { key: 8, num: 25 },
  { key: 9, num: 5 },
  { key: 10, num: 11 },
  { key: 11, num: 28 },
  { key: 12, num: 10 },
  { key: 13, num: 26 },
  { key: 14, num: 9 }
];
var key = function (d) {
  return d.key;
};

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
  .domain([0, d3.max(data, d => d.num)])
  .range([0, chart_height]);

// Bind Data and create bars
svg.selectAll('rect')
  .data(data, key)
  .enter()
  .append('rect')
  .attr('x', function (d, i) {
    return xScale(i);
  })
  .attr('y', function (d) {
    return chart_height - yScale(d.num);
  })
  .attr('width', xScale.bandwidth())
  .attr('height', function (d) {
    return yScale(d.num);
  })
  .attr('fill', '#7ED26D')
  .on('mouseover', (d, i, nodes) => {
    const x = Number(d3.select(nodes[i]).attr('x')) + xScale.bandwidth() / 2;
    const y = Number(d3.select(nodes[i]).attr('y')) / 2 + chart_height / 2;

    d3.select('#tooltip')
      .style('left', `${x}px`)
      .style('top', `${y}px`)
      .style('display', 'block')
      .text(d.num);
  })
  .on('mouseout', (d, i, nodes) => {
    const x = Number(d3.select(nodes[i]).attr('x')) + xScale.bandwidth() / 2;
    const y = Number(d3.select(nodes[i]).attr('y')) / 2 + chart_height / 2;

    d3.select('#tooltip')
      .style('display', 'none');
  });

//Events
d3.select('.update').on('click', () => {

  data.reverse();
  // data[0].num = 50;
  yScale.domain([0, d3.max(data, function (d) {
    return d.num;
  })]);

  svg.selectAll('rect')
    .data(data, key)
    .transition()
    .delay((d, i) => i / data.length * 1000)
    .duration(1000)
    .attr('y', function (d) {
      return chart_height - yScale(d.num);
    })
    .attr('height', function (d) {
      return yScale(d.num);
    })

});

//Add data
d3.select('.add').on('click', function () {

  //Generate new datum
  const newNum = Math.floor(Math.random() * d3.max(data, d => d.num));
  data.push(
    {
      key: data[data.length - 1].key + 1,
      num: newNum
    }
  );

  //Call and update scale
  xScale.domain(d3.range(data.length));
  yScale.domain([0, d3.max(data, d => d.num)]);

  //Select bars
  const bars = svg.selectAll('rect').data(data, key);

  bars
    .enter()
    .append('rect')
      .attr('x', (d, i) => xScale(i))
      .attr('y', chart_height)
      .attr('width', xScale.bandwidth())
      .attr('height', 0)
      .attr('fill', '#00b66b')
    .merge(bars)
    .transition()
    .duration(1000)
      .attr('x', (d, i) => xScale(i))
      .attr('y', d => chart_height - yScale(d.num))
      .attr('width', xScale.bandwidth())
      .attr('height', d => yScale(d.num))
      .attr('fill', '#7ED26D');

});

//Remove data
d3.select('.remove').on('click', function () {
  //Remove datum
  data.shift();

  //Update scales
  xScale.domain(d3.range(data.length));
  yScale.domain([0, d3.max(data, d => d.num)]);

  //Select bars
  let bars = svg.selectAll('rect').data(data, key);

  //Update bars
  bars.transition()
    .duration(500)
    .attr('x', (d, i) => xScale(i))
    .attr('y', d => chart_height - yScale(d.num))
    .attr('width', xScale.bandwidth())
    .attr('height', d => yScale(d.num));

  //Remove bar
  bars.exit()
    .transition()
    .attr('x', -xScale.bandwidth())
    .remove();
});
