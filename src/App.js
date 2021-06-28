import React, { useState, useEffect } from "react";
import Todos from "./components/Todos";
import Error from "./components/Error";
import { v4 as uuid } from "uuid";
import { useLocalStorage } from "./useLocalStorage";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faBroom, faPlus, faTrash } from "@fortawesome/free-solid-svg-icons";
import "./css/App.css";
const App = () => {
  const [todos, setTodos] = useLocalStorage("toDo", []);
  const [todosNames, setTodosNames] = useState(
    todos.map((task) => task.name.toLowerCase())
  );
  const [todo, setTodo] = useState({ name: "", isCompleted: false });
  const [error, setError] = useState({ message: null, state: null });
  const [search, setSearch] = useState("");

  useEffect(() => {
    setTodosNames(todos.map((task) => task.name.toLowerCase()));
  }, [todos]);

  const addTodo = (e) => {
    e.preventDefault();
    const addId = { id: uuid() };
    if (todo.name.trim().length === 0) {
      setError({ ...error, message: "Please fill the input", state: true });
    } else if (todosNames.includes(todo.name.toLowerCase())) {
      setError({ ...error, message: "The ToDo already exist", state: true });
    } else {
      setError({ ...error, message: "ToDo added", state: false });
      const newTodo = { ...todo, ...addId };
      setTodo(newTodo);
      setTodos([...todos, newTodo]);
      setTodo({ ...todo, name: "" });
    }
  };

  const deleteTodo = (id) => {
    const oldTodos = [...todos];
    const newTodos = oldTodos.filter((task) => task.id !== id);
    setTodos(newTodos);
  };

  const editTodo = (id, newValue) => {
    const oldTodos = [...todos];
    const newTodos = oldTodos.filter((task) => {
      if (task.id === id) {
        task.name = newValue;
      }
      return task;
    });
    setTodos(newTodos);
    console.log(todos);
  };

  const clearCompleteToDo = () => {
    const oldTodos = [...todos];
    const newTodos = oldTodos.filter((task) => task.isCompleted !== true);
    setTodos(newTodos);
  };

  const toggleTodo = (id) => {
    const oldTodos = [...todos];
    if (oldTodos[id].isCompleted) {
      console.log("unchecked");
    } else {
      console.log("checked");
    }
    oldTodos[id].isCompleted = !oldTodos[id].isCompleted;
    setTodos(oldTodos);
  };

  return (
    <div className="app">
      {error.state !== null && <Error error={error} setError={setError} />}
      <input
        type="text"
        placeholder="Task"
        value={todo.name}
        onChange={(e) => setTodo({ ...todo, name: e.target.value })}
      />
      <button onClick={(e) => addTodo(e)}>
        Add Todo
        <FontAwesomeIcon style={{ marginLeft: "10px" }} icon={faPlus} />
      </button>
      <Todos
        todos={todos}
        search={search}
        setSearch={setSearch}
        toggleTodo={toggleTodo}
        deleteTodo={deleteTodo}
        editTodo={editTodo}
        todosNames={todosNames}
        setError={setError}
        error={error}
      />
      <div className="app__buttons">
        <button onClick={() => clearCompleteToDo()}>
          Clear Completed{" "}
          <FontAwesomeIcon style={{ marginLeft: "10px" }} icon={faBroom} />
        </button>
        <button onClick={() => setTodos([])}>
          Delete All{" "}
          <FontAwesomeIcon style={{ marginLeft: "10px" }} icon={faTrash} />
        </button>
      </div>
    </div>
  );
};

export default App;
