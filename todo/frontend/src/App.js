import React from 'react';
import axios from 'axios';
import { BrowserRouter, Route, Switch, Redirect, Link } from 'react-router-dom'
import './App.css';
import Cookies from 'universal-cookie';

import UsersList from './components/Users.js';
import ProjectList from './components/Projects';
import ToDoList from './components/ToDo';
// import Menu from './components/Menu.js';
import Footer from './components/Footer.js';
import LoginForm from './components/Auth.js';
import ProjectForm from './components/ProjectForm.js';
import TodoForm from './components/TodoForm';

const NotFound404 = ({ location }) => {
  return (
    <div>
      <h1>Страница по адресу '{location.pathname}' не найдена</h1>
    </div>
  )
}

class App extends React.Component {

  constructor(props) {
    super(props)
    this.state = {
      'users': [],
      'projects': [],
      'notes': [],
      'token': '',
      'current_user': ''
    }
  }

  set_token(token, username) {
    const cookies = new Cookies()
    cookies.set('token', token)
    cookies.set('current_user', username)
    this.setState({ 'token': token, 'current_user': username }, () => this.load_data())
  }

  is_authenticated() {
    return this.state.token !== ''
  }

  logout() {
    this.set_token('')
  }

  get_token_from_storage() {
    const cookies = new Cookies()
    const token = cookies.get('token')
    const username = cookies.get('current_user')
    this.setState({ 'token': token, 'current_user': username }, () => this.load_data())
  }

  get_token(username, password) {
    axios.post('http://127.0.0.1:8000/api-token-auth/', {
      username: username,
      password: password
    })
      .then(response => {
        this.set_token(response.data['token'], username)
      }).catch(error => alert('Неверный логин или пароль'))
  }

  get_headers() {
    let headers = {
      'Content-Type': 'application/json'
    }
    if (this.is_authenticated()) {
      headers['Authorization'] = 'Token ' + this.state.token
    }
    return headers
  }

  load_data() {
    const headers = this.get_headers()
    axios.get('http://127.0.0.1:8000/api/users', { headers })
      .then(response => {
        const users = response.data.results
        this.setState(
          {
            'users': users
          }
        )
      }).catch(error => {
        console.log(error)
        this.setState({ users: [] })
      });
    axios.get('http://127.0.0.1:8000/api/projects', { headers })
      .then(response => {
        const projects = response.data.results
        this.setState(
          {
            'projects': projects
          }
        )
      }).catch(error => {
        console.log(error)
        this.setState({ projects: [] })
      });
    axios.get('http://127.0.0.1:8000/api/notes', { headers })
      .then(response => {
        const notes = response.data.results
        this.setState(
          {
            'notes': notes
          }
        )
      }).catch(error => {
        console.log(error)
        this.setState({ notes: [] })
      });
  }

  deleteProject(id) {
    const headers = this.get_headers()
    axios.delete(`http://127.0.0.1:8000/api/projects/${id}/`, { headers })
      .then(response => {
        this.setState({ projects: this.state.projects.filter((item) => item.id !== id) })
      }).catch(error => { console.log(error) })
  }

  createProject(title, repo_link, developers) {
    const headers = this.get_headers()
    const data = { title: title, repo_link: repo_link, developers: developers }
    console.log(data)
    axios.post(`http://127.0.0.1:8000/api/projects/`, data, { headers })
      .then(response => {
        let new_project = response.data
        const developers = this.state.users.filter((item) => item.id === new_project.developers)
        new_project.developers = developers
        this.setState({ projects: [...this.state.projects, new_project] })
      }).catch(error => console.log(error))
  }

  deleteNote(id) {
    const headers = this.get_headers()
    axios.delete(`http://127.0.0.1:8000/api/notes/${id}/`, { headers })
      .then(response => {
        this.setState({ notes: this.state.notes.filter((item) => item.id !== id) })
      }).catch(error => { console.log(error) })
  }

  createNote(project, text) {
    const headers = this.get_headers()
    console.log(this.state.current_user)
    const author = this.state.users.filter((item) => item.username === this.state.current_user)[0].uid
    console.log(author)
    const data = { project: project, text: text, user: author }
    console.log(data)
    axios.post(`http://127.0.0.1:8000/api/notes/`, data, { headers })
      .then(response => {
        let new_note = response.data
        this.setState({ notes: [...this.state.notes, new_note] })
      }).catch(error => console.log(error))
  }

  componentDidMount() {
    this.get_token_from_storage()
  }

  render() {
    return (
      <div className="App">
        <BrowserRouter>
          <nav>
            <ul>
              <li>
                <Link to='/users'>Users</Link>
              </li>
              <li>
                <Link to='/projects'>projects</Link>
              </li>
              <li>
                <Link to='/notes'>notes</Link>
              </li>
              <li>
                {this.is_authenticated() ? <button onClick={() => this.logout()}>Logout {this.state.current_user}</button> : <Link to='/login'>Login</Link>}
              </li>
            </ul>
          </nav>
          <Switch>
            <Route exact path='/users' component={() => <UsersList users={this.state.users} />} />
            <Route exact path='/projects/create' component={() => 
              <ProjectForm developers={this.state.users} createProject={(title, repo_link, developers) => this.createProject(title, repo_link, developers)} />} />
            <Route exact path='/projects' component={
              () => <ProjectList items={this.state.projects} deleteProject={(id) => this.deleteProject(id)} />} />
            <Route exact path='/notes/create' component={() => 
              <TodoForm projects={this.state.projects} createNote={(project, text) => this.createNote(project, text)} />} />
            <Route exact path='/notes' component={() => <ToDoList items={this.state.notes} deleteNote={(id) => this.deleteNote(id)} />} />
            <Route exact path='/login' component={
              () => <LoginForm get_token={(username, password) => this.get_token(username, password)} />
            } />
            <Redirect from='/' to='/projects' />
            <Route component={NotFound404} />
          </Switch>
          <Footer />
        </BrowserRouter>
      </div>
    )
  }
}

export default App;
