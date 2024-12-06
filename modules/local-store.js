
export function permissions_test() {
  try {
    localStorage.setItem("testKey", "testValue")
    if (localStorage.getItem("testKey") == "testValue") {
      console.log("Local Store working")
      console.log(localStorage)
    }

  } catch (error) {
    console.log(error)
    alert("Cookie Storage Error:\n" + error.toString())
  }

}

export function store_sym(sym) {
  if (sym == undefined) {
    return
  }
  try {
    console.log(`about to store: ${sym}`)
    localStorage.setItem("symbols", JSON.stringify(sym))
  } catch (e) {
    console.error(e);
  }
}

export function retrieve_sym() {
  try {
   return JSON.parse(localStorage.getItem("symbols")) 
  } catch (e) {
   console.error(e)
  }
}

//export function periodic() {
//  // build array from
//  let currSymbols = Array.from(
//    // select all divs with symbol calss
//    document.querySelectorAll("div.symbol"),
//    div => div.textContent
//  )
//  //console.log(`PERIODIC: ${currSymbols}`)
//  store_sym(currSymbols)
//
//  console.log(retrieve_sym())
//}

export function periodic() {
  // Build array from all divs with 'symbol' class
  let currSymbols = Array.from(
    document.querySelectorAll("div.symbol"),
    div => div.textContent.trim()  // Trim whitespace from the text
  )
  // No empty, undefined, or null values
  currSymbols = currSymbols.filter(symbol => symbol && symbol !== undefined && symbol !== null);

  // Store the filtered symbols
  if (currSymbols) {
    store_sym(currSymbols);
  }

  console.log(retrieve_sym());
}


