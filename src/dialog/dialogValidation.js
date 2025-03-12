import projects from "../projects/projects";
import { isPast } from "date-fns";

function addErrorAfter(targetElement, errorMessage) {
  const validationError = document.createElement("div");
  validationError.textContent = errorMessage;
  validationError.classList.add("validation-error");

  targetElement.after(validationError);
}

function dialogValidation(typeOfDialog) {
  const previousValidationErrors =
    document.querySelectorAll(".validation-error");

  previousValidationErrors.forEach((element) => element.remove());

  if (typeOfDialog === "project") {
    const projectName = document.querySelector("#project-name");
    const projectNameValue = projectName.value.trim();

    if (!projectNameValue) {
      return addErrorAfter(projectName, "cannot be empty");
    }
    if (!projects.isNameAvailable(projectNameValue)) {
      return addErrorAfter(projectName, "name already taken");
    }

    return projectNameValue;
  } else {
    const todoTitle = document.querySelector("#title");
    const todoDescription = document.querySelector("#description");
    const todoDueDate = document.querySelector("#due-date");

    const elementsArray = [todoTitle, todoDescription, todoDueDate];
    const valuesArray = [
      todoTitle.value,
      todoDescription.value,
      todoDueDate.value,
      document.querySelector("#priority").value,
    ];

    let errorsCount = 0;

    for (let i = 0; i < elementsArray.length; i++) {
      if (!valuesArray[i]) {
        addErrorAfter(elementsArray[i], "cannot be empty");
        errorsCount++;
      } else if (i === 2 && isPast(new Date(valuesArray[2]))) {
        addErrorAfter(elementsArray[2], "cannot be in the past");
        errorsCount++;
      }
    }

    if (errorsCount > 0) {
      return;
    }
    return valuesArray;
  }
}

export default dialogValidation;
