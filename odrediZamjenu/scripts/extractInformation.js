import { fetchJSON } from "../../assets/js/searchList.js";
import { filterJSONByTeacher } from "../../raspored/scripts/jsonHelper.js";

/**
 * ovjde će se povjavljivati čudni opisi, poput loš, u redu i najbolji
 *
 * Ali to opisuje koliko je nešto dobro, npr.
 * Najbolji profesor bi bio stručna zamjena
 * U redu profesor bi bio onaj koje je u nastavničkom vijeću
 * Loš bi bio onaj koji im nije u nastavničkom vijeću ili je tada zauzet
 */

export const nullElement = "//";

export async function extractSelectedClasses(teacherName) {
  const teacherJSON = await filterJSONByTeacher(teacherName);
  const selectedClasses = [];
  const selectedClassesJSON = [];

  for (let i = 0; i < teacherJSON.length; i++) {
    const json = teacherJSON[i];
    if ("Zamjena" in json) {
      selectedClasses.push(`${json.Dan}, ${json.Sat}. sat`);
      selectedClassesJSON.push(json);
    }
  }

  return [selectedClasses, selectedClassesJSON];
}

function retrieveAllTeacherNames(currentTeacher, json) {
  //currentTeacher je da ne uzme opet nejga
  const teachers = [];
  for (let i = 0; i < json.length; i++) {
    const teacher = json[i].Prof;
    if (
      teachers.includes(teacher) ||
      teacher == nullElement ||
      teacher == currentTeacher
    ) {
      continue;
    }
    teachers.push(teacher);
  }

  return teachers.sort(new Intl.Collator("hr").compare);
}
function filterTeacher(teachers, allJSON) {
  const filteredJSON = allJSON.filter((json) =>
    filterHelper(json.Prof, json.Zamjena, teachers)
  );
  return filteredJSON;
}

function filterHelper(name, name2, list) {
  return list.includes(name) || list.includes(name2);
}

export async function sortTeachers(currentClassJSON, currentTeacher) {
  const JSON = await fetchJSON();
  const badTeachers = [];
  const goodTeachers = [];
  const bestTeachers = [];
  const allTeachers = retrieveAllTeacherNames(currentTeacher, JSON);

  for (let i = 0; i < allTeachers.length; i++) {
    const teacher = allTeachers[i];
    let teacherJSON = filterTeacher(teacher, JSON);

    //ako bude undefined znaci da tada ne uci
    const isTeacherFree = teacherJSON.find((item) => {
      return (
        item.Sat == currentClassJSON.Sat &&
        item.Dan == currentClassJSON.Dan &&
        item.Zamjena != teacher
      );
    });
    teacherJSON = teacherJSON.filter((item) => item.Zamjena == undefined);

    if (isTeacherFree != undefined) {
      badTeachers.push(teacher);
      continue;
    }

    if (checkIfTeacherIsBest(teacherJSON, currentClassJSON)) {
      bestTeachers.push(teacher);
      continue;
    }

    if (checkIfTeacherIsStranger(teacherJSON, currentClassJSON)) {
      badTeachers.push(teacher);
      continue;
    }
    goodTeachers.push(teacher);
  }

  badTeachers.push(nullElement);
  return [bestTeachers, goodTeachers, badTeachers];
}

function checkIfTeacherIsBest(teacherJSON, currentClassJSON) {
  const isTeacherBest = teacherJSON.find((item) => {
    return item.Predmet == currentClassJSON.Predmet;
  });

  return isTeacherBest != undefined;
}

function checkIfTeacherIsStranger(teacherJSON, currentClassJSON) {
  const isTeacherStranger = teacherJSON.find((item) => {
    return item.Razred == currentClassJSON.Razred;
  });

  return isTeacherStranger == undefined;
}

export async function sortClassroons(currentClassJSON) {
  const listOfClassrooms = [];
  const json = await fetchJSON();

  for (let i = 0; i < json.length; i++) {
    const classroom = json[i].Prostor;
    if (listOfClassrooms.includes(classroom)) {
      continue;
    }
    listOfClassrooms.push(classroom);
  }

  const currentClassroomIndex = listOfClassrooms.indexOf(
    currentClassJSON.Prostor
  );
  [listOfClassrooms[0], listOfClassrooms[currentClassroomIndex]] = [
    listOfClassrooms[currentClassroomIndex],
    listOfClassrooms[0],
  ];

  const bestClass = listOfClassrooms[0];
  listOfClassrooms.shift();

  const classroomString = listOfClassrooms.filter((item) => {
    return Number.isNaN(Number(item));
  });
  const classroomIntegers = listOfClassrooms.filter((item) => {
    return !classroomString.includes(item);
  });

  return [
    bestClass,
    ...classroomIntegers.sort((a, b) => a - b),
    ...classroomString.sort(),
  ];
}

export async function retrieveAllSubjects() {
  const json = await fetchJSON();
  const subjects = [];
  for (let i = 0; i < json.length; i++) {
    const jsonSubjects = json[i].Predmet;
    if (subjects.includes(jsonSubjects) || jsonSubjects == nullElement) {
      continue;
    }
    subjects.push(jsonSubjects);
  }

  return subjects.sort(new Intl.Collator("hr").compare);
}

export async function subjectsTeachersTeachesToStudentClass(
  teacherJSON,
  studentClass
) {
  const teacherTeaches = teacherJSON.filter((item) => {
    return item.Razred == studentClass;
  });
  return [
    ...new Set(
      teacherTeaches.map((item) => {
        return item.Predmet;
      })
    ),
  ];
}
