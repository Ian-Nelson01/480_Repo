//TODO: move all code to appropriate file
import { get_key } from './interface.js';

export class StockSearchController {
    constructor() {
        this.searchDebounceTimeout = null;
        this.MIN_SEARCH_LENGTH = 1;
        this.MAX_SEARCH_LENGTH = 5;
        this.searchResults = [];
        this.setupSearchListener();
    }




// Function to generate random color in hexadecimal format
    getRandomColor() {
        const letters = "0123456789ABCDEF";
        let color = "#";
        for (let i = 0; i < 6; i++) {
            color += letters[Math.floor(Math.random() * 16)];
        }
        return color;
    }

    // Function to apply random outline colors to stock symbol
    applyRandomColorToElement(element) {
        const randomColor = this.getRandomColor();
        element.style.backgroundColor = "#FFFFFF"; // White background for clean look
        element.style.borderColor = randomColor; // Random border color
    }






 
        
        
        
         // Check if the key is a letter (A-Z) or a number (0-9)
       setupSearchListener() {
    const searchField = document.querySelector('.search_field');
    if (!searchField) return;

    // Debounce timeout to wait for typing to stop before making the request
    let debounceTimeout;






    searchField.addEventListener('input', (e) => {
        const searchText = e.target.value.toUpperCase(); // Get the full text in the search bar

        // Clear previous debounce timeout if any
        clearTimeout(debounceTimeout);

        // Set a new timeout to handle the delayed request
        debounceTimeout = setTimeout(() => {
            this.handleAnyPress(searchText);
        }, 30);  // 300ms delay before making the request
    });



        
        
        
        
        // Handle Enter key press
        searchField.addEventListener('keypress', (e) => {
            if (e.key === 'Enter') {
                const query = e.target.value.toUpperCase();
                this.handleEnterPress(query);
            }
        });
    }

