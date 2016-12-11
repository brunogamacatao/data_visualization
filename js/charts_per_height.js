'use strict';

var dataAnalysisApp = dataAnalysisApp || {};

/*
 * This function draws a bar chart of Player's Average Number of Home Runs
 * according to it's height, correlating this information with the Player's
 * Average Batting Performance, via a superposed line chart. The idea is to 
 * easily visualize the overall player's performance according to their height.
 */
dataAnalysisApp.charts.renderChartsPerHeight = function(data) {
  var svg = dataAnalysisApp.util.createSvg('#charts_per_height');
  var chart = new dimple.chart(svg, data);

  // This is a bigger chart, so it needed a different sizing
  chart.setBounds(50, 20, '90%', dataAnalysisApp.const.CHART_HEIGHT - 60);

  // The global x axis is the player's height
  var xAxis = chart.addCategoryAxis('x', 'height');
  xAxis.title = 'Player Height (Inches)';

  // The first y axis is the player's average number of home runs
  var yAxis1 = chart.addMeasureAxis('y', 'homeRuns');
  yAxis1.title = 'Average Home Runs';

  // The second y axis the the player's average batting performance
  var yAxis2 = chart.addMeasureAxis('y', 'avg');
  yAxis2.title = 'Average Batting Performance';

  // The first series (Average Home Runs per Height) is drawn as a bar chart
  var hrSeries = chart.addSeries('Average Home Runs', 
    dimple.plot.bar, 
    [xAxis, yAxis1]);

  hrSeries.aggregate = dimple.aggregateMethod.avg;
  // We've added some line markers to ease the data visualization
  hrSeries.lineMarkers = true;

  // We also added some styling for a beautiful chart
  hrSeries.afterDraw = function(s, d) {
    dataAnalysisApp.util.styleBarsDrawText(svg, yAxis1, s, d);
  };

  // The second series (Average Batting Performance per Height) is a line chart
  var avgSeries = chart.addSeries('Average Batting Performance', 
    dimple.plot.line, 
    [xAxis, yAxis2]);
  
  avgSeries.aggregate = dimple.aggregateMethod.avg;
  // We're drawing a thicker line with markers to ease the data visualization
  avgSeries.lineWeight = 3;
  avgSeries.lineMarkers = true;

  // We've also added a legend, as we have two series
  chart.addLegend('-150px', '10px', '60', '300', 'right');

  chart.draw();
}
