export function query_realtime(symbols) {

    var cleaned_symbols = symbols.join(',')
    var key = get_key()
    var url = `https://www.alphavantage.co/query?function=REALTIME_BULK_QUOTES&symbol=${cleaned_symbols}&apikey=${key}`

    console.log(url)
    fetch(url)
        .then((response) => {
            if (!response.ok) {
                throw new Error(`HTTP error! Status: ${response.status}`)
            }
            return response.json() // Parse the JSON data
        })
        .then((data) => {
            // Successfully received data
            console.log("Response Data:", data)

            // PROCESS THE DATA HERE ---------------------
            if (data.data && Array.isArray(data.data)) {
                data.data.forEach((stock) => {
                    const sym             = stock.symbol
                    const time            = stock.tiemstamp
                    const open            = stock.open
                    const high            = stock.high
                    const low             = stock.low
                    const close           = stock.close
                    const prev_close      = stock.previous_close
                    const change          = stock.change_percent

                    console.log(`Symbol: ${sym}`)
                    console.log(`Close Price: ${close}`)
                })
            } else {
                console.warn("No stock data found in the response.")
            }
        })
        .catch((error) => {
            // Handle errors
            console.error("Error fetching data:", error)
        })
}

// Symbol is what you expect
// minutes is the last n minutes of trading to pull data for
export function query_intraday(symbol, minutes) {

    var key = get_key()
    var url = `https://www.alphavantage.co/query?function=TIME_SERIES_INTRADAY&symbol=${symbol}&interval=1min&apikey=${key}`
    console.log(url)
    fetch(url)
        .then((response) => {
            if (!response.ok) {
                throw new Error(`HTTP error! Status: ${response.status}`)
            }
            return response.json() // Parse the JSON data
        })
        .then((data) => {
            // Successfully received data
            console.log("Response Data:", data)

            // PROCESS THE DATA HERE ---------------------
            if (data["Time Series (1min)"]) {
                const timeSeries = data["Time Series (1min)"];
                // only specified n most recent minutes of trading
                const timestamps = Object.keys(timeSeries).slice(0, minutes);

                timestamps.forEach((timestamp) => {
                    const stockData = timeSeries[timestamp];
                    const open = stockData["1. open"];
                    const high = stockData["2. high"];
                    const low = stockData["3. low"];
                    const close = stockData["4. close"];
                    const volume = stockData["5. volume"];

                    console.log(`Timestamp: ${timestamp}`);
                    console.log(`Open: ${open}`);
                    console.log(`High: ${high}`);
                    console.log(`Low: ${low}`);
                    console.log(`Close: ${close}`);
                    console.log(`Volume: ${volume}`);
                })
            } else {
                console.warn("No stock data found in the response.")
            }
        })
        .catch((error) => {
            // Handle errors
            console.error("Error fetching data:", error)
        })


}
export function query_daily(symbols) {

}

export function query_monthly(symbols) {

}

export function get_key() {
    // user fetch API and load form file if time permits
    return atob("SjBQQkhCMkJYQjFJTFlISw==")
}
