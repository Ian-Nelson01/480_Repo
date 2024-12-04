// fill all stock divs with passed array
export function fillAllRows(data) {
  const stonkDivs = document.querySelectorAll('.stonk')

  // iterate over divs (NodeList)
  stonkDivs.forEach((element, i) => {
    console.log(`${i} ${element.textContent}`)

    if (data && data[i]) {
      element.textContent = data[i]
    }


  })

}

