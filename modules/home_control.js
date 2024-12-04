// fill all list__item divs with passed array
export function fillAllRows(data) {
  const listItemDivs = document.querySelectorAll('.list__item.is-idle.js-item');

  // Iterate over existing list items
  listItemDivs.forEach((element, i) => {
    console.log(`${i} ${element.textContent}`);

    // Update child elements if data exists
    if (data && data[i]) {
      const symbolDiv = element.querySelector('.symbol');
      const stonkDiv = element.querySelector('.stonk');

      if (symbolDiv) {
        symbolDiv.textContent = data[i].symbol; // Update symbol content
      }
      if (stonkDiv) {
        stonkDiv.textContent = data[i].stonk; // Update stonk content
      }
    }
  });
//NOTE might need to create divs if not enough exist
}

// symbolText is the actual code, like AAPL
// newStonkData is the new data for that symbol
export function updateStonkBySymbol(symbolText, newStonkData) {
  // Find all .symbol elements
  const symbolDivs = document.querySelectorAll('.list__item.is-idle.js-item .symbol');

  // Iterate through each .symbol div to find a match
  for (const symbolDiv of symbolDivs) {
    if (symbolDiv.textContent.trim() === symbolText) {
      // Found a matching .symbol; update its .stonk sibling
      const listItem = symbolDiv.closest('.list__item'); // Get the parent .list__item
      const stonkDiv = listItem.querySelector('.stonk'); // Find the .stonk div
      if (stonkDiv) {
        stonkDiv.textContent = newStonkData;
        console.log(`Updated ${symbolText}: ${newStonkData}`);
      }
      return; // Exit after updating the first match
    }
  }

  console.log(`No symbol: ${symbolText}`);
}
