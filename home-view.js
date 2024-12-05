let counter = 1 // Initialize the counter to 0
// Function to increase the counter by 1
function incrementCounter() {
  counter++
  console.log(counter) // Display the current counter value
}

// Function to decrease the counter by 1
function decrementCounter() {
  counter--
  console.log(counter) // Display the current counter value
}

var text1 = [
  ["NUL", "00.00 +0.00(+0.00%)"],
  ["ONE", "11.11 +1.11(+1.11%)"],
  ["TWO", "22.22 +2.22(+2.22%)"],
  ["THRE", "33.33 +3.33(+3.33%)"],
  ["FOUR", "44.44 +4.44(+4.44%)"],
  ["FIVE", "55.55 +5.55(+5.55%)"],
  ["SIX", "66.66 +6.66(+6.66%)"],
  ["SEV", "77.77 +7.77(+7.77%)"],
  ["EIGT", "88.88 +8.88(+8.88%)"],
  ["NINE", "99.99 +9.99(+9.99%)"],
  ["TEN", "10.10 +1.10(+1.10%)"]
]

//const addButton = document.getElementById("addElementBtn")
//const container = document.getElementById("container")



/******************
add row
*******************/


// Function to create and add the new list item
async function addListItem() {

  //trigger growbox animation simultaniously
  const growBox = document.getElementById("growBox");

  const stonkRow = document.getElementById("stonkRow");

  // Reset the animation by removing the class first
  growBox.classList.remove('animate');

  // Trigger a reflow to restart the animation
  void growBox.offsetWidth; // This forces the browser to reflow

  // Add the animation class back
  growBox.classList.add('animate');






  // Add a delay of 2 seconds using a Promise and async/await
  await delay(500);  // Wait for 2 seconds
  // Add the animation class back



  // Create the main div with class 'list__item is-idle js-item'
  const newDiv = document.createElement("div");
  newDiv.classList.add("list__item", "is-idle", "js-item");
	// give it an ID for seeking
  newDiv.style.left = "-200px"; // X-position


  // Create the symbol div and add text
  const symbolDiv = document.createElement("div");
  symbolDiv.classList.add("symbol");
  symbolDiv.textContent = text1[counter][0];

  // Create the stonk div and add text
  const stonkDiv = document.createElement("div");
  stonkDiv.classList.add("stonk");
  stonkDiv.textContent = text1[counter][1];

  // Create the chart div with a unique ID
  const chartDiv = document.createElement("div");
  const chartId = "chart_div_" + new Date().getTime(); // Unique ID using timestamp
  chartDiv.classList.add("chart");
  chartDiv.id = chartId;

  // Create the drag handle div
  const dragHandleDiv = document.createElement("div");
  dragHandleDiv.classList.add("drag-handle", "js-drag-handle");

// Create the drag handle div
  const xHandleDiv = document.createElement("div");
  xHandleDiv.classList.add("x-handle");
  xHandleDiv.textContent = '×'; // Add the "×" symbol


// Add event listener to remove the item when 'x' is clicked
  xHandleDiv.addEventListener("click", () => {
    newDiv.remove(); // Remove the list item when 'x' is clicked
  });
  
  
  // Append all the created elements to the newDiv
  newDiv.appendChild(symbolDiv);
  newDiv.appendChild(stonkDiv);
  newDiv.appendChild(chartDiv);
  newDiv.appendChild(dragHandleDiv);
  newDiv.appendChild(xHandleDiv);

  // Append the newDiv (list item) to the container
  container.appendChild(newDiv);


applyRandomColorToElement(symbolDiv)



  // Start position (x = -200px)
  let currentX = -200;

  // Interval function to animate the div
  const interval = setInterval(() => {
    // Increase the x position
    currentX += 25;  // Move 5px per interval

    // Set the new position
    newDiv.style.left = currentX + "px";

    // Stop the animation when it reaches x = 0
    if (currentX >= 0) {
      clearInterval(interval);  // Stop the animation
    }
  }, 20);  // 20ms per frame (50 frames per second)















  // Call the drawChart function for the new chart div
  google.charts.setOnLoadCallback(() => drawChart(chartId));
  
  
}


// Delay function that returns a promise
function delay(ms) {
  return new Promise(resolve => setTimeout(resolve, ms));
}
// Add event listener to the 'Add Element' button
//addButton.addEventListener("click", addListItem)

/***********************
 *   GOOGLE CHARTS CODE *
 ***********************/
google.charts.load("current", { packages: ["corechart"] })

