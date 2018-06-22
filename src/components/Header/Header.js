import React from 'react'
import { Link } from 'react-router-dom'
import { withRouter } from 'react-router'

import { AUTH_TOKEN } from '../../constants'

function Header(props) {
  const authToken = localStorage.getItem(AUTH_TOKEN)

  return (
    <header>
      <Link to="/">Home</Link>
      <Link to="/search">Search</Link>
      {authToken && (
        <Link to="/create">Add Game</Link>
      )}
      {authToken ? (
        <button onClick={() => {
          localStorage.removeItem(AUTH_TOKEN)
          props.history.push('/')
        }}
        >
          logout
        </button>
      ) : (
        <Link to="/login">login</Link>
      )}
    </header>
  )
}

export default withRouter(Header)
