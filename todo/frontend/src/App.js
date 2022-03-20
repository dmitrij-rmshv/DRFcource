import React from 'react';
import axios from 'axios';
import { BrowserRouter, Route, Switch, Redirect } from 'react-router-dom'
import './App.css';
import UsersList from './components/Users.js';
import ProjectList from './components/Projects';
import ToDoList from './components/ToDo';
import Menu from './components/Menu.js';
import Footer from './components/Footer.js';

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
    }
  }

  componentDidMount() {
    axios.get('http://127.0.0.1:8000/api/users')
      .then(response => {
        const users = response.data.results
        this.setState(
          {
            'users': users
          }
        )
      }).catch(error => console.log(error));

    axios.get('http://127.0.0.1:8000/api/projects')
      .then(response => {
        const projects = response.data.results
        this.setState(
          {
            'projects': projects
          }
        )
      }).catch(error => console.log(error));

    axios.get('http://127.0.0.1:8000/api/notes')
      .then(response => {
        const notes = response.data.results
        this.setState(
          {
            'notes': notes
          }
        )
      }).catch(error => console.log(error));

  }

  render() {
    return (
      <div>
        <BrowserRouter>
          <Menu />
          <Switch>
            <Route exact path='/users' component={() => <UsersList users={this.state.users} />} />
            <Route exact path='/projects' component={() => <ProjectList items={this.state.projects} />} />
            <Route exact path='/notes' component={() => <ToDoList items={this.state.notes} />} />
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
