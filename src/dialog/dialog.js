import dialogButtons from "./dialogButtons.js";

const dialog = (function () {
  const dialog = document.querySelector("dialog");
  const form = document.querySelector("form");

  const display = (typeOfDialog, item = null, itemIndex = null) => {
    form.innerHTML = "";

    const itemValues = item ? Object.values(item) : null;

    const amountOfDivs = typeOfDialog === "project" ? 2 : 5;
    const lastIndex = amountOfDivs - 1;

    for (let i = 0; i < amountOfDivs; i++) {
      const div = document.createElement("div");
      let firstElement;
      let secondElement;
      let thirdElement;

      if (i != lastIndex) {
        firstElement = document.createElement("label");
      }

      if (i != 1 && i != 3 && i != lastIndex) {
        secondElement = document.createElement("input");
      }

      if (typeOfDialog === "project") {
        if (i === 0) {
          firstElement.setAttribute("for", "project-name");
          firstElement.textContent = "Project Name:";

          secondElement.type = "text";
          secondElement.id = "project-name";

          if (itemValues) {
            secondElement.value = itemValues[i];
          }
        } else {
          div.classList.add("dialog-buttons");

          [firstElement, secondElement, thirdElement] =
            dialogButtons.addButtons(typeOfDialog, itemIndex);
        }

        div.appendChild(firstElement);
        div.appendChild(secondElement);
        if (thirdElement) {
          div.appendChild(thirdElement);
        }

        form.appendChild(div);
      } else {
        switch (i) {
          case 0:
            firstElement.setAttribute("for", "title");
            firstElement.textContent = "Title:";

            secondElement.type = "text";
            secondElement.id = "title";

            break;

          case 1:
            firstElement.setAttribute("for", "description");
            firstElement.textContent = "Description:";

            secondElement = document.createElement("textarea");
            secondElement.id = "description";

            break;

          case 2:
            firstElement.setAttribute("for", "due-date");
            firstElement.textContent = "Due Date:";

            secondElement.type = "datetime-local";
            secondElement.id = "due-date";

            break;

          case 3:
            firstElement.setAttribute("for", "priority");
            firstElement.textContent = "Priority:";

            secondElement = document.createElement("select");
            secondElement.id = "priority";

            const options = [
              { text: "High" },
              { text: "Medium", selected: true },
              { text: "Low" },
            ];

            options.forEach((optionData) => {
              const option = document.createElement("option");

              option.textContent = optionData.text;

              if (optionData.selected) {
                option.selected = true;
              }

              secondElement.appendChild(option);
            });

            break;

          case 4:
            div.classList.add("dialog-buttons");

            [firstElement, secondElement, thirdElement] =
              dialogButtons.addButtons(typeOfDialog, itemIndex);

            break;
        }

        if (itemValues && i != lastIndex) {
          secondElement.value = itemValues[i];
        }

        div.appendChild(firstElement);
        div.appendChild(secondElement);
        if (thirdElement) {
          div.appendChild(thirdElement);
        }

        form.appendChild(div);
      }
    }

    dialog.showModal();
    dialog.classList.toggle("show");
  };

  return { display };
})();

export default dialog;
