async function retrieveTeacherNames(pathToJson) {
  const response = await fetch("raspored.json");
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
}

function populateHtmlList(teacherNames) {
  const presentTeachers = document.querySelector(".present-teachers");
}

retrieveTeacherNames("raspored.json");

/**
 * vjv za zamjene bih dodao novi ključ
 * {"Zamjena": true}
 */

document
  .querySelector("#autojukebox")
  ?.addEventListener("click", () => (window.location.href = "../index.html"));
