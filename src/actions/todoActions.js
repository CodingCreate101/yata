import { setLocalStorage } from "../Utils/LocalStorage";
import shortid from "shortid";

export const resetTodoData = () => {
  return async (dispatch, getState) => {
    const templateData = getState().todoList.todosList;

    const isTemplateUpdated = parseInt(
      (new Date() - new Date(templateData[0].createdAt)) /
        (1000 * 60 * 60 * 24),
      10
    );

    if (!isTemplateUpdated) {
      console.log("Data is already updated");
      return;
    }

    // fetch data and reset
    const updatedTodoList = templateData.map((todoItem) => {
      return {
        ...todoItem,
        status: false,
        createdAt: new Date(),
        updatedAt: new Date(),
      };
    });

    dispatch({
      type: "UPDATE_TODOS_LIST",
      payload: updatedTodoList,
    });
  };
};

export const addNewTodo = (newTodoItem) => {
  return async (dispatch, getState) => {
    const todoList = JSON.parse(JSON.stringify(getState().todoList.todosList));
    todoList.push({
      id: shortid.generate(),
      title: newTodoItem,
      status: false,
      createdAt: new Date(),
      updatedAt: new Date(),
    });
    setLocalStorage("todo-app-data", todoList);
    dispatch({
      type: "UPDATE_TODOS_LIST",
      payload: todoList,
    });
  };
};

export const toggleTodoStatus = (selectedTodoItem) => {
  return async (dispatch, getState) => {
    // Get all existing todos
    const todoList = JSON.parse(JSON.stringify(getState().todoList.todosList));

    //  find index
    const indexOfselectedTodoItem = todoList.findIndex(
      (singleTodo) => selectedTodoItem.id === singleTodo.id
    );
    // Update the data at that index
    todoList[indexOfselectedTodoItem].status = !selectedTodoItem.status;
    setLocalStorage("todo-app-data", todoList);
    dispatch({
      type: "UPDATE_TODOS_LIST",
      payload: todoList,
    });
  };
};

export const deleteTodoItem = (selectedTodoItem) => {
  return async (dispatch, getState) => {
    // Get all existing todos
    const remainingTodoList = getState().todoList.todosList.filter(
      (singleTodo) => selectedTodoItem.id !== singleTodo.id
    );

    setLocalStorage("todo-app-data", remainingTodoList);
    dispatch({
      type: "UPDATE_TODOS_LIST",
      payload: remainingTodoList,
    });
  };
};
