import React, { Component } from 'react'
import { graphql } from 'react-apollo'
import gql from 'graphql-tag'

import Game from './Game'

class GameList extends Component {

  updateCacheAfterFavorite = (store, createFavorite, gameId) => {
    const data = store.readQuery({ query: GAME_QUERY })

    const favoritedGame = data.games.list.find(game => game.id === gameId)
    favoritedGame.games = createFavorite.game.favorite

    store.writeQuery({ query: GAME_QUERY, data })
  }

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
        {
          list.map(game =>
          <Game
            key={game.id}
            game={game}
            updateStoreAfterFavorite={this.updateCacheAfterFavorite}
          />
        )}
      </div>
    )
  }
}

export const GAME_QUERY = gql`
  query GameQuery {
    games {
      list {
        id
        createdAt
        name
        postedBy {
          id
          name
        }
        favorite {
          id
          user {
            id
          }
        }
      }
    }
  }
`

export default graphql(GAME_QUERY, { name: 'gameQuery' })(GameList)
