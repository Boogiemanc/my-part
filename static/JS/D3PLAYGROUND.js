
d3.select("h1").style('color', 'darkblue');
d3.select("h2").style('font-size', '24px');
var svg = d3.select('#Chart2');
svg.append('rect')
   .attr('x', 0)
   .attr('y', 0)
   .attr('width', 500)
   .attr('height', 500)
   .attr('fill', 'green');