import React from 'react'

const ProjectItem = ({item}) => {
  return (
    <tr>
      <td>{item.title}</td>
      <td>{item.repo_link}</td>
    </tr>
  )
}

const ProjectList = ({items}) => {
  return (
    <table>
      <tr>
        <th>PROJECT</th>
        <th>REPO</th>
      </tr>
      {items.map((item) => <ProjectItem item={item} />)}
    </table>
  )
}

export default ProjectList
