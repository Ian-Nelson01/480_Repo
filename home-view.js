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

const addButton = document.getElementById("addElementBtn")
const container = document.getElementById("container")

// Function to create and add the new list item
function addListItem() {
  // Create the main div with class 'list__item is-idle js-item'
  const newDiv = document.createElement("div")

  newDiv.classList.add("list__item", "is-idle", "js-item")

  // Create the symbol div and add text
  const symbolDiv = document.createElement("div")
  symbolDiv.classList.add("symbol")
  symbolDiv.textContent = text1[counter][0]

  // Create the stonk div and add text
  const stonkDiv = document.createElement("div")
  stonkDiv.classList.add("stonk")
  stonkDiv.textContent = text1[counter][1]

  // Create the chart div with a unique ID
  const chartDiv = document.createElement("div")
  const chartId = "chart_div_" + new Date().getTime() // Unique ID using timestamp
  chartDiv.classList.add("chart")
  chartDiv.id = chartId

  // Create the drag handle div
  const dragHandleDiv = document.createElement("div")
  dragHandleDiv.classList.add("drag-handle", "js-drag-handle")

  // Append all the created elements to the newDiv
  newDiv.appendChild(symbolDiv)
  newDiv.appendChild(stonkDiv)
  newDiv.appendChild(chartDiv)
  newDiv.appendChild(dragHandleDiv)

  // Append the newDiv (list item) to the container
  container.appendChild(newDiv)

  // Call the drawChart function for the new chart div
  google.charts.setOnLoadCallback(() => drawChart(chartId))
}

// Add event listener to the 'Add Element' button
addButton.addEventListener("click", addListItem)

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
    data10
  ]

  //sloppy but functional switcher
  if (counter != -1) {
    // Create and draw the chart for the specific div using its ID
    var chart = new google.visualization.AreaChart(
      document.getElementById(chartId),
    )
    chart.draw(datas[counter], options)
    

    counter = counter + 1
  } else if (counter == -1) {
    // Create and draw the chart for the specific div using its ID
    var chart = new google.visualization.AreaChart(
      document.getElementById(chartId),
    )
    chart.draw(data2, options2)
  }
}

/***********************
 *   SEARCH DROPDOWN    *
 ***********************/
// Function to toggle the dropdown visibility
function toggleDropdown() {
  const dropdownContent = document.getElementById("myDropdown")
  if (dropdownContent.style.display === "block") {
    dropdownContent.style.display = "none"
  } else {
    dropdownContent.style.display = "block"
  }
}

