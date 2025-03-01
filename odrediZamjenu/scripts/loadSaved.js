import { changeStatusMessage } from "../../raspored/scripts/buttonsLabels.js";
import { extractSelectedClasses, nullElement } from "./extractInformation.js";
import { currentAbsenceText } from "./index.js";
import { changeCurrentDisplay } from "./labelsButtons.js";

function clickAndScroolTo(element) {
  element.click();
  element.scrollIntoView({ behavior: "smooth", block: "center" });
}

export function displaySavedSubstitutions(listAbsenceJSON) {
  let savedSubstitutions = 0;
  for (let i = 0; i < listAbsenceJSON.length; i++) {
    const absenceJSON = listAbsenceJSON[i];
    if (!absenceJSON.hasOwnProperty("NoviPredmet")) {
      continue;
    }
    savedSubstitutions++;
  }
  document.querySelector("#class-remaining").textContent =
    savedSubstitutions.toString();
}

export let maxSubstitutionsOfTeacher = [];
export async function displaySavedTeachers(teacherList) {
  let savedTeachers = 0;
  for (let i = 0; i < teacherList.length; i++) {
    const teacher = teacherList[i];
    const [dayPeriodText, teacherJSON] = await extractSelectedClasses(teacher);
    maxSubstitutionsOfTeacher.push(teacherJSON.length);
    const indexOfUnsaved = teacherJSON.filter((item) =>
      item.hasOwnProperty("NoviPredmet")
    );
    if (indexOfUnsaved.length !== teacherJSON.length) {
      continue;
    }
    savedTeachers++;
  }
  document.querySelector("#schedule-remaining").textContent =
    savedTeachers.toString();
}
export async function loadSaved(currentJSON) {
  if (currentJSON.NoviPredmet == undefined) {
    return;
  }
  const substitute = currentJSON.Zamjena;
  const newClassroom = currentJSON.NoviProstor;
  const newSubject = currentJSON.NoviPredmet;

  const teacherListItems = [...document.querySelectorAll("#teacher-list > *")];
  const selectedTeacher = teacherListItems.find(
    (item) => item.textContent == substitute
  );
  const classroomListItems = [...document.querySelectorAll("#room-list > * ")];
  const selectedClassroom = classroomListItems.find(
    (item) => item.textContent == newClassroom
  );
  clickAndScroolTo(selectedTeacher);
  if (selectedTeacher?.textContent != nullElement) {
    const selectedSubject = await retireveSubjectToClick(newSubject);
    clickAndScroolTo(selectedSubject);
    clickAndScroolTo(selectedClassroom);
  }

  changeStatusMessage();
  changeCurrentDisplay(false, currentAbsenceText);
}

function retireveSubjectToClick(subject) {
  return new Promise((resolve) => {
    const interval = setInterval(() => {
      const subjectListItems = [
        ...document.querySelectorAll("#subject-list > *"),
      ];
      const subjectToClick = subjectListItems.find(
        (item) => item.textContent == subject
      );
      if (subjectToClick !== undefined) {
        clearInterval(interval);
        resolve(subjectToClick);
      }
    }, 1);
  });
}
