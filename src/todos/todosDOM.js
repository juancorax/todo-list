import projects from "../projects/projects.js";
import todos from "./todos.js";
import createCheckTodoButton from "./createCheckTodoButton.js";
import createEditTodoButton from "./createEditTodoButton.js";
import createOpenTodoButton from "./createOpenTodoButton.js";
import { lightFormat } from "date-fns";

const todosDOM = (function () {
  const todosContainer = document.querySelector(".todos-container");

  const appendTodoToContainer = (todoTitle, index, currentProject) => {
    const todoDiv = document.createElement("div");
    todoDiv.classList.add("todo-item");
    todoDiv.setAttribute("data-index", index);

    const todoItem = currentProject.todosArray[index];
    if (todoItem && todoItem.checked) {
      todoDiv.classList.toggle("checked-todo");
    }

    const todoShowcase = document.createElement("div");
    todoShowcase.classList.add("todo-showcase");

    const span = document.createElement("span");
    span.textContent = todoTitle;
    span.classList.add("todo-title");
    todoShowcase.appendChild(span);

    const todoShowcaseButtonsDiv = document.createElement("div");
    todoShowcaseButtonsDiv.classList.add("todo-showcase-buttons");

    createCheckTodoButton(todoDiv, todoShowcaseButtonsDiv, currentProject);
    createEditTodoButton(todoDiv, todoShowcaseButtonsDiv, currentProject);
    createOpenTodoButton(todoDiv, todoShowcaseButtonsDiv, currentProject);

    todoShowcase.appendChild(todoShowcaseButtonsDiv);
    todoDiv.appendChild(todoShowcase);
    todosContainer.appendChild(todoDiv);
  };

  const addTodoItem = ([
    todoTitle,
    todoDescription,
    todoDueDate,
    todoPriority,
  ]) => {
    const currentProject = projects.getCurrentProject();

    appendTodoToContainer(
      todoTitle,
      currentProject.todosArray.length,
      currentProject,
    );

    todos.addTodoItem(
      todoTitle,
      todoDescription,
      todoDueDate,
      todoPriority,
      currentProject,
    );
  };

  const editTodoItem = (
    [todoTitle, todoDescription, todoDueDate, todoPriority],
    todoIndex,
  ) => {
    const todoDiv = todosContainer.children[todoIndex];

    const titleSpan = todoDiv.querySelector(".todo-title");
    titleSpan.textContent = todoTitle;

    const todoDetails = todoDiv.querySelector(".todo-details");
    if (todoDetails) {
      const todoDetailsDescription =
        todoDetails.querySelector(".todo-description");
      todoDetailsDescription.textContent = `Description: ${todoDescription}`;

      const todoDetailsDueDate = todoDetails.querySelector(".todo-due-date");
      todoDetailsDueDate.textContent = `Due Date: ${lightFormat(todoDueDate, "MM/dd/yyyy hh:mm a")}`;

      const todoDetailsPriority = todoDetails.querySelector(".todo-priority");
      todoDetailsPriority.textContent = `Priority: ${todoPriority}`;
    }

    const currentProject = projects.getCurrentProject();

    todos.editTodoItem(
      todoTitle,
      todoDescription,
      todoDueDate,
      todoPriority,
      currentProject,
      todoIndex,
    );
  };

  const deleteTodoItem = (todoIndex) => {
    const todoDiv = todosContainer.children[todoIndex];
    todoDiv.remove();

    const todoDivsArray = Array.from(todosContainer.children);
    const lastIndex = todoDivsArray.length - 1;

    if (todoIndex <= lastIndex) {
      for (let i = todoIndex; i <= lastIndex; i++) {
        todoDivsArray[i].setAttribute("data-index", i);
      }
    }

    const currentProject = projects.getCurrentProject();

    todos.deleteTodoItem(todoIndex, currentProject);
  };

  const displayTodos = () => {
    todosContainer.innerHTML = "";

    const currentProject = projects.getCurrentProject();
    const todosArray = currentProject.todosArray;

    if (todosArray) {
      todosArray.forEach((todo, index) => {
        appendTodoToContainer(todo.title, index, currentProject);
      });
    }
  };

  return { addTodoItem, editTodoItem, deleteTodoItem, displayTodos };
})();

export default todosDOM;
