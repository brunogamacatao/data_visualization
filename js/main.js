'use strict';

/*
 * This function boots app the whole application, loads the data, calls each
 * chart function and assign some functions to UI elements.
 */

// Application's main module
var dataAnalysisApp = dataAnalysisApp || {};

// The main function, responsible for drawing each chart passing the data
dataAnalysisApp.util.main = function(data) {
  dataAnalysisApp.charts.renderHrPerHandedness(data);
  dataAnalysisApp.charts.renderAvgPerformance(data);
  dataAnalysisApp.charts.renderChartsPerHeight(data);
  dataAnalysisApp.charts.renderChartsPerWeight(data);
};

// Loads the csv data, passing the item factory and callback functions
d3.csv(dataAnalysisApp.const.DATA_CSV, 
  dataAnalysisApp.util.createBaseballData, 
  dataAnalysisApp.util.main);

// Although Bootstrap has automatic tabs, Dimple has an issue with them:
// https://github.com/PMSI-AlignAlytics/dimple/issues/34
// So, I had to implement the tabs behavior in JQuery.
$(function() {
  // This function is called whenever the ChartsByHandedness tab is clicked
  var selectChartsByHandedness = function(evt) {
    evt && evt.preventDefault();
    $('#per_handedness_tab').parent().addClass('active');
    $('#per_height_tab,#per_weight_tab,#conclusions_tab').parent().
      removeClass('active');
    $('#per_handedness').show();
    $('#per_height,#per_weight,#conclusions').hide();
  };

  // This function is called whenever the ChartsByHeight tab is clicked
  var selectChartsByHeight = function(evt) {
    evt && evt.preventDefault();
    $('#per_height_tab').parent().addClass('active');
    $('#per_handedness_tab,#per_weight_tab,#conclusions_tab').parent().
      removeClass('active');
    $('#per_height').show();
    $('#per_handedness,#per_weight,#conclusions').hide();
  };

  // This function is called whenever the ChartsByWeight tab is clicked
  var selectChartsByWeight = function(evt) {
    evt && evt.preventDefault();
    $('#per_weight_tab').parent().addClass('active');
    $('#per_handedness_tab,#per_height_tab,#conclusions_tab').parent().
      removeClass('active');
    $('#per_weight').show();
    $('#per_handedness,#per_height,#conclusions').hide();
  };

  // This function is called whenever the Conclusions tab is clicked
  var selectConclusions = function(evt) {
    evt && evt.preventDefault();
    $('#conclusions_tab').parent().addClass('active');
    $('#per_handedness_tab,#per_height_tab,#per_weight_tab').parent().
      removeClass('active');
    $('#conclusions').show();
    $('#per_handedness,#per_height,#per_weight').hide();
  };

  // Assign the click callback functions with the respective UI elements
  $('#per_handedness_tab').click(selectChartsByHandedness);
  $('#per_height_tab').click(selectChartsByHeight);
  $('#per_weight_tab').click(selectChartsByWeight);
  $('#conclusions_tab').click(selectConclusions);

  // Select the first tab as default
  selectChartsByHandedness();
});