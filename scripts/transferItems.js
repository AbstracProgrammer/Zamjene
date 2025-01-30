function transferItems(destination, selectedTeachersList) {
  for (let i = 0; i < selectedTeachersList.length; i++) {
    const teacherSelected = selectedTeachersList[i];
    destination.appendChild(teacherSelected);
    teacherSelected.classList.remove("teacher-selected");
    //nekako to na kraju izvuci
  }
}
