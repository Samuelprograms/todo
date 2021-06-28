import React from "react";
import Todo from "./Todo";
import "./../css/Todos.css";

const Todos = ({
  todos,
  search,
  setSearch,
  toggleTodo,
  deleteTodo,
  editTodo,
  todosNames,
  setError,
  error,
}) => {
  return (
    <div className="todos">
      <input
        type="text"
        placeholder="Search Task"
        onChange={(e) => setSearch(e.target.value)}
      />
      {todos.length !== 0 ? (
        todos
          .filter((task) =>
            search
              ? task.name.toLowerCase().includes(search.toLowerCase())
              : task
          )
          .map((task, index) => (
            <Todo
              key={index}
              task={task}
              index={index}
              deleteTodo={deleteTodo}
              editTodo={editTodo}
              todosNames={todosNames}
              toggleTodo={toggleTodo}
              setError={setError}
              error={error}
            />
          ))
      ) : (
        <h1>There's not ToDos</h1>
      )}
    </div>
  );
};

export default Todos;
