import {
  clickCellsForSpecificDay,
  generateTable,
  wholeWeekAbsenceFunction,
} from "./generateTable.js";

function removeWholeDayAbsenceFunction() {
  const mainRowCells = document.querySelectorAll(".schedule > thead > tr > th");
  //prvo idem s 1 jer je prvi stupac sat
  for (let i = 1; i < mainRowCells.length; i++) {
    mainRowCells[i].removeEventListener("click", clickCellsForSpecificDay);
  }
}

function removeWholeWeekAbsenceFunction() {
  const wholeWeekAbsenceButton = document.querySelector(".select-all-table");
  wholeWeekAbsenceButton?.removeEventListener(
    "click",
    wholeWeekAbsenceFunction
  );
}

export function destroyTableAndGenerateNew(teacherJSON) {
  removeWholeDayAbsenceFunction();
  removeWholeWeekAbsenceFunction();

  const table = document.querySelector("tbody");
  table.innerHTML = "";

  //trebao sam napraviti ovako jer su bili inace problemi
  //ne bi se napravilo pravilno, npr. dva puta bi se izbrisalo pa generiralo duplo
  generateTable(teacherJSON);
}
