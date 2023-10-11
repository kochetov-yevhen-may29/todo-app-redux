import { Todo } from "../types/Todo";

export const getNextId = (todos: Todo[]) => {
  const maxId = Math.max(...todos.map(todo => todo.id), 0);
  return maxId + 1;
};