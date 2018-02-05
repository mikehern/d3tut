d3.dsv(',', 'data.csv')
  .then(d => {generate(d.columns), console.log('csv data: ', d)});

// const dataset = [10, 20, 30, 40, 50];

// d3.json('data.json')
//   .then(d => {generate(d), console.log('json data:', d)});


const generate = (dataset) => {
  const el = d3.select('body')
    .selectAll('div')
    .data(dataset)
    .enter()
    .append('div')
    .text(d => `Combinining string text with ${d}`)
    .attr('class', d => (d > 25) ? 'foo' : null)
    // .append('p')
    // .classed('foo', true)
    .classed('nar', d => (d < 25))
    // .text('Sup!')
    .style('color', d => (d > 25) ? 'red' : 'blue');
  console.log('el: ', el);
}
