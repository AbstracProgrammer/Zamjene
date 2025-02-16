const params = new URLSearchParams(window.location.search);
const absentTeachers = JSON.parse(params.get("absent"));
console.log(absentTeachers);
import { fetchJSON } from "../../assets/js/searchList.js";

async function filterJSON(teachers) {
  const JSON = await fetchJSON();
  const filteredJSON = JSON.filter((json) => filterHelper(json.Prof, teachers));
  return filteredJSON;
}

function filterHelper(name, list) {
  return list.includes(name);
}

function setCurrentTeacher(name) {
  const display = document.querySelector(".name");
  display.textContent = name;
}

//ODMAH generirati prvog prof
setCurrentTeacher(absentTeachers[0]);

/**
 * IDEJA ZA OVE KLIKOVE
 *
 * ako kliknes npr. Ponedjeljak, on sam po sebi neće dobiti kao oznaku da je kliknut
 * nego on ce onda kliknute sve sve pomocu element.click()
 *
 * ista stvar vrijedi za cijelu tablicu
 */
