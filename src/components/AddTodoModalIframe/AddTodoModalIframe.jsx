import React, { useEffect as useReactEffect, useState } from "react";
import { useDispatch } from "react-redux";

import store from "store_redux";
import Action from "utils/action";
import Modal from "components/Modal";
import TodoForm from "components/TodoForm";

const AddTodoModalIframe = () => {
  const dispatch = useDispatch();
  const [visible, setVisible] = useState(false);
  useReactEffect(() => {
    const unsubscribe = store.onDispatch(({ type, payload }) => {
      switch (type) {
        case Action.TOGGLE_ADDING_TODO_MODAL:
          setVisible((state) => !state);
          break;
        default:
          break;
      }
    });
    return unsubscribe;
  }, []);
  const onHandleSubmit = ({ title }) => {
    dispatch({ type: Action.CREATE_TODO, payload: title });
    dispatch({ type: Action.TOGGLE_ADDING_TODO_MODAL });
  };
  return (
    <Modal
      title="Add Todo"
      open={visible}
      onClose={() => dispatch({ type: Action.TOGGLE_ADDING_TODO_MODAL })}
    >
      <TodoForm onSubmit={onHandleSubmit} />
    </Modal>
  );
};
export default AddTodoModalIframe;
