import { changeStatusMessage } from "../../raspored/scripts/buttonsLabels.js";
import { currentAbsenceText } from "./index.js";
import {
  changeCurrentDisplay,
  changeRemainingNumber,
} from "./labelsButtons.js";

export async function loadSaved(currentJSON) {
  if (currentJSON.NoviPredmet == undefined) {
    return;
  }
  const substitute = currentJSON.Zamjena;
  const newClassroom = currentJSON.NoviProstor;
  const newSubject = currentJSON.NoviPredmet;

  const teacherListItems = [...document.querySelectorAll("#teacher-list > *")];
  teacherListItems.find((item) => item.textContent == substitute).click();
  const classroomListItems = [...document.querySelectorAll("#room-list > * ")];
  classroomListItems.find((item) => item.textContent == newClassroom).click();

  (await retireveSubjectToClick(newSubject)).click();

  changeStatusMessage();
  changeCurrentDisplay(false, currentAbsenceText);
  changeRemainingNumber(false, true);
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
