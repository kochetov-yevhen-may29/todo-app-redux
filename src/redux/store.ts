import { configureStore, ThunkAction, Action } from "@reduxjs/toolkit"
import todoReduser from "../redux/slices/todoSlice";

export const store = configureStore({
  reducer: {
    todos: todoReduser,
  },
})

export type AppDispatch = typeof store.dispatch
export type RootState = ReturnType<typeof store.getState>