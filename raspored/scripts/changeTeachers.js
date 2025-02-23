import { fetchJSON } from "../../assets/js/searchList.js";
import { destroyTable } from "./destroyTable.js";
import { filterJSON, generateTable } from "./generateTable.js";

const params = new URLSearchParams(window.location.search);
const absentTeachers = JSON.parse(params.get("absent"));

function teacherJSON(json, teacherName) {
  return json.filter((item) => {
    return item.Prof == teacherName;
  });
}

function setCurrentTeacher(name) {
  const display = document.querySelector(".name");
  display.textContent = name;
}

const previousTeacherButton = document.querySelector("#left");
const nextTeacherButton = document.querySelector("#right");

async function generateNewTeacher(teacherName) {
  destroyTable();
  const startingTeacherJson = teacherJSON(
    await filterJSON(absentTeachers),
    teacherName
  );
  generateTable(startingTeacherJson);
}

function previousTeacher() {
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
}

function nextTeacher() {
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
}

//ODMAH generirati prvog prof
let currentTeacher = absentTeachers[0]; //mozda ovdje export

async function setUpStartingScreen() {
  setCurrentTeacher(absentTeachers[0]);
  previousTeacherButton?.classList.add("forbidden-cycle");
  if (absentTeachers.length == 1) {
    nextTeacherButton?.classList.add("forbidden-cycle");
  } else {
    nextTeacherButton?.addEventListener("click", nextTeacher);
  }

  const startingTeacherJson = teacherJSON(
    await filterJSON(absentTeachers),
    absentTeachers[0]
  );
  generateTable(startingTeacherJson);
}

setUpStartingScreen();

async function remainingJSON() {
  let jsonInUse = await filterJSON(absentTeachers);
  jsonInUse = jsonInUse.map((item) => {
    return JSON.stringify(item);
  });

  const originalJSON = await fetchJSON();

  const jsonNotInUse = originalJSON.filter((item) => {
    return !jsonInUse.includes(JSON.stringify(item));
  });
  return jsonNotInUse;
}
