/**
 * vjv za zamjene bih dodao novi ključ
 * {"Zamjena": true}
 *
 * za ovo trazanje nekog specificnog imena
 * prvo napraviti jako opsirno da mogu i za druge stvari
 * drugo igrati se s hidden atributom
 * trece treba raditi na foru da provjerim ako se podudara da maknem hidden, a ostalo da stavim
 */

import { displaySearchResults } from "../assets/js/searchList.js";
import { transferItems } from "./transferItems.js";

document
  .querySelector("#autojukebox")
  ?.addEventListener("click", () => (window.location.href = ""));

document.querySelector("#left-input").addEventListener("input", (e) => {
  displaySearchResults(
    e.target.value,
    document.querySelectorAll(".present-teachers > *")
  );
});

document.querySelector("#right-input").addEventListener("input", (e) => {
  displaySearchResults(
    e.target.value,
    document.querySelectorAll(".absent-teachers > *")
  );
});

document.querySelector("#transfer-right")?.addEventListener("click", () => {
  const absentTeachers = document.querySelector(".absent-teachers");
  const selectedPresentTeachers = document.querySelectorAll(
    ".present-teachers > .teacher-selected"
  );
  transferItems(absentTeachers, selectedPresentTeachers);
});

document.querySelector("#transfer-left")?.addEventListener("click", () => {
  const presentTeachers = document.querySelector(".present-teachers");
  const selectedAbsentTeachers = document.querySelectorAll(
    ".absent-teachers > .teacher-selected"
  );
  transferItems(presentTeachers, selectedAbsentTeachers);
});

document.querySelector("#discard")?.addEventListener("click", () => {
  const presentTeachers = document.querySelector(".present-teachers");
  const absentTeachers = document.querySelector(".absent-teachers");
  presentTeachers?.replaceChildren();
  absentTeachers?.replaceChildren();
  document.querySelector("#right-input").value = "";
  document.querySelector("#left-input").value = "";
  populateHtmlList();
});
