import { changeStatusMessage } from "./buttonsLabels.js";
import { checkIf0thClass } from "./generateTable.js";
import { filterJSONByTeacher } from "./jsonHelper.js";
const schoolDays = ["Ponedjeljak", "Utorak", "Srijeda", "Četvrtak", "Petak"];

function displaySavedSchdule(teacherJSON) {
  const allRows = document.querySelectorAll(".schedule > tbody > tr");
  for (let index = 0; index < teacherJSON.length; index++) {
    const oneClass = teacherJSON[index];
    if (oneClass.Zamjena == undefined) {
      continue;
    }
    //jer je prvi stupac sat, ide +1
    const dayRowIndex = schoolDays.indexOf(oneClass.Dan) + 1;
    let period = Number(oneClass.Sat);
    checkIf0thClass(teacherJSON) ? {} : period--;
    const targetCell = allRows[period].children[dayRowIndex];
    targetCell.click();
  }
}

export function checkIfSavedSchedule(teacherJSON) {
  for (let i = 0; i < teacherJSON.length; i++) {
    const json = teacherJSON[i];
    if ("Zamjena" in json) {
      return true;
    }
  }
}

export async function generateIfSavedSchedule(teacherName, onStart) {
  const currentTeacherJSON = await filterJSONByTeacher(teacherName);
  if (checkIfSavedSchedule(currentTeacherJSON)) {
    displaySavedSchdule(currentTeacherJSON);
    onStart ? changeStatusMessage() : {};
    return;
  }
  onStart ? {} : changeStatusMessage();
}

export function stopIfUserDidntSave() {
  const statusElement = document.querySelector(".save-status");
  if (statusElement?.classList.contains("not-saved")) {
    alert("Molimo spremite prije prebacivanja profesora/ice");
    throw new Error("Molimo spremite prije prebacivanja profesora/ice");
  }
}
