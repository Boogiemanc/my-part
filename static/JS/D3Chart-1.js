
var Container = document.getElementById("svg_container");
var ContainerPos =Container.getBoundingClientRect();
var HEIGHT = ContainerPos.height;
var WIDTH= ContainerPos.width;
//CONSTANT FOR MARGINS
var Marginleft =50;
var MarginTop = 15;
var MarginBottom =  5;
var MarginRight = 15;

var ASPECT = WIDTH/HEIGHT; 

var svg1 = d3.select('#Chart1')
.attr("height",HEIGHT)
.attr("width",WIDTH)
.attr( "viewBox" ,[0, 0,  WIDTH ,HEIGHT]);
//scale
var scaleY= d3.scaleLinear()
var scaleX = d3.scaleLinear()
                  .domain([d3.min(data), d3.max(data)])
                  .range([0, WIDTH-MarginRight  ]);

 var x_axis = d3.axisBottom().scale(scaleX)
.domain([0, 100])
.range([ HEIGHT ,0 ])
//test scale
var data = [0, 15, 20, 25, 30];

d3.select(window)
.on("resize", function(){
    var target_Width  = svg1.node().getBoundingClientRect().width;
WIDTH = target_Width;
   // HEIGHT = target_Width/ASPECT;
    svg1.attr("width", "100%");
    svg1.attr("height", HEIGHT);

     scaleY= d3.scaleLinear()
    .domain([0, 100])
    .range([ HEIGHT ,0 ]);  

  
})


;

svg1.append("g")
.attr("transform",`translate(${Marginleft}, ${HEIGHT-MarginBottom})` )
.call(x_axis);

//add yaxis
var scaleY= d3.scaleLinear()
.domain([0, 100])
.range([ HEIGHT ,0 ]);

// Add scales to axis

var y_axis = d3.axisLeft(scaleY);
//create chart

svg1.append("g")
.attr("transform",`translate( ${Marginleft},${MarginBottom} )`)
.call(y_axis);

