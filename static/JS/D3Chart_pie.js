
let Container_Pie = document.getElementById("svg_container2");
var ContainerPos =Container_Pie.getBoundingClientRect();
let HEIGHT = ContainerPos.height;
let WIDTH= ContainerPos.width;

//CONSTANT FOR MARGINS
var Marginleft =50;
var MarginTop = 10;
var MarginBottom =  20;
var MarginRight = 30;

var ASPECT = WIDTH/HEIGHT;
//FAKE DATA CONSTANTS 


d3.select(window)
.on("resize", function(){
    var target_Width  = svg1.node().getBoundingClientRect().width;
WIDTH = target_Width;
   // HEIGHT = target_Width/ASPECT;
    svg1.attr("width", "100%");
    svg1.attr("height", HEIGHT);
  
  
  
})




