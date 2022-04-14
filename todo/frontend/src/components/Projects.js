import React from 'react'
import {Link} from 'react-router-dom'

const ProjectItem = ({item, deleteProject}) => {
  return (
    <tr>
      <td>{item.title}</td>
      <td>{item.repo_link}</td>
      <td><button onClick={()=>deleteProject(item.id)} type='button'>Delete</button></td>
    </tr>
  )
}

const ProjectList = ({items, deleteProject}) => {
  return (
    <div>
      <table>
        <tr>
          <th>PROJECT</th>
          <th>REPO</th>
          <th></th>
        </tr>
        {items.map((item) => <ProjectItem item={item} deleteProject={deleteProject}/>)}
      </table>
      <Link to='/projects/create'>Create</Link>
    </div>
  )
}

export default ProjectList
