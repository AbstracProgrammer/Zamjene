import {
  changeRemainingNumber,
  changeStatusMessage,
  discard,
  prepareJSON,
} from "./buttonsLabels.js";
import { destroyTable } from "./destroyTable.js";
import { generateTable } from "./generateTable.js";
import { filterJSONByTeacher, specificTeacherJSON } from "./jsonHelper.js";
import {
  checkForSavedSchedule,
  stopIfUserDidntSave,
} from "./savedScheduleHandler.js";

const params = new URLSearchParams(window.location.search);
const absentTeachers = JSON.parse(params.get("absent"));

function setCurrentTeacher(name) {
  const display = document.querySelector(".name");
  display.textContent = name;
}

const previousTeacherButton = document.querySelector("#left");
const nextTeacherButton = document.querySelector("#right");

async function generateNewTeacher(teacherName) {
  destroyTable();
  const startingTeacherJson = specificTeacherJSON(
    await filterJSONByTeacher(absentTeachers),
    teacherName
  );
  generateTable(startingTeacherJson);
}

function previousTeacher() {
  stopIfUserDidntSave();
  const pointer = absentTeachers.indexOf(currentTeacher);
  if (pointer == 1) {
    previousTeacherButton?.classList.add("forbidden-cycle");
    previousTeacherButton?.removeEventListener("click", previousTeacher);
  }

  if (pointer + 1 == absentTeachers.length) {
    nextTeacherButton?.classList.remove("forbidden-cycle");
    nextTeacherButton?.addEventListener("click", nextTeacher);
  }
  currentTeacher = absentTeachers[pointer - 1];
  setCurrentTeacher(currentTeacher);

  generateNewTeacher(currentTeacher);
  checkForSavedSchedule(currentTeacher);
}

function nextTeacher() {
  stopIfUserDidntSave();
  const pointer = absentTeachers.indexOf(currentTeacher);
  if (pointer + 2 == absentTeachers.length) {
    nextTeacherButton?.classList.add("forbidden-cycle");
    nextTeacherButton?.removeEventListener("click", nextTeacher);
  }

  if (pointer == 0) {
    previousTeacherButton?.classList.remove("forbidden-cycle");
    previousTeacherButton?.addEventListener("click", previousTeacher);
  }

  currentTeacher = absentTeachers[pointer + 1];
  setCurrentTeacher(currentTeacher);

  generateNewTeacher(currentTeacher);
  checkForSavedSchedule(currentTeacher);
}

function resetJSOn() {
  fetch("../assets/server/resetJSON.php", {
    method: "POST",
  });
}

let currentTeacher = absentTeachers[0]; //mozda ovdje export
document.querySelector("#discard")?.addEventListener("click", discard);

document.querySelector(".total").textContent = absentTeachers.length;

document.querySelector("#save")?.addEventListener("click", async () => {
  const jsonToSave = await prepareJSON(absentTeachers, currentTeacher);

  fetch("../assets/server/saveJSON.php", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      json: JSON.stringify(jsonToSave),
    }),
  });
  changeStatusMessage();
  changeRemainingNumber(true);
});

async function setUpStartingScreen() {
  setCurrentTeacher(absentTeachers[0]);
  previousTeacherButton?.classList.add("forbidden-cycle");
  if (absentTeachers.length == 1) {
    nextTeacherButton?.classList.add("forbidden-cycle");
  } else {
    nextTeacherButton?.addEventListener("click", nextTeacher);
  }

  const startingTeacherJson = specificTeacherJSON(
    await filterJSONByTeacher(absentTeachers),
    absentTeachers[0]
  );
  generateTable(startingTeacherJson);
  if (await checkForSavedSchedule(absentTeachers[0])) {
    changeStatusMessage();
  }
}

setUpStartingScreen();
