import React from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCheck, faTimes } from "@fortawesome/free-solid-svg-icons";

import "./Error.css";

const Error = ({ error, setError }) => {
  return (
    <div className={`error ${error.state ? "error__error" : "error__success"}`}>
      {error.message}
      <button onClick={() => setError({ ...error, state: null })}>
          {error.state ? 
        <FontAwesomeIcon icon={faTimes} />:
        <FontAwesomeIcon icon={faCheck} />
          }
      </button>
    </div>
  );
};

export default Error;
