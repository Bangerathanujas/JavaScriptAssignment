function InitChart() {
d3.json("result1.json", function(data) {
makeChart(data);
});

function makeChart(data) {
 var dataGroup = d3.nest()
  .key(function(d) {
   return d.IndicatorName;
  })
  .entries(data);

 var vis = d3.select("#visualisation"),
  WIDTH = 1000,
  HEIGHT = 500,
  MARGINS = {
   top: 50,
   right: 20,
   bottom: 50,
   left: 50
  },

  xScale = d3.scale.linear().range([MARGINS.left, WIDTH - MARGINS.right]).domain([d3.min(data, function(d) {
   return d.Year;
  }), d3.max(data, function(d) {
   return d.Year;
  })]),
  yScale = d3.scale.linear().range([HEIGHT - MARGINS.top, MARGINS.bottom]).domain([d3.min(data, function(d) {
   return d.Value;
  }), d3.max(data, function(d) {
   return d.Value;
  })]),

  xAxis = d3.svg.axis()
  .scale(xScale),

  yAxis = d3.svg.axis()
  .scale(yScale)
  .orient("left");

 vis.append("svg:g")
  .attr("class", "axis")
  .attr("transform", "translate(0," + (HEIGHT - MARGINS.bottom) + ")")
  .call(xAxis);

 vis.append("svg:g")
  .attr("class", "axis")
  .attr("transform", "translate(" + (MARGINS.left) + ",0)")
  .call(yAxis);

 var lineGen = d3.svg.line()
  .x(function(d) {
   return xScale(d.Year);
  })
  .y(function(d) {
   return yScale(d.Value);
  })
  .interpolate("basis");

 lSpace = WIDTH / dataGroup.length;

 dataGroup.forEach(function(d, i) {
  vis.append("text")
   .attr("x", (lSpace / 2) + i * lSpace)
   .attr("y", HEIGHT)
   .style("fill", "black")
   .text(d.key);
  vis.append('svg:path')
   .attr('d', lineGen(d.values))
   .attr('stroke', function(d, j) {
    return "hsl(" + Math.random() * 360 + ",100%,50%)";
   })
   .attr('stroke-width', 2)
   .attr('fill', 'none')
   .attr('id', 'line_' + d.key)
   .on('click', function() {
    alert(d.key);
   });
 });

}
}
InitChart();
