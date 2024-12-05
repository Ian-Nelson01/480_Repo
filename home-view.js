/****************
 *  declerations *
 ****************/
 
// counter increment / decrement for keeping track of stock qty

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
// dummy values for stock rows
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





/******************
*     add row      *
*******************/

// Function to create and add the new list item
async function addListItem() {
   
    //grow box animation stuff
    // has to be here because the anims sync with row addition
    
	//trigger growbox animation simultaniously on row creation
	const growBox = document.getElementById("growBox");
	const stonkRow = document.getElementById("stonkRow");
	// Reset growbox animation by removing anim class
	growBox.classList.remove('animate');
	// restart the animation
	void growBox.offsetWidth; 
	// Add the animation class back
	growBox.classList.add('animate');
	// 2 sec delay to sync box animation and row insertion animation
	await delay(500);
	
	// row construction
	
	// Create div as class 'list__item is-idle js-item' from drag and drop
	const newDiv = document.createElement("div");
	newDiv.classList.add("list__item", "is-idle", "js-item");
	//set init x position
	newDiv.style.left = "-200px";
	// Create stock symbol and add text
	const symbolDiv = document.createElement("div");
	symbolDiv.classList.add("symbol");
	symbolDiv.textContent = text1[counter][0];
	// Create the stonk info and add text
	const stonkDiv = document.createElement("div");
	stonkDiv.classList.add("stonk");
	stonkDiv.textContent = text1[counter][1];
	// Create the mini chart 
	const chartDiv = document.createElement("div");
	const chartId = "chart_div_" + new Date().getTime();
	chartDiv.classList.add("chart");
	chartDiv.id = chartId;
	// Create the DD drag handle
	const dragHandleDiv = document.createElement("div");
	dragHandleDiv.classList.add("drag-handle", "js-drag-handle");
	// Append all the created elements to the row div
	newDiv.appendChild(symbolDiv);
	newDiv.appendChild(stonkDiv);
	newDiv.appendChild(chartDiv);
	newDiv.appendChild(dragHandleDiv);
	
	//dynamic item deletion
	
	// Create the delete button
	const xHandleDiv = document.createElement("div");
	xHandleDiv.classList.add("x-handle");
	xHandleDiv.textContent = '×'; // Add the "×" symbol
	// Add event listener to remove the item when 'x' is clicked
    xHandleDiv.addEventListener("click", () => {
    	newDiv.remove();
    });
    // append to row
    newDiv.appendChild(xHandleDiv);
	
	// Row insertion and animation
	
	// Append the newDiv (list item) to the dropdown list container
   	container.appendChild(newDiv);
   	applyRandomColorToElement(symbolDiv)
	
	// Start position (x = -200px)
	let currentX = -200;
	// Interval function to animate the div
	const interval = setInterval(() => {
		// Increase the x position
		currentX += 25; // Move 5px per interval
		// Set the new position
		newDiv.style.left = currentX + "px";
		// Stop the animation when it reaches x = 0
		if (currentX >= 0) {
			clearInterval(interval); // Stop the animation
		}
	}, 20); // 20ms per frame (50 frames per second)
	// Call the drawChart function for the new chart div
	google.charts.setOnLoadCallback(() => drawChart(chartId));
}

// helper functions

// Delay function that returns a promise
function delay(ms) {
	return new Promise(resolve => setTimeout(resolve, ms));
}





/***********************
 *   GOOGLE CHARTS CODE *
 ***********************/

// API loading
google.charts.load("current", {
    packages: ["corechart"]
});

// Drawing function for dynamically added charts
function drawChart(chartId) {

    // Define the chart options (for both green and red colors)
    var options = {
        title: "",
        hAxis: {
            title: "",
            titleTextStyle: { color: "#0196b1" }
        },
        vAxis: {
            minValue: 0
        },
        colors: ["green"],
        legend: {
            position: "none"
        },
        tooltip: {
            isHtml: false,
            trigger: "none"
        },
    };

    // Red options based off blue options
    var optionsR = {
        ...options,
        colors: ["blue"]
    };

    // Counter to select the current data set
    var counter = 0;

    // Select the current data from the `datas` array
    var log1 = datas[counter];
    var valueNew = log1.getValue(3, 1);
    var valueOld = log1.getValue(2, 1);

    // Switch the chart options based on the comparison of values
    if (valueNew >= valueOld) {
        var chart = new google.visualization.AreaChart(document.getElementById(chartId));
        chart.draw(datas[counter], options);
    } else {
        var chart = new google.visualization.AreaChart(document.getElementById(chartId));
        chart.draw(datas[counter], optionsR);
    }

    // Increment the counter
    counter = (counter + 1) % datas.length;
}





/***********************
 *      COLOR SYMBOL    *
 ***********************/
 
// Function to generate random color in hexadecimal format
function getRandomColor() {
	const letters = "0123456789ABCDEF"
	let color = "#"
	for (let i = 0; i < 6; i++) {
		color += letters[Math.floor(Math.random() * 16)]
	}
	return color
}

// Function to apply random outline colors to all stock symbols
// this one does all elements in the html, resets colors tho
// could still be useful
function applyRandomColors() {
    // Select all elements from html
	const symbols = document.querySelectorAll(".symbol") 
	symbols.forEach((symbol) => {
    	// Generate a random color, apply
		const randomColor = getRandomColor() 
		symbol.style.backgroundColor = randomColor
	})
}

// Function to apply a random color to a specific element
// used for the row constructor
function applyRandomColorToElement(element) {
    // Generate a random color, makes bg white with color border for style
	const randomColor = getRandomColor(); 
	element.style.backgroundColor = "#FFFFFF" 
	element.style.borderColor = randomColor
}

// sets colors for all present elements on load
window.onload = function() {
	applyRandomColors() 
	// opening and closing dropdown rq helps solve some visual weirdness
	toggleDropdown()
	toggleDropdown()
}





/********************************
*        Other Animation         *
*********************************/

// CSS animation class (allows for box to grow on repeat)

//animation classes allow anim ot be applied to an element, and removed
const styleSheet = document.styleSheets[0];
// rule insertion allows CSS dynamic modification
// Growbox animation class
styleSheet.insertRule(`
    #growBox.animate {
       animation: grow 0.51s ease-in-out backwards;
    }
`, styleSheet.cssRules.length);
// dropdown result animation class (rocket?)
styleSheet.insertRule(`
    .list__item.animate {
      animation: example 0.51s ease-in-out;
    }
`, styleSheet.cssRules.length);

//Rocket click listner and class applier

// Get rocket element by its ID
var rocket = document.getElementById("rocket");
// Add an event listener for the 'click' event
rocket.addEventListener("click", function() {
    // trigger list addition (GONNA HAVE TO REWORK THIS TO MERGE WITH MIGUEL)
	addListItem();
	// Get stock result preview by its ID
	const searchSuggest = document.getElementById("myResult");
	// Set the animation play state to "running" (not pause)
	searchSuggest.style.animationPlayState = "running";
	// Add the 'clicked' class to start the animation
	rocket.classList.add("clicked");
	// After 0.85 seconds (animation duration), remove the 'clicked' class 
	// removal (and addition) is only way to allow hovering again
	setTimeout(function() {
		rocket.classList.remove("clicked");
	}, 850);
});




/***********************
 *      DRAG AND DROP   *
 ***********************/
// DO NOT TOUCH
import {
	setup
} from './dragAndDrop.js';
// Initialize the drag and drop functionality
setup();
