import { fetchJSON } from "../../assets/js/searchList.js";

export async function remainingJSON(teacherName) {
  let jsonInUse = await filterJSONByTeacher(teacherName);
  jsonInUse = jsonInUse.map((item) => {
    return JSON.stringify(item);
  });

  const originalJSON = await fetchJSON();

  const jsonNotInUse = originalJSON.filter((item) => {
    return !jsonInUse.includes(JSON.stringify(item));
  });
  return jsonNotInUse;
}

//ne treba se vise koristiti jer filterJSONByTeacher radi istu stvar, samo se treba staviti jedno ime
export function specificTeacherJSON(json, teacherName) {
  return json.filter((item) => {
    return item.Prof == teacherName;
  });
}

export async function filterJSONByTeacher(teachers) {
  const JSON = await fetchJSON();
  const filteredJSON = JSON.filter((json) => filterHelper(json.Prof, teachers));
  return filteredJSON;
}

function filterHelper(name, list) {
  return list.includes(name);
}
