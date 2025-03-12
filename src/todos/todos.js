import TodoItem from "./todoItem.js";
import todosLocalStorage from "../localStorage/todosLocalStorage.js";

const todos = (function () {
  const addTodoItem = (
    title,
    description,
    dueDate,
    priority,
    currentProject,
  ) => {
    currentProject.todosArray.push(
      new TodoItem(title, description, dueDate, priority),
    );

    todosLocalStorage.store(currentProject);
  };

  const editTodoItem = (
    title,
    description,
    dueDate,
    priority,
    currentProject,
    todoIndex,
  ) => {
    const todoItem = currentProject.todosArray[todoIndex];

    todoItem.title = title;
    todoItem.description = description;
    todoItem.dueDate = dueDate;
    todoItem.priority = priority;

    todosLocalStorage.store(currentProject);
  };

  const deleteTodoItem = (todoIndex, currentProject) => {
    const currentProjectTodos = currentProject.todosArray;
    currentProjectTodos.splice(todoIndex, 1);

    if (currentProjectTodos.length === 0) {
      todosLocalStorage.remove(currentProject);
    } else {
      todosLocalStorage.store(currentProject);
    }
  };

  return { addTodoItem, editTodoItem, deleteTodoItem };
})();

export default todos;
