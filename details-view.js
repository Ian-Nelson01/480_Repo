/*********************
*   Details View JS  *
*********************/

// Load funtions from interface.js
import { query_intraday } from './modules/interface.js';
import { query_daily } from './modules/interface.js';
import { query_monthly } from './modules/interface.js';

// API loaders
google.charts.load("current", { packages: ["corechart"] })
google.charts.setOnLoadCallback(drawChart)


var stockSymbol = "aapl"

/*********************
*    Date Buttons    *
*********************/

//button listener
document.addEventListener("DOMContentLoaded", () => {
  // Add event listeners to buttons
  const buttons = document.querySelectorAll('.timelineButtons input[type="button"]');
  buttons.forEach(button => {
    button.addEventListener('click', () => markPressed(button));
  });
});

// Css class modifier to mark button as pressed
export function markPressed(button) {
  // Remove "pressed" class from all buttons
  const buttons = document.querySelectorAll('input[type="button"]');
  buttons.forEach(btn => btn.classList.remove('pressed'));
  // Add "pressed" class to the clicked button
  button.classList.add('pressed');
  
  // Only call getStonkData after button press
  const buttonValue = getPressedButton() || "1D"; // Default to "1D" if no button is pressed
  getStonkData(buttonValue).then(() => {
    getStonkData(buttonValue);
  });
}

// Function to get the currently pressed button
function getPressedButton() {
  const pressedButton = document.querySelector('input[type="button"].pressed');
  if (pressedButton) {
    return pressedButton.value; // Return the value of the pressed button
  }
  return null; // No button is pressed
}

// Switch for displaying time title from button press
function getButtonTitle(buttonValue) {
  switch (buttonValue) {
    case "1D":
      return "Today";
    case "5D":
      return "Past 5 Days";
    case "1M":
      return "Past Month";
    case "6M":
      return "Past 6 Months";
    case "YTD":
      return "Year to Date";
    case "1Y":
      return "Past Year";
    case "5Y":
      return "Past 5 Years";
    case "ALL":
      return "All Time";
    default:
      return "Unknown Range";
  }
}

