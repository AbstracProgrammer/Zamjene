import {
  extractSelectedClasses,
  sortClassroons,
  sortTeachers,
} from "./extractInformation.js";
import { fillClassroomList, fillTeachersList } from "./substitution.js";

const params = new URLSearchParams(window.location.search);
const absentTeachers = JSON.parse(params.get("absent"));
const modal = document.querySelector(".modal-window");

export let currentTeachersAbsence,
  currentTeachersAbsenceJSON,
  bestTeachersList,
  goodTeachersList,
  badTeachersList,
  currentAbsence,
  currentTeacher,
  currentIndexAbsence;

async function setUpStartingScreen() {
  modal.style.display = "block";

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
  modal.style.display = "none";

  fillClassroomList(await sortClassroons(currentTeachersAbsenceJSON[0]));
}
setUpStartingScreen();
