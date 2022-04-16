import React from 'react'

class ProjectForm extends React.Component {

  constructor(props) {
    super(props)
    this.state = { title: '', repo_link: 'https://github.com/', developers: this.props.developers[0]?.uid }
  }

  handleChange(event) {
    this.setState(
      {
        [event.target.name]: event.target.value
      }
    );
  }

  handleDevelopersChange(event) {
    this.setState({developers: [...event.target.selectedOptions].map(o => o.value)});
  }

  handleSubmit(event) {
    this.props.createProject(this.state.title, this.state.repo_link, this.state.developers)
    event.preventDefault()
  }

  render() {
    return (
      <form onSubmit={(event)=> this.handleSubmit(event)}>
        <div className='form-group'>
          <label htmlFor="title">Заголовок проекта: </label>
          <input type="text" className="form-control" name="title" value={this.state.title} onChange={(event)=>this.handleChange(event)} />
        </div>
        <div className='form-group'>
          <label htmlFor="repo_link">репозиторий: </label>
          <input type="text" className="form-control" name="repo_link" value={this.state.repo_link} onChange={(event)=>this.handleChange(event)} />
        </div>
        <div className='form-group'>
          <label htmlFor="developers">разработчики: </label>
          <select name="developers" className='form-control' multiple={true} 
            onChange={(event)=>this.handleDevelopersChange(event)}>{this.props.developers.map((item)=>
            <option value={item.uid}>{item.first_name} {item.last_name}</option>)}
          </select>
        </div>
        <input type="submit" className="btn btn-primary" value="Save" />
      </form>
    );
  }
}

export default ProjectForm