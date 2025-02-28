import { filterJSONByTeacher } from "../../raspored/scripts/jsonHelper.js";
import {
  nullElement,
  retrieveAllSubjects,
  subjectsTeachersTeachesToStudentClass,
} from "./extractInformation.js";
import { currentAbsence } from "./index.js";

function markAsSelected(element) {
  if (element.classList.contains("element-selected")) {
    return;
  }
  clickIfThereIsSelectedItem(element.parentElement);
  hideIfFreeClass(element.textContent);
  element.classList.add("element-selected");
}

function hideIfFreeClass(text) {
  const toDelete = document.querySelectorAll(".container");
  if (text == nullElement) {
    //zadnja dva moram
    toDelete[1].style.display = "none";
    toDelete[2].style.display = "none";
    return;
  }
  toDelete[1].style.display = "flex";
  toDelete[2].style.display = "flex";
}

function clickIfThereIsSelectedItem(parentElement) {
  const selectedItem = parentElement.querySelector(".element-selected");
  if (selectedItem == null) {
    return;
  }
  selectedItem.classList.remove("element-selected");
}

function makeListItem(text) {
  const itemElement = document.createElement("li");
  itemElement.classList.add("element");
  itemElement.textContent = text;
  return itemElement;
}

export async function fillTeachersList(sortedTeachersLists) {
  const teacherListElement = document.querySelector("#teacher-list");

  for (let i = 0; i < sortedTeachersLists[0].length; i++) {
    const bestTeacher = sortedTeachersLists[0][i];
    const itemElement = makeListItem(bestTeacher);
    itemElement.classList.add("best");
    teacherListElement?.appendChild(itemElement);
    itemElement.addEventListener("click", async () => {
      markAsSelected(itemElement);

      const allSubjects = await retrieveAllSubjects();
      const bestSubject = currentAbsence.Predmet;
      allSubjects.splice(allSubjects.indexOf(bestSubject), 1);
      const teacherTeaches = await subjectsTeachersTeachesToStudentClass(
        await filterJSONByTeacher(itemElement.textContent),
        currentAbsence.Razred
      );
      for (let i = 0; i < teacherTeaches.length; i++) {
        const oneSubject = teacherTeaches[i];
        allSubjects.splice(allSubjects.indexOf(oneSubject), 1);
      }
      fillSubjectsList([[bestSubject], teacherTeaches, allSubjects]);
    });
  }
  for (let i = 0; i < sortedTeachersLists[1].length; i++) {
    const goodTeacher = sortedTeachersLists[1][i];
    const itemElement = makeListItem(goodTeacher);
    itemElement.classList.add("good");
    teacherListElement?.appendChild(itemElement);
    itemElement.addEventListener("click", async () => {
      markAsSelected(itemElement);

      const allSubjects = await retrieveAllSubjects();
      const teacherTeaches = await subjectsTeachersTeachesToStudentClass(
        await filterJSONByTeacher(itemElement.textContent),
        currentAbsence.Razred
      );
      for (let i = 0; i < teacherTeaches.length; i++) {
        const oneSubject = teacherTeaches[i];
        allSubjects.splice(allSubjects.indexOf(oneSubject), 1);
      }
      fillSubjectsList([[], teacherTeaches, allSubjects]);
    });
  }
  for (let i = 0; i < sortedTeachersLists[2].length; i++) {
    const badTeacher = sortedTeachersLists[2][i];
    const itemElement = makeListItem(badTeacher);
    itemElement.classList.add("bad");
    teacherListElement?.appendChild(itemElement);
    itemElement.addEventListener("click", async () => {
      markAsSelected(itemElement);
      const allSubjects = await retrieveAllSubjects();
      fillSubjectsList([[], [], allSubjects]);
    });
  }
}

export function fillClassroomList(classesList) {
  const classroomListElement = document.querySelector("#room-list");

  for (let i = 0; i < classesList.length; i++) {
    const className = classesList[i];
    const itemElement = makeListItem(className);
    if (i == 0) {
      itemElement.classList.add("best");
    } else {
      itemElement.classList.add("bad");
    }
    classroomListElement?.appendChild(itemElement);
    itemElement.addEventListener("click", () => markAsSelected(itemElement));
  }
}

function fillSubjectsList(sortedSubjectsLists) {
  const subjectListElement = document.querySelector("#subject-list");
  subjectListElement.innerHTML = "";

  for (let i = 0; i < sortedSubjectsLists[0].length; i++) {
    const bestSubject = sortedSubjectsLists[0][i];
    const itemElement = makeListItem(bestSubject);
    itemElement.classList.add("best");
    subjectListElement?.appendChild(itemElement);
    itemElement.addEventListener("click", () => markAsSelected(itemElement));
  }
  for (let i = 0; i < sortedSubjectsLists[1].length; i++) {
    const goodSubjects = sortedSubjectsLists[1][i];
    const itemElement = makeListItem(goodSubjects);
    itemElement.classList.add("good");
    subjectListElement?.appendChild(itemElement);
    itemElement.addEventListener("click", () => markAsSelected(itemElement));
  }
  for (let i = 0; i < sortedSubjectsLists[2].length; i++) {
    const badSubjects = sortedSubjectsLists[2][i];
    const itemElement = makeListItem(badSubjects);
    itemElement.classList.add("bad");
    subjectListElement?.appendChild(itemElement);
    itemElement.addEventListener("click", () => markAsSelected(itemElement));
  }
}
