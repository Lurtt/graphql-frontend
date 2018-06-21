import React, { Component } from 'react'
import { graphql } from 'react-apollo'
import gql from 'graphql-tag'

import Game from './Game'

class GameList extends Component {
  render() {
    const { gameQuery } = this.props

    if (gameQuery && gameQuery.loading) {
      return <h1>Loading...</h1>
    }

    if (gameQuery && gameQuery.error) {
      return <h1>Error!</h1>
    }

    const { list } = gameQuery.games

    return (
      <div>
        { list.map(game => <Game key={game.id} game={game} />) }
      </div>
    )
  }
}

const GAME_QUERY = gql`
  query GameQuery {
    games {
      list {
        id
        createdAt
        name
      }
    }
  }
`

export default graphql(GAME_QUERY, { name: 'gameQuery' })(GameList)
