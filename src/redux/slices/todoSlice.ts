import { PayloadAction, createSlice } from "@reduxjs/toolkit"
import { RootState } from "../store"
import { Todo } from "../../types/Todo";

export interface TodoState {
  todos: Todo[];
  todoOptons: Todo;
}

const initialState: TodoState = {
  todos: [],
  todoOptons: {
    id: 0,
    title: '',
    description: '',
    status: 'todo',
  }
}

const todoSlice = createSlice({
  name: "todos",
  initialState,
  reducers: {
    addTodo: (state, { payload }: PayloadAction<Todo>) => {
      state.todos.push(payload)
    },
    deleteTodo: (state, { payload }: PayloadAction<number>) => {
      state.todos = state.todos.filter(todo => todo.id !== payload)
    },
    updateTodo: (state, { payload }: PayloadAction<Todo>) => {
      const index = state.todos.findIndex((todo) => todo.id === payload.id);
      if (index !== -1) {
        state.todos[index] = payload;
      }
    },
  },
})

export const todosState = (state: RootState) => state.todos;
export const { addTodo, deleteTodo, updateTodo } = todoSlice.actions;

export default todoSlice.reducer;
