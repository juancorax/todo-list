import { lightFormat } from "date-fns";

function createOpenTodoButton(todoDiv, todoShowcaseButtonsDiv, currentProject) {
  const openButton = document.createElement("button");
  openButton.textContent = "Open";

  let detailsContainer = null;

  openButton.addEventListener("click", () => {
    if (openButton.textContent === "Open") {
      openButton.textContent = "Close";

      const dataIndex = Number(todoDiv.dataset.index);
      const todoItem = currentProject.todosArray[dataIndex];

      detailsContainer = document.createElement("div");
      detailsContainer.classList.add("todo-details");

      for (const key in todoItem) {
        if (
          todoItem.hasOwnProperty(key) &&
          key != "title" &&
          key != "checked"
        ) {
          const div = document.createElement("div");
          let propertyLabel;
          let propertyValue = todoItem[key];
          let divClass;

          switch (key) {
            case "description":
              propertyLabel = "Description: ";
              divClass = "todo-description";
              break;

            case "dueDate":
              propertyLabel = "Due Date: ";
              propertyValue = lightFormat(propertyValue, "MM/dd/yyyy hh:mm a");
              divClass = "todo-due-date";
              break;

            case "priority":
              propertyLabel = "Priority: ";
              divClass = "todo-priority";
              break;
          }

          div.textContent = propertyLabel + propertyValue;
          div.classList.add(divClass);

          detailsContainer.appendChild(div);
        }
      }

      todoDiv.appendChild(detailsContainer);
    } else {
      openButton.textContent = "Open";

      detailsContainer.remove();
      detailsContainer = null;
    }
  });

  todoShowcaseButtonsDiv.appendChild(openButton);
}

export default createOpenTodoButton;
