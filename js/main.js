'use strict';

var dataAnalysisApp = dataAnalysisApp || {};

dataAnalysisApp.util.main = function(data) {
  dataAnalysisApp.charts.renderHrPerHandedness(data);
  dataAnalysisApp.charts.renderAvgPerformance(data);
  dataAnalysisApp.charts.renderChartsPerHeight(data);
  dataAnalysisApp.charts.renderChartsPerWeight(data);
};

d3.csv('data/baseball_data.csv', 
  dataAnalysisApp.util.createBaseballData, 
  dataAnalysisApp.util.main);

// Although Bootstrap has automatic tabs, Dimple has an issue with them:
// https://github.com/PMSI-AlignAlytics/dimple/issues/34
// So, I had to implement the tabs behavior in JQuery.
$(function() {
  var selectChartsByHandedness = function(evt) {
    evt && evt.preventDefault();
    $('#per_handedness_tab').parent().addClass('active');
    $('#per_height_tab,#per_weight_tab,#conclusions_tab').parent().removeClass('active');
    $('#per_handedness').show();
    $('#per_height,#per_weight,#conclusions').hide();
  };

  var selectChartsByHeight = function(evt) {
    evt && evt.preventDefault();
    $('#per_height_tab').parent().addClass('active');
    $('#per_handedness_tab,#per_weight_tab,#conclusions_tab').parent().removeClass('active');
    $('#per_height').show();
    $('#per_handedness,#per_weight,#conclusions').hide();
  };

  var selectChartsByWeight = function(evt) {
    evt && evt.preventDefault();
    $('#per_weight_tab').parent().addClass('active');
    $('#per_handedness_tab,#per_height_tab,#conclusions_tab').parent().removeClass('active');
    $('#per_weight').show();
    $('#per_handedness,#per_height,#conclusions').hide();
  };

  var selectConclusions = function(evt) {
    evt && evt.preventDefault();
    $('#conclusions_tab').parent().addClass('active');
    $('#per_handedness_tab,#per_height_tab,#per_weight_tab').parent().removeClass('active');
    $('#conclusions').show();
    $('#per_handedness,#per_height,#per_weight').hide();
  };

  $('#per_handedness_tab').click(selectChartsByHandedness);
  $('#per_height_tab').click(selectChartsByHeight);
  $('#per_weight_tab').click(selectChartsByWeight);
  $('#conclusions_tab').click(selectConclusions);

  selectChartsByHandedness();
});