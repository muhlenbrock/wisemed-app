// store/ConfigureStore.js
import { combineReducers } from "@reduxjs/toolkit";
import UserReducer from "@/features/users/usersSlice";

const reducers = combineReducers({
  user: UserReducer,
});

export default reducers;
