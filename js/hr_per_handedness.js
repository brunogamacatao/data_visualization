'use strict';

var dataAnalysisApp = dataAnalysisApp || {};

/*
 * This function draws a bar chart of Player's Average Number of Home Runs
 * according to it's Handedness. 
 */
dataAnalysisApp.charts.renderHrPerHandedness = function(data) {
  var svg = dataAnalysisApp.util.createSvg('#hr_per_handedness');
  var chart = new dimple.chart(svg, data);

  // The x axis is Player's Handedness
  var xAxis = chart.addCategoryAxis('x', 'handedness');
  xAxis.title = 'Player Handedness';

  // The y axis is Player's Average Number of Home Runs
  var yAxis = chart.addMeasureAxis('y', 'homeRuns');
  yAxis.title = 'Average Number of Home Runs';

  // Add the series to the chart (plotting it as bars)
  var hrSeries = chart.addSeries('Home Runs', 
    dimple.plot.bar, 
    [xAxis, yAxis]);

  // The number of home runs is aggregated as the average, for each handedness 
  // value
  hrSeries.aggregate = dimple.aggregateMethod.avg;

  // Add some styling, to ease the chart interpretation
  hrSeries.afterDraw = function(s, d) {
    dataAnalysisApp.util.styleBarsColorsByHandedness(s, d);
    dataAnalysisApp.util.styleBarsAddRectangles(svg, s, d);
    dataAnalysisApp.util.styleBarsDrawText(svg, yAxis, s, d);
  };

  chart.draw();
}
