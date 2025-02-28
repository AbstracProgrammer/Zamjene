function markAsSelected(element) {
  checkIfThereIsSelectedItem(element.parentElement);
  if (element.classList.contains("element-selected")) {
    element.classList.remove("element-selected");
    return;
  }
  element.classList.add("element-selected");
}

function checkIfThereIsSelectedItem(parentElement) {
  const selectedItem = parentElement.querySelector(".element-selected");
  if (selectedItem == null) {
    return;
  }
  selectedItem.click();
}

function makeListItem(text) {
  const itemElement = document.createElement("li");
  itemElement.classList.add("element");
  itemElement.textContent = text;
  return itemElement;
}

export function fillTeachersList(sortedTeachersLists) {
  const teacherListElement = document.querySelector("#teacher-list");

  for (let i = 0; i < sortedTeachersLists[0].length; i++) {
    const bestTeacher = sortedTeachersLists[0][i];
    const itemElement = makeListItem(bestTeacher);
    itemElement.classList.add("best");
    teacherListElement?.appendChild(itemElement);
    itemElement.addEventListener("click", () => markAsSelected(itemElement));
  }
  for (let i = 0; i < sortedTeachersLists[1].length; i++) {
    const goodTeacher = sortedTeachersLists[1][i];
    const itemElement = makeListItem(goodTeacher);
    itemElement.classList.add("good");
    teacherListElement?.appendChild(itemElement);
    itemElement.addEventListener("click", () => markAsSelected(itemElement));
  }
  for (let i = 0; i < sortedTeachersLists[2].length; i++) {
    const badTeacher = sortedTeachersLists[2][i];
    const itemElement = makeListItem(badTeacher);
    itemElement.classList.add("bad");
    teacherListElement?.appendChild(itemElement);
    itemElement.addEventListener("click", () => markAsSelected(itemElement));
  }
}

export function fillClassroomList(classesList) {
  const classroomListElement = document.querySelector("#room-list");

  for (let i = 0; i < classesList.length; i++) {
    const className = classesList[i];
    const itemElement = makeListItem(className);
    if (i == 0) {
      itemElement.classList.add("best");
    } else {
      itemElement.classList.add("bad");
    }
    classroomListElement?.appendChild(itemElement);
    itemElement.addEventListener("click", () => markAsSelected(itemElement));
  }
}
