import { combineReducers } from "redux";
import todoReducer from "./todoReducer";
import todoHistoryReducer from "./todoHistoryReducer";

const rootReducer = combineReducers({
  todoList: todoReducer,
  todoHistoryList: todoHistoryReducer,
});

export default rootReducer;
