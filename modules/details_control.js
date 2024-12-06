import {query_endpoint,
        query_intraday,
        query_daily,
        query_monthly
       } from "./interface.js"

// URL should have [..]?symbol=XYZ
// extract symbol from URL
const SYMBOL = new URL(window.location.href).searchParams.get('symbol')
let endpointData = {} // Just want global scope

console.log(`Symbol: ${SYMBOL}`)

//async function init() {
//
//    query_endpoint(SYMBOL).then((result) => {
//        console.log(result) // Log
//    }).catch((error) => {
//        console.error("Error:", error)
//    })
//}

function populateTable(realtimeData, monthlyData) {
    // Real-time data
    document.querySelectorAll("table td")[1].textContent = realtimeData.previousClose // Previous Close
    document.querySelectorAll("table td")[3].textContent = `${realtimeData.low} - ${realtimeData.high}` // Day's Range
    document.querySelectorAll("table td")[9].textContent = realtimeData.open // Open
    document.querySelectorAll("table td")[13].textContent = realtimeData.volume // Volume

    // Historical data (use most recent month for demo purposes)
    const mostRecentMonth = Object.keys(monthlyData)[0]
    const mostRecentData = monthlyData[mostRecentMonth]

    document.querySelectorAll("table td")[5].textContent = `${mostRecentData.low} - ${mostRecentData.high}` // 52 Week Range
    document.querySelectorAll("table td")[7].textContent = `${mostRecentMonth}` // Market Cap/Earnings Date (use most recent month)
}

function updateCompanyInfo(symbol, name) {
  document.getElementById("compSymbol").textContent = SYMBOL
  document.getElementById("compName").textContent = name
}

async function init() {
    updateCompanyInfo(SYMBOL, "CORP NAME")

    Promise.all([query_endpoint(SYMBOL), query_monthly(SYMBOL)])
        .then(([realtimeData, monthlyData]) => {
            if (realtimeData && monthlyData) {
                console.log("Realtime Data:", realtimeData)
                console.log("Monthly Data:", monthlyData)
                populateTable(realtimeData, monthlyData)
            } else {
                console.warn("One (or more) funcions returned no data.")
            }
        })
        .catch((error) => {
            console.error("Error fetching data:", error)
        })
}

init()
