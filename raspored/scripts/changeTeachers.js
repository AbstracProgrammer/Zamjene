const params = new URLSearchParams(window.location.search);
const absentTeachers = JSON.parse(params.get("absent"));
console.log(absentTeachers);
import { fetchJSON } from "../../assets/js/searchList.js";

async function filterJSON(teachers) {
  const JSON = await fetchJSON();
  const filteredJSON = JSON.filter((json) => filterHelper(json.Prof, teachers));
  return filteredJSON;
}

function filterHelper(name, list) {
  return list.includes(name);
}

function setCurrentTeacher(name) {
  const display = document.querySelector(".name");
  display.textContent = name;
}

//gumbove za sljedeći, prijašnji prof
const previousTeacherButton = document.querySelector("#left");
const nextTeacherButton = document.querySelector("#right");

function previousTeacher() {
  const pointer = absentTeachers.indexOf(currentTeacher);
  if (pointer == 0) {
    return;
  } else if (pointer == 1) {
    previousTeacherButton?.classList.add("forbidden-cycle");
    previousTeacherButton?.removeEventListener("click", previousTeacher);
  }

  if (pointer + 1 == absentTeachers.length) {
    nextTeacherButton?.classList.remove("forbidden-cycle");
    nextTeacherButton?.addEventListener("click", nextTeacher);
  }
  currentTeacher = absentTeachers[pointer - 1];
  setCurrentTeacher(currentTeacher);
}

function nextTeacher() {
  const pointer = absentTeachers.indexOf(currentTeacher);
  if (pointer + 1 == absentTeachers.length) {
    return;
  } else if (pointer + 2 == absentTeachers.length) {
    nextTeacherButton?.classList.add("forbidden-cycle");
    nextTeacherButton?.removeEventListener("click", nextTeacher);
  }

  if (pointer == 0) {
    previousTeacherButton?.classList.remove("forbidden-cycle");
    previousTeacherButton?.addEventListener("click", previousTeacher);
  }

  currentTeacher = absentTeachers[pointer + 1];
  setCurrentTeacher(currentTeacher);
}

//ODMAH generirati prvog prof
setCurrentTeacher(absentTeachers[0]);
let currentTeacher = absentTeachers[0]; //mozda ovdje export
previousTeacherButton?.classList.add("forbidden-cycle");
if (absentTeachers.length == 1) {
  nextTeacherButton?.classList.add("forbidden-cycle");
} else {
  nextTeacherButton?.addEventListener("click", nextTeacher);
}

/**
 * IDEJA ZA OVE KLIKOVE
 *
 * ako kliknes npr. Ponedjeljak, on sam po sebi neće dobiti kao oznaku da je kliknut
 * nego on ce onda kliknute sve sve pomocu element.click()
 *
 * ista stvar vrijedi za cijelu tablicu
 */
