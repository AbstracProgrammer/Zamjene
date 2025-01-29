function makeItemHidden(element) {
  element.hidden = true;
}

function makeItemVisible(element) {
  element.hidden = false;
}

function displaySearchResults(query, elementList) {
  console.log(elementList);
  for (let i = 0; i < elementList.length; i++) {
    const element = elementList[i];
    const lowercaseName = element.textContent.toLowerCase();
    const lowercaseQuery = query.toLowerCase();

    if (lowercaseName.startsWith(lowercaseQuery) && element.hidden == true) {
      makeItemVisible(element);
    }
    if (lowercaseName.startsWith(lowercaseQuery)) {
      continue;
    }
    makeItemHidden(element);
  }
}
