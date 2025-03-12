const todosLocalStorage = (function () {
  const store = (project) => {
    const todos = project.todosArray;

    localStorage.setItem(`${project.name}_todos`, JSON.stringify(todos));
  };

  const retrieve = (project) => {
    return JSON.parse(localStorage.getItem(`${project.name}_todos`));
  };

  const remove = (project) => {
    localStorage.removeItem(`${project.name}_todos`);
  };

  return { store, retrieve, remove };
})();

export default todosLocalStorage;
