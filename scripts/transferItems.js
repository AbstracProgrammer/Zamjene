function transferItems(destination, selectedTeachersList) {
  for (let i = 0; i < selectedTeachersList.length; i++) {
    const teacherSelected = selectedTeachersList[i];
    destination.appendChild(teacherSelected);
    teacherSelected.classList.remove("teacher-selected");
    if (teacherSelected.hidden == true) {
      teacherSelected.hidden = false;
    }
    //nekako to na kraju izvuci
  }
}
