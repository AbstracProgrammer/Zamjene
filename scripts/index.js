/**
 * vjv za zamjene bih dodao novi ključ
 * {"Zamjena": true}
 */

document
  .querySelector("#autojukebox")
  ?.addEventListener("click", () => (window.location.href = "../index.html"));

function markAsSelected(element) {
  if (element.classList.contains("teacher-selected")) {
    element.classList.remove("teacher-selected");
    return;
  }
  element.classList.add("teacher-selected");
}

function addClickListener(liElement) {
  for (let i = 0; i < liElement.length; i++) {
    const nameLiHtml = liElement[i];
    nameLiHtml.addEventListener("click", () => {
      markAsSelected(nameLiHtml);
    });
  }
}
