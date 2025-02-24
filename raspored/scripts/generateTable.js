const schoolDays = ["Ponedjeljak", "Utorak", "Srijeda", "Četvrtak", "Petak"];

function checkIf0thClass(teacherClasses) {
  for (let index = 0; index < teacherClasses.length; index++) {
    const classTime = Number(teacherClasses[index].Sat);
    if (classTime == 0) {
      return true;
    }
  }
  return false;
}

function findLatestClass(teacherClasses) {
  let latestClass = 0;
  for (let index = 0; index < teacherClasses.length; index++) {
    const classTime = Number(teacherClasses[index].Sat);
    if (classTime <= latestClass) {
      continue;
    }
    latestClass = classTime;
  }
  return latestClass;
}

function prepareOrderedClassesList(period, classesList) {
  let orderedList = [];
  let toAppend = "";
  for (let i = 0; i < schoolDays.length; i++) {
    const currentDay = schoolDays[i];

    const targetClass = classesList.find((item) => {
      return item.Dan == currentDay && item.Sat == period;
    });

    toAppend = targetClass == undefined ? "" : targetClass.Predmet;
    orderedList.push(toAppend);
  }
  return orderedList;
}

function generateRow(period, classesList, table) {
  const row = document.createElement("tr");
  const numberCell = document.createElement("td");
  numberCell.textContent = period;
  row.appendChild(numberCell);
  const toGenerateClasses = prepareOrderedClassesList(period, classesList);

  for (let i = 0; i < 5; i++) {
    const className = toGenerateClasses[i];
    const classCell = document.createElement("td");
    classCell.textContent = className;
    row.appendChild(classCell);
    if (className == "") {
      continue;
    }

    classCell.classList.add("selectable");
    classCell.addEventListener("click", () => {
      if (classCell.classList.contains("selectable")) {
        classCell.classList.replace("selectable", "selected");
      } else {
        classCell.classList.replace("selected", "selectable");
      }
    });
  }

  table.appendChild(row);
}

export function clickCellsForSpecificDay(e) {
  const specificDayIndex = Number(e.currentTarget.getAttribute("day-index"));
  const allRows = document.querySelectorAll(".schedule > tbody > tr");
  for (let index = 0; index < allRows.length; index++) {
    const row = allRows[index];
    const cell = row.children[specificDayIndex];
    if (cell.classList.contains("selected")) {
      continue;
    }
    cell.click();
  }
}

function wholeDayAbsenceFunction() {
  const mainRowCells = document.querySelectorAll(".schedule > thead > tr > th");
  //prvo idem s 1 jer je prvi stupac sat
  for (let i = 1; i < mainRowCells.length; i++) {
    mainRowCells[i].addEventListener("click", clickCellsForSpecificDay);
  }
}

export function wholeWeekAbsenceFunction() {
  const mainRowCells = document.querySelectorAll(".schedule > thead > tr > th");
  //prvo idem s 1 jer je prvi stupac sat
  for (let i = 1; i < mainRowCells.length; i++) {
    mainRowCells[i].click();
  }
}

export function generateTable(classesList) {
  const table = document.querySelector(".schedule > tbody");
  if (checkIf0thClass(classesList)) {
    generateRow(0, classesList, table);
  }
  for (let i = 1; i <= findLatestClass(classesList); i++) {
    generateRow(i, classesList, table);
  }
  wholeDayAbsenceFunction();
  const wholeWeekAbsenceButton = document.querySelector(".select-all-table");
  wholeWeekAbsenceButton?.addEventListener("click", wholeWeekAbsenceFunction);
}
