import { changeStatusMessage } from "../../raspored/scripts/buttonsLabels.js";
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
  clickAndScroolTo(selectedClassroom);

  const selectedSubject = await retireveSubjectToClick(newSubject);
  clickAndScroolTo(selectedSubject);

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
