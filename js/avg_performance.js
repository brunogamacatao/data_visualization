'use strict';

var dataAnalysisApp = dataAnalysisApp || {};

dataAnalysisApp.charts.renderAvgPerformance = function(data) {
  var svg = dataAnalysisApp.util.createSvg('#avg_performance');
  var chart = new dimple.chart(svg, data);

  var xAxis = chart.addCategoryAxis('x', 'handedness');
  xAxis.title = 'Player Handedness';

  var yAxis = chart.addMeasureAxis('y', 'avg');
  yAxis.title = "Player's Average Batting Performance";

  var avgSeries = chart.addSeries('Average Batting Performance', dimple.plot.bar, [xAxis, yAxis]);
  avgSeries.aggregate = dimple.aggregateMethod.avg;

  avgSeries.afterDraw = function(s, d) {
    dataAnalysisApp.util.styleBarsColorsByHandedness(s, d);
    dataAnalysisApp.util.styleBarsAddRectangles(svg, s, d);
    dataAnalysisApp.util.styleBarsDrawText(svg, yAxis, s, d);
  };

  chart.draw();
};