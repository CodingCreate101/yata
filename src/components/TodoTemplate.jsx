import React from "react";
import AddNewTodo from "./AddNewTodo";
import TodoList from "./TodoList";

function TodoTemplate() {
  return (
    <div>
      <AddNewTodo />
      <TodoList />
    </div>
  );
}

export default TodoTemplate;
