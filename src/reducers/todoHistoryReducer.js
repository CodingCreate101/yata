import { getLocalStorage } from "../Utils/LocalStorage";

const initialState = {
  todosHistory: getLocalStorage("todo-app-history") || [],
};

export default (state = initialState, { type, payload }) => {
  switch (type) {
    case "UPDATE_TODO_HISTORY_LIST":
      return {
        ...state,
        todosHistory: payload,
      };

    default:
      return state;
  }
};
