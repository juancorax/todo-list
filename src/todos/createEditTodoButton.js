import dialog from "../dialog/dialog.js";

function createEditTodoButton(todoDiv, todoShowcaseButtonsDiv, currentProject) {
  const editButton = document.createElement("button");
  editButton.textContent = "Edit";

  editButton.addEventListener("click", () => {
    const dataIndex = Number(todoDiv.dataset.index);
    const todoItem = currentProject.todosArray[dataIndex];

    dialog.display("todo", todoItem, dataIndex);
  });

  todoShowcaseButtonsDiv.appendChild(editButton);
}

export default createEditTodoButton;
