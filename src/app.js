import React from 'react'
import ReactDOM from 'react-dom'
import { BrowserRouter, Route, Switch } from 'react-router-dom'
import 'bulma'
import './stylesheets/main.scss'

import Start from './components/common/Start'
import Questions from './components/Questions'
import Error from './components/common/Error'

const App = () => (
  <BrowserRouter>
    <Switch>
      <Route exact path="/" component={Start} />
      <Route path="/questions" component={Questions} />
      <Route path="/*" component={Error} />
    </Switch>
  </BrowserRouter>
)
ReactDOM.render(
  <App />,
  document.getElementById('root')
)