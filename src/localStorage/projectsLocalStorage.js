import ProjectItem from "../projects/projectItem.js";
import todosLocalStorage from "./todosLocalStorage";

const projectsLocalStorage = (function () {
  const store = (projectsArray) => {
    const projects = projectsArray.map((project) => ({ name: project.name }));

    localStorage.setItem("projects", JSON.stringify(projects));
  };

  const retrieve = () => {
    let projects = JSON.parse(localStorage.getItem("projects"));

    if (projects === null) {
      projects = [new ProjectItem("Default")];
      store(projects);

      return projects;
    }

    projects.forEach((project) => {
      project.todosArray = todosLocalStorage.retrieve(project);
    });

    return projects;
  };

  const storeCurrentProjectIndex = (currentProjectIndex) => {
    localStorage.setItem("currentProjectIndex", currentProjectIndex);
  };

  const retrieveCurrentProjectIndex = () => {
    let currentProjectIndex = localStorage.getItem("currentProjectIndex");

    if (currentProjectIndex === null) {
      currentProjectIndex = 0;
      storeCurrentProjectIndex(0);
    }

    return currentProjectIndex;
  };

  return {
    store,
    retrieve,
    storeCurrentProjectIndex,
    retrieveCurrentProjectIndex,
  };
})();

export default projectsLocalStorage;
