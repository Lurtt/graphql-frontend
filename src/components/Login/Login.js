import React, { Component } from 'react'
import { graphql, compose } from 'react-apollo'
import gql from 'graphql-tag'

import { AUTH_TOKEN } from '../../constants'

class Login extends Component {
  state = {
    login: true,
    email: '',
    password: '',
    name: '',
  }

  confirm = async () => {
    const { name, email, password, login } = this.state
    if (login) {
      const result = await this.props.loginMutation({
        variables: {
          email,
          password,
        },
      })
      const { token } = result.data.login
      this.saveUserData(token)
    } else {
      const result = await this.props.signupMutation({
        variables: {
          name,
          email,
          password,
        },
      })
      const { token } = result.data.signup
      this.saveUserData(token)
    }
    this.props.history.push('/')
  }

  saveUserData = token => {
    localStorage.setItem(AUTH_TOKEN, token)
  }

  render() {
    const { login, name, email, password } = this.state

    return (
      <div>
        <h4>{login ? 'Login' : 'Sign Up'}</h4>
        <div>
          {!login && (
            <input
              type="text"
              value={name}
              onChange={e => this.setState({ name: e.target.value })}
              placeholder="Your name"
            />
          )}
          <input
            type="text"
            value={email}
            onChange={e => this.setState({ email: e.target.value })}
            placeholder="Your email address"
          />
          <input
            type="password"
            value={password}
            onChange={e => this.setState({ password: e.target.value })}
            placeholder="Choose a safe password"
          />
        </div>
        <div>
          <button onClick={() => this.confirm()}>
            {login ? 'login' : 'create account'}
          </button>
          <button onClick={() => this.setState({ login: !login })}>
            {login ? 'need to create an account?' : 'already have an account?'}
          </button>
        </div>
      </div>
    )
  }
}

const SIGNUP_MUTATION = gql`
  mutation SignupMutation($email: String!, $password: String!, $name: String!) {
    signup(email: $email, password: $password, name: $name) {
      token
    }
  }
`

const LOGIN_MUTATION = gql`
  mutation LoginMutation($email: String!, $password: String!) {
    login(email: $email, password: $password) {
      token
    }
  }
`

export default compose(
  graphql(SIGNUP_MUTATION, { name: 'signupMutation'}),
  graphql(LOGIN_MUTATION, { name: 'loginMutation'}),
)(Login)
