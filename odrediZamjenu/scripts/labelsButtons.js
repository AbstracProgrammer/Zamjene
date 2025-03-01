import { fetchJSON } from "../../assets/js/searchList.js";
import { changeStatusMessage } from "../../raspored/scripts/buttonsLabels.js";

export function changeRemainingNumber(isTeacher, isAddition) {
  const remainingElementID = isTeacher
    ? "schedule-remaining"
    : "class-remaining";
  const remainingText = document.getElementById(remainingElementID);

  let remainingNumber = Number(remainingText.textContent);
  isAddition ? remainingNumber++ : remainingNumber--;
  remainingText.textContent = remainingNumber;
}

export function defineTotal(isTeacher, list) {
  const totalElementID = isTeacher ? "schedule-total" : "class-total";
  const totalText = document.getElementById(totalElementID);

  totalText.textContent = list.length;
  return list.length;
}

export function changeCurrentDisplay(isTeacher, name) {
  const remainingElementID = isTeacher ? "teacher-name" : "day-period";
  const remainingSchedulesText = document.getElementById(remainingElementID);

  remainingSchedulesText.textContent = name;
}

function extractAndPrepareSelectedInformation(currentJSON) {
  const selectedTeacher = document.querySelector(
    "#teacher-list > .element-selected"
  );
  const selectedSubject = document.querySelector(
    "#subject-list > .element-selected"
  );
  const selectedClassroom = document.querySelector(
    "#room-list > .element-selected"
  );
  if (
    selectedClassroom === null ||
    selectedSubject === null ||
    selectedTeacher === null
  ) {
    return false;
  }
  currentJSON.Predmet = selectedSubject.textContent;
  currentJSON.Zamjena = selectedTeacher.textContent;
  currentJSON.Prostor = selectedClassroom.textContent;
  return currentJSON;
}

export async function save(currentJSON) {
  const json = await fetchJSON();
  const configuredJSON = Object.assign({}, currentJSON);
  if (extractAndPrepareSelectedInformation(configuredJSON) === false) {
    alert("Molimo izaberite zamjenu za sve");
    return;
  }
  const indexInJSON = json.findIndex(
    (item) => JSON.stringify(item) == JSON.stringify(currentJSON)
  );
  json[indexInJSON] = configuredJSON;

  fetch("../assets/server/saveJSON.php", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      json: JSON.stringify(json),
    }),
  });

  changeStatusMessage();
  changeRemainingNumber(false, true);
}

export function discard() {
  const selectedItem = document.querySelectorAll(".element-selected");
  for (let i = 0; i < selectedItem.length; i++) {
    selectedItem[i].classList.remove("element-selected");
  }
  const subjectListElement = document.querySelector("#subject-list");
  subjectListElement.innerHTML = "";
}
