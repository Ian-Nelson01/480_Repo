
function permissions_test() {
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

function store_sym(sym) {

}

function retrieve_sym() {

}



export {permissions_test, store_sym, retrieve_sym}
