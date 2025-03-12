import dialog from "../dialog/dialog.js";
import projects from "./projects.js";

function createEditProjectButton(projectDiv) {
  const editButton = document.createElement("button");
  editButton.textContent = "Edit";

  editButton.addEventListener("click", (event) => {
    event.stopPropagation();

    const dataIndex = Number(projectDiv.dataset.index);
    const projectItem = projects.getProject(dataIndex);

    dialog.display("project", projectItem, dataIndex);
  });

  projectDiv.appendChild(editButton);
}

export default createEditProjectButton;
