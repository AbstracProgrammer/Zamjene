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
  currentIndexAbsence,
  currentTeacherTotal;

async function setUpStartingScreen() {
  [listCurrentAbsenceText, listCurrentAbsenceJSON] =
    await extractSelectedClasses(absentTeachers[0]);
  console.log(listCurrentAbsenceText, listCurrentAbsenceJSON);

  currentAbsence = listCurrentAbsenceJSON[0];
  currentAbsenceText = listCurrentAbsenceText[0];
  currentTeacher = absentTeachers[0];
  currentIndexAbsence = 0;
  currentTeacherTotal = defineTotal(false, listCurrentAbsenceText);

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

setUpStartingScreen();
