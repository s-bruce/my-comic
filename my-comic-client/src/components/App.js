import React from 'react'
import { Switch, Route } from 'react-router-dom'
import { Container } from 'semantic-ui-react'

import Navbar from './Navbar'
import ComicsContainer from '../containers/ComicsContainer'

class App extends React.Component {
  render() {
    return (
      <Container>
        <Navbar />
        <Switch>
          <Route path="/comics" component={ComicsContainer} />
        </Switch>
      </Container>
    )
  }
}

export default App
