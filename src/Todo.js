import React, { useState } from "react";
import "./Todo.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faBackspace,
  faPencilAlt,
  faDove,
  faHorse,
} from "@fortawesome/free-solid-svg-icons";

const Todo = ({
  task,
  deleteTodo,
  editTodo,
  toggleTodo,
  index,
  todosNames,
  setError,
  error,
}) => {
  const [showButtons, setShowButtons] = useState(false);
  const [edit, setEdit] = useState(true);
  const [newTodo, setNewTodo] = useState(task.name);

  const existTaskEdited = () => {
    setNewTodo(task.name);
    if (edit === false) {
      if (todosNames.includes(newTodo)) {
        setError({ ...error, message: "the ToDo already exist", state: true });
        setEdit(false);
      } else {
        setError({
          ...error,
          message: "the ToDo edited successfully",
          state: false,
        });
        setEdit(true);
        editTodo(task.id, newTodo);
        setNewTodo(newTodo);
      }
    } else {
      setEdit(!edit);
    }
  };

  return (
    <div
      className="todo"
      key={task.id}
      onMouseOver={() => setShowButtons(true)}
      onMouseLeave={() => setShowButtons(false)}
    >
      {showButtons && (
        <button onClick={() => existTaskEdited()}>
          <FontAwesomeIcon icon={faPencilAlt} />
        </button>
      )}

      <div className="todo__inputs">
        {task.isCompleted ? (
          <FontAwesomeIcon
            style={{ cursor: "pointer" }}
            onClick={() => toggleTodo(index)}
            icon={faDove}
          />
        ) : (
          <FontAwesomeIcon
            style={{ cursor: "pointer" }}
            onClick={() => toggleTodo(index)}
            icon={faHorse}
          />
        )}
        <input
          className="input__task"
          disabled={edit}
          value={newTodo}
          onChange={(e) => setNewTodo(e.target.value)}
        ></input>
      </div>
      {showButtons && (
        <button onClick={() => deleteTodo(task.id)}>
          <FontAwesomeIcon icon={faBackspace} />
        </button>
      )}
    </div>
  );
};

export default Todo;
