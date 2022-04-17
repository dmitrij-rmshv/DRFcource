import React from 'react'
import {Link} from 'react-router-dom'

class ProjectSearch extends React.Component{

  constructor(props) {
    super(props)
    this.state = { searchLine: '' }
  }

  handleChange(event) {
    this.setState(
      {
        [event.target.name]: event.target.value
      }
    );
  }

  handleSubmit(event) {
    this.props.searchProject(this.state.searchLine)
    event.preventDefault()
  }

  render() {
    return (
      <form onSubmit={(event)=> this.handleSubmit(event)}>
        <div className='form-group'>
          <label htmlFor="searchLine">поиск проекта: </label>
          <input type="text" className="form-control" name="searchLine" value={this.state.searchLine} onChange={(event)=>this.handleChange(event)} />
        </div>
        <input type="submit" className="btn btn-primary" value="search..." />
      </form>
    );
  }
}

const ProjectItem = ({item, deleteProject}) => {
  return (
    <tr>
      <td>{item.title}</td>
      <td>{item.repo_link}</td>
      <td><button onClick={()=>deleteProject(item.id)} type='button'>Delete</button></td>
    </tr>
  )
}

const ProjectList = ({items, deleteProject, searchLine, searchProject}) => {
  return (
    <div>
      <ProjectSearch searchLine={searchLine} searchProject={searchProject} />
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
