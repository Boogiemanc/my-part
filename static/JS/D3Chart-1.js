
//SHARED CONSTANTS FOR DYNAMIC CHARTS 
let  Container_Bar = document.getElementById("svg_container");
var ContainerPos =Container_Bar.getBoundingClientRect();
let HEIGHT = 400;
let WIDTH= ContainerPos.width;

//CONSTANT FOR MARGINS
var Marginleft =50;
var MarginTop = 10;
var MarginBottom =  20;
var MarginRight = 90;

var ASPECT = WIDTH/HEIGHT;
//FAKE DATA /////
letters = ["A", "B", "C", "D", "E","F"]

//FUNCTIONS TO SEPERATE ALL THE SVGS////////////////////////////////////
////////////////BAR CHART////////////////////////////

    let data2 = letters;

    var svg1 = d3.select('#Chart1')
.attr("height",HEIGHT)
.attr("width",WIDTH)
.attr( "viewBox" ,[0, 0,  WIDTH ,HEIGHT]);
//scale
var scaleY = d3.scalePoint()
 .domain(data2)
 .range([HEIGHT-Marginleft,0 ]);
var scaleX= d3.scaleLinear()
.domain([ 100,0])
.range([ WIDTH-MarginRight,0 ]);
//test scale


d3.select(window)
.on("resize", function(){
    var target_Width  = svg1.node().getBoundingClientRect().width;
WIDTH = target_Width;
   // HEIGHT = target_Width/ASPECT;
    svg1.attr("width", "100%");
    svg1.attr("height", HEIGHT);
    scaleX= d3.scaleLinear()
    .domain([0, 100])
    .range([ HEIGHT ,MarginRight ]);

    scaleY = d3.scalePoint()
 .domain(data2)
 .range([HEIGHT-MarginRight,0  ]);
  
  
})



// Add  axis
var x_axis = d3.axisBottom().scale(scaleX);
var y_axis = d3.axisLeft(scaleY);
//create axis on chart
svg1.append("g")
.attr("transform",`translate(${Marginleft}, ${HEIGHT-MarginBottom-10})` )
.call(x_axis);
svg1.append("g")
.attr("transform",`translate( ${Marginleft},${MarginBottom} )`)
.call(y_axis);

///////////////////////////////////////
////PIE CHART//////////////////////////////////////////////////
let  Container_Pie = document.getElementById("svg_container2");
var ContainerPos_PI =Container_Pie.getBoundingClientRect();
let HEIGHT_PI = 600;//ContainerPos_PI.height;
let WIDTH_PI= 600;//ContainerPos_PI.width;

    let data = [];
let features = ["A", "B", "C", "D", "E","F"];
//gen FAKE DATA
for(var i=0; i<3; i++){
    var point ={}
    features.forEach(f => point[f] = 1+ Math.random()*8);
    data.push(point);
}
console.log(data);

//variables
let svg_pi = d3.select('#Chart_Pie')
.attr("height",HEIGHT_PI)
.attr("width",WIDTH_PI)
.attr( "viewBox" ,[0, 0,  WIDTH_PI ,HEIGHT_PI]);

let radialScale = d3.scaleLinear()
.domain([0,10])
.range([0,250]);
let ticks = [2,4,6,8,10];

svg_pi.selectAll("circle")
.data(ticks)
.join(
    enter => enter.append("circle")
    .attr("cx", WIDTH_PI/2)
    .attr("cy",HEIGHT_PI/2)
    .attr("fill","none")
    .attr("stroke","gray")
    .attr("r", d=> radialScale(d))



);

svg_pi.selectAll(".ticklabel")
.data(ticks)
.join(
    enter => enter.append("text")
    .attr("class","ticklabel")
    .attr("x", WIDTH_PI/2 + 5)
    .attr("y", d => HEIGHT_PI/2 - radialScale(d))
    .text(d=>d.toString())



);
//draw lines that extend outwards
//TRANSLATE ANGLE TO COORDS
function angleToCoordinate(angle, value){
    let x =Math.cos(angle) * radialScale(value);
    let y = Math.sin(angle) * radialScale(value);

    return{"x": WIDTH_PI/2 + x, "y": HEIGHT_PI/2 -y};
}

//GET PATH COORDS 
//iterates the field in each data point in order
//use field name and value to get coords for that attribute
function getPathCoordinates(data_point){
    let coords = []
    for(var i = 0; i< features.length; i++){
        let ft_name = features[i];
    let angle = (Math.PI/2) + (2* Math.PI*i/features.length);
    coords.push(angleToCoordinate(angle,data_point[ft_name]));
    }
    return coords;
}
////////////////////////////////////
//radiate lines for every 60 degrees

let featureData = features.map((f,i)=>{
    //f is features , i is index of features(?)
let angle = (Math.PI/2) + (2*Math.PI * i / features.length);
//use radian  to find angle of each features
return{
    "name": f,
    "angle": angle,
    "line_coord": angleToCoordinate(angle,10),
    "label_coord": angleToCoordinate(angle, 10.5)
};

});
//DRAW LINES
svg_pi.selectAll("line")
.data(featureData)
.join(
    enter => enter.append("line")
    .attr("x1",WIDTH_PI/2)
    .attr("y1", HEIGHT_PI /2)
    .attr("x2", d => d.line_coord.x)
    .attr("y2", d => d.line_coord.y)
    .attr("stroke","black")
);
//DRAW AXIS  LABEL
svg_pi.selectAll(".axislabel")
.data(featureData)
.join(
    enter => enter.append("text")
    .attr("x",d => d.label_coord.x)
    .attr("y", d => d.label_coord.y)
    .text(d => d.name)




);

let line = d3.line()
.x(d => d.x)
.y(d=> d.y)
let colors = ["darkorange","gray","navy"];

//Path of the element
svg_pi.selectAll("path")
.data(data)
.join(
    enter => enter.append("path")
    .datum(d => getPathCoordinates(d))
    .attr("d", line)
    .attr("stroke",(x,i) => colors[i])
    .attr("fill", (x,i) => colors[i])
    .attr("stroke-opacity",1)
    .attr("opacity", 0.5));


