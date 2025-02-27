import {
  changeRemainingNumber,
  changeStatusMessage,
  discard,
  documentSavedSchedules,
  nextStep,
  prepareJSON,
} from "./buttonsLabels.js";
import { destroyTableAndGenerateNew } from "./destroyTable.js";
import { generateTable } from "./generateTable.js";
import { filterJSONByTeacher, specificTeacherJSON } from "./jsonHelper.js";
import {
  generateIfSavedSchedule,
  stopIfUserDidntSave,
} from "./savedScheduleHandler.js";

const params = new URLSearchParams(window.location.search);
const absentTeachers = JSON.parse(params.get("absent"));

function setCurrentTeacher(name) {
  const display = document.querySelector(".name");
  display.textContent = name;
}

const previousTeacherButton = document.querySelector("#left");
const nextTeacherButton = document.querySelector("#right");

async function generateNewTeacher(teacherName) {
  const startingTeacherJson = await filterJSONByTeacher(teacherName);
  destroyTableAndGenerateNew(startingTeacherJson);
}

function previousTeacher() {
  stopIfUserDidntSave();
  const pointer = absentTeachers.indexOf(currentTeacher);
  if (pointer == 1) {
    previousTeacherButton?.classList.add("forbidden-cycle");
    previousTeacherButton?.removeEventListener("click", previousTeacher);
  }

  if (pointer + 1 == absentTeachers.length) {
    nextTeacherButton?.classList.remove("forbidden-cycle");
    nextTeacherButton?.addEventListener("click", nextTeacher);
  }
  currentTeacher = absentTeachers[pointer - 1];
  setCurrentTeacher(currentTeacher);

  generateNewTeacher(currentTeacher);
  generateIfSavedSchedule(currentTeacher, false);
}

function nextTeacher() {
  stopIfUserDidntSave();
  const pointer = absentTeachers.indexOf(currentTeacher);
  if (pointer + 2 == absentTeachers.length) {
    nextTeacherButton?.classList.add("forbidden-cycle");
    nextTeacherButton?.removeEventListener("click", nextTeacher);
  }

  if (pointer == 0) {
    previousTeacherButton?.classList.remove("forbidden-cycle");
    previousTeacherButton?.addEventListener("click", previousTeacher);
  }

  currentTeacher = absentTeachers[pointer + 1];
  setCurrentTeacher(currentTeacher);

  generateNewTeacher(currentTeacher);
  generateIfSavedSchedule(currentTeacher, false);
}

let currentTeacher = absentTeachers[0];
document.querySelector("#discard")?.addEventListener("click", discard);

document.querySelector(".total").textContent = absentTeachers.length;

document.querySelector("#save")?.addEventListener("click", async () => {
  const statusElement = document.querySelector(".save-status");
  if (statusElement?.classList.contains("saved")) {
    return;
  }
  const jsonToSave = await prepareJSON(absentTeachers, currentTeacher);

  //razmotrit opciju spremanja u varijablu a ne u file
  //ako se odlucim za to, trebat ce dosta mijenjati program
  fetch("../assets/server/saveJSON.php", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      json: JSON.stringify(jsonToSave),
    }),
  });
  changeStatusMessage();
  changeRemainingNumber(true);
});
document.querySelector("#continue")?.addEventListener("click", nextStep);

setCurrentTeacher(absentTeachers[0]);
previousTeacherButton?.classList.add("forbidden-cycle");
if (absentTeachers.length == 1) {
  nextTeacherButton?.classList.add("forbidden-cycle");
} else {
  nextTeacherButton?.addEventListener("click", nextTeacher);
}

function checkIfUserAccidentalyExited(selectedTeachers) {
  /**
   * ova funkcija je namijenjena da ako korisnik izade iz programa slucajno
   * i opet izabere iste profesore, da mu se vrate postavke od prije
   *
   * a ako nije izasao slucjano onda ce vjerovatno uzeti druge profesore
   * tada resetiram json
   */

  //substring(9) zato jer ce prije doci teachers=
  const savedTeachers = document.cookie.substring(9).split(",");
  if (savedTeachers.length !== selectedTeachers.length) {
    return false;
  }
  for (let i = 0; i < savedTeachers.length; i++) {
    if (!selectedTeachers.includes(savedTeachers[i])) {
      return false;
    }
  }
  return true;
}
async function setUpStartingScreen() {
  if (!checkIfUserAccidentalyExited(absentTeachers)) {
    document.cookie = "teachers=" + absentTeachers.toString();
    resetJSON();
  }
  const startingTeacherJson = specificTeacherJSON(
    await filterJSONByTeacher(absentTeachers),
    absentTeachers[0]
  );

  generateTable(startingTeacherJson);
  generateIfSavedSchedule(absentTeachers[0], true);
  documentSavedSchedules(absentTeachers);
}

setUpStartingScreen();
