import { fetchJSON } from "../../assets/js/searchList.js";

async function filterJSON(teachers) {
  const JSON = await fetchJSON();
  const filteredJSON = JSON.filter((json) => filterHelper(json.Prof, teachers));
  return filteredJSON;
}

function filterHelper(name, list) {
  return list.includes(name);
}

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
  let latestClass;
  for (let index = 0; index < teacherClasses.length; index++) {
    const classTime = Number(teacherClasses[index].Sat);
    if (classTime <= latestClass) {
      continue;
    }
    latestClass = classTime;
  }
  return latestClass;
}

function prepareOrderedClassesList(number, classesList) {
  //prvo ponedjelak pa itd
}

function generateRow(number, classesList, table) {
  //row
  //prvi je broj
  //ostali su satovi, ako name samo stavi prazno
  //dodati klasu .selectable
  //i event listener da se može klinuti, dodati .selected
  const row = document.createElement("tr");
  const numberCell = document.createElement("td");
  numberCell.textContent = number;

  for (let i = 0; i < 5; i++) {}
}
