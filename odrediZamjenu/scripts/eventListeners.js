import { displaySearchResults } from "../../assets/js/searchList.js";
import { currentAbsence, currentTeacherIndex } from "./index.js";
import { changeRemainingNumber, discard, save } from "./labelsButtons.js";
import { maxSubstitutionsOfTeacher } from "./loadSaved.js";

document.querySelector("#teacher-input").addEventListener("input", (e) => {
  displaySearchResults(
    e.target.value,
    document.querySelectorAll("#teacher-list > *")
  );
});
document.querySelector("#subject-input").addEventListener("input", (e) => {
  displaySearchResults(
    e.target.value,
    document.querySelectorAll("#subject-list > *")
  );
});
document.querySelector("#room-input").addEventListener("input", (e) => {
  displaySearchResults(
    e.target.value,
    document.querySelectorAll("#room-list > *")
  );
});

document
  .querySelector("#save")
  ?.addEventListener("click", async () => await save(currentAbsence));

document.querySelector("#discard")?.addEventListener("click", discard);

const remainingSubstitutionElement = document.querySelector("#class-remaining");

function detectRemainingChanges(element, callback) {
  const observer = new MutationObserver((mutations) =>
    mutations.forEach((mutation) => callback(mutation.target.textContent))
  );

  const config = {
    childList: true,
  };

  observer.observe(element, config);
}

let reachedMax = undefined;
let oldTeacherIndex = undefined;
detectRemainingChanges(remainingSubstitutionElement, (newRemaining) => {
  const updatedReachedMax =
    maxSubstitutionsOfTeacher[currentTeacherIndex] == newRemaining;
  const sameTeacher = oldTeacherIndex === currentTeacherIndex;
  //undefined je na pocetku, to je zato jer se automatski izracuna ako je od prije spremljeno
  //ako je onda samo preskocim
  if (reachedMax === undefined) {
  } else if (!sameTeacher) {
  } else if (reachedMax && !updatedReachedMax) {
    changeRemainingNumber(true, false);
  } else if (!reachedMax && updatedReachedMax) {
    changeRemainingNumber(true, true);
  }
  oldTeacherIndex = currentTeacherIndex;

  reachedMax = maxSubstitutionsOfTeacher[currentTeacherIndex] == newRemaining;
});
