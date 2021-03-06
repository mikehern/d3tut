const data = [
  { date: 1988, num: 51 }, { date: 1989, num: 60 },
  { date: 1990, num: 62 }, { date: 1991, num: -64 },
  { date: 1992, num: 69 }, { date: 1993, num: 69 },
  { date: 1994, num: 75 }, { date: 1995, num: 80 },
  { date: 1996, num: 91 }, { date: 1997, num: 93 },
  { date: 1998, num: 97 }, { date: 1999, num: 100 },
  { date: 2000, num: -103 }, { date: 2001, num: 104 },
  { date: 2002, num: 105 }, { date: 2003, num: 110 },
  { date: 2004, num: 111 }, { date: 2005, num: 112 },
  { date: 2006, num: 112 }, { date: 2007, num: 113 },
  { date: 2008, num: 119 }, { date: 2009, num: 128 },
  { date: 2010, num: 139 }, { date: 2011, num: -139 },
  { date: 2012, num: 139 }, { date: 2013, num: 140 },
  { date: 2014, num: 143 }, { date: 2015, num: 146 },
];

//Prep and mutate dataset
const timeParse = d3.timeParse('%Y');
const timeFormat = d3.timeFormat('%Y');
data.forEach((el) => el.date = timeParse(el.date));

//Prep chart dimensions
const chartWidth = 1000;
const chartHeight = 800;
const padding = 50;


//Create scales
const xScale = d3.scaleTime()
  .domain([d3.min(data, d => d.date), d3.max(data, d => d.date)])
  .range([padding, chartWidth - padding]);

const yScale = d3.scaleLinear()
  .domain([0, d3.max(data, d => d.num)])
  .range([chartHeight - padding, padding]);

//Create chart
const svg = d3.select('#chart')
  .append('svg')
  .attr('width', chartWidth)
  .attr('height', chartHeight);

//Create axes
const xAxis = d3.axisBottom(xScale)
  .ticks(10)
  .tickFormat(timeFormat);
  
const yAxis = d3.axisLeft(yScale)
  .ticks(12)

svg.append('g')
  .attr('transform', `translate(0, ${chartHeight - padding})`)
  .call(xAxis);

svg.append('g')
  .attr('transform', `translate(${padding}, 0)`)
  .call(yAxis);

//Create line
const line = d3.line()
  //Useful function for removing outliers
  .defined(d => (d.num > 0 && d.num < 100))
  .x(d => xScale(d.date))
  .y(d => yScale(d.num));

  const redLine = d3.line()
  //Useful function for removing outliers
  .defined(d => (d.num >= 100))
  .x(d => xScale(d.date))
  .y(d => yScale(d.num));

//Create area
const area = d3.area()
  .defined(d => (d.num > 0))
  .x(d => xScale(d.date))
  .y0(d => yScale.range()[0])
  .y1(d => yScale(d.num));

const redArea = d3.area()
  .defined(d => (d.num > 100))
  .x(d => xScale(d.date))
  .y0(d => yScale(100))
  .y1(d => yScale(d.num));

svg.append('path')
  .datum(data)
  .attr('fill', '#006bb6')
  // .attr('stroke', '#006bb6')
  // .attr('stroke-width', 5)
  .attr('d', area);

svg.append('path')
  .datum(data)
  .attr('fill', 'tomato')
  // .attr('stroke', 'tomato')
  // .attr('stroke-width', 5)
  .attr('d', redArea);



