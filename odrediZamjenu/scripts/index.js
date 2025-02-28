import { extractSelectedClasses, sortTeachers } from "./extractInformation.js";
import { fillTeachersList } from "./substitution.js";

const params = new URLSearchParams(window.location.search);
const absentTeachers = JSON.parse(params.get("absent"));
const modal = document.querySelector(".modal-window");

async function setUpStartingScreen() {
  modal.style.display = "block";
  let [a, b] = await extractSelectedClasses(absentTeachers[0]);
  console.log(a, b);
  //a i b su dan i sat
  let [c, d, e] = await sortTeachers(b[1], absentTeachers[0]);
  console.log(c, d, e);
  //c su ostali, d su losi
  fillTeachersList([c, d, e]);
  modal.style.display = "none";
}
setUpStartingScreen();
