import React from 'react'

const ToDoItem = ({ item }) => {
  return (
    <tr>
      <td>{item.project}</td>
      <td>{item.user}</td>
      <td>{item.text}</td>
    </tr>
  )
}

const ToDoList = ({ items }) => {
  return (
    <table>
      <tr>
        <th>PROJECT</th>
        <th>USER</th>
        <th>CONTENT</th>
      </tr>
      {items.map((item) => <ToDoItem item={item} />)}
    </table>
  )
}

export default ToDoList
