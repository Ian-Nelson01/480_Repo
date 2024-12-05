// There's a lot of duplicated code here.
// I tried to stick with what works and not deviate
// due to the difficulty of using async and promises.
// --Connor


export async function query_realtime(symbols) {

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
//
// Returns a JSON object in form of:
// {
//  "2024-12-04 19:59:00": {
//    "open": "242.7550",
//    "high": "242.8000",
//    "low": "242.7500",
//    "close": "242.7750",
//    "volume": "303"
//  },
//  [.. for each minute..]
//  }

export async function query_intraday(symbol, minutes) {
    const key = get_key()
    const url = `https://www.alphavantage.co/query?function=TIME_SERIES_INTRADAY&symbol=${symbol}&interval=1min&apikey=${key}`
    console.log(url)

    try {
        const response = await fetch(url)

        if (!response.ok) {
            throw new Error(`HTTP error! Status: ${response.status}`)
        }

        const data = await response.json()

        // PROCESS THE DATA HERE ---------------------
        if (data["Time Series (1min)"]) {
            const timeSeries = data["Time Series (1min)"]
            const timestamps = Object.keys(timeSeries).slice(0, minutes)

            // object to store the data
            const result = {}

            timestamps.forEach((timestamp) => {
                const stockData = timeSeries[timestamp]
                result[timestamp] = {
                    open: stockData["1. open"],
                    high: stockData["2. high"],
                    low: stockData["3. low"],
                    close: stockData["4. close"],
                    volume: stockData["5. volume"]
                }
            })

            return result // Return the created object
            alert("TEST")
        } else {
            console.warn("No stock data found in the response.")
            return null
        }
    } catch (error) {
        console.error("Error fetching data:", error)
        return null
    }
}

export async function query_daily(symbol) {
    const key = get_key()
    const url = `https://www.alphavantage.co/query?function=TIME_SERIES_DAILY&symbol=${symbol}&apikey=${key}`
    console.log(url)

    try {
        const responce = await fetch(url)

        if (!responce.ok) {throw new Error(`HTTP error!! Status: ${responce.status}`)}

        const data = await responce.json()

        // IF DATA NEEDS PROCESSING IT HAPPENS UNDER HERE
        if (data["Time Series (Daily)"]) {
            const timeSeries = data["Time Series (Daily)"]
            const result = {}

            Object.keys(timeSeries).forEach((date) => {
                const stockData = timeSeries[date]
                result[date] = {
                    open: stockData["1. open"],
                    high: stockData["2. high"],
                    low: stockData["3. low"],
                    close: stockData["4. close"],
                    volume: stockData["5. volume"]
                }
            })

            return result // return the created object
        } else {
            console.warn("No stock data found in the responce")
            return null
        }
    }catch (error) {
        console.error("error fetching data:", error)
        return null
    }
}


export async function query_monthly(symbol) {
    const key = get_key()
    const url = `https://www.alphavantage.co/query?function=TIME_SERIES_MONTHLY&symbol=${symbol}&apikey=${key}`
    console.log(url)

    try {
        const response = await fetch(url)

        if (!response.ok) {
            throw new Error(`HTTP error! Status: ${response.status}`)
        }

        const data = await response.json()

        // IF DATA NEEDS PROCESSING IT HAPPENS UNDER HERE
        if (data["Monthly Time Series"]) {
            const timeSeries = data["Monthly Time Series"]
            const result = {}

            Object.keys(timeSeries).forEach((date) => {
                const stockData = timeSeries[date]
                result[date] = {
                    open: stockData["1. open"],
                    high: stockData["2. high"],
                    low: stockData["3. low"],
                    close: stockData["4. close"],
                    volume: stockData["5. volume"]
                }
            })

            return result // Return the created object
        } else {
            console.warn("No stock data found in response.")
            return null
        }
    } catch (error) {
        console.error("Error fetching data:", error)
        return null
    }
}

export function get_key() {
    // user fetch API and load form file if time permits
    return atob("SjBQQkhCMkJYQjFJTFlISw==")
}
