var handednessMap = {
    'R': 'right',
    'L': 'left',
    'B': 'both'
};

function createBaseballData(d) {
    return {
        name: d.name,
        handedness: handednessMap[d.handedness],
        height: parseInt(d.height),
        weight: parseInt(d.weight),
        avg: parseFloat(d.avg),
        homeRuns: parseInt(d.HR)
    };
}

function render(data) {
    var svg = dimple.newSvg("body", 800, 600);
    var chart = new dimple.chart(svg, data);

    var xAxis = chart.addCategoryAxis("x", "handedness");
    var yAxis = chart.addMeasureAxis("y", "homeRuns");

    var hrSeries = chart.addSeries("Home Runs", dimple.plot.bar, [xAxis, yAxis]);
    hrSeries.aggregate = dimple.aggregateMethod.avg;

    chart.draw();
}

d3.csv("data/baseball_data.csv", createBaseballData, render);
