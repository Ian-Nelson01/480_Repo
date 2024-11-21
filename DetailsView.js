
google.charts.load("current", { packages: ["corechart"] })
google.charts.setOnLoadCallback(drawChart)

function drawChart() {
  var data = google.visualization.arrayToDataTable([
    ["Year", "Sales"],
    ["2013", 1000],
    ["2014", 1170],
    ["2015", 660],
    ["2016", 1030],
  ])
  

  var options = {
    title: "Company Performance",
    hAxis: { title: "Year", titleTextStyle: { color: "#0196b1" } },
    vAxis: { minValue: 0 },
    colors: ['#0196b1'],
legend: {position: 'none'},
  }

  var chart = new google.visualization.AreaChart(
    document.getElementById("chart_div"),
  )
  chart.draw(data, options)
}
