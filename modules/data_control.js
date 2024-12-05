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

    setupSearchListener() {
        const searchField = document.querySelector('.search_field');
        if (!searchField) return;

        // Handle input changes for search
        searchField.addEventListener('input', (e) => {
            const query = e.target.value.toUpperCase();
            this.handleSearchInput(query);
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

                // Clear the dropdown
                this.clearSearchResults();
            } else {
                this.displayError('Invalid symbol. Please try again.');
            }
        } catch (error) {
            console.error('Error handling enter press:', error);
            this.displayError('Error adding stock. Please try again.');
        }
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

        // Add the new element to the container
        container.appendChild(newStockElement);

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
                left: 0,
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

    handleSearchInput(query) {
        if (this.searchDebounceTimeout) {
            clearTimeout(this.searchDebounceTimeout);
        }

        if (query.length < this.MIN_SEARCH_LENGTH) {
            this.clearSearchResults();
            return;
        }

        if (query.length > this.MAX_SEARCH_LENGTH) {
            document.querySelector('.search_field').value = query.slice(0, this.MAX_SEARCH_LENGTH);
            return;
        }

        this.searchDebounceTimeout = setTimeout(() => {
            this.performSearch(query);
        }, 300);
    }
}

// Initialize the controller
const stockSearch = new StockSearchController();

// Export for use in other modules
export default stockSearch;