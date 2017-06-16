import React from 'react'
import { Switch, Route, withRouter } from 'react-router-dom'
import { Container } from 'semantic-ui-react'

import Navbar from './Navbar'
import SignupForm from './SignupForm'
import LoginForm from './LoginForm'
import ComicsContainer from '../containers/ComicsContainer'

import { signUp, logIn, fetchCurrentUser } from '../api'
import isAuthenticated from './hocs/isAuthenticated'

const AuthedComicsContainer = isAuthenticated(ComicsContainer)

class App extends React.Component {
  constructor(){
    super()

    if (localStorage.getItem('jwt')) {
      this.state = {
        loggedIn: true,
        currentUser: {}
      }
    } else {
      this.state = { loggedIn: false }
    }

    this.handleSignup = this.handleSignup.bind(this)
    this.handleLogin = this.handleLogin.bind(this)
    this.handleLogout = this.handleLogout.bind(this)
  }

  componentDidMount(){
    if (this.state.loggedIn) {
      fetchCurrentUser()
      .then(account => {
        this.setState({ currentUser: account })
      })
    }
  }

  handleLogin(params, handleIncorrectLogin){
    logIn(params)
    .then(res => {
      if (res.error){
        handleIncorrectLogin()
      } else {
        localStorage.setItem('jwt', res.token)
        this.setState({ loggedIn: true })
        this.setState({ currentUser: res.account })
        this.props.history.push('/comics/new')
      }
    })
  }

  handleSignup(params, handleUsernameExists, handleAccountCreated){
    signUp(params)
    .then(res => {
      if (res.error){
        handleUsernameExists()
      } else {
        handleAccountCreated()
      }
    })
  }

  handleLogout(){
    localStorage.clear()
    this.props.history.push('/login')
    this.setState({ loggedIn: false })
  }

  render() {
    return (
      <Container>
        <Navbar loggedIn={this.state.loggedIn} />
        <Switch>
          <Route path="/signup" render={() => <SignupForm handleSignup={this.handleSignup} />} />
          <Route path="/login" render={() => <LoginForm handleLogin={this.handleLogin} />} />
          <Route path="/logout" render={() => {
            this.handleLogout()
            return null
          }} />
          <Route path="/comics" render={() => <AuthedComicsContainer user={this.state.currentUser} />} />
        </Switch>
        <span className="comic-font"></span>
      </Container>
    )
  }
}

export default withRouter(App)
