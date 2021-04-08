import React, { useState, useEffect as useReactEffect } from "react";
import { useDispatch } from "react-redux";

import Iframe from "components/Iframe";
import store from "store_redux";
import Action from "utils/action";
import TodoListIframe from "components/TodoListIframe";
import AddTodoModalIframe from "components/AddTodoModalIframe";
import UpdateTodoModalIframe from "components/UpdateTodoModalIframe";

import api from "api";

const App = () => {
  const dispatch = useDispatch();
  const [renderList, setRenderList] = useState(false);

  useReactEffect(() => {
    const unsubscribe = store.onDispatch(({ type, payload }) => {
      switch (type) {
        case Action.RESPONSE_SHOW_LIST_OK:
          api
            .getTodos()
            .then((payload) => dispatch({ type: Action.LIST_TODOS, payload }));
          setRenderList(true);
          break;
        default:
          break;
      }
    });
    return unsubscribe;
  }, []);
  useReactEffect(() => {
    let iframes = document.querySelectorAll("iframe");
    iframes.forEach((elem) => {
      if (elem.getAttribute("id") !== "render_list") return;
      elem?.contentWindow.addEventListener("message", function (e) {
        if (e.data === Action.RESPONSE_SHOW_LIST_OK) {
          dispatch({ type: Action.RESPONSE_SHOW_LIST_OK });
        }
      });
    });
  }, []);

  return (
    <>
      {!renderList ? (
        <Iframe id="render_list">
          <button
            onClick={() =>
              window.top.postMessage(Action.REQUEST_SHOW_LIST, "*")
            }
          >
            Render list
          </button>
        </Iframe>
      ) : (
        <>
          <TodoListIframe />
          <AddTodoModalIframe />
          <UpdateTodoModalIframe />
        </>
      )}
    </>
  );
};

export default App;
