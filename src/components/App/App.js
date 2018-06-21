import React, { Component, Fragment } from 'react'
import { Switch, Route } from 'react-router-dom'

import './App.css'
import { Header, GameList, CreateGame } from '../'

class App extends Component {
  render() {
    return (
      <Fragment>
        <Header />
        <Switch>
          <Route exact path="/" component={GameList} />
          <Route exact path="/create" component={CreateGame} />
        </Switch>
      </Fragment>
    )
  }
}

export default App
