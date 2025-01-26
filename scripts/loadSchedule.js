async function retrieveTeacherNames(pathToJson) {
  const response = await fetch(pathToJson);
  const json = await response.json();

  let teachers = [];
  let nullElement = "//";
  for (let i = 0; i < json.length; i++) {
    let indexTeacher = json[i].Prof;
    if (teachers.includes(indexTeacher) || indexTeacher == nullElement) {
      continue;
    }
    teachers.push(indexTeacher);
  }

  return teachers;
}

function createListItem(name) {
  const listItem = document.createElement("li");
  listItem.classList.add("teacher");
  listItem.textContent = name;
  return listItem;
}

async function populateHtmlList() {
  const presentTeachers = document.querySelector(".present-teachers");
  const teacherNames = await retrieveTeacherNames("raspored.json");
  console.log(teacherNames);
  for (let i = 0; i < teacherNames.length; i++) {
    const teacherName = teacherNames[i];
    const listElement = createListItem(teacherName);
    presentTeachers?.appendChild(listElement);
    listElement.addEventListener("click", () => {
      markAsSelected(listElement);
    });
  }
}

populateHtmlList();
