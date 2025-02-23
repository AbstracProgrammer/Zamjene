import {
  clickCellsForSpecificDay,
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

export function destroyTable() {
  removeWholeDayAbsenceFunction();
  removeWholeWeekAbsenceFunction();

  const table = document.querySelectorAll(".schedule > tbody > tr");
  for (let i = 0; i < table.length; i++) {
    const row = table[i];
    row.remove();
  }
}
