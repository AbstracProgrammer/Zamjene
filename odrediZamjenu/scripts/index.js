import { displaySearchResults } from "../../assets/js/searchList.js";
import {
  extractSelectedClasses,
  sortClassroons,
  sortTeachers,
} from "./extractInformation.js";
import {
  changeCurrentDisplay,
  defineTotal,
  discard,
  save,
} from "./labelsButtons.js";
import { loadSaved } from "./loadSaved.js";
import { fillClassroomList, fillTeachersList } from "./substitution.js";

const params = new URLSearchParams(window.location.search);
const absentTeachers = JSON.parse(params.get("absent"));
const modal = document.querySelector(".modal-window");
modal.style.display = "block";

export const teacherTotal = defineTotal(true, absentTeachers);

document.querySelector("#teacher-input").addEventListener("input", (e) => {
  displaySearchResults(
    e.target.value,
    document.querySelectorAll("#teacher-list > *")
  );
});
document.querySelector("#subject-input").addEventListener("input", (e) => {
  displaySearchResults(
    e.target.value,
    document.querySelectorAll("#subject-list > *")
  );
});
document.querySelector("#room-input").addEventListener("input", (e) => {
  displaySearchResults(
    e.target.value,
    document.querySelectorAll("#room-list > *")
  );
});

document
  .querySelector("#save")
  ?.addEventListener("click", async () => await save(currentAbsence));

document.querySelector("#discard")?.addEventListener("click", discard);

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
  modal.style.display = "none";
}
setUpStartingScreen();
