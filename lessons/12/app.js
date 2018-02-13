//Initial set up
const chartWidth = 800;
const chartHeight = 600;
const color = d3.scaleQuantize().range(
  ['#f7fcf0', '#e0f3db', '#ccebc5', '#a8ddb5', '#7bccc4', '#4eb3d3', '#2b8cbe', '#0868ac', '#084081']
);

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

    svg.selectAll('path')
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
  });
})

