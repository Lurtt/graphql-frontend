import React, { Component } from 'react'
import { graphql } from 'react-apollo'
import gql from 'graphql-tag'

class CreateGame extends Component {
  state = {
    name: '',
    description: '',
    url: '',
  }

  createGame = async () => {
    const { name, description, url } = this.state
    await this.props.createGameMutation({
      variables: {
        name,
        description,
        url,
      }
    })
    this.props.history.push('/')
  }

  render() {
    return (
      <div>
        <input
          type="text"
          value={this.state.name}
          onChange={e => this.setState({ name: e.target.value })}
          placeholder="A name for the game"
        />
        <input
          type="text"
          value={this.state.description}
          onChange={e => this.setState({ description: e.target.value })}
          placeholder="A description for the game"
        />
        <input
          type="text"
          value={this.state.url}
          onChange={e => this.setState({ url: e.target.value })}
          placeholder="A url for the game"
        />
        <button onClick={() => this.createGame()}>Submit</button>
      </div>
    )
  }
}

const CREATE_GAME_MUTATION = gql`
  mutation CreateGameMutation($name: String!, $description: String, $url: String) {
    postGame(name: $name, description: $description, url: $url) {
      id
      createdAt
      name
      description
      url
    }
  }
`

export default graphql(CREATE_GAME_MUTATION, { name: 'createGameMutation' })(CreateGame)
