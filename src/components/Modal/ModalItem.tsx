import React, { useState, useRef, useEffect } from "react"
import { Button, Modal, Form } from "react-bootstrap"
import { useAppDispatch, useAppSelector } from "../../redux/hooks"
import { addTodo, todosState, updateTodo } from "../../redux/slices/todoSlice"
import { getNextId } from "../../utils/getNextId"
import { Todo } from "../../types/Todo"

type Props = {
  showModal: boolean
  todoOptions: Todo
  editing: boolean
  setTodoOptions: ({}: Todo) => void
  onToggleModal: (value: boolean) => void
}

export const ModalItem: React.FC<Props> = ({
  showModal,
  todoOptions,
  editing,
  setTodoOptions,
  onToggleModal,
}) => {
  const dispatch = useAppDispatch()
  const todos = useAppSelector(todosState).todos

  const newId = getNextId(todos)
  const [error, setError] = useState<string | null>(null)

  const titleInputRef = useRef<HTMLInputElement | null>(null)

  useEffect(() => {
    if (showModal) {
      if (titleInputRef.current) {
        titleInputRef.current.focus()
      }
    }
  }, [showModal])

  const handleKeyDown = (event: React.KeyboardEvent) => {
    if (event.key === "Enter") {
      handleChangeTodo()
    }
  }

  const handleClose = () => {
    onToggleModal(false)
    setTodoOptions({
      id: 0,
      title: "",
      description: "",
      status: "todo",
    })
    setError(null)
  }

  const handleChangeTodo = () => {
    if (!todoOptions.title.trim() || !todoOptions.description.trim()) {
      setError("The 'Todo title' and 'Todo description' fields are required")
      return
    }

    if (editing) {
      const updatedTodo = { ...todoOptions }
      dispatch(updateTodo(updatedTodo))
    } else {
      const newTodo: Todo = {
        id: newId,
        title: todoOptions.title,
        description: todoOptions.description,
        status: todoOptions.status,
      }

      dispatch(addTodo(newTodo))
    }

    handleClose()
  }

  const handleSubmit = (event: React.FormEvent) => {
    event.preventDefault()
    handleChangeTodo()
  }

  return (
    <Modal show={showModal} onHide={handleClose}>
      <Modal.Header closeButton>
        <Modal.Title>{editing ? "Edit todo" : "Add todo"}</Modal.Title>
      </Modal.Header>
      <Form onSubmit={handleSubmit} onKeyDown={handleKeyDown}>
        <Modal.Body>
          <Form.Group controlId="taskTitle">
            <Form.Label>Todo name</Form.Label>
            <Form.Control
              type="text"
              placeholder="Enter a todo title"
              value={todoOptions.title}
              onChange={(e) => {
                setTodoOptions({ ...todoOptions, title: e.target.value })
                setError(null)
              }}
              ref={titleInputRef}
            />
          </Form.Group>
          <Form.Group controlId="taskDescription">
            <Form.Label className="mt-2">Todo description</Form.Label>
            <Form.Control
              as="textarea"
              rows={3}
              placeholder="Enter a todo description"
              value={todoOptions.description}
              onChange={(e) => {
                setTodoOptions({ ...todoOptions, description: e.target.value })
                setError(null)
              }}
            />
          </Form.Group>
          <p className="text-danger">{error}</p>
          <Form.Group controlId="taskStatus">
            <Form.Label className="mt-2">Todo status</Form.Label>
            <Form.Control
              as="select"
              value={todoOptions.status}
              onChange={(e) =>
                setTodoOptions({ ...todoOptions, status: e.target.value })
              }
            >
              <option value="todo">Not done</option>
              <option value="completed">Done</option>
            </Form.Control>
          </Form.Group>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleClose}>
            Close
          </Button>
          <Button type="submit" variant="primary">
            {editing ? "Save" : "Add todo"}
          </Button>
        </Modal.Footer>
      </Form>
    </Modal>
  )
}
