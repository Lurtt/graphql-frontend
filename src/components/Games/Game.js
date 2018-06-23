import React from 'react'
import { graphql } from 'react-apollo'
import gql from 'graphql-tag'

import './Game.css'
import { AUTH_TOKEN } from '../../constants'

function Game({ game, index, favoriteMutation, updateStoreAfterFavorite }) {
  const authToken = localStorage.getItem(AUTH_TOKEN)

  const favoriteGame = async () => {
    const gameId = game.id
    await favoriteMutation({
      variables: {
        gameId,
      },
      update: (store, { data: { favorite }}) => {
        updateStoreAfterFavorite(store, favorite, gameId)
      },
    })
  }

  return (
    <section className="game-item">
      <span>{game.name}</span>
      {game.description && <span>, description: {game.description}</span>}
      <span>, {game.favorite.length} favorites | posted by {game.postedBy ? game.postedBy.name : 'Unknown'}</span>
      {authToken && <button className="game-favorite" onClick={() => favoriteGame()}>favorite</button>}
    </section>
  )
}

const FAVORITE_MUTATION = gql`
  mutation FavoriteMutation($gameId: ID!) {
    favorite(gameId: $gameId) {
      id
      game {
        id
        favorite {
          id
          user {
            id
          }
        }
      }
      user {
        id
      }
    }
  }
`

export default graphql(FAVORITE_MUTATION, { name: 'favoriteMutation' })(Game)
