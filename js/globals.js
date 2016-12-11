'use strict';

/*
 * This script contains globals functions and constants that could be used by
 * the whole application.
 */

// We define our variables/functions on a module to avoid name collision.
var dataAnalysisApp = dataAnalysisApp || {};

// We also define some submodules to better organize our app.
dataAnalysisApp.const  = {};
dataAnalysisApp.util   = {};
dataAnalysisApp.charts = {};

// The data file
dataAnalysisApp.const.DATA_CSV = 'data/baseball_data.csv';

// The default chart size
dataAnalysisApp.const.CHART_WIDTH  = "100%";
dataAnalysisApp.const.CHART_HEIGHT = 400;

// A dictionary to help presenting the handedness info in a more friendly way.
dataAnalysisApp.util.handednessMap = {
    'R': 'right',
    'L': 'left',
    'B': 'both'
};

/* 
 * A simple function to parse the data and place each item on a simple object 
 * structure.
 */
dataAnalysisApp.util.createBaseballData = function(d) {
    return {
        name:       d.name,
        handedness: dataAnalysisApp.util.handednessMap[d.handedness],
        height:     parseInt(d.height),
        weight:     parseInt(d.weight),
        avg:        parseFloat(d.avg),
        homeRuns:   parseInt(d.HR)
    };
};

// An utility function to help creating the svg element for the charts
dataAnalysisApp.util.createSvg = function(elementSelector) {
    return dimple.newSvg(elementSelector, 
        dataAnalysisApp.const.CHART_WIDTH, 
        dataAnalysisApp.const.CHART_HEIGHT);
};

// A dictionary to hold the colors for each handedness value
dataAnalysisApp.util.colorsByHandedness = {
    'right': "#3498db", // blue
    'left':  "#f1c40f", // yellow
    'both':  "#2ecc71" // green
};

// Performed some styling based on Dimple documentation:
// http://dimplejs.org/advanced_examples_viewer.html?id=advanced_custom_styling
// This function changes the bars colors according to the handedness value
dataAnalysisApp.util.styleBarsColorsByHandedness = function (s, d) {
  var shape = d3.select(s);

  // Set color according to handedness value.
  shape.style("fill", dataAnalysisApp.util.colorsByHandedness[d.cx]);
  shape.style("stroke", dataAnalysisApp.util.colorsByHandedness[d.cx]);
};    

// This function adds a rectangle to each bar, for styling reasons
dataAnalysisApp.util.styleBarsAddRectangles = function (svg, s, d) {
  var shape = d3.select(s);
  var goldenRatio = 1.61803398875;

  // Add a rectangle to the bar giving a nice style.  The idea was borrowed
  // from sirocco's question here:
  // http://stackoverflow.com/questions/25044608/dimplejs-barchart-styling-columns
  svg.append("rect")
    .attr("x", shape.attr("x"))
    .attr("y", shape.attr("y"))
    .attr("height", shape.attr("height"))
    .attr("width", (0.5 * shape.attr("width")) / goldenRatio)
    .style("fill", shape.style("stroke"))
    .style("opacity", 1)
    .style("pointer-events", "none");
};    

// This function adds a text element, in the middle of the bars with its value
dataAnalysisApp.util.styleBarsDrawText = function (svg, yAxis, s, d) {
  var shape = d3.select(s);

  var textX = parseFloat(shape.attr("x")) + shape.attr("width") / 2;
  var textY = parseFloat(shape.attr("y")) + (shape.attr("height") > 30 ? (shape.attr("height") / 2 + 8) : - 10);

  // Add some bar labels for the average handedness value
  svg.append("text")
    .attr("x", textX)
    .attr("y", textY)
    .style("font-family", "arial")
    .style("text-anchor", "middle")
    .style("font-size", "16px")
    .style("fill", "#000")
    .style("pointer-events", "none")
    .text(yAxis._getFormat()(d.yValue));
};    
