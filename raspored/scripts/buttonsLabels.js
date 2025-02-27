import {
  filterJSONByTeacher,
  remainingJSON,
  specificTeacherJSON,
} from "./jsonHelper.js";
import {
  checkIfSavedSchedule,
  displaySavedSchdule,
} from "./savedScheduleHandler.js";

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

export function changeRemainingNumber(addition) {
  const remainingSchedulesText = document.querySelector(".remaining");
  let remainingNumber = Number(remainingSchedulesText.textContent);
  addition ? remainingNumber++ : remainingNumber--;
  remainingSchedulesText.textContent = remainingNumber;
}

export async function discard() {
  const selectedCells = document.querySelectorAll("tbody > * > .selected");
  for (let i = 0; i < selectedCells.length; i++) {
    selectedCells[i].click();
  }
  const currentTeacherName = document.querySelector(".name")?.textContent;
  const currentTeacherJSON = await filterJSONByTeacher(currentTeacherName);

  //i mozda ovo poništi vratiti u normalnu a ne kao da ti vrati natrag
  if (!checkIfSavedSchedule(currentTeacherJSON)) {
    return;
  }
  displaySavedSchdule(currentTeacherJSON);

  const statusElement = document.querySelector(".save-status");
  if (statusElement?.classList.contains("saved")) {
    return;
  }
  statusElement.classList.replace("not-saved", "saved");
  statusElement.textContent = "Spremljeno";
  changeRemainingNumber(true);
}

function findClassInfoFromCell(cell) {
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
    const response = findClassInfoFromCell(cell);
    savedCells.push(response);
  }

  if (savedCells.length == 0) {
    alert("Molimo izaberite sat s kojeg će profesor/ica izostati");
    throw new Error("Izaberite barem jedan sat");
  }
  return savedCells;
}

export async function prepareJSON(absentTeacher, currentTeacher) {
  const savedCells = saveCells();
  const currentTeacherJSON = specificTeacherJSON(
    await filterJSONByTeacher(absentTeacher),
    currentTeacher
  );
  for (let i = 0; i < savedCells.length; i++) {
    const classInformation = savedCells[i];
    const [period, day] = classInformation;

    const indexOfSpecificClass = currentTeacherJSON.findIndex((item) => {
      return item.Sat == period && item.Dan == day;
    });
    currentTeacherJSON[indexOfSpecificClass].Zamjena = false;
    //ovo radim da kasnije provjerim ako neki koji je prije bio spremljen, vise nije
    savedCells[i] = currentTeacherJSON[indexOfSpecificClass];
  }
  for (let index = 0; index < currentTeacherJSON.length; index++) {
    const oneClass = currentTeacherJSON[index];
    if (oneClass.Zamjena == false && !savedCells.includes(oneClass)) {
      delete oneClass.Zamjena;
    }
  }
  const jsonToSave = [
    ...currentTeacherJSON,
    ...(await remainingJSON(currentTeacher)),
  ];

  return jsonToSave;
}

export function nextStep() {
  const remainingSchedulesText = document.querySelector(".remaining");
  const remainingNumber = Number(remainingSchedulesText.textContent);
  const totalSchedulesText = document.querySelector(".total");
  const totalNumber = Number(totalSchedulesText.textContent);

  if (totalNumber == remainingNumber) {
    const queryString = window.location.href.split("?")[1];
    const url =
      window.location.href.split("/")[0] +
      "/../odrediZamjenu/odredi-zamjenu.html?" +
      queryString;
    window.open(url, "_self");
    return;
  }
  alert(
    "Molimo da spremite sve rasporede prije prebacivanje na sljedeći korak"
  );
}

export async function documentSavedSchedules(selectedTeachers) {
  for (let i = 0; i < selectedTeachers.length; i++) {
    const teacher = selectedTeachers[i];
    const teacherJSON = await filterJSONByTeacher(teacher);
    if (checkIfSavedSchedule(teacherJSON)) {
      changeRemainingNumber(true);
    }
  }
}

export function unsaveScheduleIfChanged() {
  changeStatusMessage();
  changeRemainingNumber(false);
}