// Switch to change graph range based on button press
function getStonkData(buttonValue) {
  switch (buttonValue) {
    case "1D":
      query_intraday(stockSymbol, 1440)
      .then((data) => {
        // Clear the current test data before populating it
        timeLineTestData = [["Time", "Price"]]; // Headers

        // Assuming data is an object with timestamp as the key
        const timestamps = Object.keys(data).sort(); // Sort timestamps in ascending order (oldest to newest)

        // Loop through sorted timestamps and extract time and close price
        timestamps.forEach((timestamp) => {
          // Format the timestamp to show only the time (HH:MM)
          const time = new Date(timestamp).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });

          // Extract the closing price
          const closePrice = parseFloat(data[timestamp].close); // Ensure it's a number

          // Add formatted time and close price to timeLineTestData
          timeLineTestData.push([time, closePrice]);
        });

        // Redraw the chart after data is updated
        drawChart();
      })
      .catch((error) => {
        console.error("Error fetching intraday data:", error);
      });
    break;

    case "5D":
    query_daily(stockSymbol)
    .then((data) => {
      // Clear the current test data before populating it
      timeLineTestData = [["Date", "Price"]]; // Headers

      // Get the last 5 data points (most recent 5 days)
      const lastFiveDays = Object.keys(data)
        .sort((a, b) => new Date(b) - new Date(a)) // Sort timestamps in descending order (most recent first)
        .slice(0, 5); // Get the most recent 5 entries

      // Loop through the last 5 sorted timestamps and extract the date and close price
      lastFiveDays.forEach((timestamp) => {
        // Format the timestamp to show only the date (YYYY-MM-DD)
        const date = new Date(timestamp).toLocaleDateString(); // Format to "YYYY-MM-DD"

        // Extract the closing price
        const closePrice = parseFloat(data[timestamp].close); // Ensure it's a number

        // Add formatted date and close price to timeLineTestData
        timeLineTestData.push([date, closePrice]);
      });

      // Redraw the chart after data is updated
      drawChart();
    })
    .catch((error) => {
      console.error("Error fetching daily data:", error);
    });
  break;

    case "1M":
      query_daily(stockSymbol)
      .then((data) => {
      // Clear the current test data before populating it
      timeLineTestData = [["Date", "Price"]]; // Headers

      // Get the last 30 data points (most recent 30 days)
      const last30Days = Object.keys(data)
        .sort((a, b) => new Date(b) - new Date(a)) // Sort timestamps in descending order (most recent first)
        .slice(0, 30); // Get the most recent 30 entries

      // Loop through the last 30 sorted timestamps and extract the date and close price
      last30Days.forEach((timestamp) => {
        // Format the timestamp to show only the date (YYYY-MM-DD)
        const date = new Date(timestamp).toLocaleDateString(); // Format to "YYYY-MM-DD"

        // Extract the closing price
        const closePrice = parseFloat(data[timestamp].close); // Ensure it's a number

        // Add formatted date and close price to timeLineTestData
        timeLineTestData.push([date, closePrice]);
      });

      // Redraw the chart after data is updated
      drawChart();
    })
    .catch((error) => {
      console.error("Error fetching daily data:", error);
    });
  break;
    case "6M":
      query_daily(stockSymbol)
      .then((data) => {
      // Clear the current test data before populating it
      timeLineTestData = [["Date", "Price"]]; // Headers

      // Get the last 182 data points (most recent 30 days)
      const last182Days = Object.keys(data)
        .sort((a, b) => new Date(b) - new Date(a)) // Sort timestamps in descending order (most recent first)
        .slice(0, 182); // Get the most recent 182 entries

      // Loop through the last 30 sorted timestamps and extract the date and close price
      last182Days.forEach((timestamp) => {
        // Format the timestamp to show only the date (YYYY-MM-DD)
        const date = new Date(timestamp).toLocaleDateString(); // Format to "YYYY-MM-DD"

        // Extract the closing price
        const closePrice = parseFloat(data[timestamp].close); // Ensure it's a number

        // Add formatted date and close price to timeLineTestData
        timeLineTestData.push([date, closePrice]);
      });

      // Redraw the chart after data is updated
      drawChart();
    })
    .catch((error) => {
      console.error("Error fetching daily data:", error);
    });
  break;
    case "YTD":
      query_monthly(stockSymbol)
      .then((data) => {
      // Clear the current test data before populating it
      timeLineTestData = [["Date", "Price"]]; // Headers

      // Get the last 182 data points (most recent 30 days)
      const last12months = Object.keys(data)
        .sort((a, b) => new Date(b) - new Date(a)) // Sort timestamps in descending order (most recent first)
        .slice(0, 12); // Get the most recent 182 entries

      // Loop through the last 182 sorted timestamps and extract the date and close price
      last12months.forEach((timestamp) => {
        // Format the timestamp to show only the date (YYYY-MM-DD)
        const date = new Date(timestamp).toLocaleDateString(); // Format to "YYYY-MM-DD"

        // Extract the closing price
        const closePrice = parseFloat(data[timestamp].close); // Ensure it's a number

        // Add formatted date and close price to timeLineTestData
        timeLineTestData.push([date, closePrice]);
      });

      // Redraw the chart after data is updated
      drawChart();
    })
    .catch((error) => {
      console.error("Error fetching daily data:", error);
    });
  break;
    case "1Y":
      query_monthly(stockSymbol)
      .then((data) => {
      // Clear the current test data before populating it
      timeLineTestData = [["Date", "Price"]]; // Headers

      // Get the last 12 data points (most recent 30 days)
      const last12months = Object.keys(data)
        .sort((a, b) => new Date(b) - new Date(a)) // Sort timestamps in descending order (most recent first)
        .slice(0, 12); // Get the most recent 12 entries

      // Loop through the last 12 sorted timestamps and extract the date and close price
      last12months.forEach((timestamp) => {
        // Format the timestamp to show only the date (YYYY-MM-DD)
        const date = new Date(timestamp).toLocaleDateString(); // Format to "YYYY-MM-DD"

        // Extract the closing price
        const closePrice = parseFloat(data[timestamp].close); // Ensure it's a number

        // Add formatted date and close price to timeLineTestData
        timeLineTestData.push([date, closePrice]);
      });

      // Redraw the chart after data is updated
      drawChart();
    })
    .catch((error) => {
      console.error("Error fetching daily data:", error);
    });
  break;
    case "5Y":
      query_monthly(stockSymbol)
      .then((data) => {
      // Clear the current test data before populating it
      timeLineTestData = [["Date", "Price"]]; // Headers

      // Get the last 60 data points (most recent 30 days)
      const last60months = Object.keys(data)
        .sort((a, b) => new Date(b) - new Date(a)) // Sort timestamps in descending order (most recent first)
        .slice(0, 12); // Get the most recent 60 entries

      // Loop through the last 60 sorted timestamps and extract the date and close price
      last60months.forEach((timestamp) => {
        // Format the timestamp to show only the date (YYYY-MM-DD)
        const date = new Date(timestamp).toLocaleDateString(); // Format to "YYYY-MM-DD"

        // Extract the closing price
        const closePrice = parseFloat(data[timestamp].close); // Ensure it's a number

        // Add formatted date and close price to timeLineTestData
        timeLineTestData.push([date, closePrice]);
      });

      // Redraw the chart after data is updated
      drawChart();
    })
    .catch((error) => {
      console.error("Error fetching daily data:", error);
    });
  break;
    case "ALL":
  query_monthly(stockSymbol)
    .then((data) => {
      // Clear the current test data before populating it
      timeLineTestData = [["Date", "Price"]]; // Headers

      // Get all available data (no truncation, show all available months)
      const allMonths = Object.keys(data)
        .sort((a, b) => new Date(a) - new Date(b)); // Sort timestamps in ascending order (oldest to newest)

      // Loop through all sorted timestamps and extract the date and close price
      allMonths.forEach((timestamp) => {
        // Format the timestamp to show only the date (YYYY-MM-DD)
        const date = new Date(timestamp).toLocaleDateString(); // Format to "YYYY-MM-DD"

        // Extract the closing price
        const closePrice = parseFloat(data[timestamp].close); // Ensure it's a number

        // Add formatted date and close price to timeLineTestData
        timeLineTestData.push([date, closePrice]);
      });

      // Redraw the chart after data is updated
      drawChart();
    })
    .catch((error) => {
      console.error("Error fetching monthly data:", error);
    });
  break;
    default:
      return "Unknown Range";
  }
}




