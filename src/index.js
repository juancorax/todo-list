import "./styles.css";
import dialog from "./dialog/dialog.js";
import projectsDOM from "./projects/projectsDOM.js";

const addProjectButton = document.querySelector("#add-project-button");
const addTodoButton = document.querySelector("#add-todo-button");

addProjectButton.addEventListener("click", () => dialog.display("project"));
addTodoButton.addEventListener("click", () => dialog.display("todo"));

projectsDOM.displayProjects();
