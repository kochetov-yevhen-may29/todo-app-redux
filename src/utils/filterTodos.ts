import { Todo } from "../types/Todo"
import { Filter } from "../types/filter"

type FilterParams = {
  filter: Filter
}

export const filterTodos = (todos: Todo[], { filter }: FilterParams) => {
  const todosCopy = [...todos]

  switch (filter) {
    case Filter.NotDone: {
      return todosCopy.filter((todo) => todo.status === "todo")
    }

    case Filter.Done: {
      return todosCopy.filter((todo) => todo.status === "completed")
    }

    default:
      return todosCopy
  }
}
