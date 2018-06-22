import React, { Component } from 'react'
import { withApollo } from 'react-apollo'
import gql from 'graphql-tag'

import { Game } from '../'

class Search extends Component {
  state = {
    games: [],
    filter: '',
    loading: false,
  }

  executeSearch = async () => {
    const { filter } = this.state
    this.setState({ loading: true })
    const result = await this.props.client.query({
      query: GAME_SEARCH_QUERY,
      variables: { filter },
    })

    const games = result.data.games.list
    this.setState({ games, loading: false })
  }

  render() {
    return (
      <div>
        Search
        <input
          type="text"
          onChange={e => this.setState({ filter: e.target.value })}
        />
        <button onClick={() => this.executeSearch()}>
          Search
        </button>
        {
          !this.state.loading
            ? this.state.games.map(game => <Game key={game.id} game={game} />)
            : <h1>Loading...</h1>
        }
      </div>
    )
  }
}

const GAME_SEARCH_QUERY = gql`
  query GameSearchQuery($filter: String!) {
    games(filter: $filter) {
      list {
        id
        url
        name
        description
        createdAt
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

export default withApollo(Search)