    async handleEnterPress(query) {
        try {
            // Clear any existing timeout
            if (this.searchDebounceTimeout) {
                clearTimeout(this.searchDebounceTimeout);
            }

            // First, verify the stock exists
            const symbolData = await this.verifySymbol(query);
            if (symbolData) {
                // Get the real-time price data
                const priceData = await this.fetchRealTimePrice(query);

                // Add the stock to the list
                this.addStockToList(symbolData, priceData);

                // Clear the search field
                document.querySelector('.search_field').value = '';



// Get rocket element by its ID
var rocket = document.getElementById("rocket");
// Add an event listener for the 'click' event
	
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
		
	  const dropdownContent = document.getElementById("myDropdown")
		 toggleDropdown()
	}, 850);




                // Clear the dropdown
                //this.clearSearchResults();
            } else {
                //this.displayError('Invalid symbol. Please try again.');
                console.error("Invalid Symbol")

                // flash the search field red
                const searchDiv = document.querySelector('.search_field')
                searchDiv.style.backgroundColor = 'crimson';
                
                setTimeout(() => {
                    searchDiv.style.backgroundColor = '';
                }, 500)


            }
            //this.displayError('Error adding stock. Please try again.');
        } catch (error) {
            console.error(error)
        }
    }
    
  handleAnyPress(searchText) {
    // First, verify if the stock symbol exists
    this.verifySymbol(searchText).then(symbolData => {
        if (symbolData) {
          // enusure dropdown is open
          const dropdownContent = document.getElementById("myDropdown")
           dropdownContent.style.display = "block"
        
            // If the stock symbol is valid, show a preview
            const suggestSymbol = document.getElementById('suggestSymbol');
            
           suggestSymbol.textContent = searchText;

            // Optionally, you can apply a visual effect or feedback to indicate it's a valid symbol
            const searchDiv = document.querySelector('.search_field');
        

            setTimeout(() => {
                searchDiv.style.backgroundColor = ''; // Reset background color
            }, 500);
        } else {
            // If it's not a valid symbol, show an error or feedback
            const searchDiv = document.querySelector('.search_field');
            searchDiv.style.backgroundColor = 'crimson';  // Red color for invalid symbol

            setTimeout(() => {
                searchDiv.style.backgroundColor = ''; // Reset background color
            }, 500);

            console.error("Invalid Symbol");  // Optionally, log an error
        }
    }).catch(error => {
        console.error("Error verifying symbol:", error);
    });
}


        
        
    async verifySymbol(symbol) {
        try {
            const apiKey = get_key();
            const url = `https://www.alphavantage.co/query?function=SYMBOL_SEARCH&keywords=${symbol}&apikey=${apiKey}`;

            const response = await fetch(url);
            const data = await response.json();

            if (data.bestMatches && data.bestMatches.length > 0) {
                const exactMatch = data.bestMatches.find(
                    match => match['1. symbol'] === symbol
                );
                if (exactMatch) {
                    return {
                        symbol: exactMatch['1. symbol'],
                        name: exactMatch['2. name']
                    };
                }
            }
            return null;
        } catch (error) {
            console.error('Error verifying symbol:', error);
            return null;
        }
    }

    async fetchRealTimePrice(symbol) {
        try {
            const apiKey = get_key();
            const url = `https://www.alphavantage.co/query?function=GLOBAL_QUOTE&symbol=${symbol}&apikey=${apiKey}`;

            const response = await fetch(url);
            const data = await response.json();

            if (data['Global Quote']) {
                const quote = data['Global Quote'];
                const price = parseFloat(quote['05. price']).toFixed(2);
                const change = parseFloat(quote['09. change']).toFixed(2);
                const changePercent = quote['10. change percent'].replace('%', '');

                return {
                    price,
                    change,
                    changePercent
                };
            }
            return null;
        } catch (error) {
            console.error('Error fetching price:', error);
            return null;
        }
    }

    async fetchIntradayData(symbol) {
        try {
            const apiKey = get_key();
            const url = `https://www.alphavantage.co/query?function=TIME_SERIES_INTRADAY&symbol=${symbol}&interval=15min&apikey=${apiKey}`;

            const response = await fetch(url);
            const data = await response.json();

            if (data['Time Series (15min)']) {
                const timeSeries = data['Time Series (15min)'];
                const chartData = [];

                // Convert to array and sort by time
                // Convert to array and sort by time, showing all available data
                const entries = Object.entries(timeSeries)
                    .sort(([a], [b]) => new Date(a) - new Date(b));

                // Process the data for the chart
                entries.forEach(([timestamp, values]) => {
                    chartData.push([
                        new Date(timestamp),
                        parseFloat(values['4. close'])
                    ]);
                });

                return chartData;
            }
            return null;
        } catch (error) {
            console.error('Error fetching intraday data:', error);
            return null;
        }
    }

    async addStockToList(symbolData, priceData) {

        console.log(symbolData, priceData)

        if (!priceData) {
            priceData = {
                price: '0.00',
                change: '0.00',
                changePercent: '0.00'
            };
        }

        // Create the text for the stock price display
        const priceText = `${priceData.price} ${priceData.change >= 0 ? '+' : ''}${priceData.change}(${priceData.changePercent}%)`;

        // Find the container
        const container = document.getElementById('container');
        if (!container) {
            console.error('Container not found');
            return;
        }

        // Check if the list already contains 10 stocks
        if (container.children.length >= 10) {
            alert('You already have 10 stocks. Please remove one before adding a new one.');
            return;
        }

        // Create new stock element
        const newStockElement = document.createElement('div');
        newStockElement.className = 'list__item is-idle js-item';

        // Generate a unique chart ID
        const chartId = `chart_div_${Date.now()}`;

        newStockElement.innerHTML = `
            <div class="symbol">${symbolData.symbol}</div>
            <div class="stonk">${priceText}</div>
            <div class="chart" id="${chartId}" style="width: 25%; height: 50px"></div>
            <div class="drag-handle js-drag-handle"></div>
            <div class="x-handle">×</div>
        `;

        // Add click handler for the remove button
        const removeButton = newStockElement.querySelector('.x-handle');
        if (removeButton) {
            removeButton.addEventListener('click', () => {
                newStockElement.remove();
            });
        }
        
        // Add click handler for the stock symbol
        const symbolButton = newStockElement.querySelector('.symbol');
        if (symbolButton) {
            symbolButton.addEventListener('click', () => {
                let nextpage = "details-view.html?symbol=" + symbolData.symbol;
                window.location.href = nextpage;
            });
        }
        
             
        // reuse click handler for the stock stonk
        const stonkButton = newStockElement.querySelector('.stonk');
        if (stonkButton) {
            stonkButton.addEventListener('click', () => {
                let nextpage = "details-view.html?symbol=" + symbolData.symbol;
                window.location.href = nextpage;
            });
        }


     // Apply random color to the stock symbol
        const symbolElement = newStockElement.querySelector('.symbol');
        if (symbolElement) {
            this.applyRandomColorToElement(symbolElement);
        }

        newStockElement.style.visibility = 'hidden'
        // Add the new element to the container
        container.appendChild(newStockElement);

       setTimeout(() => {
       
	// Start position (x = -200px)
	let currentX = -200;

    
	// Interval function to animate the div
	const interval = setInterval(() => {
	newStockElement.style.visibility = 'visible'
		// Increase the x position
		currentX += 25; // Move 5px per interval
		// Set the new position
		newStockElement.style.left = currentX + "px";
		// Stop the animation when it reaches x = 0
		if (currentX >= 0) {
			clearInterval(interval); // Stop the animation
		}
	}, 20); // 20ms per frame (50 frames per second)
 }, 500)

 
        // Fetch intraday data and initialize the chart
        const chartData = await this.fetchIntradayData(symbolData.symbol);
        if (typeof google !== 'undefined' && google.charts) {
            google.charts.setOnLoadCallback(() => {
                this.initializeChart(chartId, chartData);
            });
        }
    }

    initializeChart(chartId, chartData) {
        if (!chartData || chartData.length === 0) {
            console.error('No chart data available');
            return;
        }

        // Prepare data for visualization
        const dataTable = new google.visualization.DataTable();
        dataTable.addColumn('datetime', 'Time');
        dataTable.addColumn('number', 'Price');
        dataTable.addRows(chartData);

        const options = {
            height: 25,
            width: 80,
            chartArea: {
                left: 20,
                top: 0,
                right: 0,
                bottom: 0,
                width: '100%',
                height: '100%'
            },
            padding: 0,
            fontSize: 0,
            hAxis: {
                baselineColor: 'none',
                textPosition: 'none',
                gridlines: {
                    color: 'transparent'
                }
            },
            vAxis: {
                baselineColor: 'none',
                textPosition: 'none',
                gridlines: {
                    color: 'transparent'
                },
                viewWindow: {
                    // Add padding to min/max values
                    min: function() {
                        const values = chartData.map(point => point[1]);
                        const min = Math.min(...values);
                        const padding = (Math.max(...values) - min) * 0.1; // 10% padding
                        return min - padding;
                    }(),
                    max: function() {
                        const values = chartData.map(point => point[1]);
                        const max = Math.max(...values);
                        const padding = (max - Math.min(...values)) * 0.1; // 10% padding
                        return max + padding;
                    }()
                }
            },
            colors: ['#22c55e'], // Green color for positive trend
            lineWidth: 1,
            legend: { position: 'none' },
            tooltip: { trigger: 'none' },
            enableInteractivity: false,
            backgroundColor: 'transparent'
        };

        // Determine if trend is negative and adjust color
        if (chartData.length > 1) {
            const firstPrice = chartData[0][1];
            const lastPrice = chartData[chartData.length - 1][1];
            if (lastPrice < firstPrice) {
                options.colors = ['#ef4444']; // Red color for negative trend
            }
        }

        const chart = new google.visualization.LineChart(
            document.getElementById(chartId)
        );
        chart.draw(dataTable, options);
    }

    //handleSearchInput(query) {
    //    if (this.searchDebounceTimeout) {
    //        clearTimeout(this.searchDebounceTimeout);
    //    }

    //    if (query.length < this.MIN_SEARCH_LENGTH) {
    //        this.clearSearchResults();
    //        return;
    //    }

    //    if (query.length > this.MAX_SEARCH_LENGTH) {
    //        document.querySelector('.search_field').value = query.slice(0, this.MAX_SEARCH_LENGTH);
    //        return;
    //    }

    //    this.searchDebounceTimeout = setTimeout(() => {
    //        this.performSearch(query);
    //    }, 300);
    //}
}

// Initialize the controller
const stockSearch = new StockSearchController();

// Export for use in other modules
export default stockSearch;

export function addAllStocks (array){
    console.log(array)
    const parsedArray = JSON.parse(array)
    console.log(parsedArray)

    parsedArray.forEach((element) => {
      stockSearch.addStockToList(element);
    });
}

// Delay function that returns a promise
function delay(ms) {
	return new Promise(resolve => setTimeout(resolve, ms));
}
