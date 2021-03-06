import { setLocalStorage } from "../Utils/LocalStorage";
import shortid from "shortid";
import { areWeInFuture } from "../Utils/Duration";

export const resetTodoData = () => {
  return async (dispatch, getState) => {
    const templateData = getState().todoList.todosList;

    if (!templateData.length) {
      console.info("There is no template yet");
      return;
    }

    const isTemplateUpdated = areWeInFuture(
      new Date() - new Date(templateData[0].createdAt)
    );
    if (!isTemplateUpdated) {
      console.info("Data is already updated");
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

    setLocalStorage("todo-app-data", updatedTodoList);

    dispatch({
      type: "UPDATE_TODOS_LIST",
      payload: updatedTodoList,
    });
  };
};

export const reorderTemplateItems = (oderDirection, itemIndex) => {
  return async (dispatch, getState) => {
    const deepCopyTodoList = JSON.parse(
      JSON.stringify(getState().todoList.todosList)
    );
    if (oderDirection === "up") {
      if (!itemIndex) {
        return;
      }
      const temp = deepCopyTodoList[itemIndex];
      deepCopyTodoList[itemIndex] = deepCopyTodoList[itemIndex - 1];
      deepCopyTodoList[itemIndex - 1] = temp;
    } else if (oderDirection === "down") {
      if (itemIndex >= deepCopyTodoList.length - 1) {
        return;
      }
      const temp = deepCopyTodoList[itemIndex];
      deepCopyTodoList[itemIndex] = deepCopyTodoList[itemIndex + 1];
      deepCopyTodoList[itemIndex + 1] = temp;
    }

    setLocalStorage("todo-app-data", deepCopyTodoList);

    dispatch({
      type: "UPDATE_TODOS_LIST",
      payload: deepCopyTodoList,
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
    todoList[indexOfselectedTodoItem].updatedAt = new Date();
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
