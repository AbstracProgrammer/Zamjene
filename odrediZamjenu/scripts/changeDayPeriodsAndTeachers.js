import { changeStatusMessage } from "../../raspored/scripts/buttonsLabels.js";
import { sortClassroons, sortTeachers } from "./extractInformation.js";
import { modal } from "./index.js";
import { loadSaved } from "./loadSaved.js";
import { fillClassroomList, fillTeachersList } from "./substitution.js";

export function didUserSave() {
  const statusElement = document.querySelector(".save-status");
  if (statusElement?.classList.contains("not-saved")) {
    alert("Molimo spremite prije nastavljanje na sljedeći sat");
    return false;
  }
  return true;
}

export async function generateNewDayPeriod(currentAbsenceJSON, currentTeacher) {
  modal.style.display = "block";

  const subjectListElement = document.querySelector("#subject-list");
  subjectListElement.innerHTML = "";
  const teachersListElement = document.querySelector("#teacher-list");
  teachersListElement.innerHTML = "";
  const classroomListElement = document.querySelector("#room-list");
  classroomListElement.innerHTML = "";

  const [bestTeachersList, goodTeachersList, badTeachersList] =
    await sortTeachers(currentAbsenceJSON, currentTeacher);

  fillTeachersList([bestTeachersList, goodTeachersList, badTeachersList]);
  fillClassroomList(await sortClassroons(currentAbsenceJSON));
  changeStatusMessage();
  loadSaved(currentAbsenceJSON);
  modal.style.display = "none";
}
