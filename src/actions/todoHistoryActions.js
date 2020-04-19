import { setLocalStorage } from "../Utils/LocalStorage";
import { areWeInFuture } from "../Utils/Duration";

export const addToHistory = () => {
  return async (dispatch, getState) => {
    // Fetch existing history
    const todoHistory = JSON.parse(
      JSON.stringify(getState().todoHistoryList.todosHistory)
    );

    // Fetch current todo list
    const currentTodoList = getState().todoList.todosList;

    if (!currentTodoList.length) {
      console.error("There is no template yet. Please add template.");
      return;
    }

    // Add current todo list to fetched history data
    const lastHistoryElement = todoHistory[todoHistory.length - 1] || [];

    // TODO: Eventually look into this and improve the structure
    if (!lastHistoryElement.length) {
      todoHistory.push(currentTodoList);
    } else {
      // TODO: Make sure this is working
      const isTodayDataNotExists = areWeInFuture(
        new Date() - new Date(lastHistoryElement[0].createdAt)
      );
      // const isTodayDataNotExists =
      //   new Date().getDate() -
      //   new Date(lastHistoryElement[0].createdAt).getDate();

      // Check if today's data already exists
      if (isTodayDataNotExists) {
        // doesn't exist
        todoHistory.push(currentTodoList);
      } else {
        // If exists
        todoHistory[todoHistory.length - 1] = currentTodoList;
      }
    }

    // Store the updated history
    setLocalStorage("todo-app-history", todoHistory);
    dispatch({
      type: "UPDATE_TODO_HISTORY_LIST",
      payload: todoHistory,
    });
  };
};

// TODO: Might need these
// export const toggleTodoStatus = selectedTodoItem => {
//   return async (dispatch, getState) => {
//     // Get all existing todos
//     const todoList = JSON.parse(JSON.stringify(getState().todoList.todosList));

//     //  find index
//     const indexOfselectedTodoItem = todoList.findIndex(
//       singleTodo => selectedTodoItem.id === singleTodo.id
//     );
//     // Update the data at that index
//     todoList[indexOfselectedTodoItem].status = !selectedTodoItem.status;
//     setLocalStorage("todo-app-data", todoList);
//     dispatch({
//       type: "UPDATE_TODOS_LIST",
//       payload: todoList
//     });
//   };
// };

// export const deleteTodoItem = (selectedTodoItem) => {
//   return async (dispatch, getState) => {
//     // Get all existing todos
//     const remainingTodoList = getState().todoList.todosList.filter(
//       (singleTodo) => selectedTodoItem.id !== singleTodo.id
//     );

//     setLocalStorage("todo-app-data", remainingTodoList);
//     dispatch({
//       type: "UPDATE_TODOS_LIST",
//       payload: remainingTodoList,
//     });
//   };
// };
