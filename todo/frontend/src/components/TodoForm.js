import React from 'react'

class TodoForm extends React.Component {

  constructor(props) {
    super(props)
    this.state = { project: this.props.projects[0]?.id, text: '' }
  }

  handleChange(event) {
    this.setState(
      {
        [event.target.name]: event.target.value
      }
    );
  }

  handleSubmit(event) {
    console.log(this.state.project)
    console.log(this.state.text)
    this.props.createNote(this.state.project, this.state.text)
    event.preventDefault()
  }

  render() {
    return (
      <form onSubmit={(event)=> this.handleSubmit(event)}>
        <div className='form-group'>
          <label htmlFor="project">Выбирете проект: </label>
          <select name="project" className='form-control' 
            onChange={(event)=>this.handleChange(event)}>{this.props.projects.map((item)=>
            <option value={item.id}>{item.title}</option>)}
          </select>
        </div>
        <div className='form-group'>
          <label htmlFor="text">Ваша заметка к проекту: </label>
          <input type="text" className="form-control" name="text" value={this.state.text} onChange={(event)=>this.handleChange(event)} />
        </div>
        <input type="submit" className="btn btn-primary" value="Save" />
      </form>
    );
  }
}

export default TodoForm