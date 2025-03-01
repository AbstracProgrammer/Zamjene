import { displaySearchResults } from "../../assets/js/searchList.js";
import { currentAbsence } from "./index.js";
import { discard, save } from "./labelsButtons.js";

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
