import { Todo } from "../redux/slices/todoSlice";

export const getNextId = (todos: Todo[]) => {
  const maxId = Math.max(...todos.map(todo => todo.id), 0);
  return maxId + 1;
};