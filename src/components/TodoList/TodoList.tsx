import React, { useState } from "react"
import { Button, ListGroup, Row } from "react-bootstrap"
import "./TodoList.scss"
import { useAppSelector } from "../../redux/hooks"
import { todosState } from "../../redux/slices/todoSlice"
import { TodoItem } from "../TodoItem"
import { ModalItem } from "../Modal"
import { Dropdown } from "../Dropdown"
import { Todo } from "../../types/Todo"
import { Filter } from "../../types/filter"
import { filterTodos } from "../../utils/filterTodos"

export const TodoList: React.FC = () => {
  const todo = useAppSelector(todosState).todoOptons

  const [showModal, setShowModal] = useState(false)
  const [editing, setEditing] = useState(false)
  const [todoOptions, setTodoOptions] = useState<Todo>(todo)
  const [filter, setFilter] = useState(Filter.All)

  const todos = useAppSelector(todosState).todos

  const filteredTodos = filterTodos(todos, { filter })
  const handleShow = () => {
    setShowModal(true)
    setEditing(false)
  }

  return (
    <div className="todo-list">
      <h1 className="todo-list__title">Todo Manager</h1>
      <Row>
        <Button 
          variant="primary" 
          className="mb-1 px-5" 
          onClick={handleShow}
        >
          ADD TODO
        </Button>
        {todos.length > 0 && <Dropdown onFilterChange={setFilter} />}
      </Row>

      {todos.length === 0 && <h2>There are no todos yet</h2>}

      <ListGroup className="mt-3">
        {filteredTodos.map((todo) => (
          <TodoItem
            todo={todo}
            key={todo.id}
            handleTodoOptions={setTodoOptions}
            handleEditing={setEditing}
            onToggleModal={setShowModal}
          />
        ))}
      </ListGroup>

      <ModalItem
        showModal={showModal}
        editing={editing}
        onToggleModal={setShowModal}
        todoOptions={todoOptions}
        setTodoOptions={setTodoOptions}
      />
    </div>
  )
}
