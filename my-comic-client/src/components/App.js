import React from 'react'
import { Switch, Route } from 'react-router-dom'

import ComicsContainer from '../containers/ComicsContainer'

class App extends React.Component {
  render() {
    return (
      <div>
        <Switch>
          <Route path="/comics" component={ComicsContainer} />
        </Switch>
      </div>
    )
  }
}

export default App
