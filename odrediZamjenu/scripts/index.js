import {
  didUserSave,
  generateNewDayPeriod,
} from "./changeDayPeriodsAndTeachers.js";
import {
  extractSelectedClasses,
  sortClassroons,
  sortTeachers,
} from "./extractInformation.js";
import { changeCurrentDisplay, defineTotal } from "./labelsButtons.js";
import { displaySavedSubstitutions, loadSaved } from "./loadSaved.js";
import { fillClassroomList, fillTeachersList } from "./substitution.js";

const params = new URLSearchParams(window.location.search);
const absentTeachers = JSON.parse(params.get("absent"));
export const modal = document.querySelector(".modal-window");
modal.style.display = "block";

export const teacherTotal = defineTotal(true, absentTeachers);

export let currentAbsence, currentAbsenceText;
let listCurrentAbsenceText,
  listCurrentAbsenceJSON,
  bestTeachersList,
  goodTeachersList,
  badTeachersList,
  currentTeacher,
  currentTeacherIndex,
  currentIndexAbsence,
  currentPeriodsTotal;

async function setUpStartingScreen() {
  [listCurrentAbsenceText, listCurrentAbsenceJSON] =
    await extractSelectedClasses(absentTeachers[0]);
  console.log(listCurrentAbsenceText, listCurrentAbsenceJSON);

  currentAbsence = listCurrentAbsenceJSON[0];
  currentAbsenceText = listCurrentAbsenceText[0];
  currentTeacher = absentTeachers[0];
  currentTeacherIndex = 0;
  currentIndexAbsence = 0;
  currentPeriodsTotal = defineTotal(false, listCurrentAbsenceText);

  console.log(currentAbsence);
  [bestTeachersList, goodTeachersList, badTeachersList] = await sortTeachers(
    currentAbsence,
    absentTeachers[0]
  );
  changeCurrentDisplay(true, currentTeacher);
  changeCurrentDisplay(false, currentAbsenceText);

  fillTeachersList([bestTeachersList, goodTeachersList, badTeachersList]);
  fillClassroomList(await sortClassroons(listCurrentAbsenceJSON[0]));
  loadSaved(currentAbsence);
  displaySavedSubstitutions(listCurrentAbsenceJSON);

  previousDayPeriodButton?.classList.add("forbidden-cycle");
  if (listCurrentAbsenceText.length == 1) {
    nextDayPeriodButton?.classList.add("forbidden-cycle");
  } else {
    nextDayPeriodButton?.addEventListener("click", nextDayPeriod);
  }
  previousTeacherButton?.classList.add("forbidden-cycle");
  if (listCurrentAbsenceText.length == 1) {
    nextTeacherButton?.classList.add("forbidden-cycle");
  } else {
    nextTeacherButton?.addEventListener("click", nextTeacher);
  }
  modal.style.display = "none";
}

const previousDayPeriodButton = document.querySelector("#left-class");
const nextDayPeriodButton = document.querySelector("#right-class");

function previousDayPeriod() {
  if (!didUserSave()) {
    return;
  }
  currentIndexAbsence = listCurrentAbsenceText.indexOf(currentAbsenceText);
  if (currentIndexAbsence == 1) {
    previousDayPeriodButton?.classList.add("forbidden-cycle");
    previousDayPeriodButton?.removeEventListener("click", previousDayPeriod);
  }

  if (currentIndexAbsence + 1 == listCurrentAbsenceText.length) {
    nextDayPeriodButton?.classList.remove("forbidden-cycle");
    nextDayPeriodButton?.addEventListener("click", nextDayPeriod);
  }
  currentAbsenceText = listCurrentAbsenceText[currentIndexAbsence - 1];
  currentAbsence = listCurrentAbsenceJSON[currentIndexAbsence - 1];
  changeCurrentDisplay(false, currentAbsenceText);
  generateNewDayPeriod(currentAbsence, currentTeacher);
}

function nextDayPeriod() {
  if (!didUserSave()) {
    return;
  }
  currentIndexAbsence = listCurrentAbsenceText.indexOf(currentAbsenceText);
  if (currentIndexAbsence + 2 == listCurrentAbsenceText.length) {
    nextDayPeriodButton?.classList.add("forbidden-cycle");
    nextDayPeriodButton?.removeEventListener("click", nextDayPeriod);
  }

  if (currentIndexAbsence == 0) {
    previousDayPeriodButton?.classList.remove("forbidden-cycle");
    previousDayPeriodButton?.addEventListener("click", previousDayPeriod);
  }

  currentAbsenceText = listCurrentAbsenceText[currentIndexAbsence + 1];
  currentAbsence = listCurrentAbsenceJSON[currentIndexAbsence + 1];
  changeCurrentDisplay(false, currentAbsenceText);
  generateNewDayPeriod(currentAbsence, currentTeacher);
}

const previousTeacherButton = document.querySelector("#left-teacher");
const nextTeacherButton = document.querySelector("#right-teacher");

async function updateInformationWhenChaningTeacher() {
  currentTeacher = absentTeachers[currentTeacherIndex];
  [listCurrentAbsenceText, listCurrentAbsenceJSON] =
    await extractSelectedClasses(currentTeacher);

  currentIndexAbsence = 0;
  currentAbsenceText = listCurrentAbsenceText[currentIndexAbsence];
  currentAbsence = listCurrentAbsenceJSON[currentIndexAbsence];
  changeCurrentDisplay(true, currentTeacher);
  changeCurrentDisplay(false, currentAbsenceText);
  generateNewDayPeriod(currentAbsence, currentTeacher);
  currentPeriodsTotal = defineTotal(false, listCurrentAbsenceText);
  displaySavedSubstitutions(listCurrentAbsenceJSON);
}

async function previousTeacher() {
  //funkcija ako nije spremljeno
  if (currentTeacherIndex == 1) {
    previousTeacherButton?.classList.add("forbidden-cycle");
    previousTeacherButton?.removeEventListener("click", previousTeacher);
  }

  if (currentTeacherIndex + 1 == absentTeachers.length) {
    nextTeacherButton?.classList.remove("forbidden-cycle");
    nextTeacherButton?.addEventListener("click", nextTeacher);
  }
  currentTeacherIndex--;
  await updateInformationWhenChaningTeacher();
  console.log(listCurrentAbsenceText, listCurrentAbsenceJSON);
}

async function nextTeacher() {
  //funkcija ako nije spremljeno
  if (currentTeacherIndex + 2 == absentTeachers.length) {
    nextTeacherButton?.classList.add("forbidden-cycle");
    nextTeacherButton?.removeEventListener("click", nextTeacher);
  }
  if (currentTeacherIndex == 0) {
    previousTeacherButton?.classList.remove("forbidden-cycle");
    previousTeacherButton?.addEventListener("click", previousTeacher);
  }
  currentTeacherIndex++;
  await updateInformationWhenChaningTeacher();
  console.log("nakon", listCurrentAbsenceText, listCurrentAbsenceJSON);
}
setUpStartingScreen();
