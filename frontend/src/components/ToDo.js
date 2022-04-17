import React from 'react'
import {Link} from 'react-router-dom'

const ToDoItem = ({ item, deleteNote }) => {
  return (
    <tr>
      <td>{item.project}</td>
      <td>{item.user}</td>
      <td>{item.text}</td>
      <td><button onClick={()=>deleteNote(item.id)} type='button'>Delete</button></td>
    </tr>
  )
}

const ToDoList = ({ items, deleteNote }) => {
  return (
    <div>
      <table>
        <tr>
          <th>PROJECT</th>
          <th>USER</th>
          <th>CONTENT</th>
          <th></th>
        </tr>
        {items.map((item) => <ToDoItem item={item}  deleteNote={deleteNote} />)}
      </table>
      <Link to='/notes/create'>Create</Link>
    </div>
  )
}

export default ToDoList
