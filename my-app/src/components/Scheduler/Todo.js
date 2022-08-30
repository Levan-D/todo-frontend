/** @format */
import ACTIONS from "./actions";
import React, { useState } from "react";

function Todo({ todo, toggle, index }) {
  let markedDate = todo.completeDate.split(" ").map((str, index) => ({
    value: str,
    id: index + 1,
  }));
  const [edit, setEdit] = useState(false);
  const dateArray = todo.time.split(" ");
  const dataObject = dateArray.map((str, index) => ({
    value: str,
    id: index + 1,
  }));

  function handleKeyDown(e) {
    e.target.style.height = "25px";
    e.target.style.height = `${Math.min(e.target.scrollHeight, 250)}px`;
    // In case you have a limitation
    // ;
  }

  return (
    <div className="todoBackground">
      <div className="todoContainer">
        <div
          onDoubleClick={(x) => {
            console.log(`lalala`);
            setEdit(!edit);
          }}
        >
          {!edit ? (
            <div
              className={`todo ${
                todo.complete ? "todoComplete" : "todoNotComplete"
              }`}
            >
              {todo.taskName}
            </div>
          ) : (
            <div>
              <form className="renameForm">
                <label>
                  <textarea className="textArea" onKeyDown={handleKeyDown} />
                </label>
              </form>
            </div>
          )}
        </div>
        <div className="todoButtonsFlex">
          <div
            className="todoCheck"
            onClick={() => {
              toggle({
                type: ACTIONS.TOGGLE_TODO,
                payload: { id: todo.id, index: index },
              });
            }}
          >
            &#10004;
          </div>
          <div
            className="todoDelete"
            onClick={() => {
              toggle({
                type: ACTIONS.DELETE_TODO,
                payload: { id: todo.id, index: index },
              });
            }}
          >
            &#8211;
          </div>
          <div className="timeStampWrapper">
            <div className="stampWrapper">
              <div>
                {dataObject[4].value.slice(0, 5)} <br />
                {dataObject[0].value}&nbsp;
                {dataObject[1].value}&nbsp;
                {dataObject[2].value}
              </div>
            </div>
          </div>
          <div
            className="markedStampWrapper"
            style={
              todo.complete
                ? { backgroundColor: "#92ba92", color: "#f0f0f0" }
                : { backgroundColor: `#f0f0f0` }
            }
          >
            <div className="stampWrapper">
              {todo.complete && (
                <div>
                  {markedDate[4].value.slice(0, 5)} <br />
                  {markedDate[0].value}&nbsp;
                  {markedDate[1].value}&nbsp;
                  {markedDate[2].value}
                </div>
              )}
              {!todo.complete && (
                <div>
                  Not <br /> Complete
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Todo;
