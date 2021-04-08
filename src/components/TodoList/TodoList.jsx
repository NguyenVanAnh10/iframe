import React from "react";
import { useDispatch } from "react-redux";

import Action from "utils/action";

const TodoList = ({ todos = [] }) => {
  const dispatch = useDispatch();
  return (
    <div>
      <h1>Todo list</h1>
      <button
        onClick={() => dispatch({ type: Action.TOGGLE_ADDING_TODO_MODAL })}
      >
        Create todo
      </button>
      <div style={{ margin: "1rem 0" }}>
        {todos.map((todo, i) => (
          <div
            key={i}
            style={{
              display: "flex",
              justifyContent: "space-between",
              margin: "0.5rem 0",
            }}
          >
            <div>{`${i + 1} - ${todo.title}`}</div>
            <div className="actions">
              <button
                onClick={() =>
                  dispatch({ type: Action.DELETE_TODO, payload: todo.id })
                }
              >
                Delete
              </button>
              <button
                style={{ marginLeft: 10 }}
                onClick={() =>
                  dispatch({
                    type: Action.TOGGLE_UPDATING_TODO_MODAL,
                    payload: todo,
                  })
                }
              >
                Edit
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};
export default TodoList;
