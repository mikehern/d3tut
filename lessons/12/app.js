//Initial set up
const chartWidth = 800;
const chartHeight = 600;
const color = d3.scaleQuantize().range(
  ['#f7fcf0', '#e0f3db', '#ccebc5', '#a8ddb5', '#7bccc4', '#4eb3d3', '#2b8cbe', '#0868ac', '#084081']
);

//Create projection
const projection = d3.geoAlbersUsa()
  .translate([0, 0]);

const path = d3.geoPath(projection);

//Create svg
const svg = d3.select('#chart')
  .append('svg')
  .attr('width', chartWidth)
  .attr('height', chartHeight);

const zoomMap = d3.zoom()
  .scaleExtent([0.5, 3.0])
  .translateExtent([
    [-1000, -500],
    [1000, 500]
  ])
  .on('zoom', () => {
  console.log('d3.event is: ', d3.event);
  const offset = [d3.event.transform.x, d3.event.transform.y];
  const scale = d3.event.transform.k * 2000;

  projection.translate(offset)
    .scale(scale);

  svg.selectAll('path')
    .transition()
    .attr('d', path);

  svg.selectAll('circle')
    .transition()
    .attr('cx', d => projection([d.lon, d.lat])[0])
    .attr('cy', d => projection([d.lon, d.lat])[1]);
});

const map = svg.append('g')
  .attr('id', 'map')
  .call(zoomMap)
  .call(zoomMap.transform,
    d3.zoomIdentity
      .translate(chartWidth / 2, chartHeight / 2)
      .scale(1)
  );

map.append('rect')
  .attr('x', 0)
  .attr('y', 0)
  .attr('width', chartWidth)
  .attr('height', chartHeight)
  .attr('opacity', 0);

//Prep json
d3.json('zombie-attacks.json', zombieData => {
  color.domain([d3.min(zombieData, d => d.num), d3.max(zombieData, d => d.num)]);
  
  d3.json('us.json', usData => {
    usData.features.forEach((us_e, us_i) => {
      zombieData.forEach((z_e, z_i) => {
        if (us_e.properties.name !== z_e.state) {
          return null;
        }

        usData.features[us_i].properties.num = parseFloat(z_e.num);
      });
    });

    // console.log(usData);

    map.selectAll('path')
      .data(usData.features)
      .enter()
      .append('path')
      .attr('d', path)
      .attr('fill', d => {
        const num = d.properties.num;
        return (num) ? color(num) : '#ddd';
      })
      .attr('stroke', 'darkgrey')
      .attr('stroke-width', 1);

    drawCities();
  });
})

const drawCities = () => {
  d3.json('us-cities.json', (cityData) => {
    map.selectAll('circle')
      .data(cityData)
      .enter()
      .append('circle')
      .style('fill', 'gold')
      .style('opacity', 0.8)
      .attr('cx', d => projection([d.lon, d.lat])[0])
      .attr('cy', d => projection([d.lon, d.lat])[1])
      .attr('r', d => Math.sqrt(Number(d.population) * .00005))
      .append('title')
      .text(d => d.city);
  })
}

d3.selectAll('#buttons button').on('click', (d, i, nodes) => {
  let x = 0;
  let y = 0;
  let scale = 1;
  let distance = 100;
  let direction = d3.select(nodes[i]).attr('class');

  if (direction === 'up') {
    y += distance;
  } else if (direction === 'down') {
    y -= distance;
  } else if (direction === 'left') {
    x += distance;
  } else if (direction === 'right') {
    x -= distance;
  }

  map.transition()
    .call(zoomMap.translateBy, x, y);
})