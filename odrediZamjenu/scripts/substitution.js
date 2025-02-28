export function fillTeachersList(sortedTeachersLists) {
  const teacherListElement = document.querySelector("#teacher-list");

  for (let i = 0; i < sortedTeachersLists[0].length; i++) {
    const itemElement = document.createElement("li");
    itemElement.classList.add("element");
    const bestTeacher = sortedTeachersLists[0][i];
    itemElement.classList.add("best");
    itemElement.textContent = bestTeacher;
    teacherListElement?.appendChild(itemElement);
  }
  for (let i = 0; i < sortedTeachersLists[1].length; i++) {
    const itemElement = document.createElement("li");
    itemElement.classList.add("element");
    const goodTeacher = sortedTeachersLists[1][i];
    itemElement.classList.add("good");
    itemElement.textContent = goodTeacher;
    teacherListElement?.appendChild(itemElement);
  }
  for (let i = 0; i < sortedTeachersLists[2].length; i++) {
    const itemElement = document.createElement("li");
    itemElement.classList.add("element");
    const badTeacher = sortedTeachersLists[2][i];
    itemElement.classList.add("bad");
    itemElement.textContent = badTeacher;
    teacherListElement?.appendChild(itemElement);
  }
}
