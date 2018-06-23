import React from 'react'
import { Link } from 'react-router-dom'
import { withRouter } from 'react-router'

import './Header.css'
import { AUTH_TOKEN } from '../../constants'

function Header(props) {
  const authToken = localStorage.getItem(AUTH_TOKEN)

  return (
    <header className="header-navigation">
      <nav>
        <Link className="header-link" to="/">Home</Link>
        <Link className="header-link" to="/search">Search</Link>
        {authToken && (
          <Link className="header-link" to="/create">Add Game</Link>
        )}
      </nav>
      {authToken ? (
        <button className="header-link" onClick={() => {
          localStorage.removeItem(AUTH_TOKEN)
          props.history.push('/')
        }}
        >
          logout
        </button>
      ) : (
        <Link className="header-link" to="/login">login</Link>
      )}
    </header>
  )
}

export default withRouter(Header)
