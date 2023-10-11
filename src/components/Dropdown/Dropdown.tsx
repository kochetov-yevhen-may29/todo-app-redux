import React from "react"
import { Form } from "react-bootstrap"
import { Filter } from "../../types/filter"

interface DropdownProps {
  onFilterChange: (filter: Filter) => void
}

export const Dropdown: React.FC<DropdownProps> = ({ onFilterChange }) => {
  const handleFilterChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const selectedFilter = e.target.value as Filter
    onFilterChange(selectedFilter)
  }

  return (
    <Form.Select
      aria-label="Default select example"
      onChange={handleFilterChange}
    >
      <option value={Filter.All}>All</option>
      <option value={Filter.Done}>Done</option>
      <option value={Filter.NotDone}>Not Done</option>
    </Form.Select>
  )
}
