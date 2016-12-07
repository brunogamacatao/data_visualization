'use strict';

var dataAnalysisApp = dataAnalysisApp || {};

dataAnalysisApp.charts.renderChartsPerWeight = function(data) {
  var svg = dataAnalysisApp.util.createSvg('#charts_per_weight');
  var chart = new dimple.chart(svg, data);

  chart.setBounds(50, 20, '90%', dataAnalysisApp.const.CHART_HEIGHT - 65);

  var xAxis = chart.addCategoryAxis('x', 'weight');
  xAxis.title = 'Player Weight (lbs)';
  chart.addColorAxis('height', ["#DA9694", "#FABF8F", "#C4D79B"]);

  var yAxis1 = chart.addMeasureAxis('y', 'homeRuns');
  yAxis1.title = 'Average Home Runs';

  var yAxis2 = chart.addMeasureAxis('y', 'avg');
  yAxis2.title = 'Average Batting Performance';

  var hrSeries = chart.addSeries('Average Home Runs', dimple.plot.area, [xAxis, yAxis1]);
  hrSeries.aggregate = dimple.aggregateMethod.avg;
  hrSeries.interpolation = 'step';
  hrSeries.lineMarkers = true;

  var avgSeries = chart.addSeries('Average Batting Performance', dimple.plot.bubble, [xAxis, yAxis2]);
  avgSeries.aggregate = dimple.aggregateMethod.avg;
  avgSeries.lineWeight = 3;
  avgSeries.lineMarkers = true;

  chart.addLegend('-150px', '10px', '60', '300', 'right');

  chart.draw();
}
