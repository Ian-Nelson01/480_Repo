
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

// sym is JSON
export function store_sym(sym) {
  try {
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


