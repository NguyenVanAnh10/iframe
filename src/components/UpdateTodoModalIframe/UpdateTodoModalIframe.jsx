import React, { useEffect as useReactEffect, useState } from "react";
import { useDispatch } from "react-redux";

import store from "store_redux";
import Action from "utils/action";
import Modal from "components/Modal";
import TodoForm from "components/TodoForm";

const UpdateTodoModalIframe = () => {
  const dispatch = useDispatch();
  const [seletedTodo, setSeletedTodo] = useState(null);
  useReactEffect(() => {
    const unsubscribe = store.onDispatch(({ type, payload }) => {
      switch (type) {
        case Action.TOGGLE_UPDATING_TODO_MODAL:
          setSeletedTodo(payload);
          break;
        default:
          break;
      }
    });
    return unsubscribe;
  }, []);
  const onHandleSubmit = (t) => {
    dispatch({ type: Action.UPDATE_TODO, payload: t });
  };
  return (
    <Modal
      title="Update Todo"
      open={!!seletedTodo}
      onClose={() => dispatch({ type: Action.TOGGLE_UPDATING_TODO_MODAL })}
    >
      <TodoForm defaultValue={seletedTodo} onSubmit={onHandleSubmit} />
    </Modal>
  );
};

export default UpdateTodoModalIframe;
