import { getLocalStorage } from "../Utils/LocalStorage";

const initialState = {
  todosList: getLocalStorage("todo-app-data") || []
};

export default (state = initialState, { type, payload }) => {
  switch (type) {
    case "UPDATE_TODOS_LIST":
      return {
        ...state,
        todosList: payload
      };

    // case "ADD_NEW_TODO_ITEM":
    //   return [...state.todosList, payload];

    default:
      return state;
  }
};
