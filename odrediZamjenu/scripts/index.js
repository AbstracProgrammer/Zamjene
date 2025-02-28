import { displaySearchResults } from "../../assets/js/searchList.js";
import {
  extractSelectedClasses,
  sortClassroons,
  sortTeachers,
} from "./extractInformation.js";
import { fillClassroomList, fillTeachersList } from "./substitution.js";

const params = new URLSearchParams(window.location.search);
const absentTeachers = JSON.parse(params.get("absent"));
const modal = document.querySelector(".modal-window");
modal.style.display = "block";

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

export let currentTeachersAbsence,
  currentTeachersAbsenceJSON,
  bestTeachersList,
  goodTeachersList,
  badTeachersList,
  currentAbsence,
  currentTeacher,
  currentIndexAbsence;

async function setUpStartingScreen() {
  [currentTeachersAbsence, currentTeachersAbsenceJSON] =
    await extractSelectedClasses(absentTeachers[0]);
  console.log(currentTeachersAbsence, currentTeachersAbsenceJSON);
  //a i b su dan i sat
  [bestTeachersList, goodTeachersList, badTeachersList] = await sortTeachers(
    currentTeachersAbsenceJSON[0],
    absentTeachers[0]
  );
  currentAbsence = currentTeachersAbsenceJSON[0];
  currentTeacher = absentTeachers[0];
  currentIndexAbsence = 0;

  console.log(bestTeachersList, goodTeachersList, badTeachersList);
  //c su ostali, d su losi
  fillTeachersList([bestTeachersList, goodTeachersList, badTeachersList]);
  fillClassroomList(await sortClassroons(currentTeachersAbsenceJSON[0]));

  modal.style.display = "none";
}
setUpStartingScreen();
