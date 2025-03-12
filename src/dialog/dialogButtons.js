import projects from "../projects/projects.js";
import projectsDOM from "../projects/projectsDOM.js";
import todosDOM from "../todos/todosDOM.js";
import dialogValidation from "./dialogValidation.js";

const dialogButtons = (function () {
  const addButtons = (typeOfDialog, itemIndex) => {
    const dialog = document.querySelector("dialog");

    const createButton = document.createElement("button");
    createButton.textContent = itemIndex === null ? "Create" : "Update";

    createButton.addEventListener("click", (event) => {
      event.preventDefault();

      const validationResult = dialogValidation(typeOfDialog);
      if (validationResult) {
        if (typeOfDialog === "project") {
          if (itemIndex === null) {
            projectsDOM.addProjectItem(validationResult);
          } else {
            projectsDOM.editProjectItem(validationResult, itemIndex);
          }
        } else {
          if (itemIndex === null) {
            todosDOM.addTodoItem(validationResult);
          } else {
            todosDOM.editTodoItem(validationResult, itemIndex);
          }
        }

        dialog.close();
        dialog.classList.toggle("show");
      }
    });

    const cancelButton = document.createElement("button");
    cancelButton.textContent = "Cancel";

    cancelButton.addEventListener("click", (event) => {
      event.preventDefault();

      dialog.close();
      dialog.classList.toggle("show");
    });

    let deleteButton;
    const amountOfProjects =
      typeOfDialog === "project" ? projects.amountOfProjects() : 2;

    if (itemIndex != null && amountOfProjects > 1) {
      deleteButton = document.createElement("button");
      deleteButton.textContent = "Delete";

      const deleteButtonFunction =
        typeOfDialog === "project"
          ? () => projectsDOM.deleteProjectItem(itemIndex)
          : () => todosDOM.deleteTodoItem(itemIndex);

      deleteButton.addEventListener("click", (event) => {
        event.preventDefault();

        deleteButtonFunction();

        dialog.close();
        dialog.classList.toggle("show");
      });
    }

    return [createButton, cancelButton, deleteButton];
  };

  return { addButtons };
})();

export default dialogButtons;
