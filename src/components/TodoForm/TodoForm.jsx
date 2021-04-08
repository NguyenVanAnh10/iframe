import React, { useState, useEffect as useReactEffect } from "react";

const TodoForm = ({ defaultValue = {}, onSubmit }) => {
  const [todo, setTodo] = useState(defaultValue);
  useReactEffect(() => {
    setTodo(defaultValue);
  }, [defaultValue?.id]);

  const onHandleSubmit = (e) => {
    e.preventDefault();
    !!todo?.title && onSubmit(todo);
  };
  return (
    <form>
      <label htmlFor="title" style={{ display: "block" }}>
        title
      </label>
      <input
        id="title"
        name="title"
        type="name"
        value={todo.title || ""}
        onChange={(e) => setTodo({ ...todo, title: e.target.value })}
        style={{ marginTop: 10, display: "block" }}
      />
      <input
        type="submit"
        style={{ marginTop: 10, display: "block" }}
        onClick={onHandleSubmit}
      />
    </form>
  );
};

export default TodoForm;
