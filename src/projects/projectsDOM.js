import projects from "./projects.js";
import todosDOM from "../todos/todosDOM.js";
import createEditProjectButton from "./createEditProjectButton.js";

const projectsDOM = (function () {
  const projectsContainer = document.querySelector(".projects-container");

  const addStylesToCurrentProject = () => {
    const currentProjectDiv =
      projectsContainer.querySelector(".current-project");

    if (currentProjectDiv) {
      currentProjectDiv.classList.remove("current-project");
    }

    const currentProjectIndex = projects.getCurrentProjectIndex();
    const projectDiv = projectsContainer.children[currentProjectIndex];

    projectDiv.classList.add("current-project");
  };

  const appendProjectToContainer = (projectName, dataIndex) => {
    const todosContainer = document.querySelector(".todos-container");
    todosContainer.innerHTML = "";

    const projectDiv = document.createElement("div");
    projectDiv.classList.add("project");
    projectDiv.setAttribute("data-index", dataIndex);

    const span = document.createElement("span");
    span.textContent = projectName;
    span.classList.add("project-name");
    projectDiv.appendChild(span);

    projectDiv.addEventListener("click", () => {
      if (projects.getCurrentProjectIndex() != dataIndex) {
        projects.setCurrentProjectIndex(Number(projectDiv.dataset.index));
        addStylesToCurrentProject();

        todosDOM.displayTodos();
      }
    });

    createEditProjectButton(projectDiv);

    projectsContainer.appendChild(projectDiv);
  };

  const addProjectItem = (projectName) => {
    projects.addProjectItem(projectName);

    appendProjectToContainer(projectName, projectsContainer.children.length);
    addStylesToCurrentProject();
  };

  const editProjectItem = (projectName, projectIndex) => {
    projects.editProjectItem(projectName, projectIndex);

    const projectDiv = projectsContainer.children[projectIndex];

    const projectSpan = projectDiv.querySelector(".project-name");
    projectSpan.textContent = projectName;
  };

  const deleteProjectItem = (projectIndex) => {
    const amountOfProjects = projects.amountOfProjects();

    if (amountOfProjects > 1) {
      projects.deleteProjectItem(projectIndex);

      const projectDiv = projectsContainer.children[projectIndex];
      projectDiv.remove();

      const projectDivsArray = Array.from(projectsContainer.children);
      const lastIndex = projectDivsArray.length - 1;

      if (projectIndex <= lastIndex) {
        for (let i = projectIndex; i <= lastIndex; i++) {
          projectDivsArray[i].setAttribute("data-index", i);
        }
      }

      addStylesToCurrentProject();

      todosDOM.displayTodos();
    }
  };

  const displayProjects = () => {
    projectsContainer.innerHTML = "";

    for (let i = 0; i < projects.amountOfProjects(); i++) {
      const projectName = projects.getProject(i).name;

      appendProjectToContainer(projectName, i);
    }

    addStylesToCurrentProject();

    todosDOM.displayTodos();
  };

  return {
    appendProjectToContainer,
    addProjectItem,
    editProjectItem,
    deleteProjectItem,
    displayProjects,
  };
})();

export default projectsDOM;
