import React from "react"
import { deleteTodo, updateTodo } from "../../redux/slices/todoSlice"
import { Button, Row, Col, ListGroup, Form } from "react-bootstrap"
import { useAppDispatch } from "../../redux/hooks"
import { Todo } from "../../types/Todo"

type Props = {
  todo: Todo
  handleTodoOptions: ({}: Todo) => void
  handleEditing: (value: boolean) => void
  onToggleModal: (value: boolean) => void
}

export const TodoItem: React.FC<Props> = ({
  todo,
  handleTodoOptions,
  handleEditing,
  onToggleModal,
}) => {
  const dispatch = useAppDispatch()

  const handleEdit = () => {
    handleTodoOptions({
      id: todo.id,
      title: todo.title,
      description: todo.description,
      status: todo.status,
    })
    onToggleModal(true)
    handleEditing(true)
  }

  const handleStatusChange = () => {
    const updatedTodo: Todo = {
      ...todo,
      status: todo.status === "completed" ? "todo" : "completed",
    }

    dispatch(updateTodo(updatedTodo))
  }

  const handleRemove = () => {
    dispatch(deleteTodo(todo.id))
  }

  return (
    <ListGroup.Item 
      className="mb-2"
      style={{minWidth: '300px'}}
    >
      <Row>
        <Col>
          <h3>{todo.title}</h3>
          <p>{todo.description}</p>
          <p style={{ display: "flex", justifyContent: "space-between" }}>
            Status: {todo.status === "todo" ? "Not Done" : "Done"}
            <Form.Check
              type="checkbox"
              className="d-flex justify-content-center"
              style={{width: '30px', backgroundColor: "lightblue", borderRadius: '30%' }}
              checked={todo.status === "completed"}
              onChange={handleStatusChange}
            />
          </p>
        </Col>
      </Row>
      <Row className="mt-1">
        <Col className="d-flex justify-content-between">
          <Button variant="success" onClick={handleEdit}>
            Edit
          </Button>
        </Col>
        <Col>
          <Button variant="danger" onClick={handleRemove}>
            Remove
          </Button>
        </Col>
      </Row>
    </ListGroup.Item>
  )
}
