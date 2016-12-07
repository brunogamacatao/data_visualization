'use strict';

var dataAnalysisApp = dataAnalysisApp || {};

dataAnalysisApp.charts.renderHrPerHandedness = function(data) {
  var svg = dataAnalysisApp.util.createSvg('#hr_per_handedness');
  var chart = new dimple.chart(svg, data);

  var xAxis = chart.addCategoryAxis('x', 'handedness');
  xAxis.title = 'Player Handedness';

  var yAxis = chart.addMeasureAxis('y', 'homeRuns');
  yAxis.title = 'Average Number of Home Runs';

  var hrSeries = chart.addSeries('Home Runs', dimple.plot.bar, [xAxis, yAxis]);
  hrSeries.aggregate = dimple.aggregateMethod.avg;

  hrSeries.afterDraw = function(s, d) {
    dataAnalysisApp.util.styleBarsColorsByHandedness(s, d);
    dataAnalysisApp.util.styleBarsAddRectangles(svg, s, d);
    dataAnalysisApp.util.styleBarsDrawText(svg, yAxis, s, d);
  };

  chart.draw();
}
