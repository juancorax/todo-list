import projectsLocalStorage from "../localStorage/projectsLocalStorage.js";
import todosLocalStorage from "../localStorage/todosLocalStorage.js";
import ProjectItem from "./projectItem.js";

const projects = (function () {
  const projectsArray = projectsLocalStorage.retrieve();
  let currentProjectIndex = projectsLocalStorage.retrieveCurrentProjectIndex();

  const addProjectItem = (projectName) => {
    const newProject = new ProjectItem(projectName);
    projectsArray.push(newProject);
    currentProjectIndex = projectsArray.length - 1;
    projectsLocalStorage.storeCurrentProjectIndex(currentProjectIndex);

    projectsLocalStorage.store(projectsArray);
  };

  const editProjectItem = (projectName, projectIndex) => {
    const projectItem = getProject(projectIndex);

    projectItem.name = projectName;

    projectsLocalStorage.store(projectsArray);
  };

  const deleteProjectItem = (projectIndex) => {
    todosLocalStorage.remove(projectsArray[projectIndex]);
    projectsArray.splice(projectIndex, 1);

    if (currentProjectIndex != 0) {
      currentProjectIndex--;
      projectsLocalStorage.storeCurrentProjectIndex(currentProjectIndex);
    }

    projectsLocalStorage.store(projectsArray);
  };

  const getCurrentProject = () => projectsArray[currentProjectIndex];

  const getCurrentProjectIndex = () => currentProjectIndex;
  const setCurrentProjectIndex = (newIndex) => {
    currentProjectIndex = newIndex;
    projectsLocalStorage.storeCurrentProjectIndex(currentProjectIndex);
  };

  const getProject = (projectIndex) => projectsArray[projectIndex];

  const amountOfProjects = () => projectsArray.length;

  const isNameAvailable = (projectName) => {
    for (const project of projectsArray) {
      if (project.name === projectName) {
        return false;
      }
    }
    return true;
  };

  return {
    addProjectItem,
    editProjectItem,
    deleteProjectItem,
    getCurrentProject,
    getCurrentProjectIndex,
    setCurrentProjectIndex,
    getProject,
    amountOfProjects,
    isNameAvailable,
  };
})();

export default projects;
