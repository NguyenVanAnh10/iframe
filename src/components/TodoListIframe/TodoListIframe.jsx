import React, { useState, useEffect as useReactEffect } from "react";
import uniqueId from "lodash.uniqueid";
import { useDispatch } from "react-redux";

import store from "store_redux";
import Action from "utils/action";
import Iframe from "components/Iframe";
import TodoList from "components/TodoList";

const TodoListIframe = () => {
  const [todos, setTodos] = useState([]);
  const dispatch = useDispatch();

  useReactEffect(() => {
    const unsubscribe = store.onDispatch(({ type, payload }) => {
      switch (type) {
        case Action.LIST_TODOS:
          setTodos(payload);
          break;
        case Action.DELETE_TODO:
          setTodos((state) => state.filter((t) => t.id !== payload));
          break;
        case Action.CREATE_TODO:
          setTodos((todos) => [{ id: uniqueId(), title: payload }, ...todos]);
          break;
        case Action.UPDATE_TODO:
          setTodos((todos) => {
            const index = todos.findIndex((t) => t.id === payload.id);
            if (index < 0) return todos;
            return [
              ...todos.slice(0, index),
              payload,
              ...todos.slice(index + 1),
            ];
          });
          dispatch({ type: Action.TOGGLE_UPDATING_TODO_MODAL });
          break;
        default:
          break;
      }
    });
    return unsubscribe;
  }, []);
  return (
    <Iframe style={{ height: 300, width: 400 }}>
      <TodoList todos={todos} />
    </Iframe>
  );
};

export default TodoListIframe;
