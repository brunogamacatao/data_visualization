'use strict';

var dataAnalysisApp = dataAnalysisApp || {};

/*
 * This function draws a bar chart of Player's Average Batting Performance
 * according to it's Handedness. 
 */
dataAnalysisApp.charts.renderAvgPerformance = function(data) {
  var svg = dataAnalysisApp.util.createSvg('#avg_performance');
  var chart = new dimple.chart(svg, data);

  // The x axis is Player's Handedness
  var xAxis = chart.addCategoryAxis('x', 'handedness');
  xAxis.title = 'Player Handedness';

  // The y axis is Player's Average Batting Performance
  var yAxis = chart.addMeasureAxis('y', 'avg');
  yAxis.title = "Player's Average Batting Performance";

  // Add the series to the chart (plotting it as bars)
  var avgSeries = chart.addSeries('Average Batting Performance', 
    dimple.plot.bar, 
    [xAxis, yAxis]);

  // The batting performance is aggregated as the average, for each handedness 
  // value
  avgSeries.aggregate = dimple.aggregateMethod.avg;

  // Add some styling, to ease the chart interpretation
  avgSeries.afterDraw = function(s, d) {
    dataAnalysisApp.util.styleBarsColorsByHandedness(s, d);
    dataAnalysisApp.util.styleBarsAddRectangles(svg, s, d);
    dataAnalysisApp.util.styleBarsDrawText(svg, yAxis, s, d);
  };

  // Draw the chart
  chart.draw();
};