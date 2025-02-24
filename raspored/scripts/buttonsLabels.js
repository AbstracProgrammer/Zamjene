import {
  filterJSONByTeacher,
  remainingJSON,
  specificTeacherJSON,
} from "./jsonHelper.js";

const schoolDays = ["Ponedjeljak", "Utorak", "Srijeda", "Četvrtak", "Petak"];

export function changeStatusMessage() {
  const statusElement = document.querySelector(".save-status");
  if (statusElement?.classList.contains("not-saved")) {
    statusElement.classList.replace("not-saved", "saved");
    statusElement.textContent = "Spremljeno";
  } else {
    statusElement.classList.replace("saved", "not-saved");
    statusElement.textContent = "Nije spremljeno";
  }
}

export function changeRemainingNumber(remainingTextElement) {}

export function discard() {
  const selectedCells = document.querySelectorAll("tbody > * > .selected");
  for (let i = 0; i < selectedCells.length; i++) {
    selectedCells[i].click();
  }
}

function findClassJson(cell) {
  const rowOfCell = cell.parentElement;
  const period = rowOfCell.children[0].textContent;
  const dayIndex = [...rowOfCell.children].indexOf(cell);
  const day = schoolDays[dayIndex - 1];
  return [period, day];
}

function saveCells() {
  const selectedCells = document.querySelectorAll("tbody > * > .selected");
  const savedCells = [];
  for (let i = 0; i < selectedCells.length; i++) {
    const cell = selectedCells[i];
    const response = findClassJson(cell);
    savedCells.push(response);
  }
  return savedCells;
}

export async function prepareJSON(absentTeachers, currentTeacher) {
  const savedCells = saveCells();
  const currentTeacherJson = specificTeacherJSON(
    await filterJSONByTeacher(absentTeachers),
    currentTeacher
  );
  for (let i = 0; i < savedCells.length; i++) {
    const classInformation = savedCells[i];
    const [period, day] = classInformation;

    const indexOfSpecificClass = currentTeacherJson.findIndex((item) => {
      return item.Sat == period && item.Dan == day;
    });
    currentTeacherJson[indexOfSpecificClass].Zamjena = false;
  }
  const jsonToSave = [
    ...currentTeacherJson,
    ...(await remainingJSON(currentTeacher)),
  ];

  return jsonToSave;
}
