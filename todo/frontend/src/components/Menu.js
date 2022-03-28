import React from 'react'
import {Link} from 'react-router-dom'

const Menu = () => {
  return (
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
          <Link to='/login'>Login</Link>
        </li>
      </ul>
    </nav>
  )
}

export default Menu