// Sample data for table
var timeLineTestData = [
  ["Year", "Sales"],
  ["1980", 2982],
  ["1981", 2893],
  ["1982", 3547],
  ["1983", 1420],
  ["1984", 2972],
  ["1985", 4673],
  ["1986", 2435],
  ["1987", 3499],
  ["1988", 4922],
  ["1989", 3629],
  ["1990", 4249],
  ["1991", 2680],
  ["1992", 4945],
  ["1993", 2618],
  ["1994", 3700],
  ["1995", 3384],
  ["1996", 2965],
  ["1997", 4134],
  ["1998", 3507],
  ["1999", 3154],
  ["2000", 4270],
  ["2001", 4709],
  ["2002", 4672],
  ["2003", 4638],
  ["2004", 3884],
  ["2005", 4900],
  ["2006", 3586],
  ["2007", 3444],
  ["2008", 3814],
  ["2009", 4466],
  ["2010", 4122],
  ["2011", 4433],
  ["2012", 3148],
  ["2013", 3677],
  ["2014", 2843],
  ["2015", 4360],
  ["2016", 4658],
  ["2017", 3876],
  ["2018", 4821],
  ["2019", 3204],
  ["2020", 4452],
  ["2021", 4978],
  ["2022", 3110],
  ["2023", 3598],
  ["2024", 4700],
  ["2025", 4065],
  ["2026", 4822],
  ["2027", 3501],
  ["2028", 3939],
  ["2029", 4791],
  ["2030", 3178],
  ["2031", 3625],
  ["2032", 4410],
  ["2033", 4950],
  ["2034", 3078],
  ["2035", 3855],
  ["2036", 4680],
  ["2037", 3529],
  ["2038", 4105],
  ["2039", 4963],
  ["2040", 3368],
  ["2041", 4291],
  ["2042", 4995],
  ["2043", 3406],
  ["2044", 4230],
  ["2045", 4875],
  ["2046", 3129],
  ["2047", 3967],
  ["2048", 4668],
  ["2049", 3342],
  ["2050", 4040],
  ["2051", 4722],
  ["2052", 3085],
  ["2053", 3751],
  ["2054", 4525],
  ["2055", 3412],
  ["2056", 4179],
  ["2057", 4901],
]


/*********************
*       Chart        *
*********************/

// API chart draw function from google
function drawChart() {
  const buttonValue = getPressedButton() || "1D"; // Default to "1D" if no button is pressed
  getStonkData(buttonValue);
  var data = google.visualization.arrayToDataTable(timeLineTestData);

  // Calculate the delta (change) from the first to the last data point
  var firstValue = data.getValue(0, 1);  // 2nd row, 2nd column 
  var lastValue = data.getValue(data.getNumberOfRows() - 1, 1);  // Last row, 2nd column
  var delta = lastValue - firstValue;
  

  // Set the color based on the delta (green if positive, red if negative)
  var chartColor = delta >= 0 ? '#28a745' : '#dc3545';
  
  // Format chart
  var options = {
    title: "Company Performance",
    hAxis: { 
      title: getButtonTitle(getPressedButton()), 
      titleTextStyle: { color: "#0196b1" }, 
      slantedText: true,
    },
    vAxis: { minValue: 0 },
    colors: [chartColor],
    legend: {position: 'none'},
  };

  // snag from html
  var chart = new google.visualization.AreaChart(document.getElementById("chart_div"));
  chart.draw(data, options);

  // Redraw the chart when the window is resized
  window.addEventListener("resize", function () {
    chart.draw(data, options);
  });

}
