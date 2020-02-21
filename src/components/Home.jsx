import React from "react";
import AddNewTodo from "./AddNewTodo";
import TodoList from "./TodoList";

function Home() {
  return (
    <div>
      <AddNewTodo />
      <TodoList />
    </div>
  );
}

export default Home;