// Drawing function for dynamically added charts
function drawChart(chartId) {
  // Define the chart data and options
  var data0 = google.visualization.arrayToDataTable([
    ["Year", "Sales"],
    ["2013", 50],
    ["2014", 50],
    ["2015", 50],
    ["2016", 50],
  ])

  var options = {
    title: "Company Performance",
    hAxis: { title: "Year", titleTextStyle: { color: "#0196b1" } },
    vAxis: { minValue: 0 },
    colors: ["green"],
    legend: { position: "none" },
    tooltip: { isHtml: false, trigger: "none" }, // Disable tooltip
  }
  var optionsR = {
    title: "Company Performance",
    hAxis: { title: "Year", titleTextStyle: { color: "#0196b1" } },
    vAxis: { minValue: 0 },
    colors: ["red"],
    legend: { position: "none" },
    tooltip: { isHtml: false, trigger: "none" }, // Disable tooltip
  }

  var data1 = google.visualization.arrayToDataTable([
    ["Year", "Sales"],
    ["2013", 50],
    ["2014", 50],
    ["2015", 50],
    ["2016", 500],
  ])

  var data2 = google.visualization.arrayToDataTable([
    ["Year", "Sales"],
    ["2013", 50],
    ["2014", 50],
    ["2015", 500],
    ["2016", 50],
  ])

  var data3 = google.visualization.arrayToDataTable([
    ["Year", "Sales"],
    ["2013", 50],
    ["2014", 50],
    ["2015", 500],
    ["2016", 500],
  ])

  var data4 = google.visualization.arrayToDataTable([
    ["Year", "Sales"],
    ["2013", 50],
    ["2014", 500],
    ["2015", 50],
    ["2016", 50],
  ])

  var data5 = google.visualization.arrayToDataTable([
    ["Year", "Sales"],
    ["2013", 50],
    ["2014", 500],
    ["2015", 50],
    ["2016", 500],
  ])

  var data6 = google.visualization.arrayToDataTable([
    ["Year", "Sales"],
    ["2013", 50],
    ["2014", 500],
    ["2015", 500],
    ["2016", 50],
  ])

  var data7 = google.visualization.arrayToDataTable([
    ["Year", "Sales"],
    ["2013", 50],
    ["2014", 500],
    ["2015", 500],
    ["2016", 500],
  ])

  var data8 = google.visualization.arrayToDataTable([
    ["Year", "Sales"],
    ["2013", 500],
    ["2014", 50],
    ["2015", 50],
    ["2016", 50],
  ])

  var data9 = google.visualization.arrayToDataTable([
    ["Year", "Sales"],
    ["2013", 500],
    ["2014", 50],
    ["2015", 50],
    ["2016", 500],
  ])

  var data10 = google.visualization.arrayToDataTable([
    ["Year", "Sales"],
    ["2013", 500],
    ["2014", 50],
    ["2015", 500],
    ["2016", 50],
  ])

  var datas = [
    data0,
    data1,
    data2,
    data3,
    data4,
    data5,
    data6,
    data7,
    data8,
    data9,
    data10];
  
  
  var log1 = datas[counter];
  var valueNew = log1.getValue(3, 1);

  var valueOld = log1.getValue(2, 1);
  var value2 = log1.getValue(2, 1);
  var value1 = log1.getValue(1, 1);
  var value0 = log1.getValue(0, 1);

  //sloppy but functional switcher
  if (valueNew >= valueOld) {
    // Create and draw the chart for the specific div using its ID
    var chart = new google.visualization.AreaChart(
      document.getElementById(chartId),
    )
    chart.draw(datas[counter], options)
    

    counter = counter + 1
  }
  else{
    var chart = new google.visualization.AreaChart(
      document.getElementById(chartId),
    )
    chart.draw(datas[counter], optionsR)
    

    counter = counter + 1
  }
}


/***********************
 *      COLOR SYMBOL    *
 ***********************/

// Function to generate a random color in hexadecimal format
function getRandomColor() {
  const letters = "0123456789ABCDEF"
  let color = "#"
  for (let i = 0; i < 6; i++) {
    color += letters[Math.floor(Math.random() * 16)]
  }
  return color
}

// Function to apply random background colors to all stock symbols
function applyRandomColors() {
  const symbols = document.querySelectorAll(".symbol") // Select all elements with the class 'symbol'

  symbols.forEach((symbol) => {
    const randomColor = getRandomColor() // Generate a random color
    symbol.style.backgroundColor = randomColor // Apply the random color as background
  })
}


// Function to apply a random background color to a specific element
function applyRandomColorToElement(element) {
  const randomColor = getRandomColor(); // Generate a random color
  symbol.style.backgroundColor = "#000000" // Apply the random color as background
    symbol.style.borderColor = randomColor // Apply the random color as background
}







window.onload = function () {
  applyRandomColors() // Call the random colors function
  toggleDropdown() // Trigger the dropdown on page load
  toggleDropdown()
}





// CSS animation class (allows for box to grow on repeat)
const styleSheet = document.styleSheets[0];
styleSheet.insertRule(`
    #growBox.animate {
       animation: grow 0.51s ease-in-out backwards;
    }
`, styleSheet.cssRules.length);

// Add the second rule (for example, changing the background color)
styleSheet.insertRule(`
    .list__item.animate {
      animation: example 0.51s ease-in-out;
    }
`, styleSheet.cssRules.length);




// Get the button element by its ID
var rocket = document.getElementById("rocket");

// Add an event listener for the 'click' event
rocket.addEventListener("click", function() {
  addListItem();
  // Get the element by its ID
  const searchSuggest = document.getElementById("myResult");

  // Set the animation play state to "running"
  searchSuggest.style.animationPlayState = "running";
  var rocket = document.getElementById("rocket");
  // Add the 'clicked' class to start the animation
  rocket.classList.add("clicked");

  // After 0.85 seconds (animation duration), remove the 'clicked' class to allow hovering again
  setTimeout(function() {
    rocket.classList.remove("clicked");
  }, 850);  // 850 milliseconds = 0.85 seconds
});




































/***********************
 *      DRAG AND DROP   *
 ***********************/

// DO NOT TOUCH

// Tutorial: https://tahazsh.com/blog/seamless-ui-with-js-drag-to-reorder-example
import { setup } from './dragAndDrop.js';

// Initialize the drag and drop functionality
setup();