// Event listener to close the dropdown if clicking outside
window.onclick = function (event) {
  const dropdownContent = document.getElementById("myDropdown")
  const submitButton = document.querySelector(".submit_button")

  // Check if the click was outside the dropdown and the submit button
  if (
    !submitButton.contains(event.target) &&
    !dropdownContent.contains(event.target)
  ) {
    dropdownContent.style.display = "none"
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

window.onload = function () {
  applyRandomColors() // Call the random colors function
  toggleDropdown() // Trigger the dropdown on page load
  toggleDropdown()
}

/***********************
 *      DRAG AND DROP   *
 ***********************/

// DO NOT TOUCH

// Tutorial: https://tahazsh.com/blog/seamless-ui-with-js-drag-to-reorder-example

/**
 Variables
 **/

let listContainer

let draggableItem

let pointerStartX
let pointerStartY

let itemsGap = 0

let items = []

let prevRect = {}

/**
Helper Functions
**/

function getAllItems() {
  if (!items?.length) {
    items = Array.from(listContainer.querySelectorAll(".js-item"))
  }
  return items
}

function getIdleItems() {
  return getAllItems().filter((item) => item.classList.contains("is-idle"))
}

function isItemAbove(item) {
  return item.hasAttribute("data-is-above")
}

function isItemToggled(item) {
  return item.hasAttribute("data-is-toggled")
}

/**
Setup
**/

function setup() {
  listContainer = document.querySelector(".js-list")

  if (!listContainer) return

  listContainer.addEventListener("mousedown", dragStart)
  listContainer.addEventListener("touchstart", dragStart)

  document.addEventListener("mouseup", dragEnd)
  document.addEventListener("touchend", dragEnd)
}

/**
Drag Start
**/

function dragStart(e) {
  if (e.target.classList.contains("js-drag-handle")) {
    draggableItem = e.target.closest(".js-item")
  }

  if (!draggableItem) return

  pointerStartX = e.clientX || e.touches?.[0]?.clientX
  pointerStartY = e.clientY || e.touches?.[0]?.clientY

  setItemsGap()
  disablePageScroll()
  initDraggableItem()
  initItemsState()
  prevRect = draggableItem.getBoundingClientRect()

  document.addEventListener("mousemove", drag)
  document.addEventListener("touchmove", drag, { passive: false })
}

function setItemsGap() {
  if (getIdleItems().length <= 1) {
    itemsGap = 0
    return
  }

  const item1 = getIdleItems()[0]
  const item2 = getIdleItems()[1]

  const item1Rect = item1.getBoundingClientRect()
  const item2Rect = item2.getBoundingClientRect()

  itemsGap = Math.abs(item1Rect.bottom - item2Rect.top)
}

function disablePageScroll() {
  document.body.style.overflow = "hidden"
  document.body.style.touchAction = "none"
  document.body.style.userSelect = "none"
}

function initItemsState() {
  getIdleItems().forEach((item, i) => {
    if (getAllItems().indexOf(draggableItem) > i) {
      item.dataset.isAbove = ""
    }
  })
}

function initDraggableItem() {
  draggableItem.classList.remove("is-idle")
  draggableItem.classList.add("is-draggable")
}

/**
Drag
**/

function drag(e) {
  if (!draggableItem) return

  e.preventDefault()

  const clientX = e.clientX || e.touches[0].clientX
  const clientY = e.clientY || e.touches[0].clientY

  const pointerOffsetX = clientX - pointerStartX
  const pointerOffsetY = clientY - pointerStartY

  draggableItem.style.transform = `translate(${pointerOffsetX}px, ${pointerOffsetY}px)`

  updateIdleItemsStateAndPosition()
}

function updateIdleItemsStateAndPosition() {
  const draggableItemRect = draggableItem.getBoundingClientRect()
  const draggableItemY = draggableItemRect.top + draggableItemRect.height / 2

  // Update state
  getIdleItems().forEach((item) => {
    const itemRect = item.getBoundingClientRect()
    const itemY = itemRect.top + itemRect.height / 2
    if (isItemAbove(item)) {
      if (draggableItemY <= itemY) {
        item.dataset.isToggled = ""
      } else {
        delete item.dataset.isToggled
      }
    } else {
      if (draggableItemY >= itemY) {
        item.dataset.isToggled = ""
      } else {
        delete item.dataset.isToggled
      }
    }
  })

  // Update position
  getIdleItems().forEach((item) => {
    if (isItemToggled(item)) {
      const direction = isItemAbove(item) ? 1 : -1
      item.style.transform = `translateY(${
        direction * (draggableItemRect.height + itemsGap)
      }px)`
    } else {
      item.style.transform = ""
    }
  })
}

/**
Drag End
**/

function dragEnd(e) {
  if (!draggableItem) return

  applyNewItemsOrder(e)
  cleanup()
}

function applyNewItemsOrder(e) {
  const reorderedItems = []

  getAllItems().forEach((item, index) => {
    if (item === draggableItem) {
      return
    }
    if (!isItemToggled(item)) {
      reorderedItems[index] = item
      return
    }
    const newIndex = isItemAbove(item) ? index + 1 : index - 1
    reorderedItems[newIndex] = item
  })

  for (let index = 0; index < getAllItems().length; index++) {
    const item = reorderedItems[index]
    if (typeof item === "undefined") {
      reorderedItems[index] = draggableItem
    }
  }

  reorderedItems.forEach((item) => {
    listContainer.appendChild(item)
  })

  draggableItem.style.transform = ""

  requestAnimationFrame(() => {
    const rect = draggableItem.getBoundingClientRect()
    const yDiff = prevRect.y - rect.y
    const currentPositionX = e.clientX || e.changedTouches?.[0]?.clientX
    const currentPositionY = e.clientY || e.changedTouches?.[0]?.clientY

    const pointerOffsetX = currentPositionX - pointerStartX
    const pointerOffsetY = currentPositionY - pointerStartY

    draggableItem.style.transform = `translate(${pointerOffsetX}px, ${
      pointerOffsetY + yDiff
    }px)`
    requestAnimationFrame(() => {
      unsetDraggableItem()
    })
  })
}

function cleanup() {
  itemsGap = 0
  items = []
  unsetItemState()
  enablePageScroll()

  document.removeEventListener("mousemove", drag)
  document.removeEventListener("touchmove", drag)
}

function unsetDraggableItem() {
  draggableItem.style = null
  draggableItem.classList.remove("is-draggable")
  draggableItem.classList.add("is-idle")
  draggableItem = null
}

function unsetItemState() {
  getIdleItems().forEach((item, i) => {
    delete item.dataset.isAbove
    delete item.dataset.isToggled
    item.style.transform = ""
  })
}

function enablePageScroll() {
  document.body.style.overflow = ""
  document.body.style.touchAction = ""
  document.body.style.userSelect = ""
}

function simulateDragAndDrop() {
  // Find the last drag handle element
  const lastDragHandle = document.querySelector(".js-drag-handle:last-of-type")

  // If there's no drag handle, do nothing
  if (!lastDragHandle) return

  // Step 1: Simulate mousedown/touchstart (dragStart behavior)
  const mouseDownEvent = new MouseEvent("mousedown", {
    clientX: 0, // You can adjust these values if needed
    clientY: 0,
    bubbles: true,
    cancelable: true,
  })

  lastDragHandle.dispatchEvent(mouseDownEvent)

  // Optionally, you can trigger touchstart event similarly if needed
  // const touchStartEvent = new TouchEvent('touchstart', {
  //   touches: [{ clientX: 0, clientY: 0 }],
  //   bubbles: true,
  //   cancelable: true,
  // });
  // lastDragHandle.dispatchEvent(touchStartEvent);

  // Step 2: Simulate mouseup/touchend (dragEnd behavior)
  const mouseUpEvent = new MouseEvent("mouseup", {
    clientX: 0, // Adjust if needed
    clientY: 0,
    bubbles: true,
    cancelable: true,
  })

  // Wait for the drag to start, then trigger dragEnd
  setTimeout(() => {
    lastDragHandle.dispatchEvent(mouseUpEvent)
  }) // Delay to simulate the user interaction

  // Optionally, simulate touchend event similarly
  // const touchEndEvent = new TouchEvent('touchend', {
  //   changedTouches: [{ clientX: 0, clientY: 0 }],
  //   bubbles: true,
  //   cancelable: true,
  // });
  // lastDragHandle.dispatchEvent(touchEndEvent);
}

/**
Start Here
**/

setup()
