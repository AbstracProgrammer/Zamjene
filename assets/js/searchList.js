function makeItemHidden(element) {
  element.hidden = true;
}

function makeItemVisible(element) {
  element.hidden = false;
}

export function displaySearchResults(query, elementList) {
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

export async function fetchJSON() {
  let JSON = await fetch("../raspored.json");
  JSON = await JSON.json();
  return JSON;
}
