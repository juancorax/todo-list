import todosLocalStorage from "../localStorage/todosLocalStorage";

function createCheckTodoButton(
  todoDiv,
  todoShowcaseButtonsDiv,
  currentProject,
) {
  const dataIndex = Number(todoDiv.dataset.index);
  let todoItem = currentProject.todosArray[dataIndex];

  const checkButton = document.createElement("button");

  checkButton.textContent = todoItem && todoItem.checked ? "Un-Check" : "Check";

  checkButton.addEventListener("click", () => {
    checkButton.textContent =
      checkButton.textContent === "Check" ? "Un-Check" : "Check";
    todoDiv.classList.toggle("checked-todo");

    todoItem = currentProject.todosArray[dataIndex];
    todoItem.checked = todoItem.checked === false ? true : false;

    todosLocalStorage.store(currentProject);
  });

  todoShowcaseButtonsDiv.appendChild(checkButton);
}

export default createCheckTodoButton;
