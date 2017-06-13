import React from 'react'
import { Switch, Route } from 'react-router-dom'
import { Container } from 'semantic-ui-react'

import Navbar from './Navbar'
import LoginForm from './LoginForm'
import ComicsContainer from '../containers/ComicsContainer'

class App extends React.Component {
  render() {
    return (
      <Container>
        <Navbar />
        <Switch>
          <Route path="/login" component={LoginForm} />
          <Route path="/comics" component={ComicsContainer} />
        </Switch>
      </Container>
    )
  }
}

export default App
